import { View, ScrollView, Text, Image } from 'react-native'

const ReversoContextModal = (props) => {

    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/context.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Reverso Context </Text>
            </View>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, marginBottom: 10, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Show context of the word {props.word} </Text>

            </ScrollView>

        </View>

    )

}

export default ReversoContextModal;