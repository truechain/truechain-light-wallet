import { AppRegistry, YellowBox } from 'react-native';
import './global';
import App from './App';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('True', () => App);
