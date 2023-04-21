import {useEffect} from 'react'
import ListOfLanguages from './ListOfLanguages'
import Confirmation from './Confirmation'

//Nessa componente o usu�rio altera o idioma para o qual se deve traduzir
const ChangeLanguage = ({ navigation }) => {

    const onConfirm = () => {
        //Salvar altera��o de idioma do usu�rio ap�s ele clicar em "SAVE CHANGES"
    }

    //Executa sempre que essa tela � aberta
    //Adicionamos a componentente "Confirmation" ao topo da tela; ela que mostra o bot�o de "SAVE CHANGES"
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Confirmation onConfirm={ onConfirm }/>
            )
        });
    }, []);

    //A p�gina mostra a lista de idiomas dispon�veis
    return (<ListOfLanguages />)

}

export default ChangeLanguage;