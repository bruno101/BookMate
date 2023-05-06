import { useState, useEffect } from 'react'
import { View } from "react-native"
import TranslationsView from './TranslationsView'
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import PageContent from './PageContent';

const ReadBook = (props) => {

    const [bookUrl, setBookUrl] = useState()

    //Vamos mostrar o arquivo epub do link abaixo para fins de exemplo
    //Nas pr�ximas vers�es do projeto, em vez de fazermos o "download" do arquivo de um link, deveremos acessar os arquivos a partir sistema de arquivos do usu�rio
    sampleEpubURL = "https://filesamples.com/samples/ebook/epub/Alices%20Adventures%20in%20Wonderland.epub"

    //Ao abrirmos a tela, chamamos "downloadSampleFile()"
    useEffect(() => {
        downloadSampleFile()
    }, [])

    //Vamos salvar o arquivo no caminho abaixo
    filePath = `${RNFS.DocumentDirectoryPath}/sampleEpub.epub`

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

    //Armazena a palavra a ser traduzida (ou "", se n�o houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se n�o houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    const onPress = () => {

        //Sempre que h� um clique na tela, verificamos se h� uma palavra ou par�grafo cujas tradu��es est�o sendo mostrados no momento
        //Se houver, "ressetamos" essas vari�veis para que as suas modais deixem de ser mostradas (nessa situa��o, o clique deve fechar as modais)
        if (wordToTranslate != "" || phraseToTranslate != "") {

            setWordToTranslate("")
            setPhraseToTranslate("")

        }

    };

    //Mostramos o conte�do da p�gina ("PageContent"), a "Translations View" (em que, se for necess�rio, s�o mostradas as modais com tradu��es etc.)
    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            <PageContent bookUrl={bookUrl} onPress={onPress} setWordToTranslate={setWordToTranslate} setPhraseToTranslate={setPhraseToTranslate} />

            <TranslationsView wordToTranslate={wordToTranslate} phraseToTranslate={phraseToTranslate} />

         </ View>

    )

}

export default ReadBook;