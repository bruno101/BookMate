import { View, Text, Switch, Dimensions, Image } from 'react-native'
import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native';
import Header from './Header';
import SectionHeader from './SectionHeader'

//Abaixo estão definidos os items que devem aparecer nas configurações; no final, a componente "Settings" em si é definida

const device = Dimensions.get("window")

const NightMode = (props) => {

    return (

        <View style={{
            borderBottomColor: "#eaeaea", borderBottomWidth: 1, marginTop: 0, backgroundColor: "white", flexDirection: "row"
        }}>

            <Image source={require('../../assets/night-mode.png')}
                style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }} />
            <View style={{ width: 400 }}>
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Night Mode</Text>
            </View>
            <View style={{ marginLeft: device.width - 500, marginTop: 15 }}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={"white"}
                    onValueChange={props.setNightMode}
                    value={props.nightMode}
                />
            </View>

        </View>

        )

}

const FontSize = (props) => {

    const fontSize = [
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' }
    ]

    return (

        <View style={{
            borderBottomColor: "#eaeaea", borderBottomWidth: 1, backgroundColor: "white", flexDirection: "row"
        }}>

            <Image source={require('../../assets/size.png')}
                style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }} />
            <View style={{ width: 400 }}>
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Font Size</Text>
            </View>
            <DropDownPicker
                open={props.fontSizePickerOpen}
                items={fontSize}
                setOpen={props.setFontSizePickerOpen}
                showArrowIcon={true}
                dropDownContainerStyle={{
                    width: 110, marginLeft: device.width - 570, zIndex: 1
                }}
                style={{
                    marginLeft: device.width - 530, width: 70, minHeight: 30, marginTop: 15
                }}
                placeholder="12"
                listMode="SCROLLVIEW"
            />


        </View >
        
        )

}

const FontFamily = (props) => {

    const fontFamily = [
        { label: 'normal', value: 'normal' },
        { label: 'serif', value: 'serif' },
        { label: 'sans-serif', value: 'sans-serif' },
        { label: 'roboto', value: 'roboto' },
        { label: 'arial', value: 'arial' },
    ]

    return (

        <View style={{
            borderBottomColor: "#eaeaea", borderBottomWidth: 1, backgroundColor: "white", flexDirection: "row", zIndex: -1
        }}>

            <Image source={require('../../assets/font.png')}
                style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }} />
            <View style={{ width: 400 }}>
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Font Family</Text>
            </View>
            <DropDownPicker
                open={props.fontFamilyPickerOpen}
                items={fontFamily}
                setOpen={props.setFontFamilyPickerOpen}
                showArrowIcon={true}
                dropDownContainerStyle={{
                    width: 110, marginLeft: device.width - 570
                }}
                style={{
                    marginLeft: device.width - 570, width: 110, minHeight: 30, marginTop: 15
                }}
                placeholder="normal"
            />

        </View>

        )

}

const ReviewNotifications = (props) => {

    return (

        <View style={{
            borderBottomColor: "#eaeaea", borderBottomWidth: 1, marginTop: 0, backgroundColor: "white", flexDirection: "row", zIndex: -2
        }}>

            <Image source={require('../../assets/alphabet.png')}
                style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }}
            />
            <View style={{ width: 400 }}>
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Review Words</Text>
            </View>
            <View style={{ marginLeft: device.width - 500, marginTop: 15 }}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={"white"}
                    onValueChange={props.setReviewNotifications}
                    value={props.reviewNotifications}
                />
            </View>

        </View>

        )

}

const ReadingReminder = (props) => {

    return (
        <View style={{
            borderBottomColor: "#eaeaea", borderBottomWidth: 1, backgroundColor: "white", flexDirection: "row", zIndex: -2
        }}>

            <Image source={require('../../assets/books.png')}
                style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }}
            />
            <View style={{ width: 400 }}>
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Reading Reminder </Text>
            </View>
            <View style={{ marginLeft: device.width - 500, marginTop: 15 }}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={"white"}
                    onValueChange={props.setReadingNotifications}
                    value={props.readingNotifications}
                />
            </View>

        </View>
        )

}

const Help = (props) => {

    return (
        <TouchableOpacity>
            <View style={{
                borderBottomColor: "#eaeaea", borderBottomWidth: 1, marginTop: 0, backgroundColor: "white", flexDirection: "row"
            }}>
                <Image source={require('../../assets/help.png')}
                    style={{ height: 35, width: 35, marginLeft: 15, marginTop: 10 }}
                />
                <Text style={{ color: "black", fontSize: 16, marginRight: 10, letterSpacing: 0.6, marginBottom: 15, marginTop: 15, marginLeft: 20 }}>Help</Text>
            </View>
        </TouchableOpacity>
        )

}

const Settings = (props) => {


    return (

        <View>

            <Header />

            <SectionHeader text={"STYLE"} />

            <NightMode nightMode={props.nightMode} setNightMode={props.setNightMode}/>

            <FontSize fontSize={props.fontSize} setFontSize={props.setFontSize} fontSizePickerOpen={props.fontSizePickerOpen} setFontSizePickerOpen={props.setFontSizePickerOpen} />

            <FontFamily fontFamily={props.fontFamily} setFontFamily={props.setFontFamily} fontFamilyPickerOpen={props.fontFamilyPickerOpen} setFontFamilyPickerOpen={props.setFontFamilyPickerOpen} />

            <SectionHeader text={"NOTIFICATIONS"} />

            <ReviewNotifications reviewNotifications={props.reviewNotifications} setReviewNotifications={props.setReviewNotifications} />

            <ReadingReminder readingNotifications={props.readingNotifications} setReadingNotifications={props.setReadingNotifications} />

            <SectionHeader text={"MORE"} />

            <Help />

        </View>

    )

}


export default Settings;