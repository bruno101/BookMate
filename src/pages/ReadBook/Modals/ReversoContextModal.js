import { View, ScrollView, Text } from 'react-native'

const ReversoContextModal = (props) => {

    return (

        <View style={{ flex: 1 }}>

            <Text style={{ color: "black", fontSize: 20, marginLeft: 5, marginTop: 10 }} > Reverso Context </Text>

            <ScrollView style={{ width: "90%", marginLeft: "5%", marginTop: 5, marginBottom: 10, borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }} >

                <Text style={{ color: "grey", fontSize: 14, marginLeft: 5, marginTop: 10 }}> Show context of the word {props.word} </Text>

            </ScrollView>

        </View>

    )

}

export default ReversoContextModal;