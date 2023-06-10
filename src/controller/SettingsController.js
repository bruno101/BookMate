import Settings from '../view/Settings/index'
import * as LocalStorage from '../model/LocalStorage'
import { useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const SettingsController = (props) => {

    useFocusEffect(
        useCallback(() => {

            setTheme()

        }, [props.nightMode])
    );

    useEffect(() => {

        updateFontSize()

    }, [props.fontSize])

    useEffect(() => {

        updateFontFamily()

    }, [props.fontFamily])

    //Atualizamos o tamanho da fonte; se ele foi definido pelo usuário na tela, salvamos no armazenamento local; senão, obtemos do armazenamento local e atualizamos na tela
    const updateFontSize = async () => {

        if (props.fontSize) {
            LocalStorage.setFontSize(props.fontSize)
        } else {
            font = await LocalStorage.getFont()
            props.setFontSize(font.fontSize)
        }

    }

    //Análogo
    const updateFontFamily = async () => {

        if (props.fontFamily) {
            LocalStorage.setFontFamily(props.fontFamily)
        } else {
            font = await LocalStorage.getFont()
            props.setFontFamily(font.fontFamily)
        }

    }

    //Atualiza o tema de acordo com o que está definido no armazenamento local
    const setTheme = async () => {
        props.setNightMode(await LocalStorage.getNightMode())
        props.navigation.setOptions({
            tabBarStyle: {
                backgroundColor: props.nightMode ? "#151d4a" : "white",
                borderTopWidth: props.nightMode ? 0 : 0.5,
                tabBarInactiveTintColor: props.nightMode ? "white" : "#A0A0A0",
            }
        });
    }

    //Salva a escolha do usuário em relação ao modo noturno
    const setNightMode = async () => {
        LocalStorage.setNightMode(!props.nightMode)
        if (!props.nightMode == true) { changeNavigationBarColor('#1d1f2b', true); } else { changeNavigationBarColor('#F0F0F0', true); }
        props.navigation.setOptions({
            tabBarStyle: {
                backgroundColor: !props.nightMode ? "#151d4a" : "white",
                borderTopWidth: !props.nightMode ? 0 : 0.5,
            },
            tabBarInactiveTintColor: !props.nightMode ? "white" : "#A0A0A0",
        });
        props.setNightMode(!props.nightMode)
    }

    const setReadingNotifications = () => {
        props.setReadingNotifications(!props.readingNotifications)
    }

    const setReviewNotifications = () => {
        props.setReviewNotifications(!props.reviewNotifications)
    }

    return (
        <Settings navigation={props.navigation} nightMode={props.nightMode} setNightMode={setNightMode} fontSize={props.fontSize} setFontSize={props.setFontSize} fontFamily={props.fontFamily} setFontFamily={props.setFontFamily} reviewNotifications={props.reviewNotifications} setReviewNotifications={setReviewNotifications} readingNotifications={props.readingNotifications} setReadingNotifications={setReadingNotifications} fontSizePickerOpen={props.fontSizePickerOpen} setFontSizePickerOpen={props.setFontSizePickerOpen} fontFamilyPickerOpen={props.fontFamilyPickerOpen} setFontFamilyPickerOpen={props.setFontFamilyPickerOpen} />
    )

}

export default SettingsController;
