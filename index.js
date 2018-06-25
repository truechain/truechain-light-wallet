import { AppRegistry, YellowBox } from 'react-native';
import Root from './src';
import './global';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('True', () => Root);
