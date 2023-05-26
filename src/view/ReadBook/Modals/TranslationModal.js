import { View, ScrollView, Text, Image } from 'react-native'
import LanguagePicker from '../LanguagePicker'

const TranslationModal = (props) => {

    //Mostramos a tradução da palavra/trecho e um "DropDownPicker" em que o usuário pode alterar o idioma do qual se traduz
    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/translate.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Translation </Text>
            </View>


            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Translation of "{props.contentToTranslate}" in {props.translationLanguage.name} is "{props.translation}" </Text>

            </ScrollView>

            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}>Translate from: </Text>

                </View>

                <LanguagePicker selectedLanguage={props.translationLanguage} languages={props.supportedTranslationLanguages} setLanguage={props.setTranslationLanguage} />

            </View>

        </View>

    )

}

export default TranslationModal;