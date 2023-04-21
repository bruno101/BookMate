import * as React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/index';
import ReadBook from './pages/ReadBook/index';
import ChangeLanguage from './pages/ChangeLanguage/index';
import UserLanguageBar from './components/UserLanguageBar';

const Stack = createNativeStackNavigator();

const App = () => {

    //Essa componente define o que deve aparecer na parte superior da tela do aplicativo; ela usa a componente UserLanguage
    const Options = ({ navigation, route }) => ({

        headerTitle: (props) => (

            <UserLanguageBar navigation = {navigation} />

        ),

        headerRight: () => (

            <TouchableOpacity>

                <Image source={require('./assets/settings.png')}
                    style={{ width: 30, marginLeft: -20, height: 30 }}
                    resizeMode="stretch" />

            </TouchableOpacity>

        )

    })

    //Abaixo estão definidas as telas do app
    return (

        <NavigationContainer>

            <Stack.Navigator>

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={Options}
                />
                <Stack.Screen
                    name="ReadBook"
                    component={ReadBook}
                    options={Options}
                />
                <Stack.Screen
                    name="ChangeLanguage"
                    component={ChangeLanguage}
                />

            </Stack.Navigator>

        </NavigationContainer>

    )

};

export default App;