import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import currencyDetail from './currencyDetail'
import { createStackNavigator } from 'react-navigation';

class CurrencyList extends Component {  
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <TouchableHighlight onPress={()=>{alert(this.props.item.key)}}>
                <View style={styles.currency_list}>
                    <View style={styles.currency_left}>
                        <View>
                            <TouchableHighlight style={styles.currency_logo}>
                                <Image style={styles.currency_logo_item} source={require('../../assets/images/currency_logo/eth_logo.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.marginLeft}>
                            <Text>
                                ETH
                    </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.alignRight}>
                            1.0000
                    </Text>
                        <Text style={[styles.alignRight, styles.currency]}>
                            9999.0000CNY
                    </Text>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }
}


class asset extends Component {
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
                            <Text style={styles.currency_text}>账户总资产(￥)</Text>
                            <Text>9999.00</Text>
                        </View>
                        <TouchableHighlight style={styles.currency_item}>
                            <Text style={styles.currency_item_text}>新增币种</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => <CurrencyList item={item} />}
                />
            </View>
        );
    }
}
let RootStack = createStackNavigator({
    asset: {
        screen: asset,
        navigationOptions: {
            header: null
        }
    },
    currencyDetail: {
        screen: currencyDetail,
        navigationOptions: {
            title: '币种详情'
        }
    }
})

export default RootStack;

const styles = StyleSheet.create({
    marginLeft: {
        marginLeft: 20
    },
    alignRight: {
        textAlign: 'right'
    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        backgroundColor: '#fff'
    },
    walletInfo: {
        height: 230,
        backgroundColor: '#528bf7'
    },
    walletInfo_item: {
        flex: 1,
        marginTop: 20,
        height: 210,
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
        marginTop: -30
    },
    addCurrency_item: {
        borderRadius: 8,
        height: 80,
        padding: 30,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.85
    },
    currency_text: {
        color: '#ccc',
        fontSize: 12
    },
    currency_item: {
        width: 80,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#528bf7',
    },
    currency_item_text: {
        color: '#fff'
    },
    //币种列表
    currency_list: {
        height: 80,
        // borderWidth: 2,
        // borderColor: 'green',
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    currency_left: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    currency_logo: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 8
    },
    currency_logo_item: {
        width: 40,
        height: 40
    },
    currency: {
        color: '#ccc'
    }
})

