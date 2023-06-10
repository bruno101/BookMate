import { useState } from 'react'
import HomeController from '../controller/HomeController'

const HomeModel = ({navigation}) => {

    const [bookIndex, setBookIndex] = useState([])
    //Índice do último livro aberto pelo usuário; -1 se não houver esse livro
    const [currentlyReading, setCurrentlyReading] = useState(-1)

    const [nativeLanguage, setNativeLanguage] = useState({ name: "", code: "" })

    const [nightMode, setNightMode] = useState(false)


    return (
        <HomeController bookIndex={bookIndex} setBookIndex={setBookIndex} currentlyReading={currentlyReading} setCurrentlyReading={setCurrentlyReading} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} navigation={navigation} nightMode={nightMode} setNightMode={setNightMode} />
        )

}

export default HomeModel;