import { useState } from 'react'
import { View, ScrollView, Text, Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

const device = Dimensions.get("window")

const TranslationModal = (props) => {

    //Essas variáveis são usadas pelo DropDownPicker
    const [open, setOpen] = useState(false);
    const [languageChosen, setLanguageChosen] = useState("en");
    const languages = [
        { label: 'Chinese', value: 'zh' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' }
    ];

    //Mostramos a tradução da palavra/trecho e um "DropDownPicker" em que o usuário pode alterar o idioma do qual se traduz
    return (

        <View style={{ flex: 1 }}>

            <Text style={{ color: "black", fontSize: 20, marginLeft: 5, marginTop: 10 }} > Translation </Text>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Translation of: {props.contentToTranslate} </Text>

            </ScrollView>

            <View style={{ height: 40, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", width: 120 }} >

                    <Text style={{ color: "black", marginLeft: 20, fontSize: 13 }}>Translate from: </Text>

                </View>

                <DropDownPicker
                    style={{
                        marginTop: 5,
                        minHeight: 30,
                        width: device.width * 0.7 - 160,
                        marginLeft: 15,
                        backgroundColor: "#E1E1E1",
                        borderWidth: 0,
                        borderRadius: 0
                    }}
                    textStyle={{
                        fontSize: 13
                    }}
                    maxHeight={300}
                    open={open}
                    value={languageChosen}
                    items={languages}
                    setOpen={setOpen}
                    setValue={setLanguageChosen}
                />

            </View>

        </View>

    )

}

export default TranslationModal;