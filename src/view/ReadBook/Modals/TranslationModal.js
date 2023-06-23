import { View, Dimensions, Text, Image, ScrollView } from 'react-native'
import LanguagePicker from '../LanguagePicker'

const device = Dimensions.get("window")

const TranslationModal = (props) => {

    //Mostramos a tradução da palavra/trecho e um "DropDownPicker" em que o usuário pode alterar o idioma do qual se traduz
    return (

        <View style={{ flex: 1, backgroundColor: props.nightMode ? "#151d4a" : "white" }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/translate.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: props.nightMode? "white" : "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Translation </Text>
            </View>

            <View style={{ backgroundColor: props.nightMode ? "#151d4a" : "#F4F7FE", width: "90%", marginLeft: "5%", height: device.height * 0.35 - 75, marginTop: 5, borderColor: props.nightMode? "black" : "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>

                <View style={{ height: 40, flexDirection: "row", backgroundColor: props.nightMode ? "#151d4a" : "white", borderBottomColor: "#E5E5E5", borderBottomWidth: props.nightMode? 0.5: 0 }}>
                    <View style={{ width: "45%", justifyContent: "center" }}><LanguagePicker selectedLanguage={props.translationSourceLanguage} languages={props.supportedTranslationSourceLanguages} setLanguage={props.setTranslationSourceLanguage} showArrow={false} nightMode={props.nightMode} /></View>
                    <View style={{ width: "10%", justifyContent: "center" }}>
                        <Image source={require("../../../assets/exchange.png")} style={{ height: 15, aspectRatio: 1 }} />
                    </View>
                    <View style={{ width: "45%", justifyContent: "center" }}><LanguagePicker selectedLanguage={props.translationTargetLanguage} languages={props.supportedTranslationTargetLanguages} setLanguage={props.setTranslationTargetLanguage} showArrow={false} nightMode={props.nightMode}/></View>
                </View>

                {

                    props.translation.length < 200 ?

                        <View style={{ backgroundColor: props.nightMode ? "#151d4a" : "#F4F7FE", height: device.height * 0.35 - 155 }}>
                            <Text style={{ fontSize: 20, paddingLeft: 15, paddingRight: 15, marginTop: 5, color: props.nightMode ? "white" : "black" }} adjustsFontSizeToFit>
                                {props.translation}
                            </Text>
                            <Text style={{ fontSize: 11, marginLeft: 15, marginTop: 10, color: props.nightMode ? "white" : "#808080" }} adjustsFontSizeToFit>
                                Translated from {props.detectedLanguage} by Google Translate. Visit translate.google.com.
                            </Text>
                        </View>

                   :

                        <ScrollView style={{ backgroundColor: props.nightMode ? "#151d4a" : "#F4F7FE", height: device.height * 0.35 - 118 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 15, paddingRight: 15, marginTop: 5, color: props.nightMode ? "white" : "black" }}>
                                {props.translation}
                            </Text>
                            <Text style={{ fontSize: 12, marginLeft: 15, marginTop: 10, color: props.nightMode ? "white" : "#808080" }}>
                                Translated from {props.detectedLanguage} by Google Translate. Visit translate.google.com.
                            </Text>
                        </ScrollView>


                }
                

            </View>

        </View>

    )

}

export default TranslationModal;