import ReadBook from '../view/ReadBook/index'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import { useRef, useEffect } from 'react'
import { Dimensions, Alert } from 'react-native'
import * as LocalStorage from '../model/LocalStorage'
import translate from 'google-translate-api-x';
import axios from 'axios';

const device = Dimensions.get("window")

const ReadBookController = (props) => {

    //Ao abrirmos a tela, chamamos "createStaticServer()" para que o livro possa ser acessado por meio da url "bookUrl" pela biblioteca "epub.js"
    useEffect(() => {
        createStaticServer()
        setNativeLanguage()
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

        }

    }

    //Essa variável e a função abaixo são usadas para determinar quando o usuário dá um clique duplo na tela
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

        if (parsedData.type == 'locations') {
            //Nesse caso "parsedData.locations" conterá as Locations do arquivo, útil para determinarmos a posição de cada página (ainda não implementado)
        }

        if (parsedData.type == 'metadata') {

            props.setBookTitle(parsedData.title)
            saveMetadata(props.bookKey, parsedData)

        }

        if (parsedData.type == 'newPage') {

            //Se o usuário mudou de página, salvamos a localização dessa página

            LocalStorage.setLastLocationOpened(props.bookKey, parsedData.location)
            props.setCurrentPage(parsedData.location)

        }

        if (parsedData.type == 'locations') {

            //Salvamos as 'locations' do livro

            console.log(parsedData.locations)
            LocalStorage.saveBookLocations(props.bookKey, parsedData.locations)

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
                                        location: window.rendition.currentLocation().start.cfi
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
                                        location: window.rendition.currentLocation().start.cfi
                                    })
                                )});`)


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

            const res = await translate(content, { from: srcLanguage.length == 0 ? "auto" : srcLanguage, to: targetLanguage })
            props.setTranslation(res.text)

            if (props.wordToTranslate) {

                //Salvamos a tradução e o idioma original da palavra. Observe que queremos salvar não apenas o código, mas também o nome do idioma
                languageCode = res.from.language.iso
                languageIndex = props.supportedTranslationSourceLanguages.findIndex((obj => obj.value == languageCode));
                language = { name: props.supportedTranslationSourceLanguages[languageIndex].label, code: props.supportedTranslationSourceLanguages[languageIndex].value }

                LocalStorage.updateWordTranslation(content, res.text, language)

                getContext(props.wordToTranslate, res.from.language.iso, props.translationTargetLanguage)

            }

        } catch (e) {

            console.log(e)

            Alert.alert('Translation Rejected', 'The translation was rejected by the server. The selected text might have been too long. In that case, please try selecting a shorter portion of text and attempt the translation again.')

        }
    
    }

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

        props.setContext(wordContext.data.list.slice(0,10))

    }

    return (
        <ReadBook navigation={props.navigation} bookTitle={props.bookTitle} onScreenPress={onScreenPress} handleWebviewMessage={handleWebviewMessage} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} initialPage={props.initialPage} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} showSlider={props.showSlider} sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} bookLength={props.bookLength} locations={props.locations} bookUrl={props.bookUrl} saveMetadata={props.saveMetadata} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} translation={props.translation} context={props.context} webview={props.webview} />
        )
    
}

export default ReadBookController;