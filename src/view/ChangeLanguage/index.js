import {useEffect} from 'react'
import ListOfLanguages from './ListOfLanguages'
import Confirmation from './Confirmation'

//Nessa componente o usu�rio altera o idioma para o qual se deve traduzir
const ChangeLanguage = (props) => {

    //N�o exibimos a barra inferior
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

    //Mostramos a componentente "Confirmation" no topo da tela; ela que mostra o bot�o de "SAVE CHANGES"
    useEffect(() => {
        props.navigation.setOptions({
            headerStyle: { backgroundColor: props.nightMode ? "#151d4a" : "white" },
            headerTintColor: props.nightMode ? "white" : "black",
            headerTitle: () => (
                <Confirmation onConfirm={props.onConfirm} nightMode={props.nightMode} />
            )
        });
    }, [props.nightMode]);

    //A p�gina mostra a lista de idiomas dispon�veis
    return (<ListOfLanguages nativeLanguage={props.nativeLanguage} updateLanguage={props.updateLanguage} listOfLanguages={props.listOfLanguages} nightMode={props.nightMode} />)

}

export default ChangeLanguage;