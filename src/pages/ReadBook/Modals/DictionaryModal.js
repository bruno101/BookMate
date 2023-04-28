import { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import LanguagePicker from '../../../components/LanguagePicker'

const DictionaryModal = (props) => {

    //Essa vari�vel � usada pelo LanguagePicker
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

    const [dictionaryLanguage, setDictionaryLanguage] = useState(nativeLanguage.code)

    //Mostramos o significado da palavra e um "DropDownPicker" em que o usu�rio pode alterar o idioma do dicion�rio
    return (

        <View style={{ flex: 1 }}>

            <Text style={{ color: "black", fontSize: 20, marginLeft: 5, marginTop: 10 }} > Dictionary </Text>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Show definition in {dictionaryLanguage} of the word {props.word} </Text>

            </ScrollView>

            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}>Language: </Text>

                </View>

                <LanguagePicker selectedLanguage={dictionaryLanguage} languages={supportedLanguages} setLanguage={setDictionaryLanguage} />

            </View>



        </View>

    )

}

export default DictionaryModal;