import { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import LanguagePicker from '../../../components/LanguagePicker'

const TranslationModal = (props) => {

    //Essa variável é usada pelo LanguagePicker
    const supportedLanguages = [
        { label: 'Arabic', value: 'ar' },
        { label: 'Chinese', value: 'zh' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Turkish', value: 'tr' },
    ];

    const [translationLanguage, setTranslationLanguage] = useState("Detected language")

    //Mostramos a tradução da palavra/trecho e um "DropDownPicker" em que o usuário pode alterar o idioma do qual se traduz
    return (

        <View style={{ flex: 1 }}>

            <Text style={{ color: "black", fontSize: 20, marginLeft: 5, marginTop: 10 }} > Translation </Text>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Translation of "{props.contentToTranslate}" in {translationLanguage} </Text>

            </ScrollView>

            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}>Translate from: </Text>

                </View>

                <LanguagePicker selectedLanguage={translationLanguage} languages={supportedLanguages} setLanguage={setTranslationLanguage} />

            </View>

        </View>

    )

}

export default TranslationModal;