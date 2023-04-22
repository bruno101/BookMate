import {View, Text} from "react-native"

const ReadBook = ({ route }) => {

    return (

        <View>
            <Text style={{ color: "black" }}> This is book {route.params.bookKey} </Text>
        </View>

        )

}

export default ReadBook;