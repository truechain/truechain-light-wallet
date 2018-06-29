import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight
} from 'react-native';

const screen = Dimensions.get('window');

export default class WalletInfo extends Component {
    static navigationOptions = {
        headerTitle: '账户信息'
    };
    constructor(props) {
        super(props);
        this.state = ({
            walletAddress: ' '
        })
    }

    componentDidMount() {
        let walletAddress = store.getState().createWallet.walletAddress;
        this.setState({
            walletAddress: walletAddress
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.walletInfo}>
                    <Image style={styles.walletAvatar} source={require('../../assets/images/asset/head_2x.png')} />
                    <View style={styles.walletInfo_item}>
                        <Text>我的钱包</Text>
                        <Text>
                            {this.state.walletAddress.replace(this.state.walletAddress.slice('9', '35'), '......')}
                        </Text>
                    </View>
                </View>

                <View style={styles.fun}>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    walletInfo: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },
    walletAvatar: {
        width: 60,
        height: 60
    },
    walletInfo_item: {
        width: screen.width - 80,
        marginLeft: 10,
        height: 60,
        justifyContent: 'space-around'
    },
    fun: {
        flex:1,
        borderWidth: 1,
        borderColor: 'red',
    }
})
