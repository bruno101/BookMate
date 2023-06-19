import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native'

var device = Dimensions.get('window');


const CurrentlyReading = (props) => {

    //Essa componente deve mostrar a capa do livro, o t�tulo e o autor
    //Clicar nela deve chamar a fun��o "goToBook"

    //A vari�vel abaixo cont�m os metadados do livro com o �ndice dado por "currentlyReading"; isso ser� nulo se "currentlyReading" for -1 ou se o livro n�o existir
    let bookMetadata = props.bookIndex.find((book) => {
        return book.bookKey == props.currentlyReading
    })

    //Se n�o h� nenhum livro sendo lido, n�o mostramos nada
    if (bookMetadata == null) {

        return;

    } else {

        //Se h� livro sendo lido, essa componente deve aparecer no in�cio da tela inicial para que o usu�rio tenha uma forma r�pida de reiniciar a leitura do �ltimo livro que ele abriu
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