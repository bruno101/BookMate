import WordReview from '../view/WordReview/index'
import * as LocalStorage from '../model/LocalStorage'
import { useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const WordReviewController = (props) => {

    useFocusEffect(
        useCallback(() => {

            setWordList()
            setTheme()

        }, [props.nightMode])
    );


    //Sempre que essa tela � aberta, obtemos a lista de palavras do banco
    const setWordList = async () => {
        const savedWords = await LocalStorage.getWordList()
        props.setWordListData(savedWords.reverse())
        props.setFilteredData(savedWords)
    }

    //Atualiza o tema de acordo com o que est� definido no armazenamento local
    const setTheme = async () => {
        props.setNightMode(await LocalStorage.getNightMode())
        props.navigation.setOptions({
            tabBarStyle: {
                backgroundColor: props.nightMode ? "#151d4a" : "white",
                borderTopWidth: props.nightMode ? 0 : 0.5,
                tabBarInactiveTintColor: props.nightMode ? "white" : "#A0A0A0",
            },
            tabBarInactiveTintColor: props.nightMode ? "white" : "#A0A0A0",
        });
    }

    //Caso o termo sendo pesquisado mude, alteramos o estado de "query"
    const onChangeText = (text) => {
        props.setQuery(text)
    };

    //Quando o usu�rio clica no bot�o de pesquisar, alteramos "searchedTerm" para que a lista de palavras seja alterada
    const onSearch = () => {
        props.setSearchedTerm(props.query.toLowerCase())
    }

    const getLanguageSet = () => {
        //Abaixo obtemos o conjunto de idiomas inclusos em "props.data" no formato {label: 'French', value: 'French'}, e incluindo a op��o 'All'
        //Esses idiomas s�o os que ser�o exibidos no DropDownPicker
        const languageList = props.wordListData.map((item) => { return (item.language.name) })
        languageList.push('All')
        let languageSet = [...new Set(languageList)].map((item) => { return ({ label: item, value: item }) });

        return languageSet
    }

    //Sempre que h� uma mudan�a em "searchedTerm" ou "language", filtramos os dados a serem mostrados conforme necess�rio
    useEffect(() => {

        if (props.language == "All") {
            props.setFilteredData(props.wordListData.filter((item) => { return (item.word.toLowerCase().startsWith(props.searchedTerm))}))
        } else {
            props.setFilteredData(props.wordListData.filter((item) => { return (item.language.name == props.language) && (item.word.toLowerCase().startsWith(props.searchedTerm))  }))
        }

    }, [props.language, props.searchedTerm]);

    return (
        <WordReview navigation={props.navigation} language={props.language} setLanguage={props.setLanguage} wordListData={props.wordListData} onChangeText={onChangeText} getLanguageSet={getLanguageSet} filteredData={props.filteredData} setSearchedTerm={props.setSearchedTerm} query={props.query} onSearch={onSearch} nightMode={props.nightMode}/>
    )

}

export default WordReviewController;