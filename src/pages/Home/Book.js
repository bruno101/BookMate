import { View, TouchableOpacity, Image, Text, Button } from 'react-native'

//Corresponde a cada livro da biblioteca do usu�rio
const Book = (props) => {

    //Essa fun��o leva o usu�rio para a tela de leitura de livros
    const onPress = () => {
        props.navigation.navigate('ReadBook', { bookKey: props.bookKey })
    }

    const onLongPress = () => {
        //Deve oferecer a op��o de editar ou deletar o livro
        console.log("Detected long press")
    }

    return (

        //O livro � clic�vel; o clique chama a fun��o "readBook"
        //Note que dentro dessa "TouchableOpacity" h� outra "TouchableOpacity", que corresponde ao bot�o de deletar o livro; clicar nessa segunda opacidade chama a fun��o "deleteBook"
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