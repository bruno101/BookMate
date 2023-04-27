import { ScrollView } from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures'
import Paragraph from './Paragraph'

const PageContent = (props) => {

    //Pegamos o texto da p�gina e dividimos em par�grafos. Passamos para a componente "Paragraph" o conte�do de cada par�grafo.
    let paragraphsToShow = (props.textToShow.split("\n")).map(
        (paragraph, index) => {
            return < Paragraph key={index} content={paragraph} wordToTranslate={props.wordToTranslate} setWordToTranslate={props.setWordToTranslate} paragraphToTranslate={props.paragraphToTranslate} setParagraphToTranslate={props.setParagraphToTranslate} />
        }
    )

    //Se o usu�rio deslizou para a direita, vamos para a pr�xima p�gina
    const onSwipeRight = () => {
        if (props.currentPage > 0) {
            props.setCurrentPage(props.currentPage - 1)
        }
    }

    //Se o usu�rio deslizou para a direita, vamos para a p�gina anterior
    const onSwipeLeft = () => {
        if (props.currentPage + 1 < props.bookLength) {
            props.setCurrentPage(props.currentPage + 1)
        }
    }

    //Configura��es para a detec��o de quanto o usu�rio desliza para mudar de tela
    const config = {
        velocityThreshold: 0.15,
        directionalOffsetThreshold: 15
    };

    return (
        //Mostramos os par�grafos do livro (v�rias componentes do tipo Paragraph)

        <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={config} style={{ backgroundColor: "white", flex: 1 }}>


            <ScrollView
                      style={{ marginTop: 10 }}
            >

                {paragraphsToShow}

            </ScrollView>

            </GestureRecognizer>


    )

}


export default PageContent;