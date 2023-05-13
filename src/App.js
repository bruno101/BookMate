import * as React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalPortal } from 'react-native-modals';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/Home/index';
import ReadBook from './pages/ReadBook/index';
import ChangeLanguage from './pages/ChangeLanguage/index';
import WordReview from './pages/WordReview/index';
import ImportBook from './pages/ImportBook/index';
import Settings from './pages/Settings/index';
import UserLanguageBar from './components/UserLanguageBar';

const HomeStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

//Abaixo estão definidas as telas que podem ser acessadas diretamente (sem usar a barra inferior) da tela inicial: "Home", "ChangeLanguage" e "ReadBook"
const HomeScreenStack = () => {

    //Essa componente define o que deve aparecer na parte superior da tela do aplicativo; ela usa a componente UserLanguageBar
    const Options = ({ navigation }) => ({

        headerTitle: () => (

            <UserLanguageBar navigation={navigation} />

        ),

    })

    return (
        <HomeStack.Navigator>

            <HomeStack.Screen
                name="Home Screen"
                component={Home}
                options={Options}
                    />
            <HomeStack.Screen
                name="ChangeLanguage"
                component={ChangeLanguage}
            />
            <HomeStack.Screen
                name="ReadBook"
                component={ReadBook}
                options={Options}
            />

            </ HomeStack.Navigator>

        )

}

//Abaixo estão definidas as telas do app que são acessadas a partir da barra inferior: "Home" (e conforme definido acima, a partir dela são acessadas outras telas), "ImportBook", "WordReview" e "Settings"
const App = () => {

    return (

        <GestureHandlerRootView style={{ flex: 1 }}>

            <NavigationContainer>

                <Tab.Navigator backBehavior={"history"}>

                    <Tab.Screen
                        name="Home"
                        component={HomeScreenStack}
                        options={{
                            unmountOnBlur: true,
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Image
                                        source={require("./assets/house.png")}
                                        style={{ height: 24, aspectRatio: 1 }}
                                    />
                                );
                            },
                        }}
                    />

                    <Tab.Screen
                        name="Import"
                        component={ImportBook}
                        options={{
                            unmountOnBlur: true,
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Image
                                        source={require("./assets/book.png")}
                                        style={{ height: 24, aspectRatio: 1 }}
                                    />
                                );
                            },
                        }}
                    />

                    <Tab.Screen
                        name="Review"
                        component={WordReview}
                        options={{
                            unmountOnBlur: true,
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Image
                                        source={require("./assets/alphabet.png")}
                                        style={{ height: 24, aspectRatio: 1 }}
                                    />
                                );
                            },
                        }}
                    />

                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            unmountOnBlur: true,
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Image
                                        source={require("./assets/settings.png")}
                                        style={{ height: 24, aspectRatio: 1 }}
                                        />
                                );
                            },
                        }}
                    />

                </Tab.Navigator>

                <ModalPortal />

            </NavigationContainer>

        </GestureHandlerRootView>

    )

};

export default App;