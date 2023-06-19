import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native'

var device = Dimensions.get('window');


const CurrentlyReading = (props) => {

    //Essa componente deve mostrar a capa do livro, o título e o autor
    //Clicar nela deve chamar a função "goToBook"

    //A variável abaixo contém os metadados do livro com o índice dado por "currentlyReading"; isso será nulo se "currentlyReading" for -1 ou se o livro não existir
    let bookMetadata = props.bookIndex.find((book) => {
        return book.bookKey == props.currentlyReading
    })

    //Se não há nenhum livro sendo lido, não mostramos nada
    if (bookMetadata == null) {

        return;

    } else {

        //Se há livro sendo lido, essa componente deve aparecer no início da tela inicial para que o usuário tenha uma forma rápida de reiniciar a leitura do último livro que ele abriu
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
                }}> Continue Reading </Text>

                <TouchableOpacity style={{ width: device.width * 0.9, height: 160, marginTop: 40, marginBottom: 40 }} onPress={() => props.goToBook(bookMetadata.bookKey, bookMetadata.title, bookMetadata.author, bookMetadata.locations, bookMetadata.lastLocationOpened, bookMetadata.fileName)}>

                    <ImageBackground source={require('../../assets/backgroundImage.jpg') }
                        style={{ width: "100%", height: "100%", flexDirection: 'row', flexWrap: 'wrap' }}
                        resizeMode="stretch"
                    >

                        <Image
                            source={{ uri: bookMetadata.srcBookCover }}
                            style={{ width: 130, height: 200, marginLeft: device.width * 0.04, marginTop: -20 }}
                            resizeMode="stretch"
                        />

                        <View style={{ height: 100, width: device.width * 0.9 - device.width * 0.04 - 140 }}>
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'WorkSans-Bold',
                                color: "black",
                                fontWeight: "bold",
                                letterSpacing: 0.4,
                                marginLeft: 10,
                                marginTop: 20,
                                marginBottom: 5,
                                flexWrap: 'wrap'
                            }}> {bookMetadata.title} </Text>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: 'WorkSans-Bold',
                                color: "black",
                                letterSpacing: 0.4,
                                marginLeft: 5,
                                marginBottom: 20,
                                flexWrap: 'wrap'
                            }}> by {bookMetadata.author} </Text>
                        </View>

                    </ImageBackground>

                </TouchableOpacity>

            </View>

        )

    }

}

export default CurrentlyReading;