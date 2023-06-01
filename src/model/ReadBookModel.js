import ReadBookController from '../controller/ReadBookController'
import {useState} from 'react'

const ReadBookModel = ({ navigation, route }) => {

    //Armazena a palavra a ser traduzida (ou "", se não houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se não houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    //Define em que posição das telas as modais com as traduções devem aparecer ("bottom" ou "top")
    const [positionTranslationModals, setPositionTranslationModals] = useState("bottom")

    //Página a partir do qual o livro deve começar a ser mostrado
    const [initialPage, setInitialPage] = useState(route.params.initialPage)

    //Página atual do livro
    const [currentPage, setCurrentPage] = useState(route.params.initialPage)

    //Define se o Slider para mudança de página deve ser mostrado
    const [showSlider, setShowSlider] = useState(false)

    //Valor a ser mostrado ao lado do Slider
    const [sliderValue, setSliderValue] = useState(1)

    //url em que o livro pode ser acessado
    const [bookUrl, setBookUrl] = useState()

    //Idioma escolhido como nativo pelo usuário
    const [nativeLanguage, setNativeLanguage] = useState("")

    //Idioma em que deve se mostrar a definição no dicionário
    const [dictionaryLanguage, setDictionaryLanguage] = useState("")

    //Definição de um termo
    const [definition, setDefinition] = useState()

    //Idioma suportados pelo dicionário
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

    //Tradução do trecho selecionado
    const [translation, setTranslation] = useState()

    //Idiomas suportados para a tradução
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