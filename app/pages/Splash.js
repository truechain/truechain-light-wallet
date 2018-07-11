import React from 'react';
import { Dimensions, Animated } from 'react-native';
import { withNavigation } from 'react-navigation'
import SplashScreen from "rn-splash-screen";

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../../splash.png');

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = ({
            isWallet: false
        })
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
            // this.props.navigation.navigate('Guide');
            storage.load({
                key: 'walletInfo'
            }).then(res => {
                if (res) {
                    this.props.navigation.navigate('Home');
                    return;
                } else {
                    this.props.navigation.navigate('Guide');
                }
            })

        }, 1000);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight
                }}
                source={splashImg}
            />
        );
    }
}

export default withNavigation(Splash);
