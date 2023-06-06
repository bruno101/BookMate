import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text } from "react-native"
import TranslationsView from './TranslationsView'
import PageContent from './PageContent';
import CustomSlider from './CustomSlider';

const ReadBook = (props) => {


    //Não exibimos a barra inferior, mostramos o nome do livro no topo
    useFocusEffect(
        useCallback(() => {
            props.navigation.setOptions({
                headerTitle: () => <View style={{ height: 40, justifyContent: "center", width: "100%"}}><Text
                    numberOfLines={1}
                    style={{
                    fontSize: 15,
                    fontFamily: 'WorkSans-Bold',
                    fontWeight: 'bold',
                    color: "black",
                    letterSpacing: 0.2,
                    }}> {props.bookTitle} </Text></View>,
                
            })
            props.navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: "none"
                }
            });
            return () => props.navigation.getParent()?.setOptions({
                tabBarStyle: undefined
            });
        }, [props.bookTitle])
    );

    //Mostramos o conteúdo da página ("PageContent"), a "Translations View" (em que, se for necessário, são mostradas as modais com traduções etc.), e o Slider para mudança de página
    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            {props.positionTranslationModals == "top" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} translation={props.translation} context={props.context} /> : <View></View>}

            <PageContent bookUrl={props.bookUrl} webview={props.webview} handleWebviewMessage={props.handleWebviewMessage} onPress={props.onScreenPress} onSwipeLeft={props.onSwipeLeft} onSwipeRight={props.onSwipeRight} currentPage={props.currentPage} saveMetadata={props.saveMetadata} initialPage={props.initialPage} locations={props.locations} bookLength = { 100} />

            {props.positionTranslationModals == "bottom" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} translation={props.translation} context={props.context} /> : <View></View>}

            {props.showSlider ? < CustomSlider currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} bookLength={props.bookLength} /> : <View></ View>}

         </ View>

    )

}

export default ReadBook;