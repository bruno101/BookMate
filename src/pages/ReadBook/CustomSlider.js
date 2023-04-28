import { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';

const device = Dimensions.get("window")

//Essa componente aparece na parte inferior da tela e permite ao usuário mudar de página
const CustomSlider = (props) => {

    //Note que o valor mostrado no slider é o valor do índice da página (que varia entre 0 e n-1) somado a 1, para que ele varie entre 1 e n
    const [sliderValue, setSliderValue] = useState(props.currentPage + 1)

    //Quando o número da página muda (por exemplo, porque o usuário deslizou a tela para a direita ou esquerda), atualizamos também o valor mostrado ao lado do slider
    //Por isso observamos mudanças na variável "props.currentPage" abaixo
    useEffect(() => {
        setSliderValue(props.currentPage + 1);
    }, [props.currentPage]);

    //Mostramos o Slider, e à direita o texto em que aparece o número da página atual
    //Quando o usuário muda para outra página no Slider ("onSlidingComplete"), chamamos a função "setCurrentPage", que foi passada como "prop"
    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 40, backgroundColor: "white" }}>

            <Slider
                style={{ height: 40, width: device.width - 120, marginLeft: 20 }}
                minimumValue={1}
                maximumValue={props.bookLength}
                minimumTrackTintColor="#53a3cb"
                maximumTrackTintColor="#ADD8E6"
                step={1}
                value={sliderValue}
                onValueChange={(value) => { setSliderValue(value) }}
                onSlidingComplete={(value) => { props.setCurrentPage(parseInt(value - 1)) }}
                trackStyle={{ height: 2.5 }}
                thumbStyle={{ height: 13, width: 13, backgroundColor: '#088F8F' }}
            />

            <View style={{ height: 40, justifyContent: "center", alignItems: "center", width: 100 }}>

                <Text style={{ color: "grey" }}>

                    {sliderValue} / {props.bookLength}

                </Text>

            </View>

        </View>

        )

}

export default CustomSlider;
