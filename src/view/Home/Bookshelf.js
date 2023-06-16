import Book from './Book'
import { View, Text, Image, Dimensions } from 'react-native'

const device = Dimensions.get("window")

//Essa é a lista de livros do usuário
const Bookshelf = (props) => {

    //Se a lista for vazia, mostramos uma imagem e uma mensagem para o usuário
    const emptyBookshelf = () => {

        return (

            <View>

                <Image
                    style={{ height: device.width * 0.8, aspectRatio: 1, marginLeft: device.width * 0.1 }}
                    source={props.nightMode ? require('../../assets/peopleReadingBooksNight.png') : require('../../assets/peopleReadingBooks.png')}
                    resizeMode="contain"
                />

                <Text style={{ color: props.nightMode? "white" : "black", textAlign: "center", fontWeight: "bold", fontSize: 20, marginTop: 20 }}>Welcome to BookMate!</Text>


                <View style={{ marginLeft: "10%", width: "80%" }}>
                    <Text style={{ color: props.nightMode? "white" : "#888888", textAlign: "center", fontSize: 14, marginTop: 20, lineHeight: 20 }}>
                        Start your reading adventure by importing your first book! You can easily import EPUB files by navigating to the "Import" tab. Explore captivating stories and unlock the power of simultaneous translation, allowing you to enjoy books in different languages!
                    </Text>
                </View>

            </View>
            
            )

    }

    const bookshelf = () => {

        return (

            <View>

                <Text style={{
                    fontSize: 22,
                    fontFamily: 'WorkSans-Bold',
                    fontWeight: "bold",
                    color: props.nightMode ? "white" : "black",
                    letterSpacing: 0.2,
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20
                }}> Bookshelf </Text>

                <View style={{ flexDirection: 'row', marginTop: "5%", marginLeft: "6%", flexWrap: 'wrap' }}>
                    {bookList}
                </View>

            </View >
            
            )

    }

    //Geramos, a partir do índice de livros, componentes "Book" para a exibição
    let bookList = props.bookIndex.map((book, index) => {
        return <Book key={book.bookKey} bookKey={book.bookKey} title={book.title} author={book.author} lastLocationOpened={book.lastLocationOpened} locations={book.locations} fileName={book.fileName} srcBookCover={book.srcBookCover} navigation={props.navigation} goToBook={props.goToBook} shareBook={props.shareBook} deleteBook={props.deleteBook} nightMode={props.nightMode} />
    })

    if (props.bookIndex.length > 0) {
        return bookshelf()
    } else {
        return emptyBookshelf()
    }

}

export default Bookshelf;

