import {View, Text, FlatList} from 'react-native'
import LanguageItem from './LanguageItem'

const ListOfLanguages = (props) => {

    //Lista de linguagens ofertadas, com os caminhos para as imagens das bandeiras correspondentes
    const listOfLanguages = [
        { id: '1', title: 'Arabic', value: 'ar', imagePath: require('../../assets/ar-flag.png') },
        { id: '2', title: 'Chinese', value: 'zh', imagePath: require('../../assets/zh-flag.png') },
        { id: '3', title: 'English', value: 'en', imagePath: require('../../assets/en-flag.png') },
        { id: '4', title: 'French', value: 'fr', imagePath: require('../../assets/fr-flag.png') },
        { id: '5', title: 'German', value: 'de', imagePath: require('../../assets/de-flag.png') },
        { id: '6', title: 'Italian', value: 'it', imagePath: require('../../assets/it-flag.png') },
        { id: '7', title: 'Japanese', value: 'ja', imagePath: require('../../assets/ja-flag.png') },
        { id: '8', title: 'Korean', value: 'ko', imagePath: require('../../assets/ko-flag.png') },
        { id: '9', title: 'Portuguese', value: 'pt', imagePath: require('../../assets/pt-flag.png') },
        { id: '10', title: 'Russian', value: 'ru', imagePath: require('../../assets/ru-flag.png') },
        { id: '11', title: 'Spanish', value: 'es', imagePath: require('../../assets/es-flag.png') },
        { id: '12', title: 'Turkish', value: 'tr', imagePath: require('../../assets/tr-flag.png') },
    ];

    return (

        //Geramos uma FlatList a partir da lista de linguagens
        //Cada item dessa lista é um "LanguageItem"
        <View style={{ backgroundColor: "#fbfbfb", marginBottom: 60 }}>

            <Text style={{
                fontSize: 14,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "#666666",
                letterSpacing: 0.2,
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 20
            }}> TRANSLATE TO </Text>

            <FlatList
                data={listOfLanguages}
                renderItem={({ item }) => (

                    <LanguageItem
                        id={item.id}
                        title={item.title}
                        value={item.value}
                        imagePath={item.imagePath}
                    />

                )}
                keyExtractor={item => item.id.toString()}
            />

        </View>


    )

}

export default ListOfLanguages;
