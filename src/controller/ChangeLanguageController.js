import ChangeLanguage from '../view/ChangeLanguage/index'
import * as LocalStorage from '../model/LocalStorage'
import { useEffect } from 'react'

const ChangeLanguageController = (props) => {

    useEffect(() => {

        initialNativeLanguage()

        setTheme()

    }, [])

    //Acessamos o idioma que estava definido como nativo ao se entrar na tela
    const initialNativeLanguage = async () => {

        props.nativeLanguageRef.current = await LocalStorage.getNativeLanguage()

    }

    //Atualiza o tema de acordo com o que está definido no armazenamento local
    const setTheme = async () => {
        props.setNightMode(await LocalStorage.getNightMode())
    }

    //Salva o novo idioma quando o usuário confirma
    const onConfirm = () => {
        LocalStorage.setNativeLanguage(props.nativeLanguageRef.current)
        props.navigation.goBack()
    }

    //Atualiza os atributos quando o usuário clica em um idioma
    const updateLanguage = (language) => {
        props.nativeLanguageRef.current = language
        props.setNativeLanguage(props.nativeLanguageRef.current)
    }

    return (
        <ChangeLanguage navigation={props.navigation} nativeLanguage={props.nativeLanguage} onConfirm={onConfirm} updateLanguage={updateLanguage} listOfLanguages={props.listOfLanguages} nightMode={props.nightMode} />
    )

}

export default ChangeLanguageController;