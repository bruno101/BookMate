import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'

var device = Dimensions.get('window');

//Essa componente é sempre mostrada no limite superior da tela, e permite ao usuário alterar o idioma para o qual deve se traduzir
const UserLanguageBar = (props) => {

    //Dado o código de um idioma, essa função retorna o nome dele
    const fromCodeToLanguage = (code) => {
        switch (code) {
            case "en":
                return "English";
            case "es":
                return "Spanish";
            case "ru":
                return "Russian";
            case "pt":
                return "Portuguese";
            case "de":
                return "German";
        }
    }

    //Essa função redireciona o usuário para a tela de mudança de idioma
    const changeLanguage = () => { props.navigation.navigate('ChangeLanguage') }

    //Note que "nativeLanguage" deve ser o idioma atual do usuário
    //Por enquanto esse idioma está definido em 'DummyData' como português
    //O nome do idioma é clicável e clicar nele deve redirecionar para a tela de mudança de idioma
    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "white", flex: 1, marginTop: 0 }}>

            <View style={{ width: device.width - 60, flexDirection: 'row', flexWrap: 'wrap' }}>

                <Text style={{
                    fontSize: 14,
                    fontFamily: 'WorkSans-Bold',
                    color: "black",
                    letterSpacing: 0.2,
                }}> Translate to: </Text>

                <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "white" }} onPress={changeLanguage} >

                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'WorkSans-Bold',
                        fontWeight: 'bold',
                        color: "black",
                        letterSpacing: 0.2,
                    }}>  {fromCodeToLanguage(nativeLanguage)}</Text>

                    <Image source={require('../assets/change.png')}
                        style={{ width: 21, marginLeft: "2%", height: 21 }}
                        resizeMode="stretch" />

                </TouchableOpacity>

            </View>

        </View>
    )

}

export default UserLanguageBar;
