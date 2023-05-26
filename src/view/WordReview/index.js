import { useEffect } from 'react'
import { View } from 'react-native'
import Header from './Header'
import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'
import WordList from './WordList'

const WordReview = (props) => {

    //Deixamos de exibir a parte superior da tela
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        });
    }, []);


    //Mostramos um Header, a barra de pesquisa (SearchBar), um dropdown picker em que é possível filtrar os termos por idioma (SearchFilter), e a lista de palavras (WordList)
    return (

        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>

            <Header />

            <SearchBar setSearchedTerm={props.setSearchedTerm} query={props.query} onChangeText={props.onChangeText} onSearch={props.onSearch} />

            <SearchFilter language={props.language} setLanguage={props.setLanguage} data={props.wordListData} getLanguageSet={props.getLanguageSet} />

            <WordList filteredData={props.filteredData} />
            
        </View>

        )

}




export default WordReview;