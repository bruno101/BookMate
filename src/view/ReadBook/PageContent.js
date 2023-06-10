import { TouchableWithoutFeedback, Dimensions, View } from "react-native"
import { WebView } from 'react-native-webview'
import GestureRecognizer from 'react-native-swipe-gestures'
import webviewHtmlContent from './webviewHtmlContent'

const device = Dimensions.get("window")

const PageContent = (props) => {

    //Configura��es para a detec��o de quanto o usu�rio desliza para mudar de tela
    const swipeConfig = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    //Essa vari�vel guarda, em formato de texto, o conte�do html a ser executado na Webview
    //Ela recebe a url em que o livro est� sendo servido, o EpubCfi indicando a localiza��o da p�gina a ser mostrada (nesse caso, mostramos a p�gina inicial) e um booleano indicando se os metadados do livro devem ser salvos
    const htmlContent = webviewHtmlContent(props.bookUrl, props.locations, props.initialPage, props.saveMetadata, props.nightMode, props.font)

    return (

        <GestureRecognizer onSwipeLeft={props.onSwipeLeft} onSwipeRight={props.onSwipeRight} config={swipeConfig}>

            <View style={{ height: device.height - 80, width: 800 }}>

                <TouchableWithoutFeedback onPress={props.onPress}>

                    <WebView
                        ref={props.webview}
                        originWhitelist={['*']}
                        source={{
                            html: htmlContent
                        }}
                        style={{ backgroundColor: props.nightMode? "#1d1f2b" : "white"}}
                        javaScriptEnabled={true}
                        javaScriptEnabledAndroid={true}
                        domStorageEnabled
                        mixedContentMode="always"
                        scalesPageToFit
                        onMessage={props.handleWebviewMessage}
                        automaticallyAdjustContentInsets={false}
                    />

                </TouchableWithoutFeedback>

            </View>

        </GestureRecognizer>


    )

}


export default PageContent;