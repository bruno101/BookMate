import * as LocalStorage from '../model/LocalStorage'
import Home from '../view/Home/index'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Share, Alert } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const HomeController = (props) => {

    //Sempre que a componente é montada, chamamos getBookIndex() para obtermos o índice de livros importados, setNativeLanguage() para obtermos o idioma escolhido como nativo e setTheme() para obtermos o tema escolhido pelo usuário (modo noturno ou não)
    useFocusEffect(
        useCallback(() => {

            getBookData()
            setNativeLanguage()
            setTheme()

        }, [])
    );

    const getBookData = async () => {

        props.setBookIndex(await LocalStorage.getBookIndex())
        props.setCurrentlyReading(await LocalStorage.getCurrentlyReading())

    }

    const setNativeLanguage = async () => {

        props.setNativeLanguage(await LocalStorage.getNativeLanguage())

    }

    const setTheme = async () => {

        if ((await LocalStorage.getNightMode()) == true) { props.setNightMode(true); changeNavigationBarColor('#1d1f2b', true); } else { props.setNightMode(false); changeNavigationBarColor('#F0F0F0', true); }

    }

    //Essa função leva o usuário para a tela de leitura de livros
    const goToBook = (bookKey, bookTitle, bookAuthor, locations, initialPage, fileName) => {
        props.navigation.navigate('ReadBook', { bookKey: bookKey, bookTitle: bookTitle, locations: locations, initialPage: initialPage, fileName: fileName, saveMetadata: bookAuthor === "" ? true : false })
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

    //Essa função deve deletar um livro
    const deleteBook = async (bookKey, fileName) => {
        await LocalStorage.deleteBook(bookKey, fileName).then(
            async () => { props.setBookIndex(await LocalStorage.getBookIndex()) }
        )
    }

    return (
        <Home bookIndex={props.bookIndex} currentlyReading={props.currentlyReading} goToBook={goToBook} navigation={props.navigation} shareBook={shareBook} deleteBook={deleteBook} nativeLanguage={props.nativeLanguage} nightMode={props.nightMode} />
        )

}

export default HomeController;