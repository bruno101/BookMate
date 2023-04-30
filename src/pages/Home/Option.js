import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

//Essa componente corresponde a uma op��o individual da lista de op��es acima
//Note que ela recebe as props "id", "title", "subtitle", "imagePath" e "navigation" mostradas na componente anterior
const Option = (props) => {

    const importBook = () => {
        //Deve importar um livro dos arquivos do usu�rio
    }

    const reviewWords = () => {
        //Deve redirecionar � tela de revis�o de palavras
        props.navigation.navigate('WordReview')
    }

    const searchBook = () => {
        //Deve redirecionar � tela de busca por livros

    }

    handlePress = () => {
        //De acordo com o �ndice do elemento da lista em que o usu�rio clica, chamamos uma das tr�s fun��es acima (esse �ndice � dado por "props.id")
        if (props.id == "1") {
            importBook()
        } else if (props.id == "2") {
            reviewWords()
        } else {
            searchBook()
        }
    }


    //Cada item da lista � clic�vel, e ao clicar em um item, chama-se a fun��o "handlePress"
    return (

        <View>

            <TouchableOpacity
                style={{ height: 134, width: 300, marginRight: 20 }}
                onPress={handlePress}
            >

                <View style={{
                    flex: 1,
                    marginLeft: 48,
                    borderRadius: 16,
                    backgroundColor: '#AFE1AF',
                }}>

                    <View
                        style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row' }}
                    >
                        <View style={{ paddingVertical: 24, paddingLeft: 16 }}>
                            <Image
                                style={{ flex: 1, aspectRatio: 1.0, marginLeft: -60 }}
                                source={props.imagePath}
                            />
                        </View>

                        <View style={{ flex: 1, paddingLeft: 16, paddingVertical: 16 }}>
                            <Text style={{
                                textAlignVertical: "center", color: 'black', fontWeight: "bold", fontSize: 18, marginTop: 15, marginLeft: "5%"
                            }}> {props.title} </Text>
                            <Text style={{
                                color: 'black', fontSize: 14, marginTop: 3, marginLeft: "5%"
                            }}> {props.subtitle} </Text>
                        </View>

                    </View>
                </View>

            </TouchableOpacity>

        </View>

    )
}

export default Option;
