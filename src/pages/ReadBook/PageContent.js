import { ScrollView } from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures'
import Paragraph from './Paragraph'

const PageContent = (props) => {

    //Pegamos o texto da página e dividimos em parágrafos. Passamos para a componente "Paragraph" o conteúdo de cada parágrafo.
    let paragraphsToShow = (props.textToShow.split("\n")).map(
        (paragraph, index) => {
            return < Paragraph key={index} content={paragraph} wordToTranslate={props.wordToTranslate} setWordToTranslate={props.setWordToTranslate} paragraphToTranslate={props.paragraphToTranslate} setParagraphToTranslate={props.setParagraphToTranslate} />
        }
    )

    //Se o usuário deslizou para a direita, vamos para a próxima página
    const onSwipeRight = () => {
        if (props.currentPage > 0) {
            props.setCurrentPage(props.currentPage - 1)
        }
    }

    //Se o usuário deslizou para a direita, vamos para a página anterior
    const onSwipeLeft = () => {
        if (props.currentPage + 1 < props.bookLength) {
            props.setCurrentPage(props.currentPage + 1)
        }
    }

    //Configurações para a detecção de quanto o usuário desliza para mudar de tela
    const config = {
        velocityThreshold: 0.15,
        directionalOffsetThreshold: 15
    };

    return (
        //Mostramos os parágrafos do livro (várias componentes do tipo Paragraph)

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