import { useState } from 'react'
import { View, ScrollView } from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures'
import Paragraph from './Paragraph'

//Vamos supor que as p�ginas a serem exibidas s�o as descritas abaixo
const bookContent = [

    {
        pageNumber: 0,
        pageContent: " Nullam luctus eros eget ex bibendum eleifend. Proin eget ante libero. Sed imperdiet blandit enim et ultricies. Ut at imperdiet sapien, at lacinia enim. Nam vehicula risus mi, fringilla eleifend augue pretium eu. \n Mauris non porttitor metus, vitae pellentesque ante. Nam est nisl, varius vitae enim sed, efficitur convallis arcu. \n Sed vulputate elit ac ligula varius pellentesque. \n Duis eget est efficitur, blandit nisi eu, ultricies quam. Mauris in finibus tortor, quis porttitor neque. Cras diam diam, accumsan et vestibulum ac, semper cursus purus. Curabitur in felis enim. \n Donec nulla velit, lacinia quis libero sit amet, blandit vehicula orci. In urna massa, condimentum et scelerisque sit amet, dictum et sapien. Nulla eget porttitor mi. Sed a posuere ex, eleifend sollicitudin nunc. Phasellus vestibulum felis ac porttitor viverra. Nullam luctus eros eget ex bibendum eleifend. Proin eget ante libero. Sed imperdiet blandit enim et ultricies. Ut at imperdiet sapien, at lacinia enim. Nam vehicula risus mi, fringilla eleifend augue pretium eu. \n Mauris non porttitor metus, vitae pellentesque ante. \n "
    },

    {
        pageNumber: 1,
        pageContent: " Duis eget est efficitur, blandit nisi eu, ultricies quam. Sed vulputate elit ac ligula varius pellentesque. \n Mauris in finibus tortor, quis porttitor neque. Cras diam diam, accumsan et vestibulum ac, semper cursus purus. Curabitur in felis enim. \n Donec nulla velit, lacinia quis libero sit amet, blandit vehicula orci. In urna massa, condimentum et scelerisque sit amet, dictum et sapien. Nulla eget porttitor mi. Sed a posuere ex, eleifend sollicitudin nunc. Phasellus vestibulum felis ac porttitor viverra. Nullam luctus eros eget ex bibendum eleifend. Proin eget ante libero. Sed imperdiet blandit enim et ultricies. Ut at imperdiet sapien, at lacinia enim. Nam vehicula risus mi, fringilla eleifend augue pretium eu. \n Mauris non porttitor metus, vitae pellentesque ante. Nam est nisl, varius vitae enim sed, efficitur convallis arcu. \n Sed vulputate elit ac ligula varius pellentesque. \n Duis eget est efficitur, blandit nisi eu, ultricies quam. Mauris in finibus tortor, quis porttitor neque. Cras diam diam, accumsan et vestibulum ac, semper cursus purus. Curabitur in felis enim. \n Donec nulla velit, lacinia quis libero sit amet, blandit vehicula orci. In urna massa, condimentum et scelerisque sit amet, dictum et sapien. Nulla eget porttitor mi. Sed a posuere ex, eleifend sollicitudin nunc. Phasellus vestibulum felis ac porttitor viverra. Nullam luctus eros eget ex bibendum eleifend. Proin eget ante libero. Sed imperdiet blandit enim et ultricies. Ut at imperdiet sapien, at lacinia enim. Nam vehicula risus mi, fringilla eleifend augue pretium eu. \n Mauris non porttitor metus, vitae pellentesque ante. Nam est nisl, varius vitae enim sed, efficitur convallis arcu. \n "
    },

    {
        pageNumber: 2,
        pageContent: " Cras fermentum feugiat nisl, egestas gravida est facilisis sit amet. In in eros dignissim, varius justo quis, fermentum justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat condimentum orci, eget efficitur urna aliquet nec. Nullam non quam nibh. Maecenas sollicitudin vestibulum justo, et aliquet lectus vehicula nec. Fusce et tincidunt dui. Nulla tempus blandit tempus. Phasellus turpis sem, tincidunt eget nibh semper, fringilla scelerisque mi. Aliquam id sem ac justo molestie sagittis non non ipsum. Mauris nec pellentesque justo."
    }

]

const ReadBook = ({ route }) => {

    //Por enquanto "currentPage" � inicializado como 0, mas idealmente devemos salvar o n�mero da p�gina em que o usu�rio estava na �ltima vez que leu o livro
    const [currentPage, setCurrentPage] = useState(0)

    //Pegamos o texto da p�gina e dividimos em par�grafos. Passamos para a componente "Paragraph" o conte�do de cada par�grafo.
    let textToShow = bookContent[currentPage].pageContent
    let paragraphsToShow = (textToShow.split("\n")).map(
        (paragraph, index) => {
            return < Paragraph key={index} content={paragraph} />
        }
    )

    //Se o usu�rio deslizou para a direita, vamos para a pr�xima p�gina
    const onSwipeRight = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    //Se o usu�rio deslizou para a direita, vamos para a p�gina anterior
    const onSwipeLeft = () => {
        if (currentPage + 1 < bookContent.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    //Configura��es para a detec��o de quanto o usu�rio desliza para mudar de tela
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50
    };

    return (
        //Mostramos os par�grafos do livro (v�rias componentes do tipo Paragraph)
        <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={config} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={{ marginTop: 15 }}>
                    {paragraphsToShow}
                </View>
            </ScrollView>
        </GestureRecognizer>

    )

}

export default ReadBook;