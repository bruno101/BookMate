import { View, Text, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';
import LanguagePicker from '../LanguagePicker'

const device = Dimensions.get("window")

const DictionaryModal = (props) => {

    //Código em javascript para remover elementos da página que não queremos mostrar e alterar o estilo
    const INJECTEDJAVASCRIPT = `arr = document.querySelectorAll('.header-container');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
arr = document.querySelectorAll('.pre-content');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
arr = document.querySelectorAll('.floatright');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
arr = document.querySelectorAll('.noprint');
for (i = 0; i < arr.length; i++) {arr[i].style.display = 'none'}
const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=1');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta); `


    //Mostramos o significado da palavra e um "DropDownPicker" em que o usuário pode alterar o idioma do dicionário
    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/dictionaryLookup.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Dictionary </Text>
            </View>

            <View style={{ width: "90%", marginLeft: "5%", height: device.height*0.35-110, marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <WebView

                    originWhitelist={['*']}
                    injectedJavaScript={INJECTEDJAVASCRIPT}
                    style={{ marginLeft: 7, marginTop: 5 }}
                    source={{ uri: "https://" + props.dictionaryLanguage+".wiktionary.org/wiki/"+props.contentToTranslate.toLowerCase() }}
                />
            </View>

            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}>Language: </Text>

                </View>

                <LanguagePicker selectedLanguage={props.dictionaryLanguage} languages={props.supportedDictionaryLanguages} setLanguage={props.setDictionaryLanguage} />

            </View>

        </View>

    )

}

export default DictionaryModal;