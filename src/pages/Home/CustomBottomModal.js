import { BottomModal, ModalContent } from 'react-native-modals'
import { TouchableOpacity, Image, Text, View } from 'react-native'


const CustomBottomModal = (props) => {

    //Deve permitir editar os metadados do livro
    const editBook = () => {

    }

    //Deve deletar o livro
    const deleteBook = () => {

    }

    return (

        <BottomModal
            visible={props.showModal}
            onTouchOutside={() => {
                props.setShowModal(false)
            }}
        >

            <ModalContent>

                <View>

                    <TouchableOpacity style={{ height: 40, flexDirection: "row", marginBottom: 15, alignItems: 'center' }} onPress={editBook} >

                        <Image source={require('../../assets/editBook.png')} style={{ width: 40, marginLeft: 13, aspectRatio: 1 }} resizeMode="stretch" />

                        <Text style={{ color: "black", fontSize: 17, fontWeight: "bold", marginLeft: 27 }}>
                            Edit
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 40, flexDirection: "row", alignItems: 'center' }} onPress={deleteBook} >

                        <Image source={require('../../assets/deleteBook.png')} style={{ width: 60, aspectRatio: 1 }} resizeMode="stretch" />

                        <Text style={{ color: "black", fontSize: 17, fontWeight: "bold", marginLeft: 20 }}>
                            Delete
                        </Text>

                    </TouchableOpacity>

                </View>

            </ModalContent>

        </BottomModal>

        )

}

export default CustomBottomModal;