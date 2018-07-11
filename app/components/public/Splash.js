import React from 'react';
import { Dimensions, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

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
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        SplashScreen.hide();
    }

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
