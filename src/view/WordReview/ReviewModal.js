import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Modal, ModalContent } from 'react-native-modals';

const device = Dimensions.get("window")

//Cada uma das opções de respostas que seram apresentadas ao usuário
const AnswerOption = (props) => {

    return (

        <TouchableOpacity style={{
            height: 60, backgroundColor: (props.selectedAnswer == -1 || (props.index != props.correctAnswer && props.index != props.selectedAnswer)) ? (props.nightMode ? "#151d4a" : "white") : (props.index == props.correctAnswer ? (props.nightMode ? "green" : "#8FEF99") : (props.nightMode ? "#99000d" : "#EE6262")), borderColor: props.nightMode ? "black" : "#808080", borderWidth: 1, borderRadius: 10, marginHorizontal: 10, marginBottom: 6, justifyContent: "center"
        }}
            onPressIn={() => { props.selectedAnswer == -1 && props.setSelectedAnswer(props.index) }}
        >
            <Text style={{ color: props.nightMode ? "white" : "black", marginTop: -8, marginLeft: 10, fontSize: 16, letterSpacing: 0.3 }}>{props.word}</Text>
        </TouchableOpacity>

    )

}

//A modal em que o usuário revisa palavras, mostrando uma palavra e a sua frase e pedindo para o usuário selecionar alguma das opções para a tradução
const ReviewModal = (props) => {

    if (props.currentWord < props.wordsToReview.length) {

        return (

            <View>

                <Modal
                    visible={props.showModal}
                    modalTitle={

                        <View></View>

                    }
                >

                    <ModalContent
                        style={{ backgroundColor: props.nightMode ? "#151d4a" : 'white' }}
                    >

                        <View style={{ width: device.width - 70, height: device.height - 70 }}>

                            <View style={{ marginTop: 20, flexDirection: "row" }}>

                                <TouchableOpacity onPressIn={() => { props.onQuit() }}>

                                    <Image source={props.nightMode ? require('../../assets/close-white.png') : require('../../assets/close.png')} style={{ height: 25, aspectRatio: 1 }} resizeMode="stretch" />

                                </TouchableOpacity>

                                <View style={{ justifyContent: "center" }}>

                                    <Text style={{ color: "orange", fontSize: 16, marginLeft: 20 }}>Word {props.currentWord + 1} of {props.wordsToReview.length}</Text>

                                </View>

                            </View>

                            <View style={{ height: device.height - 470, justifyContent: "center" }}>

                                <Text style={{ textAlign: "center", color: props.nightMode ? "white" : "black", fontWeight: "bold", fontSize: 40 }}> {props.wordsToReview[props.currentWord].word}</Text>
                                <Text style={{ textAlign: "center", color: props.nightMode ? "white" : "#606060", fontSize: 12, marginTop: 30 }}> {props.wordsToReview[props.currentWord].fullPhrase} </Text>
                            </View>


                            <Text style={{ fontSize: 13, marginLeft: 5, letterSpacing: 0.3, color: props.nightMode ? "white" : "#505050", marginBottom: 15, marginTop: 10 }}>Select the correct translation from {props.wordsToReview[props.currentWord].language.name}.</Text>

                            <AnswerOption nightMode={props.nightMode} index={0} setSelectedAnswer={props.setSelectedAnswer} word={props.correctAnswer == 0 ? props.wordsToReview[props.currentWord].translation : props.randomWords[0]} correctAnswer={props.correctAnswer} selectedAnswer={props.selectedAnswer} />
                            <AnswerOption nightMode={props.nightMode} index={1} setSelectedAnswer={props.setSelectedAnswer} word={props.correctAnswer == 1 ? props.wordsToReview[props.currentWord].translation : props.randomWords[1]} correctAnswer={props.correctAnswer} selectedAnswer={props.selectedAnswer} />
                            <AnswerOption nightMode={props.nightMode} index={2} setSelectedAnswer={props.setSelectedAnswer} word={props.correctAnswer == 2 ? props.wordsToReview[props.currentWord].translation : props.randomWords[2]} correctAnswer={props.correctAnswer} selectedAnswer={props.selectedAnswer} />
                            <AnswerOption nightMode={props.nightMode} index={3} setSelectedAnswer={props.setSelectedAnswer} word={props.correctAnswer == 3 ? props.wordsToReview[props.currentWord].translation : props.randomWords[3]} correctAnswer={props.correctAnswer} selectedAnswer={props.selectedAnswer} />

                            <TouchableOpacity style={{ height: 60, marginHorizontal: (device.width - 170) / 2, width: 100 }} onPressIn={props.onWordReviewed}>

                                <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20, color: props.nightMode ? "orange" : "green" }}>{props.selectedAnswer == -1 ? "Skip" : (props.currentWord < props.wordsToReview.length - 1 ? "Next" : "Finish")}</Text>

                            </TouchableOpacity>

                        </View>

                    </ModalContent>

                </Modal>

            </View>

        )

    }

}

export default ReviewModal;