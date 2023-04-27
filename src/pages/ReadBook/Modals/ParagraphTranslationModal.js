import { View, Dimensions } from 'react-native'
import TranslationModal from './TranslationModal'

const device = Dimensions.get("window")

const ParagraphTranslationModal = (props) => {

    modalStyle = {
        backgroundColor: "white",
        height: device.height * 0.3,
        width: device.width * 0.7,
        backgroundColor: "white",
        shadowColor: "#000000",
        height: device.height * 0.3,
        marginTop: -device.height * 0.3,
        marginLeft: device.width * 0.15
    }

    //Abaixo chamamos a componente TranslationModal
    return (

         <View elevation={40} style={modalStyle} >
             <TranslationModal contentToTranslate={props.paragraphToTranslate} />
         </View>

    )

}

export default ParagraphTranslationModal;