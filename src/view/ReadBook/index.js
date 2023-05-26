import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View } from "react-native"
import TranslationsView from './TranslationsView'
import PageContent from './PageContent';
import CustomSlider from './CustomSlider';
import UserLanguageBar from '../UserLanguageBar'

const ReadBook = (props) => {


    //Não exibimos a barra inferior
    useFocusEffect(
        useCallback(() => {
            props.navigation.setOptions({
                headerTitle: () => (

                    <UserLanguageBar navigation={props.navigation} nativeLanguage={props.nativeLanguage} />

                ),
            });
            props.navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: "none"
                }
            });
            return () => props.navigation.getParent()?.setOptions({
                tabBarStyle: undefined
            });
        }, [props.nativeLanguage])
    );

    //Mostramos o conteúdo da página ("PageContent"), a "Translations View" (em que, se for necessário, são mostradas as modais com traduções etc.), e o Slider para mudança de página
    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            {props.positionTranslationModals == "top" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} /> : <View></View>}

            <PageContent bookUrl={props.bookUrl} handleWebviewMessage={props.handleWebviewMessage} onPress={props.onScreenPress} onSwipeLeft={props.onSwipeLeft} onSwipeRight={props.onSwipeRight} currentPage={props.currentPage} saveMetadata={props.saveMetadata} bookLength = { 100} />

            {props.positionTranslationModals == "bottom" ? <TranslationsView wordToTranslate={props.wordToTranslate} phraseToTranslate={props.phraseToTranslate} positionTranslationModals={props.positionTranslationModals} /> : <View></View>}

            {props.showSlider ? < CustomSlider currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} sliderValue={props.sliderValue} setSliderValue={props.setSliderValue} bookLength={props.bookLength} /> : <View></ View>}

         </ View>

    )

}

export default ReadBook;