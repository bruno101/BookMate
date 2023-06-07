import { View, Text, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';

const device = Dimensions.get("window")

//Essa componente aparece na parte inferior da tela e permite ao usuário mudar de página
const CustomSlider = (props) => {

    //Mostramos o Slider, e à direita o texto em que aparece o número da página atual
    //Quando o usuário muda para outra página no Slider ("onSlidingComplete"), deveremos chamar a função "setCurrentPage"
    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 40, marginTop: -40, backgroundColor: "white" }}>

            <Slider
                style={{ height: 40, width: device.width - 120, marginLeft: 20 }}
                minimumValue={1}
                maximumValue={props.locations.length == 0 ? 1 : props.locations.length}
                minimumTrackTintColor="#53a3cb"
                maximumTrackTintColor="#ADD8E6"
                step={1}
                value={props.sliderValue}
                onValueChange={(value) => { props.setSliderValue(value) }}
                onSlidingComplete={(value) => { props.goToPage(parseInt(value)) }}
                trackStyle={{ height: 2.5 }}
                thumbStyle={{ height: 13, width: 13, backgroundColor: '#088F8F' }}
            />

            <View style={{ height: 40, justifyContent: "center", alignItems: "center", width: 100 }}>

                <Text style={{ color: "grey" }}>

                    { props.locations.length == 0 ? 0 : Math.round (props.sliderValue * 10000 / props.locations.length ) /100 } %

                </Text>

            </View>

        </View>

        )

}

export default CustomSlider;
