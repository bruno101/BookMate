import {useEffect} from 'react'
import ListOfLanguages from './ListOfLanguages'
import Confirmation from './Confirmation'

//Nessa componente o usuário altera o idioma para o qual se deve traduzir
const ChangeLanguage = (props) => {

    //Não exibimos a barra inferior
    useEffect(() => {
        props.navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => props.navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, []);

    //Mostramos a componentente "Confirmation" no topo da tela; ela que mostra o botão de "SAVE CHANGES"
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: (props) => (
                <Confirmation onConfirm={ props.onConfirm }/>
            )
        });
    }, []);

    //A página mostra a lista de idiomas disponíveis
    return (<ListOfLanguages nativeLanguage={props.route.params.nativeLanguage} updateLanguage={props.updateLanguage} listOfLanguages={props.listOfLanguages} />)

}

export default ChangeLanguage;