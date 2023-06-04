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
            showArrowIcon={props.showArrow}
            modalTitleStyle={{
                fontSize: 14,
                fontFamily: 'WorkSans-Bold',
                fontWeight: "bold",
                color: "#050A30",
            }}
            modalContentContainerStyle={{
                backgroundColor: "white"
            }}
            style={{
                minHeight: 30,
                backgroundColor: "white",
                borderWidth: 0,
                borderRadius: 0
            }}
            textStyle={{
                fontSize: 12,
                textAlign: "center",
                textTransform: 'uppercase',
                color: "#050A30"
            }}
            open={open}
            items={props.languages}
            setOpen={setOpen}
            value={props.selectedLanguage}
            setValue={props.setLanguage}
        />

        )

}

export default LanguagePicker;
