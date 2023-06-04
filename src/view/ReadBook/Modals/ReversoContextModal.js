import { View, Text, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

const device = Dimensions.get("window")

//Código em javascript para alterar o estilo
const INJECTEDJAVASCRIPT = `
const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=1');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta); `


const ReversoContextModal = (props) => {

    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/context.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Reverso Context </Text>
            </View>

            <View style={{ width: "90%", marginLeft: "5%", height: device.height * 0.35 - 72, marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <WebView

                    originWhitelist={['*']}
                    injectedJavaScript={INJECTEDJAVASCRIPT}
                    style={{ marginLeft: 7, marginTop: -190 }}
                    source={{
                        uri: "https://www.google.com/search?q="+props.contentToTranslate+"&tbm=isch" }}
                />
            </View>

            

        </View>

    )

}

export default ReversoContextModal;