import ChangeLanguage from '../view/ChangeLanguage/index'
import * as LocalStorage from '../model/LocalStorage'
import { useEffect } from 'react'

const ChangeLanguageController = (props) => {

    useEffect(() => {

        console.log("here")
        //Acessamos o idioma que estava definido como nativo ao se entrar na tela
        initialNativeLanguage()

    }, [])

    const initialNativeLanguage = async () => {

        props.nativeLanguageRef.current = await LocalStorage.getNativeLanguage()

    }

    const onConfirm = () => {
        console.log("confirm", props.nativeLanguageRef.current)
        LocalStorage.setNativeLanguage(props.nativeLanguageRef.current)
        props.navigation.goBack()
    }

    const updateLanguage = (language) => {
        props.nativeLanguageRef.current = language
        props.setNativeLanguage(props.nativeLanguageRef.current)
        console.log("native", props.nativeLanguageRef.current)
    }

    return (
        <ChangeLanguage navigation={props.navigation} nativeLanguage={props.nativeLanguage} onConfirm={onConfirm} updateLanguage={updateLanguage} listOfLanguages={props.listOfLanguages} />
    )

}

export default ChangeLanguageController;