import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'

var device = Dimensions.get('window');

//Essa componente � sempre mostrada no limite superior da tela, e permite ao usu�rio alterar o idioma para o qual deve se traduzir
const UserLanguageBar = (props) => {

    //Dado o c�digo de um idioma, essa fun��o retorna o nome dele
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

    //Essa fun��o redireciona o usu�rio para a tela de mudan�a de idioma
    const changeLanguage = () => { props.navigation.navigate('ChangeLanguage') }

    //Note que "nativeLanguage" deve ser o idioma atual do usu�rio
    //Por enquanto esse idioma est� definido em 'DummyData' como portugu�s
    //O nome do idioma � clic�vel e clicar nele deve redirecionar para a tela de mudan�a de idioma
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
