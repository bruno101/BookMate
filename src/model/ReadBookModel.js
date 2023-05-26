import ReadBookController from '../controller/ReadBookController'
import {useState} from 'react'

const ReadBookModel = ({ navigation, route }) => {

    //Armazena a palavra a ser traduzida (ou "", se não houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se não houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    //Define em que posição das telas as modais com as traduções devem aparecer ("bottom" ou "top")
    const [positionTranslationModals, setPositionTranslationModals] = useState("bottom")

    const [currentPage, setCurrentPage] = useState(1)

    const [showSlider, setShowSlider] = useState(false)

    const [sliderValue, setSliderValue] = useState(1)

    const [bookUrl, setBookUrl] = useState()

    const [nativeLanguage, setNativeLanguage] = useState({ name: "", code: "" })

    return (
        <ReadBookController navigation={navigation} wordToTranslate={wordToTranslate} setWordToTranslate={setWordToTranslate} phraseToTranslate={phraseToTranslate} setPhraseToTranslate={setPhraseToTranslate} positionTranslationModals={positionTranslationModals} setPositionTranslationModals={setPositionTranslationModals} currentPage={currentPage} setCurrentPage={setCurrentPage} showSlider={showSlider} setShowSlider={setShowSlider} sliderValue={sliderValue} setSliderValue={setSliderValue} bookLength={100} bookUrl={bookUrl} setBookUrl={setBookUrl} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} bookKey={route.params.bookKey} fileName={route.params.fileName} saveMetadata={route.params.saveMetadata} />
        )
}

export default ReadBookModel;