import { View, TouchableOpacity, Image, Text, Button } from 'react-native'

//Corresponde a cada livro da biblioteca do usuário
const Book = (props) => {

    //Essa função leva o usuário para a tela de leitura de livros
    const onPress = () => {
        props.navigation.navigate('ReadBook', { bookKey: props.bookKey })
    }

    const onLongPress = () => {
        //Deve oferecer a opção de editar ou deletar o livro
        console.log("Detected long press")
    }

    return (

        //O livro é clicável; o clique chama a função "readBook"
        //Note que dentro dessa "TouchableOpacity" há outra "TouchableOpacity", que corresponde ao botão de deletar o livro; clicar nessa segunda opacidade chama a função "deleteBook"
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={{ width: "44%", marginRight: "5%", marginBottom: "4%" }}>

            <View>

                <Image source={{ uri: props.srcBookCover }}
                    style={{ width: "100%", aspectRatio: 0.7 }}
                    resizeMode="stretch"
                />

                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft: "7%", paddingRight: "7%" }}> {props.title} </Text>
                <Text style={{ textAlign: 'center', color: 'black', color: '#2f354b', fontSize: 13 }}> by {props.author} </Text>

            </View>

        </TouchableOpacity>

    )

}

export default Book;