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
                headerTintColor: props.nightMode? "white" : "black",
                headerStyle: { backgroundColor: props.nightMode ? "#151d4a" : "white" },
                headerTitle: () => <View style={{ height: 40, justifyContent: "center", width: "90%"}}><Text
                    numberOfLines={1}
                    style={{
                        fontSize: 15,
                        fontFamily: 'WorkSans-Bold',
                        fontWeight: 'bold',
                        color: props.nightMode? "white" : "black",
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
        }, [props.bookTitle, props.nightMode])
    );

    //Mostramos o conteúdo da página ("PageContent"), a "Translations View" (em que, se for necessário, são mostradas as modais com traduções etc.), e o Slider para mudança de página
    return (

        <View
            flex={1}
            style={{ backgroundColor: props.nightMode ? "#1d1f2b" : "white" }}
        >

            {props.positionTranslationModals == "top" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} detectedLanguage={props.detectedLanguage} translation = { props.translation } context={props.context} nightMode={props.nightMode} /> : <View></View>}

            <PageContent bookUrl={props.bookUrl} webview={props.webview} handleWebviewMessage={props.handleWebviewMessage} onPress={props.onScreenPress} onSwipeLeft={props.onSwipeLeft} onSwipeRight={props.onSwipeRight} saveMetadata={props.saveMetadata} initialPage={props.initialPage} locations={props.locations} nightMode={props.nightMode} font={props.font}/>

            {props.positionTranslationModals == "bottom" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} nativeLanguage={props.nativeLanguage} dictionaryLanguage={props.dictionaryLanguage} setDictionaryLanguage={props.setDictionaryLanguage} supportedDictionaryLanguages={props.supportedDictionaryLanguages} translationSourceLanguage={props.translationSourceLanguage} setTranslationSourceLanguage={props.setTranslationSourceLanguage} supportedTranslationSourceLanguages={props.supportedTranslationSourceLanguages} translationTargetLanguage={props.translationTargetLanguage} setTranslationTargetLanguage={props.setTranslationTargetLanguage} supportedTranslationTargetLanguages={props.supportedTranslationTargetLanguages} detectedLanguage={props.detectedLanguage} translation={props.translation} context={props.context} nightMode={props.nightMode} /> : <View></View>}

            {props.showSlider ? < CustomSlider sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} locations={props.locations} goToPage={props.goToPage} nightMode={props.nightMode} /> : <View></ View>}

         </ View>

    )

}

export default ReadBook;