import React from 'react';
import ListOfOptions from './ListOfOptions';
import Bookshelf from './Bookshelf';
import {
    ScrollView,
    Dimensions
} from 'react-native'

//"Home" � a tela inicial, onde � mostrada a lista de livros do usu�rio
//Ela usa as componentes 'ListOfOptions' e 'Bookshelf'. 'Bookshelf' usa a componente 'Book', e 'ListOfOptions' usa a componente 'Option'
const Home = ({ navigation }) => {

    return (

        <ScrollView style={{ backgroundColor: "white" }}>
            <ListOfOptions navigation={navigation}/>
            <Bookshelf navigation={navigation} />
        </ScrollView>

        )

};


export default Home;