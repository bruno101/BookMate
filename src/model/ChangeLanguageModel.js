import ChangeLanguageController from '../controller/ChangeLanguageController'
import {useRef, useState} from 'react'

const ChangeLanguageModel = ({ navigation, route }) => {

    //Lista de linguagens ofertadas, com os caminhos para as imagens das bandeiras correspondentes
    const listOfLanguages = [
        { id: '1', title: 'Arabic', value: 'ar', imagePath: require('../assets/ar-flag.png') },
        { id: '2', title: 'Chinese', value: 'zh', imagePath: require('../assets/zh-flag.png') },
        { id: '13', title: 'Dutch', value: 'nl', imagePath: require('../assets/nl-flag.png') },
        { id: '3', title: 'English', value: 'en', imagePath: require('../assets/en-flag.png') },
        { id: '4', title: 'French', value: 'fr', imagePath: require('../assets/fr-flag.png') },
        { id: '5', title: 'German', value: 'de', imagePath: require('../assets/de-flag.png') },
        { id: '14', title: 'Hebrew', value: 'he', imagePath: require('../assets/he-flag.png') },
        { id: '6', title: 'Italian', value: 'it', imagePath: require('../assets/it-flag.png') },
        { id: '7', title: 'Japanese', value: 'ja', imagePath: require('../assets/ja-flag.png') },
        { id: '8', title: 'Korean', value: 'ko', imagePath: require('../assets/ko-flag.png') },
        { id: '15', title: 'Polish', value: 'pl', imagePath: require('../assets/pl-flag.png') },
        { id: '9', title: 'Portuguese', value: 'pt', imagePath: require('../assets/pt-flag.png') },
        { id: '16', title: 'Romanian', value: 'de', imagePath: require('../assets/ro-flag.png') },
        { id: '10', title: 'Russian', value: 'ru', imagePath: require('../assets/ru-flag.png') },
        { id: '11', title: 'Spanish', value: 'es', imagePath: require('../assets/es-flag.png') },
        { id: '17', title: 'Swedish', value: 'sv', imagePath: require('../assets/sv-flag.png') },
        { id: '12', title: 'Turkish', value: 'tr', imagePath: require('../assets/tr-flag.png') },
    ];

    //Referência para o idioma selecionado como nativo; precisamos dessa referência para salvarmos o idioma correto em 'onConfirm'
    const nativeLanguageRef = useRef({ name: 'English', code: 'en' })

    //Idioma selecionado como nativo, o mesmo que o "current" em "nativeLangueRef"
    const [nativeLanguage, setNativeLanguage] = useState(nativeLanguageRef.current)

    const [nightMode, setNightMode] = useState(false)

    return (
        <ChangeLanguageController navigation={navigation} route={route} listOfLanguages={listOfLanguages} nativeLanguageRef={nativeLanguageRef} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} nightMode={nightMode} setNightMode={setNightMode} />
    )
}

export default ChangeLanguageModel;