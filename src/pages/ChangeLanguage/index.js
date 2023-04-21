import {useEffect} from 'react'
import ListOfLanguages from './ListOfLanguages'
import Confirmation from './Confirmation'

//Nessa componente o usuário altera o idioma para o qual se deve traduzir
const ChangeLanguage = ({ navigation }) => {

    const onConfirm = () => {
        //Salvar alteração de idioma do usuário após ele clicar em "SAVE CHANGES"
    }

    //Executa sempre que essa tela é aberta
    //Adicionamos a componentente "Confirmation" ao topo da tela; ela que mostra o botão de "SAVE CHANGES"
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Confirmation onConfirm={ onConfirm }/>
            )
        });
    }, []);

    //A página mostra a lista de idiomas disponíveis
    return (<ListOfLanguages />)

}

export default ChangeLanguage;