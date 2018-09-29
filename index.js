import { AppRegistry, YellowBox } from 'react-native';
import './global';
import './shim';
import crypto from 'crypto';
import Root from './app/root';

YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' , 'Module RNOS requires']);
console.ignoredYellowBox = [ 'Remote debugger' ];

AppRegistry.registerComponent('truewallet', () => Root);
