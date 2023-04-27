import { View, ScrollView, Dimensions } from 'react-native'
import TranslationModal from './TranslationModal'
import DictionaryModal from './DictionaryModal'
import ReversoContextModal from './ReversoContextModal'

const device = Dimensions.get("window")

const WordModals = (props) => {

    modalStyle = {
        backgroundColor: "white",
        height: device.height * 0.3,
        width: device.width * 0.7,
        backgroundColor: "white",
        shadowColor: "#000000"
    }


    //Abaixo são chamadas as modais que devem ser mostradas
    return (

        <ScrollView horizontal={true} style={{ height: device.height * 0.3, marginTop: -device.height * 0.3 }} showsHorizontalScrollIndicator={false}>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

            <View elevation={40} style={modalStyle} >
                <TranslationModal contentToTranslate={props.wordToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.02 }}></View>

            <View elevation={40} style={modalStyle} >
                <DictionaryModal word={props.wordToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.02 }}></View>

            <View elevation={40} style={modalStyle} >
                <ReversoContextModal word={props.wordToTranslate} />
            </View>

            <View style={{ opacity: 0, width: device.width * 0.1 }}></View>

        </ScrollView>

    )

}

export default WordModals;