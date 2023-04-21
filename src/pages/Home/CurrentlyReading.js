import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native'

//Índice do último livro aberto pelo usuário; -1 se não houver esse livro
//Vamos supor que o índice seja 1
var currentlyReading = 1

var device = Dimensions.get('window');


const CurrentlyReading = (props) => {

    const backgroundImgSrc = "https://i.pinimg.com/originals/c3/56/8d/c3568daa18802ccbae94d214b1cff27b.jpg"

    const goToBook = () => {
        //Deve redirecionar o usuário para a tela de leitura de livro
    }

    //Essa componente deve mostrar a capa do livro, o título e o autor
    //Clicar nela deve chamar a função "goToBook"

    //Se não há nenhum livro sendo lido, não mostramos nada
    if (currentlyReading == -1) {

        return;

    } else {

        //A variável abaixo contém os metadados do livro com o índice dado por "currentlyReading"
        let bookMetadata = bookIndex.find((book) => {
            return book.bookKey == currentlyReading
        })

        //Se há livro sendo lido, essa componente deve aparecer no início da tela inicial para que o usuário tenha uma forma rápida de reiniciar a leitura do último livro que ele abriu
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