import { useState } from 'react'
import HomeController from '../controller/HomeController'

const HomeModel = ({navigation}) => {

    //O índice de livros
    const [bookIndex, setBookIndex] = useState([])

    //Índice do último livro aberto pelo usuário; -1 se não houver esse livro
    const [currentlyReading, setCurrentlyReading] = useState(-1)

    //O idioma nativo do usuário (mostrado no topo da tela)
    const [nativeLanguage, setNativeLanguage] = useState({ name: "", code: "" })

    //O tema escolhido pelo usuário
    const [nightMode, setNightMode] = useState(false)


    return (
        <HomeController bookIndex={bookIndex} setBookIndex={setBookIndex} currentlyReading={currentlyReading} setCurrentlyReading={setCurrentlyReading} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} navigation={navigation} nightMode={nightMode} setNightMode={setNightMode} />
        )

}

export default HomeModel;