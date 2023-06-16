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
    const [initialPage, setInitialPage] = useState("-1")

    //"Location" da página atual do livro
    const currentPageRef = useRef("-1")

    //Define se o Slider para mudança de página deve ser mostrado
    const [showSlider, setShowSlider] = useState(false)

    //Índice da "Location" da página atual do livro; a partir desse número é calculado o valor a ser mostrado ao lado do Slider
    const [sliderValue, setSliderValue] = useState(-1)

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

    //Idioma de origem detectado
    const [detectedLanguage, setDetectedLanguage] = useState("")

    //Idiomas suportados para a tradução
    const supportedTranslationSourceLanguages = [
        { label: 'Arabic', value: 'ar' }, { label: 'Chinese (Simplified)', value: 'zh' }, { label: 'Chinese (Traditional)', value: 'zh-TW' },
        { label: 'Dutch', value: 'nl' }, { label: 'English', value: 'en' }, { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' }, { label: 'Hebrew', value: 'he' }, { label: 'Italian', value: 'it' },
        { label: 'Japanese', value: 'ja' },{ label: 'Korean', value: 'ko' }, { label: 'Polish', value: 'pl' },
        { label: 'Portuguese', value: 'pt' }, { label: 'Romanian', value: 'ro' },  { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' }, { label: 'Swedish', value: 'sv' }, { label: 'Turkish', value: 'tr' },
        { label: 'Afrikaans', value: 'af' }, { label: 'Albanian', value: 'sq' }, { label: 'Amharic', value: 'am' },
        { label: 'Armenian', value: 'hy' }, { label: 'Assamese', value: 'as' }, { label: 'Aymara', value: 'ay' },
        { label: 'Azerbaijani', value: 'az' }, { label: 'Bambara', value: 'bm' }, { label: 'Basque', value: 'eu' },
        { label: 'Belarusian', value: 'be' }, { label: 'Bengali', value: 'bn' }, { label: 'Bhojpuri', value: 'bho' },
        { label: 'Bosnian', value: 'bs' }, { label: 'Bulgarian', value: 'bg' }, { label: 'Catalan', value: 'ca' },
        { label: 'Cebuano', value: 'ceb' }, { label: 'Corsican', value: 'co' }, { label: 'Croatian', value: 'hr' },
        { label: 'Czech', value: 'cs' }, { label: 'Danish', value: 'da' }, { label: 'Dhivehi', value: 'dv' },
        { label: 'Dogri', value: 'doi' }, { label: 'Esperanto', value: 'eo' }, { label: 'Estonian', value: 'et' },
        { label: 'Ewe', value: 'ee' }, { label: 'Filipino (Tagalog)', value: 'fil' }, { label: 'Finnish', value: 'fi' },
        { label: 'Frisian', value: 'fy' }, { label: 'Galician', value: 'gl' }, { label: 'Georgian', value: 'ka' },
        { label: 'Greek', value: 'el' }, { label: 'Guarani', value: 'gn' }, { label: 'Gujarati', value: 'gu' },
        { label: 'Haitian Creole', value: 'ht' }, { label: 'Hausa', value: 'ha' }, { label: 'Hawaiian', value: 'haw' },
        { label: 'Hindi', value: 'hi' }, { label: 'Hmong', value: 'hmn' }, { label: 'Hungarian', value: 'hu' },
        { label: 'Icelandic', value: 'is' }, { label: 'Igbo', value: 'ig' }, { label: 'Ilocano', value: 'ilo' },
        { label: 'Indonesian', value: 'id' }, { label: 'Irish', value: 'ga' }, { label: 'Javanese', value: 'jv' },
        { label: 'Kannada', value: 'kn' }, { label: 'Kazakh', value: 'kk' }, { label: 'Khmer', value: 'km' },
        { label: 'Kinyarwanda', value: 'rw' }, { label: 'Konkani', value: 'gom' }, { label: 'Krio', value: 'kri' },
        { label: 'Kurdish', value: 'ku' }, { label: 'Kurdish (Sorani)', value: 'ckb' }, { label: 'Kyrgyz', value: 'ky' },
        { label: 'Lao', value: 'lo' }, { label: 'Latin', value: 'la' }, { label: 'Latvian', value: 'lv' },
        { label: 'Lingala', value: 'ln' }, { label: 'Lithuanian', value: 'lt' }, { label: 'Luganda', value: 'lg' },
        { label: 'Luxembourgish', value: 'lb' }, { label: 'Macedonian', value: 'mk' }, { label: 'Maithili', value: 'mai' },
        { label: 'Malagasy', value: 'mg' }, { label: 'Malay', value: 'ms' }, { label: 'Malayalam', value: 'ml' },
        { label: 'Maltese', value: 'mt' }, { label: 'Maori', value: 'mi' }, { label: 'Marathi', value: 'mr' },
        { label: 'Meiteilon (Manipuri)', value: 'mni-Mtei' }, { label: 'Mizo', value: 'lus' }, { label: 'Mongolian', value: 'mn' },
        { label: 'Myanmar (Burmese)', value: 'my' }, { label: 'Nepali', value: 'ne' }, { label: 'Norwegian', value: 'no' },
        { label: 'Nyanja (Chichewa)', value: 'ny' }, { label: 'Odia (Oriya)', value: 'or' }, { label: 'Oromo', value: 'om' },
        { label: 'Pashto', value: 'ps' }, { label: 'Persian', value: 'fa' }, { label: 'Punjabi', value: 'pa' },
        { label: 'Quechua', value: 'qu' }, { label: 'Samoan', value: 'sm' }, { label: 'Sanskrit', value: 'sa' },
        { label: 'Scots Gaelic', value: 'gd' }, { label: 'Sepedi', value: 'nso' }, { label: 'Serbian', value: 'sr' },
        { label: 'Sesotho', value: 'st' }, { label: 'Shona', value: 'sn' }, { label: 'Sindhi', value: 'sd' },
        { label: 'Sinhala (Sinhalese)', value: 'si' }, { label: 'Slovak', value: 'sk' }, { label: 'Slovenian', value: 'sl' },
        { label: 'Somali', value: 'so' }, { label: 'Sundanese', value: 'su' }, { label: 'Swahili', value: 'sw' },
        { label: 'Tagalog (Filipino)', value: 'tl' }, { label: 'Tajik', value: 'tg' }, { label: 'Tamil', value: 'ta' },
        { label: 'Tatar', value: 'tt' }, { label: 'Telugu', value: 'te' }, { label: 'Thai', value: 'th' },
        { label: 'Tigrinya', value: 'ti' }, { label: 'Tsonga', value: 'ts' }, { label: 'Turkmen', value: 'tk' },
        { label: 'Twi (Akan)', value: 'ak' }, { label: 'Ukrainian', value: 'uk' }, { label: 'Urdu', value: 'ur' },
        { label: 'Uyghur', value: 'ug' }, { label: 'Uzbek', value: 'uz' }, { label: 'Vietnamese', value: 'vi' },
        { label: 'Welsh', value: 'cy' }, { label: 'Xhosa', value: 'xh' }, { label: 'Yiddish', value: 'yi' },
        { label: 'Yoruba', value: 'yo' }, { label: 'Zulu', value: 'zu' },
    ];

    //Idiomas suportados para a tradução
    const supportedTranslationTargetLanguages = supportedTranslationSourceLanguages

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
        <ReadBookController navigation={navigation} bookTitle={bookTitle} setBookTitle={setBookTitle} wordToTranslate={wordToTranslate} setWordToTranslate={setWordToTranslate} phraseToTranslate={phraseToTranslate} setPhraseToTranslate={setPhraseToTranslate} positionTranslationModals={positionTranslationModals} setPositionTranslationModals={setPositionTranslationModals} showSlider={showSlider} setShowSlider={setShowSlider} sliderValue={sliderValue} setSliderValue={setSliderValue} currentPageRef={currentPageRef} bookUrl={bookUrl} setBookUrl={setBookUrl} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} bookKey={route.params.bookKey} initialPage={initialPage} setInitialPage={setInitialPage} fileName={route.params.fileName} locations={locations} setLocations={setLocations} saveMetadata={route.params.saveMetadata} dictionaryLanguage={dictionaryLanguage} setDictionaryLanguage={setDictionaryLanguage} supportedDictionaryLanguages={supportedDictionaryLanguages} translationSourceLanguage={translationSourceLanguage} setTranslationSourceLanguage={setTranslationSourceLanguage} supportedTranslationSourceLanguages={supportedTranslationSourceLanguages} translationTargetLanguage={translationTargetLanguage} setTranslationTargetLanguage={setTranslationTargetLanguage} supportedTranslationTargetLanguages={supportedTranslationTargetLanguages} detectedLanguage={detectedLanguage} setDetectedLanguage={setDetectedLanguage} translation={translation} setTranslation={setTranslation} definition={definition} setDefinition={setDefinition} context={context} setContext={setContext} webview={webview} nightMode={nightMode} setNightMode={setNightMode} font={font} setFont={setFont} />
        )
}

export default ReadBookModel;