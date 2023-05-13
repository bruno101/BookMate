import { useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker'

const ImportBook = ({ navigation }) => {


    const importFile = async () => {

        //Na importa��o de um livro usamos um DocumentPicker para obtermos a uri
        try {

            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: ['application/epub+zip']
            });
            console.log(response[0].uri)

        } catch (e) {

            console.log(e)

        }

        //Deve importar um livro dos arquivos do usu�rio

        //Voltamos para a tela anterior depois da importa��o
        navigation.goBack()

    }

    useEffect(() => {
        importFile()
    }, [])

}

export default ImportBook;