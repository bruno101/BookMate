import { View, ImageBackground, TouchableOpacity, Image, Text } from 'react-native'

//Corresponde a cada livro da biblioteca do usuário
const Book = (props) => {

    const readBook = () => {
        //Essa função deve levar o usuário para a tela de leitura de livros
    }

    const deleteBook = () => {
        //Essa função deve deletar um livro
    }

    return (

        //O livro é clicável; o clique chama a função "readBook"
        //Note que dentro dessa "TouchableOpacity" há outra "TouchableOpacity", que corresponde ao botão de deletar o livro; clicar nessa segunda opacidade chama a função "deleteBook"
        <TouchableOpacity onPress={readBook} style={{ width: "44%", marginRight: "5%", marginBottom: "4%" }}>

            <View>

                <ImageBackground source={{ uri: props.srcBookCover }}
                    style={{ width: "100%", aspectRatio: 0.7 }}
                    resizeMode="stretch"
                >

                    <TouchableOpacity style={{ width: "31%", marginLeft: "81%", marginTop: "93%" }} onPress={deleteBook}>
                        <View>
                            <Image
                                source={require('../../assets/deleteButton.png')}
                                style={{ width: "92%", marginLeft: "4%", marginTop: "4%" }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>

                </ImageBackground >

                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft: "7%", paddingRight: "7%" }}> {props.title} </Text>
                <Text style={{ textAlign: 'center', color: 'black', color: '#2f354b', fontSize: 13 }}> by {props.author} </Text>

            </View>

        </TouchableOpacity>

    )

}

export default Book;