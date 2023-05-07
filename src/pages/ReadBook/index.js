import { useState, useEffect } from 'react'
import { View, Dimensions } from "react-native"
import TranslationsView from './TranslationsView'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import PageContent from './PageContent';
import CustomSlider from './CustomSlider';

const device = Dimensions.get("window")

const ReadBook = (props) => {

    //Armazena a palavra a ser traduzida (ou "", se não houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se não houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    const [currentPage, setCurrentPage] = useState(1)

    const [showSlider, setShowSlider] = useState(false)

    const [bookUrl, setBookUrl] = useState()

    //Vamos mostrar o arquivo epub do link abaixo para fins de exemplo
    //Nas próximas versões do projeto, em vez de fazermos o "download" do arquivo de um link, deveremos acessar os arquivos a partir sistema de arquivos do usuário
    const sampleEpubURL = "https://filesamples.com/samples/ebook/epub/Alices%20Adventures%20in%20Wonderland.epub"

    //Vamos salvar o arquivo no caminho abaixo
    const filePath = `${RNFS.DocumentDirectoryPath}/sampleEpub.epub`

    //Ao abrirmos a tela, chamamos "downloadSampleFile()"
    useEffect(() => {
        downloadSampleFile()
    }, [])

    const downloadSampleFile = async () => {

        //Se o arquivo já foi salvo anteriormente, apenas criamos o servidor estático
        if (await RNFS.exists(filePath)) {

            createStaticServer()

        } else {

            //Senão fazemos o download do arquivo e salvamos em "filePath" antes de criarmos o servidor estático
            RNFS.downloadFile({

                fromUrl: sampleEpubURL,
                toFile: filePath

            }).promise.then((r) => {

                console.log("File was downloaded.")
                createStaticServer()

            });

        }

    }

    //Essa função será útil quando precisarmos deletar o arquivo
    const deleteSampleFile = async () => {

        RNFS.unlink(filepath).then(() => {

            RNFS.scanFile(filepath);
            console.log("Deleted.")

        })

    }

    //Esse servidor permitirá acessarmos o arquivo localmente na "url" abaixo (nesse protótipo, não poderíamos acessar diretamente do link original devido à problemas com CORS )
    const createStaticServer = () => {

        let server = new StaticServer(8080, RNFS.DocumentDirectoryPath, { keepAlive: true });

        server.start().then(url => {

            console.log(url)
            setBookUrl(url + "/sampleEpub.epub")

        });

    }

    //Se o usuário dá um clique duplo, alternamos as versões da tela com ou sem o slider para mudança de página (para isso alteramos o estado descreenTapped)
    const onDoublePress = () => {
        setShowSlider(!showSlider);
    }

    const onSinglePress = () => {

        //Sempre que há um clique na tela, verificamos se há uma palavra ou parágrafo cujas traduções estão sendo mostrados no momento
        //Se houver, "ressetamos" essas variáveis para que as suas modais deixem de ser mostradas (nessa situação, o clique deve fechar as modais)
        if (wordToTranslate != "" || phraseToTranslate != "") {

            setWordToTranslate("")
            setPhraseToTranslate("")

        }

    }

    //Essa variável e a função abaixo são usadas para determinar quando o usuário dá um clique duplo na tela
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

    //Mostramos o conteúdo da página ("PageContent"), a "Translations View" (em que, se for necessário, são mostradas as modais com traduções etc.), e o Slider para mudança de página
    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            <PageContent bookUrl={bookUrl} onPress={onScreenPress} setWordToTranslate={setWordToTranslate} setPhraseToTranslate={setPhraseToTranslate} webviewHeight={showSlider ? device.height - 120 : device.height - 80} />

            <TranslationsView wordToTranslate={wordToTranslate} phraseToTranslate={phraseToTranslate} />

            {showSlider? < CustomSlider currentPage={currentPage} setCurrentPage={setCurrentPage} bookLength={100} /> : <View></ View>}

         </ View>

    )

}

export default ReadBook;