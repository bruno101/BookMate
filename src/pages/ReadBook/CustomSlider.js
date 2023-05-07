import { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';

const device = Dimensions.get("window")

//Essa componente aparece na parte inferior da tela e permite ao usuário mudar de página
const CustomSlider = (props) => {

    const [sliderValue, setSliderValue] = useState(props.currentPage)

    //Quando o número da página muda, atualizamos também o valor mostrado ao lado do slider
    //Por isso observamos mudanças na variável "props.currentPage" abaixo
    useEffect(() => {
        setSliderValue(props.currentPage);
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
                onSlidingComplete={(value) => { props.setCurrentPage(parseInt(value)) }}
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
