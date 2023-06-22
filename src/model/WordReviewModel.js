import WordReviewController from '../controller/WordReviewController'
import {useState} from 'react'

const WordReviewModel = ({ navigation }) => {

    //A lista de palavras salvas
    const [wordListData, setWordListData] = useState([])

    //O valor que está digitado no filtro no momento (uma vez que o usuário clica em pesquisa, esse valor será armazenado em "searchedTerm")
    const [query, setQuery] = useState()

    //'filteredData' é o que exibimos na FlatList
    const [filteredData, setFilteredData] = useState([])
    //'wordsToReview' são as palavras que o usuário precisa revisar
    const [wordsToReview, setWordsToReview] = useState([])

    //Armazenamos o termo sendo pesquisado, caso haja algum, e o idioma selecionado, caso haja algum
    const [searchedTerm, setSearchedTerm] = useState("")
    const [language, setLanguage] = useState("All")

    //Define se o modo noturno deve ser aplicado
    const [nightMode, setNightMode] = useState(false)

    //Define se a modal de revisão deve ser mostrada
    const [showModal, setShowModal] = useState(false)

    //Atributos relacionadas à revisão de palavras na modal de revisão: o índice a palavra a ser revisada no momento, o índice (variando entre 0 e 3) da resposta correta na lista de opções, as palavras aleatórias a serem mostradas na lista de opções, e o índice (entre 0 e 3) resposta selecionada pelo usuário (-1 se nenhuma palavra foi selecionada)
    const [currentWord, setCurrentWord] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [randomWords, setRandomWords] = useState(["", "", "", ""])
    const [selectedAnswer, setSelectedAnswer] = useState(-1)

    return (
        <WordReviewController wordListData={wordListData} setWordListData={setWordListData} query={query} setQuery={setQuery} filteredData={filteredData} setFilteredData={setFilteredData} searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} language={language} setLanguage={setLanguage} navigation={navigation} nightMode={nightMode} setNightMode={setNightMode} wordsToReview={wordsToReview} setWordsToReview={setWordsToReview} showModal={showModal} setShowModal={setShowModal} currentWord={currentWord} setCurrentWord={setCurrentWord} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} randomWords={randomWords} setRandomWords={setRandomWords} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
    )
}

export default WordReviewModel;