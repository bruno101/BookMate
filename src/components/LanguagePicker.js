import { useState } from 'react'
import { Dimensions } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

const device = Dimensions.get("window")

//Esse é um "Picker" simples usado em algumas modais quando o usuário precisa selecionar um idioma
const LanguagePicker = (props) => {

    const [open, setOpen] = useState(false);

    return (

        <DropDownPicker
            listMode="MODAL"
            placeholder="Detect"
            modalTitle="SELECT A LANGUAGE"
            modalTitleStyle={{
                fontSize: 14,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "#666666"
            }}
            modalContentContainerStyle={{
                backgroundColor: "white"
            }}
            style={{
                marginTop: 5,
                minHeight: 30,
                width: device.width * 0.7 - 160,
                marginLeft: 15,
                backgroundColor: "#E1E1E1",
                borderWidth: 0,
                borderRadius: 0
            }}
            textStyle={{
                fontSize: 13
            }}
            maxHeight={300}
            open={open}
            items={props.languages}
            setOpen={setOpen}
            value={props.selectedLanguage}
            setValue={props.setLanguage}
        />

        )

}

export default LanguagePicker;
