import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

export default class asset extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.walletInfo}>
                    <View style={styles.walletInfo_item}>
                        <Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')} />
                        <Text style={styles.walletName}>
                            My Wallet
                         </Text>
                        <View style={styles.walletAddress}>
                            <Text style={styles.walletAddress_item}>
                                0x1782730......b1970F9f4A89f
                                </Text>
                            <Image style={styles.addressErcode} source={require('../../assets/images/asset/ercode_2x.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.addCurrency}>
                    <View style={styles.addCurrency_item}>
                        <View>
                            <Text>账户总资产￥</Text>
                            <Text>9999.00</Text>
                        </View>
                        <Text style={styles}>新增币种</Text>
                        {/* <Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')} /> */}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        // borderWidth: 2,
        // borderColor: 'red'
    },
    walletInfo: {
        height: 230,
        backgroundColor: '#528bf7'
    },
    walletInfo_item: {
        marginTop: 20,
        // borderWidth: 3,
        // borderColor: 'green',
        height: 210,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 70,
        height: 70,
        marginBottom: 10
    },
    walletName: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10

    },
    walletAddress: {
        flexDirection: 'row'
    },
    addressErcode: {
        width: 15,
        height: 15,
        marginLeft: 5
    },
    walletAddress_item: {
        color: '#fff',
        fontSize: 12
    },
    //新增币种
    addCurrency: {
        alignItems: 'center',
        marginTop: -30,
    },
    addCurrency_item: {
        // borderWidth: 1,
        borderRadius: 5,
        height: 80,
        padding: 30,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width * 0.85,
        // borderColor: 'green',
    }
})