import { Modal, ModalContent, ModalTitle } from 'react-native-modals';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'

const device = Dimensions.get("window")

//Modal que pede a confirmação do usuário de que ele quer deletar o livro
const BookDeletionModal = (props) => {

    return (

        <View>

            <Modal
                visible={props.showModal}
                modalTitle={

                    <ModalTitle
                        style={{ backgroundColor: props.nightMode ? "#151d4a" : "white", padding: 15, borderColor: props.nightMode ? "black" : "#DDDDDD" }}
                        textStyle={{ marginLeft: 10, fontSize: 17, color: props.nightMode ? "white" : "black" }}
                        title="Remove from bookshelf?"
                        align="left"
                    />

                }
            >

                <ModalContent
                    style={{ backgroundColor: props.nightMode ? "#151d4a" : 'white' }}
                >

                    <View style={{ width: device.width - 80 }}>

                        <Text style={{ color: props.nightMode? "white" : "#888888", fontSize: 14, marginTop: 20, marginLeft: 10, lineHeight: 20 }}>

                            {`The book "${props.title}"${ props.author != "" ? ' by "' + props.author + '"' : "" } will no longer be listed on your bookshelf`}

                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 20 }}>

                            <TouchableOpacity
                                onPressIn={() => { props.setShowModal(false); props.setShowBottomModal(false) }}
                                style={{ backgroundColor: props.nightMode ? "#1d1f2b" : "white", borderColor: props.nightMode? "black" : "#DDDDDD", borderWidth: 1, borderRadius: 5, marginLeft: 10, width: 110, height: 37, justifyContent: "center" }}
                            >

                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "500",
                                        alignSelf: 'center',
                                        color: props.nightMode? "white" : "#0096FF",
                                        letterSpacing: 0.4
                                    }}>

                                    Cancel

                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPressIn={() => { props.deleteBook(props.bookKey, props.fileName); props.setShowModal(false); props.setShowBottomModal(false) }}
                                style={{ backgroundColor: "#0096FF", borderColor: props.nightMode? "black" : "#DDDDDD", borderWidth: 1, borderRadius: 5, marginLeft: 10, width: device.width - 230, height: 37, justifyContent: "center" }}
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