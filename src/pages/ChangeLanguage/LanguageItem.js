import {View, Image, Text, TouchableOpacity} from 'react-native'

//Cada item da lista de idiomas
const LanguageItem = (props) => {

    const updateLanguage = () => {
        //Essa função deve atualizar o idioma para o qual deve se traduzir
    }

    //Se o idioma do item já é o escolhido, ele não deve ser clicável
    //nativeLanguage por enquanto está registrado em "dummyData" como português
    if (props.value == nativeLanguage.code) {

        return (

            <View
                style={{ height: 60, width: "100%", backgroundColor: "#AFE1AF", marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', borderColor: "#E5E5E5", borderWidth: 1.5, marginLeft: "5%", width: "90%", borderRadius: 10 }}
            >

                <Image
                    style={{ width: 48, aspectRatio: 1.0, marginLeft: 30, marginTop: 5 }}
                    source={props.imagePath}
                    resizeMode="stretch"
                />

                <Text style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 16,
                    textAlignVertical: "center",
                    marginTop: 7,
                    marginLeft: 10
                }}> {props.title} </Text>

            </View>

        )

    } else {

        //Se o idioma do item é diferente do escolhido atualmente, clicar no item deve chamar "updateLanguage"
        return (

            <TouchableOpacity
                style={{ height: 60, width: "100%", backgroundColor: "white", marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', borderColor: "#E5E5E5", borderWidth: 1.5, marginLeft: "5%", width: "90%", borderRadius: 10 }}
                onPress={updateLanguage}
            >

                <Image
                    style={{ width: 48, aspectRatio: 1.0, marginLeft: 30, marginTop: 5 }}
                    source={props.imagePath}
                    resizeMode="stretch"
                />

                <Text style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 16,
                    textAlignVertical: "center",
                    marginTop: 7,
                    marginLeft: 10
                }}> {props.title} </Text>

            </TouchableOpacity>
            
            )

    }

}

export default LanguageItem;
