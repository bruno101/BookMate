import { View } from 'react-native'
import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

//Aqui está definido o DropDownPicker a partir do qual o usuário pode filtrar a lista de palavras por idioma
const SearchFilter = (props) => {

    const [open, setOpen] = useState(false);

    return (

        <View style={{ borderTopColor: "#eaeaea", borderTopWidth: 1, height: 45 }}>

            <DropDownPicker
                style={{
                    marginTop: 5,
                    minHeight: 35,
                    width: 130,
                    marginLeft: 15,
                    backgroundColor: "white",
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 10
                }}
                textStyle={{
                    fontSize: 13
                }}
                open={open}
                items={props.getLanguageSet()}
                setOpen={setOpen}
                value={props.language}
                setValue={props.setLanguage}
            />

        </View>

    )

}

export default SearchFilter;

