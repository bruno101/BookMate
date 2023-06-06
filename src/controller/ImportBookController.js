import { useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker'
import * as LocalStorage from '../model/LocalStorage'

const ImportBookController = ({ navigation }) => {

    const importFile = async () => {

        //Na importação de um livro usamos um DocumentPicker para obtermos a uri
        try {

            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: ['application/epub+zip']
            });
            //Importamos o livro e redirecionamos o usuário para a tela de leitura
            await LocalStorage.importBook(response[0].uri, response[0].name).then(
                async (newBook) => {

                    navigation.navigate('Home', { screen: 'ReadBook', initial: false, params: { bookKey: newBook.bookKey, bookTitle: newBook.title, locations: newBook.locations, fileName: newBook.fileName, initialPage: "1", saveMetadata: true } })
                    

                }

            )
            


        } catch (e) {

            console.log(e)
            //Voltamos para a tela anterior depois da importação
            navigation.goBack()

        }

    }

    useEffect(() => {
        importFile()
    }, [])


}

export default ImportBookController;