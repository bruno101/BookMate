import React from 'react';
import Bookshelf from './Bookshelf';
import CurrentlyReading from './CurrentlyReading';
import UserLanguageBar from './UserLanguageBar'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
    ScrollView
} from 'react-native'

//"Home" é a tela inicial, onde é mostrada a lista de livros do usuário
//Ela usa as componentes 'Bookshelf' e 'CurrentlyReading'. 'Bookshelf' usa a componente 'Book', que usa a 'CustomBottomModal'
const Home = (props) => {

    //No topo da tela aparece a componente UserLanguageBar
    useFocusEffect(
        useCallback(() => {
            props.navigation.setOptions({
                headerTitle: () => (

                    <UserLanguageBar navigation={props.navigation} nativeLanguage={props.nativeLanguage} />

                ),
            });
        }, [props.nativeLanguage])
    );

    return (

        <ScrollView style={{ backgroundColor: "white" }}>
            <CurrentlyReading bookIndex={props.bookIndex} currentlyReading={props.currentlyReading} goToBook={props.goToBook} />
            <Bookshelf bookIndex={props.bookIndex} goToBook={props.goToBook} shareBook={props.shareBook} deleteBook={props.deleteBook} />
        </ScrollView>

        )

};


export default Home;