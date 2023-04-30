import {View, Image, Text} from 'react-native'

//Define a aparência da barra superior da tela
const TopBar = () => {

    return (
        <View style={{ flexDirection: "row", height: 50 }}>

            <Image source={require('../../assets/dictionary.png')}
                style={{ height: 50, width: 50 }}
            />

            <Text style={{
                fontSize: 19,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "black",
                letterSpacing: 0.2,
                marginLeft: 20,
                marginTop: 10
            }}> Dictionary </Text>

        </View>
    )

}

export default TopBar;
