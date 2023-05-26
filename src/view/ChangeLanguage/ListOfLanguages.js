import {View, Text, FlatList} from 'react-native'
import LanguageItem from './LanguageItem'

const ListOfLanguages = (props) => {

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
                data={props.listOfLanguages}
                renderItem={({ item }) => (

                    <LanguageItem
                        id={item.id}
                        title={item.title}
                        value={item.value}
                        imagePath={item.imagePath}
                        nativeLanguage={props.nativeLanguage}
                        updateLanguage={props.updateLanguage}
                    />

                )}
                keyExtractor={item => item.id.toString()}
            />

        </View>


    )

}

export default ListOfLanguages;
