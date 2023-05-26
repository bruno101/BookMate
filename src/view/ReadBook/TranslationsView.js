import { View, Dimensions, StyleSheet } from 'react-native'
import TranslationModal from './Modals/TranslationModal'
import DictionaryModal from './Modals/DictionaryModal'
import ReversoContextModal from './Modals/ReversoContextModal'
import Carousel from "react-native-reanimated-carousel";

const device = Dimensions.get("window")

//Essa View, que a princ�pio fica na parte interior da tela, mostra as modais com informa��es sobre palavras/trechos quando � necess�rio
const TranslationsView = (props) => {

    if (props.positionTranslationModals == "bottom") {
        modalsStyle = styles.bottomModalsStyle
        viewStyle = styles.bottomViewStyle
    } else {
        modalsStyle = styles.topModalsStyle
        viewStyle = styles.topViewStyle
    }

    //No caso em que se clicou em uma palavra, mostramos "TranslationModal", "DictionaryModal" e "ReversoContextModal"

    const modals = [
        { modal: < TranslationModal contentToTranslate={props.wordToTranslate} translationLanguage={props.translationLanguage} setTranslationLanguage={props.setTranslationLanguage} supportedTranslationLanguages={props.supportedTranslationLanguages} translation={props.translation} /> },
        { modal: < DictionaryModal contentToTranslate={props.wordToTranslate} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} /> },
        { modal: < ReversoContextModal contentToTranslate={props.wordToTranslate} nativeLanguage={props.nativeLanguage} /> }
    ]

    const wordModals = (

        <View style={viewStyle}>

            <Carousel
                vertical={false}
                width={300}
                height={300}
                loop={false}
                style={{ width: "100%", height: device.height * 0.3 }}
                autoPlay={false}
                data={modals}
                pagingEnabled={true}
                renderItem={({ item }) => (

                    <View elevation={10} style={modalsStyle}>
                        {item.modal}
                    </View>

                    )}        
            />

        </View>

    )

    //No caso em que se tem uma frase para traduzir, mostramos apenas a "TranslationModal"
    const phraseTranslationModal = (

        <View style={viewStyle}>

            <View elevation={10} style={modalsStyle} >
                <TranslationModal contentToTranslate={props.phraseToTranslate} translationLanguage={props.translationLanguage} setTranslationLanguage={props.setTranslationLanguage} supportedTranslationLanguages={props.supportedTranslationLanguages} translation={props.translation} />
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

    bottomViewStyle: {
        height: device.height * 0.30,
        marginTop: -device.height * 0.31,
        flexDirection: "row",
        zIndex: 1
    },

    bottomModalsStyle: {
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.15,
        height: device.height * 0.28,
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
        height: device.height * 0.30,
        marginBottom: -device.height * 0.30,
        flexDirection: "row",
        zIndex: 1
    },

    topModalsStyle: {
        backgroundColor: "white",
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.15,
        height: device.height * 0.28,
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