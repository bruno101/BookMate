import WordItem from './WordItem'
import { View, FlatList } from 'react-native'

//Essa é a FlatList em que é mostrada a lista de palavras do usuário
//Cada item da lista é uma componente do tipo WordItem
const WordList = (props) => {

    return (

        <View style={{ borderTopColor: "#eaeaea", borderTopWidth: 1, flex: 1, marginBottom: 10, zIndex: -1 }}>
            <FlatList
                data={props.filteredData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={50}
                renderItem={({ item }) => {

                    return <WordItem word={item.word} translation={item.translation} language={item.language} fullPhrase={item.fullPhrase} />

                }}
            />
        </View>

    )

}

export default WordList;
