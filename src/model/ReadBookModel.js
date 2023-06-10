import ReadBookController from '../controller/ReadBookController'
import {useState, useRef} from 'react'

const ReadBookModel = ({ navigation, route }) => {

    //Título do livro a ser mostrado
    const [bookTitle, setBookTitle] = useState(route.params.bookTitle)

    //Armazena a palavra a ser traduzida (ou "", se não houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se não houver)
    const [phraseToTranslate, setPhraseToTranslate] = useState("")

    //Define em que posição das telas as modais com as traduções devem aparecer ("bottom" ou "top")
    const [positionTranslationModals, setPositionTranslationModals] = useState("bottom")

    //"Location" da página a partir do qual o livro deve começar a ser mostrado
    const [initialPage, setInitialPage] = useState("1")

    //"Location" da página atual do livro
    const currentPageRef = useRef("1")

    //Define se o Slider para mudança de página deve ser mostrado
    const [showSlider, setShowSlider] = useState(false)

    //Índice da "Location" da página atual do livro; a partir desse número é calculado o valor a ser mostrado ao lado do Slider
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
        { label: 'Dutch', value: 'nl' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Hebrew', value: 'he' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Polish', value: 'pl' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Romania', value: 'ro' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Swedish', value: 'sv' },
        { label: 'Turkish', value: 'tr' },
    ];

    //Idioma do qual deve se traduzir
    const [translationSourceLanguage, setTranslationSourceLanguage] = useState("")

    //Idioma para o qual deve se traduzir
    const [translationTargetLanguage, setTranslationTargetLanguage] = useState("")

    //Tradução do trecho selecionado
    const [translation, setTranslation] = useState("")

    //Idiomas suportados para a tradução
    const supportedTranslationSourceLanguages = [
        { label: 'Arabic', value: 'ar' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Dutch', value: 'nl' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Hebrew', value: 'he' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Polish', value: 'pl' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Romanian', value: 'ro' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Swedish', value: 'sv' },
        { label: 'Turkish', value: 'tr' },
    ];

    //Idiomas suportados para a tradução
    const supportedTranslationTargetLanguages = [
        { label: 'Arabic', value: 'ar' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Dutch', value: 'nl' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Hebrew', value: 'he' },
        { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Polish', value: 'pl' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Romanian', value: 'ro' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Swedish', value: 'sv' },
        { label: 'Turkish', value: 'tr' },
    ];

    //O contexto da palavra selecionada
    const [context, setContext] = useState([])

    const [locations, setLocations] = useState(route.params.locations)

    //A webview em que é mostrado o livro
    const webview = useRef();

    //Diz se o modo noturno foi selecionado
    const [nightMode, setNightMode] = useState(false)

    //Armazena a família e o tamanho da fonte
    const [font, setFont] = useState({ fontSize: "12", fontFamily: "" })

    return (
        <ReadBookController navigation={navigation} bookTitle={bookTitle} setBookTitle={setBookTitle} wordToTranslate={wordToTranslate} setWordToTranslate={setWordToTranslate} phraseToTranslate={phraseToTranslate} setPhraseToTranslate={setPhraseToTranslate} positionTranslationModals={positionTranslationModals} setPositionTranslationModals={setPositionTranslationModals} showSlider={showSlider} setShowSlider={setShowSlider} sliderValue={sliderValue} setSliderValue={setSliderValue} currentPageRef={currentPageRef} bookUrl={bookUrl} setBookUrl={setBookUrl} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} bookKey={route.params.bookKey} initialPage={initialPage} setInitialPage={setInitialPage} fileName={route.params.fileName} locations={locations} setLocations={setLocations} saveMetadata={route.params.saveMetadata} dictionaryLanguage={dictionaryLanguage} setDictionaryLanguage={setDictionaryLanguage} supportedDictionaryLanguages={supportedDictionaryLanguages} translationSourceLanguage={translationSourceLanguage} setTranslationSourceLanguage={setTranslationSourceLanguage} supportedTranslationSourceLanguages={supportedTranslationSourceLanguages} translationTargetLanguage={translationTargetLanguage} setTranslationTargetLanguage={setTranslationTargetLanguage} supportedTranslationTargetLanguages={supportedTranslationTargetLanguages} translation={translation} setTranslation={setTranslation} definition={definition} setDefinition={setDefinition} context={context} setContext={setContext} webview={webview} nightMode={nightMode} setNightMode={setNightMode} font={font} setFont={setFont} />
        )
}

export default ReadBookModel;