import { View, Image, Text } from 'react-native'

//Define a aparÍncia da parte superior da tela
const Header = (props) => {

    return (
        <View style={{ flexDirection: "row", height: 50 }}>

            <Image source={require('../../assets/settings1.png')}
                style={{ height: 40, width: 40, marginLeft: 30, marginTop: 15 }}
            />

            <Text style={{
                fontSize: 19,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: props.nightMode ? "white" : "black",
                letterSpacing: 0.5,
                marginLeft: 20,
                marginTop: 18
            }}> Settings </Text>

        </View>
    )

}

export default Header;

