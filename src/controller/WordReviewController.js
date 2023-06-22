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


    //Sempre que essa tela é aberta, obtemos a lista de palavras do banco
    const setWordList = async () => {

        let savedWords = await LocalStorage.getWordList()
        props.setWordListData(savedWords)

        //As palavras a serem revisadas são as 10 que não foram revisadas a mais tempo
        props.setWordsToReview(savedWords.filter(a => a.translation != "").sort((a, b) => a.lastReviewedTimestamp - b.lastReviewedTimestamp).slice(0, 10))
        props.setCurrentWord(0)

    }

    //Atualiza o tema de acordo com o que está definido no armazenamento local
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

    //Quando o usuário clica no botão de pesquisar, alteramos "searchedTerm" para que a lista de palavras seja alterada
    const onSearch = () => {
        props.setSearchedTerm(props.query.toLowerCase())
    }

    const getLanguageSet = () => {
        //Abaixo obtemos o conjunto de idiomas inclusos em "props.data" no formato {label: 'French', value: 'French'}, e incluindo a opção 'All'
        //Esses idiomas são os que serão exibidos no DropDownPicker
        const languageList = props.wordListData.map((item) => { return (item.language.name) })
        languageList.push('All')
        let languageSet = [...new Set(languageList)].map((item) => { return ({ label: item, value: item }) });

        return languageSet
    }

    //Sempre que há uma mudança em "searchedTerm" ou "language", filtramos os dados a serem mostrados conforme necessário
    useEffect(() => {

        const reversedWordList = [...props.wordListData].reverse()
        if (props.language == "All") {
            props.setFilteredData(reversedWordList.filter((item) => { return (item.word.toLowerCase().startsWith(props.searchedTerm))}))
        } else {
            props.setFilteredData(reversedWordList.filter((item) => { return (item.language.name == props.language) && (item.word.toLowerCase().startsWith(props.searchedTerm))  }))
        }

    }, [props.language, props.searchedTerm, props.wordListData]);

    //Abaixo estão os métodos relacionadas à revisão de palavras

    //Sempre que 'currentWord' ou 'wordsToReview' mudam, definimos qual será o índice da resposta correta aleatoriamente, geramos palavras aleatórias para as outras respostas, e inicializamos o índice da palavra selecionado como '-1'
    useEffect(() => {

        if (props.wordsToReview[props.currentWord] != undefined) {
            props.setCorrectAnswer(Math.floor(Math.random() * 4))
            generateRandomWords()
            props.setSelectedAnswer(-1)
        }

    }, [props.currentWord, props.wordsToReview])

    //Método chamado quando uma palavra acabou de ser revisada
    const onWordReviewed = async () => {

        //Se ainda há mais palavras para revisar, atualizamos no armazenamento local e vamos para a próxima palavra da lista
        if (props.currentWord < props.wordsToReview.length - 1) {

            LocalStorage.updateWordLastReviewTimestamp(props.wordsToReview[props.currentWord].word);
            props.setCurrentWord(props.currentWord + 1)

        } else {
            //Se a revisão foi finalizada, atualizamos no armazenamento local, fechamos a modal, e reinicializamos 'currentWord' e 'wordsToReview', caso o usuário inicie mais uma sessão de revisão
            await LocalStorage.updateWordLastReviewTimestamp(props.wordsToReview[props.currentWord].word).then(async () => {
                props.setShowModal(false)
                props.setCurrentWord(0)
                const savedWords = await LocalStorage.getWordList()
                props.setWordsToReview(savedWords.sort((a, b) => a.lastReviewedTimestamp - b.lastReviewedTimestamp).slice(0, 10))
            })

        }
    }

    //Chamada quando o usuário clica no modal de fechar da modal
    const onQuit = async () => {

        props.setShowModal(false)

    }

    //Função que gera quatro palavras aleatórias
    const generateRandomWords = () => {

        let wordsArray = []

        if (props.wordListData.length < 5) {
            wordsArray = ["borboleta", "lâmpada", "livro", "loja", "motocicleta", "poltrona", "perna", "queijo", "abrigo", "tesoura", "acima", "cozinhar", "chocolate", "verde", "peixe", "sapato", "bebida", "rosto"]
        } else {
            wordsArray = props.wordListData.map(x => x.translation).filter(x => ((x != props.wordsToReview[props.currentWord].translation) & (x != "")))
        }

        let shuffledArray = wordsArray
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        props.setRandomWords([shuffledArray[0], shuffledArray[1], shuffledArray[2], shuffledArray[3]])


    }

    return (
        <WordReview navigation={props.navigation} language={props.language} setLanguage={props.setLanguage} wordListData={props.wordListData} onChangeText={onChangeText} getLanguageSet={getLanguageSet} filteredData={props.filteredData} setSearchedTerm={props.setSearchedTerm} query={props.query} onSearch={onSearch} nightMode={props.nightMode} wordsToReview={props.wordsToReview} setWordsToReview={props.setWordsToReview} showModal={props.showModal} setShowModal={props.setShowModal} onWordReviewed={onWordReviewed} onQuit={onQuit} showModal={props.showModal} setShowModal={props.setShowModal} currentWord={props.currentWord} correctAnswer={props.correctAnswer} randomWords={props.randomWords} selectedAnswer={props.selectedAnswer} setSelectedAnswer={props.setSelectedAnswer} />
    )

}

export default WordReviewController;