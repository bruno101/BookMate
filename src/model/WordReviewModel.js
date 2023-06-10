import WordReviewController from '../controller/WordReviewController'
import {useState} from 'react'

const WordReviewModel = ({ navigation }) => {

    const [wordListData, setWordListData] = useState([])

    //O valor que est� digitado no filtro no momento (uma vez que o usu�rio clica em pesquisa, esse valor ser� armazenado em "searchedTerm")
    const [query, setQuery] = useState()

    //'filteredData' � o que exibimos na FlatList
    const [filteredData, setFilteredData] = useState([])

    //Armazenamos o termo sendo pesquisado, caso haja algum, e o idioma selecionado, caso haja algum
    const [searchedTerm, setSearchedTerm] = useState("")
    const [language, setLanguage] = useState("All")

    const [nightMode, setNightMode] = useState(false)

    return (
        <WordReviewController wordListData={wordListData} setWordListData={setWordListData} query={query} setQuery={setQuery} filteredData={filteredData} setFilteredData={setFilteredData} searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} language={language} setLanguage={setLanguage} navigation={navigation} nightMode={nightMode} setNightMode={setNightMode} />
    )
}

export default WordReviewModel;