import React from 'react';
import ListOfOptions from './ListOfOptions';
import Bookshelf from './Bookshelf';
import CurrentlyReading from './CurrentlyReading';
import {
    ScrollView
} from 'react-native'

//"Home" é a tela inicial, onde é mostrada a lista de livros do usuário
//Ela usa as componentes 'ListOfOptions', 'Bookshelf' e 'CurrentlyReading'. 'Bookshelf' usa a componente 'Book', e 'ListOfOptions' usa a componente 'Option'
const Home = ({ navigation }) => {

    return (

        <ScrollView style={{ backgroundColor: "white" }}>
            <CurrentlyReading navigation={navigation}/>
            <ListOfOptions navigation={navigation}/>
            <Bookshelf navigation={navigation} />
        </ScrollView>

        )

};


export default Home;