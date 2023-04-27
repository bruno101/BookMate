import { useState } from 'react'
import { View, Dimensions } from "react-native"
import PageContent from './PageContent'
import CustomSlider from './CustomSlider'
import ParagraphTranslationModal from './Modals/ParagraphTranslationModal'
import WordModals from './Modals/WordModals'

const device = Dimensions.get("window")

//Vamos supor que as páginas a serem exibidas são as descritas abaixo
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


const ReadBook = (props) => {

    //Por enquanto "currentPage" é inicializado como 0, mas idealmente devemos salvar o número da página em que o usuário estava na última vez que leu o livro
    const [currentPage, setCurrentPage] = useState(0)

    //Indica se o usuário deu um duplo clique na tela, para determinar se o slider para mudança de tela deve ser mostrado
    const [screenTapped, setScreenTapped] = useState(false)

    //Armazena a palavra a ser traduzida (ou "", se não houver)
    const [wordToTranslate, setWordToTranslate] = useState("")

    //Armazena a frase a ser traduzida (ou "", se não houver)
    const [paragraphToTranslate, setParagraphToTranslate] = useState("")

    //Se o usuário dá um clique duplo, alternamos as versões da tela com ou sem o slider para mudança de página
    const onDoublePress = () => {
        setScreenTapped(!screenTapped);
    }

    //Essa variável e a função abaixo são usadas para determinar quando o usuário dá um clique duplo na tela
    let lastPress = 0;

    const onPress = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            //Detectado um clique duplo
            onDoublePress()
        } else {
            //Sempre que há um clique na tela, verificamos se há uma palavra ou parágrafo cujas traduções estão sendo mostrados no momento
            //Se houver, "ressetamos" essas variáveis para que as suas modais deixem de ser mostradas (nessa situação, o clique deve fechar as modais)
            if (wordToTranslate != "" || paragraphToTranslate != "") {
                setWordToTranslate("")
                setParagraphToTranslate("")
            }
        }
        lastPress = time;
    };

    //Determina se as modais com informações sobre palavras ou trechos de texto devem ser mostradas
    const bottomModals = () => {
        if (wordToTranslate != "") {
            return <WordModals wordToTranslate={wordToTranslate} />
        } else if (paragraphToTranslate != "") {
            return <ParagraphTranslationModal paragraphToTranslate={paragraphToTranslate} />
        }
        return
    }

    //Determina se o "Slider" para mudança de página do livro deve ser mostrado
    const slider = () => {
        if (screenTapped) {
            return <CustomSlider bookLength={bookContent.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }
    }

    //Mostramos o conteúdo da página e possivelmente (conforme determinado acima) o "Slider" e as modais

    return (

        <View
            style={{ backgroundColor: "white" }}
            flex={1}
        >

            <View
                onStartShouldSetResponder={(evt) => onPress()}
                style={{ height: screenTapped ? device.height - 120 : device.height - 80 }}
            >

                <PageContent textToShow={bookContent[currentPage].pageContent} currentPage={currentPage} setCurrentPage={setCurrentPage} wordToTranslate={wordToTranslate} setWordToTranslate={setWordToTranslate} paragraphToTranslate={paragraphToTranslate} setParagraphToTranslate={setParagraphToTranslate} bookLength={bookContent.length} />

            </View>

            {bottomModals()}

            {slider()}

        </View>

    )

}

export default ReadBook;