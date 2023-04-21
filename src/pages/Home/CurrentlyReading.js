import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native'

//�ndice do �ltimo livro aberto pelo usu�rio; -1 se n�o houver esse livro
//Vamos supor que o �ndice seja 1
var currentlyReading = 1

var device = Dimensions.get('window');


const CurrentlyReading = (props) => {

    const backgroundImgSrc = "https://i.pinimg.com/originals/c3/56/8d/c3568daa18802ccbae94d214b1cff27b.jpg"

    const goToBook = () => {
        //Deve redirecionar o usu�rio para a tela de leitura de livro
    }

    //Essa componente deve mostrar a capa do livro, o t�tulo e o autor
    //Clicar nela deve chamar a fun��o "goToBook"

    //Se n�o h� nenhum livro sendo lido, n�o mostramos nada
    if (currentlyReading == -1) {

        return;

    } else {

        //A vari�vel abaixo cont�m os metadados do livro com o �ndice dado por "currentlyReading"
        let bookMetadata = bookIndex.find((book) => {
            return book.bookKey == currentlyReading
        })

        //Se h� livro sendo lido, essa componente deve aparecer no in�cio da tela inicial para que o usu�rio tenha uma forma r�pida de reiniciar a leitura do �ltimo livro que ele abriu
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
                }}> Continue Reading </Text>

                <TouchableOpacity style={{ width: device.width * 0.9, height: 160, marginTop: 40, marginBottom: 40 }} onPress={() => goToBook()}>

                    <ImageBackground source={{ uri: backgroundImgSrc }}
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