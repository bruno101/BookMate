import { Modal, ModalContent, ModalTitle } from 'react-native-modals';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'

const device = Dimensions.get("window")

//Modal que pede a confirmação do usuário de que ele quer deletar o livro
const BookDeletionModal = (props) => {

    const deleteBook = () => {
        //Deve deletar o livro de chave "props.bookKey"
    }

    return (

        <View>

            <Modal
                visible={props.showModal}
                modalTitle={

                    <ModalTitle
                        style={{ backgroundColor: "white", padding: 15 }}
                        textStyle={{ marginLeft: 10, fontSize: 17}}
                        title="Remove from bookshelf?"
                        align="left"
                    />

                }
            >

                <ModalContent
                    style={{ backgroundColor: '#fff' }}
                >

                    <View style={{ width: device.width - 80 }}>

                        <Text style={{ color: "#888888", fontSize: 14, marginTop: 20, marginLeft: 10, lineHeight: 20 }}>

                            {`The book "${props.title}" by "${props.author}" will no longer be listed on your bookshelf`}

                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 20 }}>

                            <TouchableOpacity
                                onPressIn={() => { props.setShowModal(false); props.setShowBottomModal(false) }}
                                style={{ backgroundColor: "white", borderColor: "#DDDDDD", borderWidth: 1, borderRadius: 5, marginLeft: 10, width: 110, height: 37, justifyContent: "center" }}
                            >

                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "500",
                                        alignSelf: 'center',
                                        color: "#0096FF",
                                        letterSpacing: 0.4
                                    }}>

                                    Cancel

                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPressIn={() => { deleteBook(); props.setShowModal(false); props.setShowBottomModal(false) }}
                                style={{ backgroundColor: "#0096FF", borderColor: "#DDDDDD", borderWidth: 1, borderRadius: 5, marginLeft: 10, width: device.width - 230, height: 37, justifyContent: "center" }}
                            >

                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "500",
                                        alignSelf: 'center',
                                        color: "white",
                                        letterSpacing: 0.4
                                    }}>

                                    Confirm

                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </ModalContent>

            </Modal>

        </View>

        )

}

export default BookDeletionModal;