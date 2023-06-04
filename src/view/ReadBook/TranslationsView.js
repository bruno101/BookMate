import { View, Dimensions, StyleSheet } from 'react-native'
import TranslationModal from './Modals/TranslationModal'
import DictionaryModal from './Modals/DictionaryModal'
import ReversoContextModal from './Modals/ReversoContextModal'
import Carousel from "react-native-reanimated-carousel";

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

    //No caso em que se clicou em uma palavra, mostramos "TranslationModal", "DictionaryModal" e "ReversoContextModal"

    const modals = [
        { modal: < TranslationModal contentToTranslate={props.wordToTranslate} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} translation={props.translation} /> },
        { modal: < DictionaryModal contentToTranslate={props.wordToTranslate} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} nativeLanguage={props.nativeLanguage} /> },
        { modal: < ReversoContextModal contentToTranslate={props.wordToTranslate} context={props.context} nativeLanguage={props.nativeLanguage} /> }
    ]

    const wordModals = (

        <View style={viewStyle}>

            <Carousel
                vertical={false}
                panGestureHandlerProps={{
                    activeOffsetX: [-70, 70],
                }}
                width={300}
                height={300}
                loop={false}
                style={{ width: "100%", height: device.height * 0.35 }}
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
                < TranslationModal contentToTranslate={props.phraseToTranslate} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} translation={props.translation} />
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
        height: device.height * 0.35,
        marginTop: -device.height * 0.36,
        flexDirection: "row",
        zIndex: 1
    },

    bottomModalsStyle: {
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.15,
        height: device.height * 0.33,
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
        height: device.height * 0.35,
        marginBottom: -device.height * 0.35,
        flexDirection: "row",
        zIndex: 1
    },

    topModalsStyle: {
        backgroundColor: "white",
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.15,
        height: device.height * 0.33,
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