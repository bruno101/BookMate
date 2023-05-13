import { useState, useEffect } from 'react'
import { View, Dimensions } from "react-native"
import TranslationsView from './TranslationsView'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import PageContent from './PageContent';
import CustomSlider from './CustomSlider';

const ReadBook = ({ navigation }) => {

    //N�o exibimos a barra inferior
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, []);

    //Armazena a palavra a ser traduzida (ou "", se n�o houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se n�o houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    //Define em que posi��o das telas as modais com as tradu��es devem aparecer ("bottom" ou "top")
    const [positionTranslationModals, setPositionTranslationModals] = useState("bottom")

    const [currentPage, setCurrentPage] = useState(1)

    const [showSlider, setShowSlider] = useState(false)

    const [bookUrl, setBookUrl] = useState()

    //Vamos mostrar o arquivo epub do link abaixo para fins de exemplo
    //Nas pr�ximas vers�es do projeto, em vez de fazermos o "download" do arquivo de um link, deveremos acessar os arquivos a partir sistema de arquivos do usu�rio
    const sampleEpubURL = "https://filesamples.com/samples/ebook/epub/Alices%20Adventures%20in%20Wonderland.epub"

    //Vamos salvar o arquivo no caminho abaixo
    const filePath = `${RNFS.DocumentDirectoryPath}/sampleEpub.epub`

    //Ao abrirmos a tela, chamamos "downloadSampleFile()"
    useEffect(() => {
        downloadSampleFile()
    }, [])

    const downloadSampleFile = async () => {

        //Se o arquivo j� foi salvo anteriormente, apenas criamos o servidor est�tico
        if (await RNFS.exists(filePath)) {

            createStaticServer()

        } else {

            //Sen�o fazemos o download do arquivo e salvamos em "filePath" antes de criarmos o servidor est�tico
            RNFS.downloadFile({

                fromUrl: sampleEpubURL,
                toFile: filePath

            }).promise.then((r) => {

                console.log("File was downloaded.")
                createStaticServer()

            });

        }

    }

    //Essa fun��o ser� �til quando precisarmos deletar o arquivo
    const deleteSampleFile = async () => {

        RNFS.unlink(filepath).then(() => {

            RNFS.scanFile(filepath);
            console.log("Deleted.")

        })

    }

    //Esse servidor permitir� acessarmos o arquivo localmente na "url" abaixo (nesse prot�tipo, n�o poder�amos acessar diretamente do link original devido � problemas com CORS )
    const createStaticServer = () => {

        let server = new StaticServer(8080, RNFS.DocumentDirectoryPath, { keepAlive: true });

        server.start().then(url => {

            console.log(url)
            setBookUrl(url + "/sampleEpub.epub")

        });

    }

    //Se o usu�rio d� um clique duplo, alternamos as vers�es da tela com ou sem o slider para mudan�a de p�gina
    const onDoublePress = () => {
        setShowSlider(!showSlider);
    }

    const onSinglePress = () => {

        //Sempre que h� um clique na tela, verificamos se h� uma palavra ou par�grafo cujas tradu��es est�o sendo mostrados no momento
        //Se houver, "ressetamos" essas vari�veis para que as suas modais deixem de ser mostradas (nessa situa��o, o clique deve fechar as modais)
        if (wordToTranslate != "" || phraseToTranslate != "") {

            setWordToTranslate("")
            setPhraseToTranslate("")

        }

    }

    //Essa vari�vel e a fun��o abaixo s�o usadas para determinar quando o usu�rio d� um clique duplo na tela
    let lastPress = 0;

    const onScreenPress = () => {

        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;

        if (delta < DOUBLE_PRESS_DELAY) {
            //Detectado um clique duplo
            onDoublePress()
        } else {
            onSinglePress()
            lastPress = time;
        }

    };

    //Mostramos o conte�do da p�gina ("PageContent"), a "Translations View" (em que, se for necess�rio, s�o mostradas as modais com tradu��es etc.), e o Slider para mudan�a de p�gina
    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            {positionTranslationModals == "top" ? <TranslationsView wordToTranslate={wordToTranslate} phraseToTranslate={phraseToTranslate} positionTranslationModals={positionTranslationModals} /> : <View></View>}

            <PageContent bookUrl={bookUrl} onPress={onScreenPress} currentPage={currentPage} setCurrentPage={setCurrentPage} bookLength={100} setWordToTranslate={setWordToTranslate} setPhraseToTranslate={setPhraseToTranslate} setPositionTranslationModals={setPositionTranslationModals}/>

            {positionTranslationModals == "bottom" ? <TranslationsView wordToTranslate={wordToTranslate} phraseToTranslate={phraseToTranslate} positionTranslationModals={positionTranslationModals} /> : <View></View>}

            {showSlider? < CustomSlider currentPage={currentPage} setCurrentPage={setCurrentPage} bookLength={100} /> : <View></ View>}

         </ View>

    )

}

export default ReadBook;