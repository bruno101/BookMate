import {View, Image, Text} from 'react-native'

//Define a aparÍncia da parte superior da tela
const Header = (props) => {

    return (
        <View style={{ flexDirection: "row", height: 50, marginTop: 10 }}>

            <Image source={require('../../assets/dictionary.png')}
                style={{ height: 50, width: 50, marginLeft: 30 }}
            />

            <Text style={{
                fontSize: 19,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: props.nightMode? "white" : "black",
                letterSpacing: 0.2,
                marginLeft: 20,
                marginTop: 10
            }}> Dictionary </Text>

        </View>
    )

}

export default Header;
