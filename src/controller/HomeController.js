import * as LocalStorage from '../model/LocalStorage'
import Home from '../view/Home/index'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Share, Alert } from 'react-native'

const HomeController = (props) => {

    const getBookData = async () => {

        props.setBookIndex(await LocalStorage.getBookIndex())
        props.setCurrentlyReading(await LocalStorage.getCurrentlyReading())

    }

    //Sempre que a componente � montada, chamamos getBookIndex() para obtermos o �ndice de livros importados
    useFocusEffect(
        useCallback(() => {

            getBookData()
            setNativeLanguage()

        }, [])
    );

    const setNativeLanguage = async () => {

        props.setNativeLanguage(await LocalStorage.getNativeLanguage())

    }

    //Essa fun��o leva o usu�rio para a tela de leitura de livros
    const goToBook = (bookKey, initialPage, fileName) => {
        console.log(initialPage)
        props.navigation.navigate('ReadBook', { bookKey: bookKey, initialPage: initialPage, fileName: fileName, saveMetadata: false })
    }

    //Deve permitir compartilhar um livro
    const shareBook = async (title, author) => {

        try {

            await Share.share({
                message:
                    `Hey there! \nI think you might enjoy the book "${title}" by "${author}". \nYou can read it on BookMate with simultaneous translation. \nDon't miss out!`,
            })

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    //Essa fun��o deve deletar um livro
    const deleteBook = async (bookKey, fileName) => {
        await LocalStorage.deleteBook(bookKey, fileName).then(
            async () => { props.setBookIndex(await LocalStorage.getBookIndex()) }
        )
    }

    return (
        <Home bookIndex={props.bookIndex} currentlyReading={props.currentlyReading} goToBook={goToBook} navigation={props.navigation} shareBook={shareBook} deleteBook={deleteBook} nativeLanguage={props.nativeLanguage}/>
        )

}

export default HomeController;