import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import HighlightText from '@sanar/react-native-highlight-text';

//Aqui é definido como deve ser cada item da lista de palavras
const WordItem = (props) => {

    const [showDetails, setShowDetails] = useState(false)

    //Os detalhes adicionais abaixo são mostrados quando o usuário clica no item da lista
    const wordDetails = () => {

        //Essa expressão em regex identifica as palavras de um texto iguais a "props.word" (usamos isso para destacar essas palavras dentro do trecho em que elas aparecem, em "HighlightText")
        if (props.language.code == "zh" || props.language.code == "ja") {
            //Usamos uma expressão diferente para Chinês e Japonês, já que palavras não necessariamente são separadas por espaços/sinais nesses idiomas
            var regex = new RegExp(props.word)
        } else {
            //A palavra deve ser seguida por um espaço em branco ou algum sinal de pontuação e precedida por um espaço em branco, algum sinal de pontuação ou o início da string
            var regex = new RegExp("(?<=^|[, .:;!?-])"+ props.word +"(?=[, .:;!?-])")
        }

        if (showDetails) {

            return (

                <View>
                    <Text style={{ marginLeft: 20, color: props.nightMode? "white" : "#505050", fontSize: 15, marginBottom: 5, marginRight: 20 }}>{props.language.name}</Text>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20, marginBottom: 5 }}>

                        <HighlightText
                            highlightStyle={{ backgroundColor: 'yellow' }}
                            searchWords={[regex]}
                            textToHighlight={props.fullPhrase}
                            style={{ fontSize: 15, marginRight: 20, color: props.nightMode? "white" : "#757575"}}
                        />

                    </View>

                </View>

            )
        }

    }

    const onPress = () => {
        setShowDetails(!showDetails)
    }

    return (

        <View style={{
            borderBottomColor: props.nightMode? "black" : "#eaeaea", borderBottomWidth: 1
        }}>

            <TouchableOpacity onPress={onPress}>

                <Text style={{ marginLeft: 20, color: props.nightMode? "white" : "black", fontSize: 18, marginTop: 3, marginRight: 20 }}>{props.word}</Text>
                <Text style={{ marginLeft: 20, color: props.nightMode ? "white" : "black", fontSize: 15, marginBottom: 5, marginRight: 20 }}>{props.translation}</Text>
                {wordDetails()}

            </TouchableOpacity>

        </View>

    )

}

export default WordItem;
