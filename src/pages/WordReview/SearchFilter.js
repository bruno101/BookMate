import { View, Dimensions } from 'react-native'
import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

//Aqui está definido o DropDownPicker a partir do qual o usuário pode filtrar a lista de palavras por idioma
const SearchFilter = (props) => {

    const [open, setOpen] = useState(false);


    //Abaixo obtemos o conjunto de idiomas inclusos em "props.data" no formato {label: 'French', value: 'French'}, e incluindo a opção 'All'
    //Esses idiomas são os que serão exibidos no DropDownPicker
    const languageList = props.data.map((item) => { return (item.language.name) })
    languageList.push('All')
    let languageSet = [...new Set(languageList)].map((item) => { return ({ label: item, value: item }) });

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
                items={languageSet}
                setOpen={setOpen}
                value={props.language}
                setValue={props.setLanguage}
            />

        </View>

    )

}

export default SearchFilter;

