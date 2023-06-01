import { View, Dimensions, Text, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import LanguagePicker from '../LanguagePicker'

const device = Dimensions.get("window")

//Código em javascript para alterar o estilo da página mostrada na webview
const INJECTEDJAVASCRIPT = `arr = document.getElementsByClassName('nav-tabs');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
arr = document.getElementsByClassName('textbox textbox_name_source');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
arr = document.getElementsByClassName('translation');
for (i = 0; i < arr.length; i++) {arr[i].style.maxHeight = "500px"}
const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=1');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta); `

const TranslationModal = (props) => {

    //Mostramos a tradução da palavra/trecho e um "DropDownPicker" em que o usuário pode alterar o idioma do qual se traduz
    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/translate.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Translation </Text>
            </View>

            <View style={{ width: "90%", marginLeft: "5%", height: device.height * 0.35 - 75, marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <WebView

                    originWhitelist={['*']}
                    injectedJavaScript={INJECTEDJAVASCRIPT}
                    style={{ marginLeft: -7, marginRight: -7, marginTop: -48 }}
                    source={{
                        uri: "https://translate.yandex.com/en/?source_lang=" + (props.translationLanguage ? "auto" : "en") + "&target_lang=" + props.nativeLanguage.code + "&text=" + props.contentToTranslate
                    }}
                />
            </View>

        </View>

    )

}

/* <View style={{ width: "90%", marginLeft: "5%", height: device.height * 0.35 - 75, marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <WebView

                    originWhitelist={['*']}
                    injectedJavaScript={INJECTEDJAVASCRIPT}
                    style={{ marginLeft: -7, marginRight: -7, marginTop: -48 }}
                    source={{
                        uri: "https://translate.yandex.com/en/?source_lang=" + (props.translationLanguage ? "auto" : "en")  + "&target_lang=" + props.nativeLanguage.code + "&text=" + props.contentToTranslate
                    }}
                />
            </View>*/

/*<View style={{ width: "90%", marginLeft: "5%", height: device.height * 0.35 - 110, marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}> {props.translation} </Text>
            </View>


            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 15, fontSize: 13 }}> Translate from: </Text>

                </View>

                    <LanguagePicker selectedLanguage={props.translationLanguage} languages={props.supportedTranslationLanguages} setLanguage={props.setTranslationLanguage} />


            </View>*/

export default TranslationModal;