import { BottomModal, ModalContent } from 'react-native-modals'
import { TouchableOpacity, Image, Text, View, Share, Alert, Dimensions } from 'react-native'

const device = Dimensions.get("window")

const CustomBottomModal = (props) => {

    //Deve permitir compartilhar o livro
    const shareBook = async () => {

        try {

            await Share.share({
                message:
                    `Hey there! \nI think you might enjoy the book "${props.title}" by "${props.author}". \nYou can read it on BookMate with simultaneous translation. \nDon't miss out!`,
            })

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    //Deve deletar o livro
    const deleteBook = () => {
        props.setShowDeletionModal(true)
    }

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

            <ModalContent>

                <View>

                    <View style={{ flexDirection: "row", height: 80, borderBottomColor: "#EEEEEE", borderBottomWidth: 1.5, marginLeft: -20, width: device.width + 40 }}>

                        <Image source={{ uri: props.srcBookCover }} style={{ width: 50, marginLeft: 13, height: 70, marginLeft: 30, marginTop: -5 }} resizeMode="stretch" />

                        <View>

                            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold", marginLeft: 27 }}>

                                {props.title}
                            </Text>

                            <Text style={{ color: "#888888", fontSize: 12, marginLeft: 27 }}>

                                by {props.author}

                            </Text>

                        </View>

                    </View>

                    <TouchableOpacity style={{ height: 30, flexDirection: "row", marginBottom: 15, marginTop: 15, alignItems: 'center' }} onPressIn={shareBook} >

                        <Image source={require('../../assets/share.png')} style={{ width: 30, aspectRatio: 1 }} resizeMode="stretch" />

                        <Text style={{ color: "#444444", fontSize: 14, fontWeight: "bold", marginLeft: 20, letterSpacing: 0.3 }}>
                            Recommend this book
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 30, flexDirection: "row", alignItems: 'center' }} onPressIn={deleteBook} >

                        <Image source={require('../../assets/deleteBook.png')} style={{ width: 45, aspectRatio: 1, marginLeft: -10 }} resizeMode="stretch" />

                        <Text style={{ color: "#444444", fontSize: 14, fontWeight: "bold", marginLeft: 15, letterSpacing: 0.3 }}>
                            Remove from bookshelf
                        </Text>

                    </TouchableOpacity>

                </View>

            </ModalContent>

        </BottomModal>

        )

}

export default CustomBottomModal;