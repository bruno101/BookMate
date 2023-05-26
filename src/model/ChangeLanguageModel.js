import ChangeLanguageController from '../controller/ChangeLanguageController'

const ChangeLanguageModel = ({ navigation, route }) => {

    //Lista de linguagens ofertadas, com os caminhos para as imagens das bandeiras correspondentes
    const listOfLanguages = [
        { id: '1', title: 'Arabic', value: 'ar', imagePath: require('../assets/ar-flag.png') },
        { id: '2', title: 'Chinese', value: 'zh', imagePath: require('../assets/zh-flag.png') },
        { id: '3', title: 'English', value: 'en', imagePath: require('../assets/en-flag.png') },
        { id: '4', title: 'French', value: 'fr', imagePath: require('../assets/fr-flag.png') },
        { id: '5', title: 'German', value: 'de', imagePath: require('../assets/de-flag.png') },
        { id: '6', title: 'Italian', value: 'it', imagePath: require('../assets/it-flag.png') },
        { id: '7', title: 'Japanese', value: 'ja', imagePath: require('../assets/ja-flag.png') },
        { id: '8', title: 'Korean', value: 'ko', imagePath: require('../assets/ko-flag.png') },
        { id: '9', title: 'Portuguese', value: 'pt', imagePath: require('../assets/pt-flag.png') },
        { id: '10', title: 'Russian', value: 'ru', imagePath: require('../assets/ru-flag.png') },
        { id: '11', title: 'Spanish', value: 'es', imagePath: require('../assets/es-flag.png') },
        { id: '12', title: 'Turkish', value: 'tr', imagePath: require('../assets/tr-flag.png') },
    ];

    return (
        <ChangeLanguageController navigation={navigation} route={route} listOfLanguages={listOfLanguages} />
    )
}

export default ChangeLanguageModel;