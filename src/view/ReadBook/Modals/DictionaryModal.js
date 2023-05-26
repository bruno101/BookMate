import { View, ScrollView, Text, Image } from 'react-native'
import LanguagePicker from '../LanguagePicker'

const DictionaryModal = (props) => {

    //Mostramos o significado da palavra e um "DropDownPicker" em que o usuário pode alterar o idioma do dicionário
    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/dictionaryLookup.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Dictionary </Text>
            </View>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Definition in {props.dictionaryLanguage.name} of the word {props.contentToTranslate} is {props.definition} </Text>

            </ScrollView>

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