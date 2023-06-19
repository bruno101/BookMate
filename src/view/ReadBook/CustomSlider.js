import { View, Text, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';
import { useRef } from 'react'

const device = Dimensions.get("window")

//Essa componente aparece na parte inferior da tela e permite ao usuário mudar de página
const CustomSlider = (props) => {

    let lastTimePageChanged = useRef(0)

    //Mostramos o Slider, e à direita o texto em que aparece o número da página atual
    //Quando o usuário muda para outra página no Slider ("onSlidingComplete"), chamamos "goToPage"
    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 40, marginTop: -40, backgroundColor: props.nightMode ? "#1d1f2b" : "#white" }}>

            <Slider
                style={{ height: 40, width: device.width - 120, marginLeft: 20 }}
                minimumValue={1}
                maximumValue={props.locations.length == 0 ? 1 : props.locations.length}
                minimumTrackTintColor="#53a3cb"
                maximumTrackTintColor="#ADD8E6"
                step={1}
                value={props.sliderValue}
                onValueChange={(value) => {
                    const time = new Date().getTime();
                    const delta = time - lastTimePageChanged.current;
                    const PAGE_CHANGE_DELAY = 500;
                    if (delta > PAGE_CHANGE_DELAY) { props.goToPage(parseInt(value)); lastTimePageChanged.current = time }
                }}
                onSlidingComplete={(value) => { props.goToPage(parseInt(value)) }}
                trackStyle={{ height: 2.5 }}
                thumbStyle={{ height: 13, width: 13, backgroundColor: '#088F8F' }}
            />

            <View style={{ height: 40, justifyContent: "center", alignItems: "center", width: 100 }}>

                <Text style={{ color: props.nightMode ? "white" : "grey" }}>

                    {props.locations.length == 0 ? "n/a" : Math.round (props.sliderValue * 10000 / props.locations.length ) /100 + "%" }

                </Text>

            </View>

        </View>

        )

}

export default CustomSlider;
