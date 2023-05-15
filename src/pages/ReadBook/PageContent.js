import { useRef } from 'react'
import { TouchableWithoutFeedback, Dimensions, View } from "react-native"
import { WebView } from 'react-native-webview'
import GestureRecognizer from 'react-native-swipe-gestures'
import webviewHtmlContent from './webviewHtmlContent'

const device = Dimensions.get("window")

const PageContent = (props) => {

    //Lida com as mensagens em formato JSON do código executado na Webview
    function handleMessage(e) {

        let parsedData = JSON.parse(e.nativeEvent.data);

        if (parsedData.type == 'selected') {

            props.onSelection(parsedData)
        }

        if (parsedData.type == 'locations') {
            //Nesse caso "parsedData.locations" conterá as Locations do arquivo, útil para determinarmos a posição de cada página (ainda não implementado)
        }

        return;

    }


    //Se o usuário deslizou para a direita, voltamos uma página
    const onSwipeRight = () => {
        if (props.currentPage > 0) {
            webview.current.injectJavaScript(`window.rendition.prev()`)
            props.setCurrentPage(props.currentPage - 1)
        }
    }
    
    //Se o usuário deslizou para a esquerda, vamos para a próxima página
    const onSwipeLeft = () => {
        if (props.currentPage < props.bookLength) {
            webview.current.injectJavaScript(`window.rendition.next()`)
            props.setCurrentPage(props.currentPage + 1)
        }
    }

    //Configurações para a detecção de quanto o usuário desliza para mudar de tela
    const swipeConfig = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const webview = useRef();

    //Essa variável guarda, em formato de texto, o conteúdo html a ser executado na Webview
    //Ela recebe a url em que o livro está sendo servido e o EpubCfi indicando a localização da página a ser mostrada (nesse caso, mostramos a página inicial)
    const htmlContent = webviewHtmlContent(props.bookUrl, 1)

    return (

        <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} config={swipeConfig}>

            <View style={{ height: device.height - 80, width: 800 }}>

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

        </GestureRecognizer>


    )

}


export default PageContent;