import { useRef } from 'react'
import { TouchableWithoutFeedback, Dimensions, View } from "react-native"
import { WebView } from 'react-native-webview';
import webviewHtmlContent from '../../utilities/webviewHtmlContent'

const device = Dimensions.get("window")

const PageContent = (props) => {

    //Chamada quando o usuário seleciona texto
    function onSelection(data) {

        //De acordo com a posição do texto selecionado, devemos decidir onde posicionar a modal de modo a não atrapalhar a leitura
        let bottomPosition = data.coordinates["0"].bottom

        if ((bottomPosition + 0.3*device.height) > (device.height - 80)) {
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

        };

    }

    //Lida com as mensagens em formato JSON do código executado na Webview
    function handleMessage(e) {

        let parsedData = JSON.parse(e.nativeEvent.data);

        if (parsedData.type == 'selected') {

            onSelection(parsedData)
        }

        if (parsedData.type == 'locations') {
            //Nesse caso "parsedData.locations" conterá as Locations do arquivo, útil para determinarmos a posição de cada página (ainda não implementado)
        }

        return;

    }

    const webview = useRef();

    //Essa variável guarda, em formato de texto, o conteúdo html a ser executado na Webview
    //Ela recebe a url em que o livro está sendo servido e o EpubCfi indicando a localização da página a ser mostrada (nesse caso, mostramos o início do terceiro capítulo, na Location "4")
    const htmlContent = webviewHtmlContent(props.bookUrl, 4)

    return (

        <View style={{ height: props.webviewHeight, width: 800 }}>

            <TouchableWithoutFeedback onPress={props.onPress}>

                <WebView
                    ref={webview}
                    originWhitelist={['*']}
                    source={{
                        html: htmlContent
                    }}
                    javaScriptEnabled={true}
                    javaScriptEnabledAndroid={true}
                    domStorageEnabled
                    mixedContentMode="always"
                    scalesPageToFit
                    onMessage={handleMessage}
                    automaticallyAdjustContentInsets={false}
                />

            </TouchableWithoutFeedback>


        </View>


    )

}


export default PageContent;