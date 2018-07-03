import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from "react-native";

import {
    Input,
    Button
} from 'react-native-elements'

const screen = Dimensions.get('window');

export default class Receipt extends Component {
    static navigationOptions = {
        headerTitle: '收款码'
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
                <View style={styles.bg}>
                </View>
                <View style={styles.avatar}>
                    <Image style={styles.avatar_item} source={require('../../assets/images/asset/head_3x.png')} />
                </View>
                <View style={styles.walletAddress}>
                    <Text style={styles.walletAddress_item}>
                        {this.state.walletAddress}
                    </Text>
                </View>

                <View style={styles.customAmount}>
                    <Input
                        placeholder='自定义收款'
                        containerStyle={styles.containerStyle}
                    />
                </View>

                <View style={styles.qrcode}>
                    <View style={styles.qrcode_item}>
                        {/* 二维码区域 */}
                    </View>
                </View>

                <View style={styles.copyAddress}>
                    <Button
                        title='复制收款地址'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            alert('复制收款地址')
                        }}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bg: {
        height: 150,
        backgroundColor: '#528bf7'
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar_item: {
        width: 60,
        height: 60,
        marginTop: -30
    },
    walletAddress: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    walletAddress_item: {
        textAlign: 'center',
        width: screen.width * 0.6
    },
    customAmount: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle: {
        width: screen.width * 0.6
    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    qrcode_item: {
        borderWidth: 1,
        borderColor: 'red',
        width: 200,
        height: 200
    },
    copyAddress: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonStyle: {
        backgroundColor: '#528bf7',
        width: 300,
        height: 45,
        borderRadius: 30
    },
})
