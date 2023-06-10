import { BottomModal, ModalContent } from 'react-native-modals'
import { TouchableOpacity, Image, Text, View, Dimensions } from 'react-native'

const device = Dimensions.get("window")

const CustomBottomModal = (props) => {

    return (

        <BottomModal
            visible={props.showBottomModal}
            onTouchOutside={() => {
                props.setShowBottomModal(false)
            }}
            onSwipeOut={() => {
                props.setShowBottomModal(false)
            }}
        >

            <ModalContent style={{ backgroundColor: props.nightMode ? "#151d4a" : "white"}}>

                <View>

                    <View style={{ flexDirection: "row", height: 80, borderBottomColor: props.nightMode? "black" : "#EEEEEE", borderBottomWidth: 1.5, marginLeft: -20, width: device.width + 40 }}>

                        <Image source={{ uri: props.srcBookCover }} style={{ width: 50, marginLeft: 13, height: 70, marginLeft: 30, marginTop: -5 }} resizeMode="stretch" />

                        <View>

                            <Text style={{ color: props.nightMode? "white" : "black", fontSize: 17, fontWeight: "bold", marginLeft: 27 }}>

                                {props.title}
                            </Text>

                            <Text style={{ color: props.nightMode ? "white" : "#888888", fontSize: 12, marginLeft: 27 }}>

                                {props.author != "" ? "by " + props.author : ""}

                            </Text>

                        </View>

                    </View>

                    <TouchableOpacity style={{ height: 30, flexDirection: "row", marginBottom: 15, marginTop: 15, alignItems: 'center' }} onPressIn={() => props.shareBook(props.title, props.author)} >

                        <Image source={require('../../assets/share.png')} style={{ width: 30, aspectRatio: 1 }} resizeMode="stretch" />

                        <Text style={{ color: props.nightMode ? "white" : "#444444", fontSize: 14, fontWeight: "bold", marginLeft: 20, letterSpacing: 0.3 }}>
                            Recommend this book
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 30, flexDirection: "row", alignItems: 'center' }} onPressIn={() => props.setShowDeletionModal(true)} >

                        <Image source={require('../../assets/deleteBook.png')} style={{ width: 45, aspectRatio: 1, marginLeft: -10 }} resizeMode="stretch" />

                        <Text style={{ color: props.nightMode ? "white" : "#444444", fontSize: 14, fontWeight: "bold", marginLeft: 15, letterSpacing: 0.3 }}>
                            Remove from bookshelf
                        </Text>

                    </TouchableOpacity>

                </View>

            </ModalContent>

        </BottomModal>

        )

}

export default CustomBottomModal;