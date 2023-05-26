import ReadBook from '../view/ReadBook/index'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import { useRef, useEffect } from 'react'
import { Dimensions } from 'react-native'
import * as LocalStorage from '../model/LocalStorage'

const device = Dimensions.get("window")

const ReadBookController = (props) => {

    //Ao abrirmos a tela, chamamos "createStaticServer()" para que o livro possa ser acessado por meio da url "bookUrl" pela biblioteca "epub.js"
    useEffect(() => {
        createStaticServer()
        setNativeLanguage()
    }, [])

    //Esse servidor permitir� acessarmos o arquivo localmente na "url" abaixo
    const createStaticServer = () => {

        let server = new StaticServer(8080, RNFS.DocumentDirectoryPath, { keepAlive: true });

        server.start().then(url => {

            console.log(url)
            props.setBookUrl(url + "/" + props.fileName)

        });

    }

    const setNativeLanguage = async () => {

        props.setNativeLanguage(await LocalStorage.getNativeLanguage())

    }

    //Se o usu�rio d� um clique duplo, alternamos as vers�es da tela com ou sem o slider para mudan�a de p�gina
    const onDoublePress = () => {
        props.setShowSlider(!props.showSlider);
    }

    const onSinglePress = () => {

        //Sempre que h� um clique na tela, verificamos se h� uma palavra ou par�grafo cujas tradu��es est�o sendo mostrados no momento
        //Se houver, "ressetamos" essas vari�veis para que as suas modais deixem de ser mostradas (nessa situa��o, o clique deve fechar as modais)
        if (props.wordToTranslate != "" || props.phraseToTranslate != "") {

            props.setWordToTranslate("")
            props.setPhraseToTranslate("")

        }

    }

    //Essa vari�vel e a fun��o abaixo s�o usadas para determinar quando o usu�rio d� um clique duplo na tela
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

            //Se o usu�rio acabou de selecionar texto, desconsideramos esse clique; caso contr�rio, chamamos onSinglePress()
            if (time - lastSelection.current > 400) {
                onSinglePress()
            }

            lastPress.current = time;

        }

    };

    //Chamada quando o usu�rio seleciona texto
    const onSelection = (data) => {

        //Atualizamos o tempo da �ltima sele��o
        const time = new Date().getTime();
        lastSelection.current = time;

        //De acordo com a posi��o do texto selecionado, devemos decidir onde posicionar a modal de modo a n�o atrapalhar a leitura
        let bottomPosition = data.coordinates["0"].bottom

        if ((bottomPosition + 0.3 * device.height) > (device.height - 80)) {
            props.setPositionTranslationModals("top");
        } else {
            props.setPositionTranslationModals("bottom");
        }

        content = data.selected;
        reWhiteSpace = new RegExp("\\s+");

        if (reWhiteSpace.test(content)) {

            //Se o conte�do selecionado tem mais que uma palavra:
            props.setPhraseToTranslate(content)
            props.setWordToTranslate("")

        } else {

            //Se o conte�do selecionado tem apenas uma palavra
            props.setWordToTranslate(content)
            props.setPhraseToTranslate("")

        };

    }

    //Salva os metadados do livro
    const saveMetadata = (bookKey, parsedData) => {
        LocalStorage.saveBookMetadata(bookKey, parsedData)
    }

    //Lida com as mensagens em formato JSON do c�digo executado na Webview
    function handleWebviewMessage(e) {

        let parsedData = JSON.parse(e.nativeEvent.data);

        if (parsedData.type == 'selected') {

            onSelection(parsedData)

        }

        if (parsedData.type == 'locations') {
            //Nesse caso "parsedData.locations" conter� as Locations do arquivo, �til para determinarmos a posi��o de cada p�gina (ainda n�o implementado)
        }

        if (parsedData.type == 'metadata') {

            console.log("im here", props.bookKey)
            saveMetadata(props.bookKey, parsedData)

        }

        return;

    }

    //Se o usu�rio deslizou para a direita, voltamos uma p�gina
    const onSwipeRight = (webview) => {

        if (props.currentPage > 0) {

            webview.current.injectJavaScript(`window.rendition.prev()`)
            props.setCurrentPage(props.currentPage - 1)

        }

    }

    //Se o usu�rio deslizou para a esquerda, vamos para a pr�xima p�gina
    const onSwipeLeft = (webview) => {

        if (props.currentPage < props.bookLength) {

            webview.current.injectJavaScript(`window.rendition.next()`)
            props.setCurrentPage(props.currentPage + 1)

        }

    }

    //Quando o n�mero da p�gina muda, atualizamos tamb�m o valor mostrado ao lado do slider
    //Por isso observamos mudan�as na vari�vel "props.currentPage" abaixo
    useEffect(() => {

        props.setSliderValue(props.currentPage);

    }, [props.currentPage]);

    return (
        <ReadBook navigation={props.navigation} onScreenPress={onScreenPress} handleWebviewMessage={handleWebviewMessage} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} showSlider={props.showSlider} sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} bookLength={props.bookLength} bookUrl={props.bookUrl} saveMetadata={props.saveMetadata} nativeLanguage = { props.nativeLanguage } />
        )
    
}

export default ReadBookController;