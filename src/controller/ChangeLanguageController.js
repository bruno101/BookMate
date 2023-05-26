import ChangeLanguage from '../view/ChangeLanguage/index'

const ChangeLanguageController = (props) => {

    const onConfirm = () => {
        //Salvar alteração de idioma do usuário após ele clicar em "SAVE CHANGES"
    }

    const updateLanguage = () => {
        //Essa função deve atualizar o idioma para o qual deve se traduzir
    }

    return (
        <ChangeLanguage navigation={props.navigation} route={props.route} onConfirm={onConfirm} updateLanguage={updateLanguage} listOfLanguages={props.listOfLanguages} />
    )

}

export default ChangeLanguageController;