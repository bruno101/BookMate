import { Image, TouchableOpacity, Dimensions, Text, View } from 'react-native'

const device = Dimensions.get("window")

//A componente abaixo mostra cada parágrafo do texto
const Paragraph = (props) => {

    const translateWord = (word) => {
        const onWordPress = () => {
            if (props.wordToTranslate != "" || props.paragraphToTranslate != "") {
                //Sempre que há um clique na tela (incluindo em uma palavra), verificamos se já há uma palavra ou parágrafo cujas traduções estão sendo mostrados no momento
                //Se houver, "ressetamos" essas variáveis para que as suas modais deixem de ser mostradas (nessa situação, o clique deve fechar as modais)
                props.setWordToTranslate("")
                props.setParagraphToTranslate("")
            } else {
                //Senão, as modais relacionadas à palavra
                props.setWordToTranslate(word)
                props.setParagraphToTranslate("")
            }
        }
        return onWordPress
    }

    //Mostramos a modal com a tradução do parágrafo
    const translateParagraph = (word) => {
        props.setParagraphToTranslate(props.content)
        props.setWordToTranslate("")
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

    //Se o texto for vazio não mostramos nada
    if (!props.content.replace(/\s/g, '').length) {
        return
    }
    //Senão mostramos o texto; à direita do texto há um ícone no qual o usuário clica para traduzir o parágrafo inteiro
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 }} >
            <Text style={{ fontSize: 18, fontFamily: "serif", color: "black", marginLeft: 15, width: device.width - 60 }}> {wordsToShow} </Text>
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
