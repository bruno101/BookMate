import { TouchableOpacity, Text, Dimensions } from 'react-native'

var device = Dimensions.get('window');

const Confirmation = (props) => {

    return (
        //Quando o usuário clica em "SAVE CHANGES" chamamos a função "onConfirm"
        <TouchableOpacity style={{ marginLeft: device.width - 250, width: 250, height: 50, justifyContent: 'center' }} onPress={props.onConfirm}>
            <Text style={{ color: "#6495ED", fontWeight: "bold", fontSize: 16 }}> SAVE CHANGES </Text>
        </TouchableOpacity>
    )
}

export default Confirmation;
