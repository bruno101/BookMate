import { useEffect } from 'react'
import { View, Dimensions, Text, TouchableOpacity, Image } from 'react-native'
import Header from './Header'
import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'
import WordList from './WordList'
import ReviewModal from './ReviewModal'

const device = Dimensions.get("window")

//O botão que, ao ser clicado, abre a modal de revisão
const ReviewButton = (props) => {

    return (

        <View style={{ marginTop: -60 }}>
            <TouchableOpacity style={{ marginLeft: device.width - 120, width: 100, marginTop: -60, height: 50, backgroundColor: "#618FBC", borderRadius: 15, justifyContent: "center" }} onPressIn={() => { props.setShowModal(true) }}>
                <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Review</Text>
            </TouchableOpacity>
        </View>

        )

}

//A componente principal da tela, que chama todas as outras
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
            backgroundColor: props.nightMode ? "#151d4a" : "white"
        }}>

            <Header nightMode={props.nightMode} />

            <SearchBar setSearchedTerm={props.setSearchedTerm} query={props.query} onChangeText={props.onChangeText} onSearch={props.onSearch} nightMode={props.nightMode}/>

            <SearchFilter language={props.language} setLanguage={props.setLanguage} data={props.wordListData} getLanguageSet={props.getLanguageSet} nightMode={props.nightMode}/>

            <WordList filteredData={props.filteredData} nightMode={props.nightMode} />

            <ReviewModal nightMode={props.nightMode} wordsToReview={props.wordsToReview} setWordsToReview={props.setWordsToReview} wordListData={props.wordListData} showModal={props.showModal} setShowModal={props.setShowModal} currentWord={props.currentWord} correctAnswer={props.correctAnswer} randomWords={props.randomWords} selectedAnswer={props.selectedAnswer} setSelectedAnswer={props.setSelectedAnswer} onQuit={props.onQuit} onWordReviewed={props.onWordReviewed} />

            <ReviewButton setShowModal={props.setShowModal} />

        </View>

        )

}




export default WordReview;