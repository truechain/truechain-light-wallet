import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,    
    Image,
    TouchableHighlight
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../language/i18n';
import ImportWallet from '../components/my/wallet/importWallet';

class Guide extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.LogoOrWel}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')}></Image>
                    <Text style={styles.welcome}>{I18n.t('guide.welcome')}</Text>
                </View>
                <View style={styles.fun}>
                    <View style={[styles.funItem, styles.import]}>
                        <Text>
                            {I18n.t('guide.importInstructions')}
                        </Text>
                        <TouchableHighlight style={[styles.funRadius, styles.funImport]}>
                            <Text style={styles.funText} onPress={() => this.props.navigation.navigate('Import')}>
                                {I18n.t('guide.importWallet')}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.funItem, styles.create]}>
                        <Text>
                            {I18n.t('guide.createInstructions')}
                        </Text>
                        <TouchableHighlight style={[styles.funRadius, styles.funCreate]}>
                            <Text style={styles.funText}>
                                {I18n.t('guide.createWallet')}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Guide: Guide,
        Import: ImportWallet
    },
    {
        initialRouteName: 'Guide'
    }
);

export default class Home extends Component {
    render() {
        return (
            <RootStack />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    LogoOrWel: {
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        letterSpacing: 1
    },
    fun: {
        borderColor: 'red',
        padding: 20
    },
    funItem: {
        marginTop: 20
    },
    funRadius: {
        borderRadius: 50,
        marginTop: 20,
        padding: 15,
    },
    funImport: {
        backgroundColor: '#35ccbf',
    },
    funCreate: {
        backgroundColor: '#528bf7',
    },
    funText: {
        color: '#fff',
        textAlign: 'center',
    }
});
