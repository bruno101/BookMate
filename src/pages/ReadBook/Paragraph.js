import { Image, TouchableOpacity, Dimensions, Text, View } from 'react-native'

const device = Dimensions.get("window")

//A componente abaixo mostra cada par�grafo do texto
const Paragraph = (props) => {

    const translateWord = (word) => {
        const onWordPress = () => {
            console.log("User pressed: ", word)
            //Deve mostrar a tradu��o da palavra no qual o usu�rio clicou
        }
        return onWordPress
    }

    const translateParagraph = (word) => {
        console.log("Translate paragraph")
        //Deve mostrar a tradu��o do par�grafo ap�s o usu�rio clicar no �cone de traduzir par�grafo
    }

    //Colocamos cada palavra em um elemento de texto separado para podermos detectar o clique
    let wordsToShow = (props.content.split(" ")).map(
        (word, index) => {
            return <Text
                key={index}
                onPress={translateWord(word)}
            > {word} </Text>
        }
    )

    //Se o texto for vazio n�o mostramos nada
    if (!props.content.replace(/\s/g, '').length) {
        return
    }
    //Sen�o mostramos o texto; a direita do texto h� um �cone no qual o usu�rio clica para traduzir o par�grafo inteiro
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 }} >
            <Text style={{ fontSize: 16, fontFamily: "serif", color: "black", marginLeft: 15, width: device.width - 60 }}> {wordsToShow} </Text>
            <TouchableOpacity onPress={translateParagraph} style={{ width: 30, height: 30, marginLeft: 5 }}>
                <Image
                    source={require('../../assets/translate.png')}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )

}

export default Paragraph;
