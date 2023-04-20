/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import './src/utilities/dummyData.js'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
