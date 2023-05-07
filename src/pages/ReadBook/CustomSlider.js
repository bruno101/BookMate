import { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';

const device = Dimensions.get("window")

//Essa componente aparece na parte inferior da tela e permite ao usu�rio mudar de p�gina
const CustomSlider = (props) => {

    const [sliderValue, setSliderValue] = useState(props.currentPage)

    //Quando o n�mero da p�gina muda, atualizamos tamb�m o valor mostrado ao lado do slider
    //Por isso observamos mudan�as na vari�vel "props.currentPage" abaixo
    useEffect(() => {
        setSliderValue(props.currentPage);
    }, [props.currentPage]);

    //Mostramos o Slider, e � direita o texto em que aparece o n�mero da p�gina atual
    //Quando o usu�rio muda para outra p�gina no Slider ("onSlidingComplete"), chamamos a fun��o "setCurrentPage", que foi passada como "prop"
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
