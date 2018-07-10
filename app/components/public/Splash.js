import React from 'react';
import { Dimensions, Animated } from 'react-native';
// import store from 'react-native-simple-store';
// import { registerApp } from 'react-native-wechat';
// import AV from 'leancloud-storage';
import SplashScreen from 'react-native-splash-screen';
// import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../../splash.png');

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
        // registerApp('wxb24c445773822c79');
        // if (!AV.applicationId) {
        //     AV.init({
        //         appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
        //         appKey: '57qmeEJonefntNqRe17dAgi4'
        //     });
        // }
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        // Animated.timing(this.state.bounceValue, {
        //     toValue: 1.2,
        //     duration: 1000
        // }).start();
        SplashScreen.hide();
        // this.timer = setTimeout(() => {
        //     store.get('isInit').then((isInit) => {
        //         if (!isInit) {
        //             navigate('Category', { isFirst: true });
        //         } else {
        //             NavigationUtil.reset(this.props.navigation, 'Home');
        //         }
        //     });
        // }, 1000);
    }

    // componentWillUnmount() {
    //     clearTimeout(this.timer);
    // }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

export default Splash;
