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

    //No topo da tela aparece a componente UserLanguageBar; a aparência da barra inferior depende do tema escolhido
    useFocusEffect(
        useCallback(() => {
            props.navigation.setOptions({
                headerStyle: { backgroundColor: props.nightMode ? "#151d4a" : "white" },
                headerTitle: () => (

                    <UserLanguageBar navigation={props.navigation} nativeLanguage={props.nativeLanguage} nightMode={props.nightMode} />

                ),
            });
            props.navigation.getParent()?.setOptions({
                tabBarStyle: {
                    backgroundColor: props.nightMode ? "#151d4a" : "white",
                    borderTopWidth: props.nightMode ? 0 : 0.5
                },
                tabBarInactiveTintColor: props.nightMode? "white" : "#A0A0A0",
            });
        }, [props.nativeLanguage, props.nightMode])
    );

    return (

        <ScrollView style={{ backgroundColor: props.nightMode ? "#1d1f2b" : "white" }}>
            <CurrentlyReading bookIndex={props.bookIndex} currentlyReading={props.currentlyReading} goToBook={props.goToBook} nightMode={props.nightMode}/>
            <Bookshelf bookIndex={props.bookIndex} goToBook={props.goToBook} shareBook={props.shareBook} deleteBook={props.deleteBook} nightMode={props.nightMode} />
        </ScrollView>
        )

};


export default Home;