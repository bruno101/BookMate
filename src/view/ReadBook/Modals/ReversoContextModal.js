import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

const device = Dimensions.get("window")

//Código em javascript para remover elementos da página que não queremos mostrar e alterar o estilo
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

        </View>

    )

}

export default ReversoContextModal;