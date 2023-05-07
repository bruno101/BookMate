import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import TranslationModal from './Modals/TranslationModal'
import DictionaryModal from './Modals/DictionaryModal'
import ReversoContextModal from './Modals/ReversoContextModal'

const device = Dimensions.get("window")

//Essa View, que a princípio fica na parte interior da tela, mostra as modais com informações sobre palavras/trechos quando é necessário
const TranslationsView = (props) => {

    if (props.positionTranslationModals == "bottom") {
        modalsStyle = styles.bottomModalsStyle
        viewStyle = styles.bottomViewStyle
    } else {
        modalsStyle = styles.topModalsStyle
        viewStyle = styles.topViewStyle
    }


    //No caso em que se clicou em uma palavra, chamamos "TranslationModal", "DictionaryModal" e "ReversoContextModal"
    const wordModals = (

        <ScrollView horizontal={true} style={viewStyle} showsHorizontalScrollIndicator={false}>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

            <View elevation={10} style={modalsStyle} >
                <TranslationModal contentToTranslate={props.wordToTranslate} />
            </View>

            <View elevation={10} style={modalsStyle} >
                <DictionaryModal word={props.wordToTranslate} />
            </View>

            <View elevation={10} style={modalsStyle} >
                <ReversoContextModal word={props.wordToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

        </ScrollView>

    )

    //No caso em que se tem uma frase para traduzir, mostramos apenas a "TranslationModal"
    const phraseTranslationModal = (

        <ScrollView horizontal={true} style={viewStyle} showsHorizontalScrollIndicator={false}>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

            <View elevation={10} style={modalsStyle} >
                <TranslationModal contentToTranslate={props.phraseToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

        </ScrollView>

    )

    //Se houver uma palavra para traduzir, mostramos "wordModals", se houver uma frase, mostramos "phraseTranslationModal"
    if (props.wordToTranslate != "") {
        return wordModals
    } else if (props.phraseToTranslate != "") {
        return phraseTranslationModal
    }
    return


}

const styles = StyleSheet.create({

    bottomViewStyle: {
        height: device.height * 0.3,
        marginTop: -device.height * 0.31,
        flexDirection: "row",
        zIndex: 1
    },

    bottomModalsStyle: {
        backgroundColor: "white",
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.02,
        height: device.height * 0.3,
        width: device.width * 0.7,
        backgroundColor: "white",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },

    topViewStyle: {
        height: device.height * 0.3,
        marginBottom: -device.height * 0.37,
        flexDirection: "row",
        zIndex: 1
    },

    topModalsStyle: {
        backgroundColor: "white",
        marginTop: device.height * 0.05,
        marginLeft: device.width * 0.02,
        height: device.height * 0.3,
        width: device.width * 0.7,
        backgroundColor: "white",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27
    }

})

export default TranslationsView;