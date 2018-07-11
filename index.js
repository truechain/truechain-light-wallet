import { AppRegistry, YellowBox } from 'react-native';
import './global';
import Root from './app/root';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('truewallet', () => Root);
