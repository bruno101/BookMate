import ReadBookController from '../controller/ReadBookController'
import {useState} from 'react'

const ReadBookModel = ({ navigation, route }) => {

    //Armazena a palavra a ser traduzida (ou "", se n�o houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se n�o houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    //Define em que posi��o das telas as modais com as tradu��es devem aparecer ("bottom" ou "top")
    const [positionTranslationModals, setPositionTranslationModals] = useState("bottom")

    //P�gina a partir do qual o livro deve come�ar a ser mostrado
    const [initialPage, setInitialPage] = useState(route.params.initialPage)

    //P�gina atual do livro
    const [currentPage, setCurrentPage] = useState(route.params.initialPage)

    //Define se o Slider para mudan�a de p�gina deve ser mostrado
    const [showSlider, setShowSlider] = useState(false)

    //Valor a ser mostrado ao lado do Slider
    const [sliderValue, setSliderValue] = useState(1)

    //url em que o livro pode ser acessado
    const [bookUrl, setBookUrl] = useState()

    //Idioma escolhido como nativo pelo usu�rio
    const [nativeLanguage, setNativeLanguage] = useState("")

    //Idioma em que deve se mostrar a defini��o no dicion�rio
    const [dictionaryLanguage, setDictionaryLanguage] = useState("")

    //Defini��o de um termo
    const [definition, setDefinition] = useState()

    //Idioma suportados pelo dicion�rio
    const supportedDictionaryLanguages = [
        { label: 'Arabic', value: 'ar' },
        { label: 'Chinese', value: 'zh' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Turkish', value: 'tr' },
    ];

    //Idioma do qual deve se traduzir
    const [translationLanguage, setTranslationLanguage] = useState("")

    //Tradu��o do trecho selecionado
    const [translation, setTranslation] = useState()

    //Idiomas suportados para a tradu��o
    const supportedTranslationLanguages = [
        { label: 'Arabic', value: 'ar' },
        { label: 'Chinese', value: 'zh' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Turkish', value: 'tr' },
    ];

    //O contexto da palavra selecionada
    const [context, setContext] = useState()


    return (
        <ReadBookController navigation={navigation} wordToTranslate={wordToTranslate} setWordToTranslate={setWordToTranslate} phraseToTranslate={phraseToTranslate} setPhraseToTranslate={setPhraseToTranslate} positionTranslationModals={positionTranslationModals} setPositionTranslationModals={setPositionTranslationModals} currentPage={currentPage} setCurrentPage={setCurrentPage} showSlider={showSlider} setShowSlider={setShowSlider} sliderValue={sliderValue} setSliderValue={setSliderValue} bookLength={100} bookUrl={bookUrl} setBookUrl={setBookUrl} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} bookKey={route.params.bookKey} initialPage={initialPage} setInitialPage={setInitialPage} fileName={route.params.fileName} saveMetadata={route.params.saveMetadata} dictionaryLanguage={dictionaryLanguage} setDictionaryLanguage={setDictionaryLanguage} supportedDictionaryLanguages={supportedDictionaryLanguages} translationLanguage={translationLanguage} setTranslationLanguage={setTranslationLanguage} supportedTranslationLanguages={supportedTranslationLanguages} translation={translation} setTranslation={setTranslation} definition={definition} setDefinition={setDefinition} context={context} setContext={setContext} />
        )
}

export default ReadBookModel;