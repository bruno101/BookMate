import Option from './Option.js'
import { View, Text, FlatList } from 'react-native'

//Mostra uma lista horizontal que contém ações para o usuário escolher: a princípio, importar um livro, procurar por um livro e revisar palavras
const ListOfOptions = (props) => {

    //Essa constante abaixo é uma lista com as descrições e as imagens de cada item a ser mostrado na lista de opções
    //Note que essa lista é passada como "data" para a FlatList
    const listOfOptions = [
        { id: '1', title: 'Import Book', subtitle: 'Import an epub file from your own device', imagePath: require('../../assets/addBook.png') },
        { id: '2', title: 'Review words', subtitle: 'Remember the meaning of the words you have been clicking on', imagePath: require('../../assets/review.png') },
        { id: '3', title: 'Search Book', subtitle: 'Search for books on the Project Gutenberg catalogue', imagePath: require('../../assets/searchBook.png') }
    ];

    return (

        <View style={{marginBottom: 50}}>

            <Text style={{
                fontSize: 22,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "black",
                letterSpacing: 0.2,
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 20
            }}> More </Text>

            <FlatList
                contentContainerStyle={{ padding: 16 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={listOfOptions}
                renderItem={({ item }) => (

                    <Option
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        imagePath={item.imagePath}
                        navigation={props.navigation}
                    />

                )}
                keyExtractor={item => item.id.toString()}
            />

        </View>

    )
}

export default ListOfOptions;