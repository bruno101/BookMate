import { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import CustomBottomModal from './CustomBottomModal'
import BookDeletionModal from './BookDeletionModal'

//Corresponde a cada livro da biblioteca do usuário
const Book = (props) => {

    const [showBottomModal, setShowBottomModal] = useState(false)
    const [showDeletionModal, setShowDeletionModal] = useState(false)

    //Essa função leva o usuário para a tela de leitura de livros
    const onPress = () => {
        props.navigation.navigate('ReadBook', { bookKey: props.bookKey })
    }

    const onLongPress = () => {
        //Abre a modal que oferece a opção de editar ou deletar o livro
        setShowBottomModal(true)
    }

    return (

        //O livro é clicável; o clique chama a função "readBook"; um clique longo abre a modal "CustomBottomModal"
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={{ width: "44%", marginRight: "5%", marginBottom: "4%" }}>

            <View>

                <Image source={{ uri: props.srcBookCover }}
                    style={{ width: "100%", aspectRatio: 0.7 }}
                    resizeMode="stretch"
                />

                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft: "7%", paddingRight: "7%" }}> {props.title} </Text>
                <Text style={{ textAlign: 'center', color: 'black', color: '#2f354b', fontSize: 13 }}> by {props.author} </Text>

            </View>

            <BookDeletionModal showModal={showDeletionModal} setShowModal={setShowDeletionModal} setShowBottomModal={setShowBottomModal} bookKey={props.bookKey} title={props.title} author={props.author} />
            <CustomBottomModal showBottomModal={showBottomModal} setShowBottomModal={setShowBottomModal} setShowDeletionModal={setShowDeletionModal} bookKey={props.bookKey} title={props.title} author={props.author} srcBookCover={props.srcBookCover}/>

        </TouchableOpacity>

    )

}

export default Book;