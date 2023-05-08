import { useState, useEffect } from 'react'
import { View } from 'react-native'
import TopBar from './TopBar'
import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'
import WordList from './WordList'

//Vamos supor que os dados a serem mostrados são os descritos abaixo
const DATA = [
    { id: 1, word: 'залив', translation: 'bay', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.'},
    { id: 2, word: 'toujours', translation: 'always', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie."},
    { id: 3, word: '她', translation: 'she', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。"},
    { id: 4, word: 'Из', translation: 'from', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.'},
    { id: 5, word: 'gens', translation: 'people', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie."},
    { id: 6, word: '缘', translation: 'edge', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。"},
    { id: 7, word: 'пристань', translation: 'wharf', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.'},
    { id: 8, word: 'voir', translation: 'to see', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie."},
    { id: 9, word: '视', translation: 'to see', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。"},
    { id: 10, word: 'marcher', translation: 'walk', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie."},
    { id: 11, word: 'إنهم', translation: 'that they', language: { name: 'Arabic', code: 'ar' }, fullPhrase: "إنهم يتجادلون. في حين أن الحجة تبدو مختلفة ، إلا أن الحقيقة هي نفسها دائمًا." }
    ]

const WordReview = ({ navigation }) => {

    //'filteredData' é o que exibimos na FlatList
    const [filteredData, setFilteredData] = useState(DATA)

    //Armazenamos o termo sendo pesquisado, caso haja algum, e o idioma selecionado, caso haja algum
    const [searchedTerm, setSearchedTerm] = useState("")
    const [language, setLanguage] = useState("All")

    //Sempre que há uma mudança em "searchedTerm" ou "language", filtramos os dados a serem mostrados conforme necessário
    useEffect(() => {

        if (language == "All") {
            setFilteredData(DATA.filter((item) => { return (item.word.toLowerCase().startsWith(searchedTerm)) }))
        } else {
            setFilteredData(DATA.filter((item) => { return (item.language.name == language) && (item.word.toLowerCase().startsWith(searchedTerm))  }))
        }

    }, [language, searchedTerm]);

    //Definimos como deve ser a barra superior da tela
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <TopBar />
            )
        });
    }, []);


    //Mostramos a barra de pesquisa (SearchBar), um dropdown picker em que é possível filtrar os termos por idioma (SearchFilter), e a lista de palavras (WordList)
    return (

        <View style={{
            flex: 1,
            backgroundColor: 'white'
         }}>

            <SearchBar setSearchedTerm={setSearchedTerm} />

            <SearchFilter language={language} setLanguage={setLanguage} data={DATA} />

            <WordList filteredData={filteredData} />
            
        </View>

        )

}




export default WordReview;