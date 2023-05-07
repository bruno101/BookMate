import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import TranslationModal from './Modals/TranslationModal'
import DictionaryModal from './Modals/DictionaryModal'
import ReversoContextModal from './Modals/ReversoContextModal'

const device = Dimensions.get("window")

//Essa View, que a princípio fica na parte interior da tela, mostra as modais com informações sobre palavras/trechos quando é necessário
const TranslationsView = (props) => {


    //No caso em que se clicou em uma palavra, chamamos "TranslationModal", "DictionaryModal" e "ReversoContextModal"
    const wordModals = (

        <ScrollView horizontal={true} style={{ height: device.height * 0.3, marginTop: -device.height * 0.4 }} showsHorizontalScrollIndicator={false}>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

            <View elevation={40} style={styles.modalsStyle} >
                <TranslationModal contentToTranslate={props.wordToTranslate} />
            </View>

            <View elevation={40} style={styles.modalsStyle} >
                <DictionaryModal word={props.wordToTranslate} />
            </View>

            <View elevation={40} style={styles.modalsStyle} >
                <ReversoContextModal word={props.wordToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

        </ScrollView>

    )

    //No caso em que se tem uma frase para traduzir, mostramos apenas a "TranslationModal"
    const phraseTranslationModal = (

        <View style={{ height: device.height * 0.3, marginTop: -device.height * 0.4, marginLeft: device.width * 0.15 }}>

            <View elevation={40} style={styles.modalsStyle} >
                <TranslationModal contentToTranslate={props.phraseToTranslate} />
            </View>

        </View>

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

    modalsStyle: {
        backgroundColor: "white",
        marginTop: device.height * 0.1,
        marginLeft: device.width * 0.02,
        height: device.height * 0.3,
        width: device.width * 0.7,
        backgroundColor: "white",
        shadowColor: "#000000"
    }

})

export default TranslationsView;