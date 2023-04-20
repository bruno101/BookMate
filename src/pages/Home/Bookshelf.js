import Book from './Book'
import { View, Text } from 'react-native'

//Essa é a lista de livros do usuário
const Bookshelf = (props) => {

    //Geramos, a partir do índice de livros, componentes "Book" para a exibição
    //Esse índice de livros por enquanto está definido globalmente no arquivo 'DummyData.js'
    let bookList = bookIndex.map((book, index) => {
        return <Book key={book.bookKey} bookKey={book.bookKey} title={book.title} author={book.author} srcBookCover={book.srcBookCover} navigation={props.navigation} />
    })

    return (

        <View>

            <Text style={{
                fontSize: 22,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "black",
                letterSpacing: 0.2,
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 20
            }}> Bookshelf </Text>

            <View style={{ flexDirection: 'row', marginTop: "5%", marginLeft: "6%", flexWrap: 'wrap' }}>
                {bookList}
            </View>

        </View>

    )

}

export default Bookshelf;

