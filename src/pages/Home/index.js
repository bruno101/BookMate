import React from 'react';
import Bookshelf from './Bookshelf';
import CurrentlyReading from './CurrentlyReading';
import {
    ScrollView
} from 'react-native'

//"Home" � a tela inicial, onde � mostrada a lista de livros do usu�rio
//Ela usa as componentes 'Bookshelf' e 'CurrentlyReading'. 'Bookshelf' usa a componente 'Book', que usa a 'CustomBottomModal'
const Home = ({ navigation }) => {

    return (

        <ScrollView style={{ backgroundColor: "white" }}>
            <CurrentlyReading navigation={navigation}/>
            <Bookshelf navigation={navigation} />
        </ScrollView>

        )

};


export default Home;