import { View, ScrollView, Text, Image, Dimensions } from 'react-native'

const device = Dimensions.get("window")


//Cada um dos exemplos a serem mostrados
const Example = (props) => {

    return (

        <View style={{ paddingBottom: 5, paddingTop: 5, marginLeft: "2%", width: "96%", borderBottomColor: "#e3e6e8", borderBottomWidth: 1 }}>

            <View>

                <Text style={{ color: "#327dad"}}>
                    {props.sourceText.split("<em>")[0]}
                    <Text style={{ fontWeight: "bold" }}>
                        {props.sourceText.split("<em>")[1].split("</em>")[0]}
                    </Text>
                    {props.sourceText.split("<em>")[1].split("</em>")[1]}
                </Text>

            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

                <Image source={require("../../../assets/turn-down.png")} style={{ width: 15, aspectRatio: 1, marginTop: 2 }} />

                <Text style={{ marginLeft: 3, width: device.width * 0.7 * 0.9 * 0.96 - 22, color: "#404040" }}>
                    {props.targetText.split("<em>")[0]}
                    <Text style={{ fontWeight: "bold" }}>
                        {props.targetText.split("<em>")[1].split("</em>")[0]}
                    </Text>
                    {props.targetText.split("<em>")[1].split("</em>")[1]}
                </Text>

            </View>

        </View>

        )

}

const ReversoContextModal = (props) => {

    //Geramos, a partir do índice de palavras, componentes "Example" para a exibição
    let exampleList = props.context.map((example, index) => {
        return <Example key={index} sourceText={example.s_text} targetText={example.t_text} />
    })

    return (

        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/context.png")} style={{ marginLeft: 14, width: 30, aspectRatio: 1, marginTop: 8, marginBottom: 5 }} />
                <Text style={{ color: "black", fontSize: 18, marginLeft: 5, marginTop: 8 }} > Reverso Context </Text>
            </View>

            <View style={{ width: "90%", marginLeft: "5%", height: device.height * 0.35 - 75, marginTop: 5, backgroundColor: "#F4F9FE", borderColor: "#E5E5E5", borderWidth: 1.5, borderRadius: 4 }}>
                <ScrollView>
                    {exampleList}
                </ScrollView>
            </View>

            

        </View>

    )

}

export default ReversoContextModal;