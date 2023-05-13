import { View, Text } from 'react-native'

const SectionHeader = (props) => {

    return (
        <View style={{ flexDirection: "row", height: 50, marginTop: 15 }}>

            <Text style={{
                fontSize: 16,
                color: "grey",
                marginLeft: 20,
                marginTop: 15
            }}> {props.text} </Text>

        </View>
        )

}

export default SectionHeader;
