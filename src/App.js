import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/index';
//import ReadBook from './pages/ReadBook/index';
//import ChangeLanguage from './pages/ChangeLanguage/index';

const Stack = createNativeStackNavigator();

const App = () => {

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home' }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )

};

export default App;