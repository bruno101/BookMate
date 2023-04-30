import { useState, useEffect } from 'react'
import { View } from 'react-native'
import TopBar from './TopBar'
import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'
import WordList from './WordList'

//Vamos supor que os dados a serem mostrados são os descritos abaixo
const DATA = [
    { id: 1, word: 'залив', translation: 'bay', language: { name: 'Russian', code: 'ru' }, fullParagraph: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью. От дома идет красивая тенистая аллея.'},
    { id: 2, word: 'toujours', translation: 'always', language: { name: 'French', code: 'fr' }, fullParagraph: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie.Il dit qu'avec mon pouvoir imaginatif et mon habitude de raconter des histoires, une faiblesse nerveuse comme la mienne est sûre de conduire à toutes sortes de fantaisies excitées et que je dois utiliser ma volonté et mon bon sens pour contrôler la tendance. Alors j'essaie."},
    { id: 3, word: '她', translation: 'she', language: { name: 'Chinese', code: 'zh' }, fullParagraph: "她紧张地凝视着边缘。她心里明白，风景本该是美丽的，但她只觉得害怕。高处总是让她不安，现在她能感受到这种不安的全部力量。"},
    { id: 4, word: 'Из', translation: 'from', language: { name: 'Russian', code: 'ru' }, fullParagraph: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью. От дома идет красивая тенистая аллея.'},
    { id: 5, word: 'gens', translation: 'people', language: { name: 'French', code: 'fr' }, fullParagraph: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie.Il dit qu'avec mon pouvoir imaginatif et mon habitude de raconter des histoires, une faiblesse nerveuse comme la mienne est sûre de conduire à toutes sortes de fantaisies excitées et que je dois utiliser ma volonté et mon bon sens pour contrôler la tendance. Alors j'essaie."},
    { id: 6, word: '缘', translation: 'edge', language: { name: 'Chinese', code: 'zh' }, fullParagraph: "她紧张地凝视着边缘。她心里明白，风景本该是美丽的，但她只觉得害怕。高处总是让她不安，现在她能感受到这种不安的全部力量。"},
    { id: 7, word: 'пристань', translation: 'wharf', language: { name: 'Russian', code: 'ru' }, fullParagraph: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью. От дома идет красивая тенистая аллея.'},
    { id: 8, word: 'voir', translation: 'to see', language: { name: 'French', code: 'fr' }, fullParagraph: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie.Il dit qu'avec mon pouvoir imaginatif et mon habitude de raconter des histoires, une faiblesse nerveuse comme la mienne est sûre de conduire à toutes sortes de fantaisies excitées et que je dois utiliser ma volonté et mon bon sens pour contrôler la tendance. Alors j'essaie."},
    { id: 9, word: '视', translation: 'to see', language: { name: 'Chinese', code: 'zh' }, fullParagraph: "她紧张地凝视着边缘。她心里明白，风景本该是美丽的，但她只觉得害怕。高处总是让她不安，现在她能感受到这种不安的全部力量。"},
    { id: 10, word: 'аллея', translation: 'alley', language: { name: 'Russian', code: 'ru' }, fullParagraph: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью. От дома идет красивая тенистая аллея.'},
    { id: 11, word: 'marcher', translation: 'walk', language: { name: 'French', code: 'fr' }, fullParagraph: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie.Il dit qu'avec mon pouvoir imaginatif et mon habitude de raconter des histoires, une faiblesse nerveuse comme la mienne est sûre de conduire à toutes sortes de fantaisies excitées et que je dois utiliser ma volonté et mon bon sens pour contrôler la tendance. Alors j'essaie."},
    { id: 12, word: '里', translation: 'inside', language: { name: 'Chinese', code: 'zh' }, fullParagraph: "她紧张地凝视着边缘。她心里明白，风景本该是美丽的，但她只觉得害怕。高处总是让她不安，现在她能感受到这种不安的全部力量。" },
    { id: 13, word: 'إنهم', translation: 'that they', language: { name: 'Arabic', code: 'ar' }, fullParagraph: "إنهم يتجادلون. في حين أن الحجة تبدو مختلفة ، إلا أن الحقيقة هي نفسها دائمًا. نعم ، قد يكون الموضوع مختلفًا أو الظروف ، ولكن بعد كل ما قيل وفعل ، عاد كل شيء إلى نفس الشيء. كلاهما يعرف ذلك ، لكن لا يمتلك أي منهما الشجاعة أو القوة لمعالجة القضية الأساسية. لذلك استمروا في الجدال." }
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