import { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import CustomBottomModal from './CustomBottomModal'
import BookDeletionModal from './BookDeletionModal'

//Corresponde a cada livro da biblioteca do usuário
const Book = (props) => {

    const [showBottomModal, setShowBottomModal] = useState(false)
    const [showDeletionModal, setShowDeletionModal] = useState(false)

    return (

        //O livro é clicável; o clique chama a função "readBook"; um clique longo abre a modal "CustomBottomModal"
        <TouchableOpacity onLongPress={() => setShowBottomModal(true)} onPress={() => props.goToBook(props.bookKey, props.title, props.locations, props.lastLocationOpened, props.fileName)} style={{ width: "44%", marginRight: "5%", marginBottom: "4%" }}>

            <View>

                <Image source={{ uri: props.srcBookCover }}
                    style={{ width: "100%", aspectRatio: 0.7 }}
                    resizeMode="stretch"
                />

                <Text style={{ textAlign: 'center', color: props.nightMode ? "white" : "black", fontWeight: 'bold', fontSize: 15, paddingLeft: "7%", paddingRight: "7%" }}> {props.title} </Text>
                <Text style={{ textAlign: 'center', color: props.nightMode? "white" : "black", fontSize: 13 }}> {props.author != "" ? "by " + props.author : ""} </Text>

            </View>

            <BookDeletionModal showModal={showDeletionModal} setShowModal={setShowDeletionModal} setShowBottomModal={setShowBottomModal} bookKey={props.bookKey} title={props.title} author={props.author} fileName={props.fileName} deleteBook={props.deleteBook} />
            <CustomBottomModal showBottomModal={showBottomModal} setShowBottomModal={setShowBottomModal} setShowDeletionModal={setShowDeletionModal} bookKey={props.bookKey} title={props.title} author={props.author} srcBookCover={props.srcBookCover} shareBook={props.shareBook}/>

        </TouchableOpacity>

    )

}

export default Book;