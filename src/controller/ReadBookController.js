﻿import ReadBook from '../view/ReadBook/index'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import { useRef, useEffect } from 'react'
import { Dimensions, Alert } from 'react-native'
import * as LocalStorage from '../model/LocalStorage'
import translate from 'google-translate-api-x';
import axios from 'axios';

const device = Dimensions.get("window")

const ReadBookController = (props) => {

    //Ao abrirmos a tela, chamamos "createStaticServer()" para que o livro possa ser acessado por meio da url "bookUrl" pela biblioteca "epub.js", e mais algumas funções para obtermos alguns parâmetros do armazenamento local
    useEffect(() => {
        createStaticServer()
        setNativeLanguage()
        setInitialLocation()
        setTheme()
        //Salvamos o índice desse livro para sabermos que ele é o livro sendo lido
        LocalStorage.setCurrentlyReading(props.bookKey)
    }, [])

    //Esse servidor permitirá acessarmos o arquivo localmente na "url" abaixo
    const createStaticServer = () => {

        let server = new StaticServer(8080, RNFS.DocumentDirectoryPath, { keepAlive: true });

        server.start().then(url => {

            console.log(url)
            props.setBookUrl(url + "/" + props.fileName)

        });

    }
    
    //Definimos o idioma nativo a partir do valor no sistema de armazenamento
    const setNativeLanguage = async () => {

        const nativeLanguage = await LocalStorage.getNativeLanguage()

        props.setNativeLanguage(nativeLanguage)
        props.setTranslationTargetLanguage(nativeLanguage.code)
        props.setDictionaryLanguage(nativeLanguage.code)

    }

    //Define a localização em que o livro deve ser aberto
    const setInitialLocation = async () => {

        let books = await LocalStorage.getBookIndex()

        const bookIndex = books.findIndex((obj => obj.bookKey == props.bookKey));
        const initialPage = books[bookIndex].lastLocationOpened

        props.currentPageRef.current = initialPage
        props.setInitialPage(initialPage)
        goToPage(initialPage)

    }


    //Definimos o tema
    const setTheme = async () => {

        props.setNightMode(await LocalStorage.getNightMode())
        props.setFont(await LocalStorage.getFont())

    }

    const INTERVAL = 10000;
    //Executado a cada dez secundos (salvamos a localização da última página lida)
    useEffect(() => {
        const interval = setInterval(() => {
            LocalStorage.setLastLocationOpened(props.bookKey, props.currentPageRef.current)
        }, INTERVAL);

        return () => clearInterval(interval);
    }, [])

    //Executado quando o usuário sai da tela (salvamos a localização da última página lida)
    useEffect(() => {

        props.navigation.addListener('beforeRemove', async (e) => {
            e.preventDefault();
            LocalStorage.setLastLocationOpened(props.bookKey, props.currentPageRef.current).then(() => { props.navigation.dispatch(e.data.action)})
        })

    }, [])

    //Se o usuário dá um clique duplo, alternamos as versões da tela com ou sem o slider para mudança de página
    const onDoublePress = () => {
        props.setShowSlider(!props.showSlider);
    }

    const onSinglePress = () => {

        //Sempre que há um clique na tela, verificamos se há uma palavra ou parágrafo cujas traduções estão sendo mostrados no momento
        //Se houver, "ressetamos" essas variáveis para que as suas modais deixem de ser mostradas (nessa situação, o clique deve fechar as modais)
        if (props.wordToTranslate != "" || props.phraseToTranslate != "") {

            props.setWordToTranslate("")
            props.setPhraseToTranslate("")
            props.setTranslation("")

        }

    }

    //Essa variável e a função abaixo são usadas para determinar quando o usuário dá um clique duplo na tela versus um clique único
    let lastPress = useRef(0);
    let lastSelection = useRef(0);

    const onScreenPress = () => {

        const time = new Date().getTime();
        const delta = time - lastPress.current;

        const DOUBLE_PRESS_DELAY = 400;

        if (delta < DOUBLE_PRESS_DELAY) {
            //Detectado um clique duplo
            onDoublePress()
        } else {

            //Se o usuário acabou de selecionar texto, desconsideramos esse clique; caso contrário, chamamos onSinglePress()
            if (time - lastSelection.current > 400) {
                onSinglePress()
            }

            lastPress.current = time;

        }

    };

    //Chamada quando o usuário seleciona texto
    const onSelection = (data) => {

        //Atualizamos o tempo da última seleção
        const time = new Date().getTime();
        lastSelection.current = time;

        //De acordo com a posição do texto selecionado, devemos decidir onde posicionar a modal de modo a não atrapalhar a leitura
        let bottomPosition = data.coordinates["0"].bottom

        if ((bottomPosition + 0.37 * device.height) > (device.height - 80)) {
            props.setPositionTranslationModals("top");
        } else {
            props.setPositionTranslationModals("bottom");
        }

        content = data.selected;
        reWhiteSpace = new RegExp("\\s+");

        if (reWhiteSpace.test(content)) {

            //Se o conteúdo selecionado tem mais que uma palavra:
            props.setPhraseToTranslate(content)
            props.setWordToTranslate("")

        } else {

            //Se o conteúdo selecionado tem apenas uma palavra
            props.setWordToTranslate(content)
            props.setPhraseToTranslate("")
            LocalStorage.addToWordList(content, data.fullPhrase)

        };

    }

    //Salva os metadados do livro
    const saveMetadata = (bookKey, parsedData) => {
        LocalStorage.saveBookMetadata(bookKey, parsedData)
    }

    //Lida com as mensagens em formato JSON do código executado na Webview
    function handleWebviewMessage(e) {

        let parsedData = JSON.parse(e.nativeEvent.data);

        if (parsedData.type == 'selected') {

            onSelection(parsedData)

        }

        if (parsedData.type == 'metadata') {

            //Salvamos os metadados do livro
            props.setBookTitle(parsedData.title)
            saveMetadata(props.bookKey, parsedData)

        }

        if (parsedData.type == 'newPage') {

            //Se o usuário mudou de página, salvamos a localização dessa página e atualizamos o valor no Slider

            props.currentPageRef.current = parsedData.location
            props.setSliderValue(parsedData.newLocationIndex)

        }

        if (parsedData.type == 'locations') {

            //Salvamos as 'locations' do livro; necessárias para navegarmos para algum lugar específico do livro

            props.setLocations(parsedData.locations)
            LocalStorage.saveBookLocations(props.bookKey, parsedData.locations)

            //O livro será recarregado, então definimos a nova página inicial com o valor salvo como "currentPage", para que ele continue sendo mostrado na mesma página
            props.setInitialPage(parsedData.currentLocation)
            props.setSliderValue(parsedData.newLocationIndex)

        }

        if (parsedData.type == 'loaded') {

            //Se a página a ser mostrada na Webview foi carregada, atualizamos "isLoading"
            props.setIsLoading(false)

        }

        return;

    }

    //Se o usuário deslizou para a direita, voltamos uma página
    const onSwipeRight = () => {

        props.webview.current.injectJavaScript(`
                             window.rendition.prev().then(()=>{
                             window.ReactNativeWebView.postMessage(
                                    JSON.stringify({
                                        type: 'newPage',
                                        location: window.rendition.currentLocation().start.cfi,
                                        newLocationIndex: book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)
                                    })
                                )});`)

    }

    //Se o usuário deslizou para a esquerda, vamos para a próxima página
    const onSwipeLeft = () => {

            props.webview.current.injectJavaScript(`
                             window.rendition.next().then(()=>{
                             window.ReactNativeWebView.postMessage(
                                    JSON.stringify({
                                        type: 'newPage',
                                        location: window.rendition.currentLocation().start.cfi,
                                        newLocationIndex: book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)
                                    })
                                )});`)


    }

    //Vai para alguma página qualquer a partir da Location correspondente a essa página (uma das Locations geradas na importação do livro - na verdade não são páginas no sentido tradicional)
    const goToPage = (locationNumber) => {

        props.webview.current.injectJavaScript(`
                             window.rendition.display(${JSON.stringify(props.locations[locationNumber])}).then(()=>{
                             window.ReactNativeWebView.postMessage(
                                    JSON.stringify({
                                        type: 'newPage',
                                        location: window.rendition.currentLocation().start.cfi,
                                        newLocationIndex: book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)
                                    })
                                )});
        `)

    }
              


    //Observamos se há alguma palavra ou frase para ser traduzida; se sim, atualizamos "translation" no model); se for uma palavra, também atualizamos a definição e o contexto
    useEffect(() => {

        if (props.phraseToTranslate) {
            translateContent(props.phraseToTranslate, props.translationSourceLanguage, props.translationTargetLanguage)
        }
        else if (props.wordToTranslate) {
            translateContent(props.wordToTranslate, props.translationSourceLanguage, props.translationTargetLanguage)
        }


    }, [props.wordToTranslate, props.phraseToTranslate, props.translationSourceLanguage, props.translationTargetLanguage]);

    const translateContent = async (content, srcLanguage, targetLanguage) => {

        try {

            //Obtemos o resultado da tradução (usamos uma biblioteca para traduções em React Native baseada no Google Tradutor)
            const res = await translate(content, { from: srcLanguage.length == 0 ? "auto" : srcLanguage, to: targetLanguage })
            props.setTranslation(res.text)

            //Obtemos o nome e o código do idioma a partir do qual a palavra foi traduzida
            let languageCode = ""

            //Primeiro obtemos o código
            if (srcLanguage != "") {
                languageCode = srcLanguage
            } else {
                languageCode = res.from.language.iso
            }

            //A partir do código, tentamos obter o nome do idioma
            language = { name: languageCode, code: languageCode }
            languageIndex = props.supportedTranslationSourceLanguages.findIndex((obj => { return obj.value === languageCode }));
            if (languageIndex != -1) {
                language = { name: props.supportedTranslationSourceLanguages[languageIndex].label, code: languageCode }
            }

            props.setDetectedLanguage(language.name)

            if (props.wordToTranslate) {

                //Mostramos o contexto e salvamos a tradução e o idioma original da palavra. 

                getContext(props.wordToTranslate, languageCode, props.translationTargetLanguage)
                
                LocalStorage.updateWordTranslation(content, res.text, language)

            }

        } catch (e) {

            console.log(e)

            Alert.alert('Translation Rejected', 'The translation was rejected by the server. The selected text may have exceeded the allowable length or it is possible that your device is currently not connected to the internet.')

        }
    
    }

    //Função usada para obter o contexto (isto é, exemplos de uso) de uma palavra; usa a API do site "Reverso Context"
    const getContext = async (content, srcLanguage, targetLanguage) => {

        const wordContext = await axios.post('https://context.reverso.net/bst-query-service', {
            source_lang: srcLanguage,
            target_lang: targetLanguage,
            source_text: content,
            target_text: ""
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

        props.setContext(wordContext.data.list.slice(0,20))

    }

    return (
        <ReadBook navigation={props.navigation} bookTitle={props.bookTitle} onScreenPress={onScreenPress} handleWebviewMessage={handleWebviewMessage} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} initialPage={props.initialPage} currentPage={props.currentPage} goToPage={goToPage} setCurrentPage={props.setCurrentPage} showSlider={props.showSlider} sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} locations={props.locations} bookUrl={props.bookUrl} saveMetadata={props.saveMetadata} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} detectedLanguage={props.detectedLanguage} translation={props.translation} context={props.context} webview={props.webview} nightMode={props.nightMode} font={props.font} isLoading={props.isLoading} />
        )
    
}

export default ReadBookController;