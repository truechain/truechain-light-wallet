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
import { connect } from 'react-redux';
import actions from '../../store/action/walletInfo'
import { withNavigation } from 'react-navigation';

class CurrencyList extends Component {
    currencyDetail(title) {
        this.props.navigate('CurrencyDetail', {
            title: title
        });
    };

    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.currencyDetail(this.props.item.currency_name)}>
                <View style={styles.currency_list}>
                    <View style={styles.currency_left}>
                        <View>
                            <TouchableHighlight style={styles.currency_logo}>
                                <Image style={styles.currency_logo_item} source={require('../../assets/images/currency_logo/eth_logo.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.marginLeft}>
                            <Text>
                                {this.props.item.currency_name}
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

class Assets extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.state = ({
            walletName: ' ',
            walletAddress: ' ',
            eth_balance: '--',
            true_banlance: '--',
            ttr_banlance: '--'
        })
    }

    show(num) {
        num += '';
        num = num.replace(/[^0-9|\.]/g, '');
        if (/^0+/) {
            num = num.replace(/^0+/, '');
        };
        if (!/\./.test(num)) {
            num += '.00000';
        };
        if (/^\./.test(num)) {
            num = '0' + num;
        };
        num += '00000';
        num = num.match(/\d+\.\d{5}/)[0];
        return num
    };

    componentDidMount() {
        storage.load({
            key: 'walletInfo'
        }).then(walletInfo => {
            let walletAddress = walletInfo.walletAddress,
                walletName = walletInfo.walletName;
            web3.eth.getBalance(walletAddress).then((res) => {
                let eth_balance = this.show(web3.utils.fromWei(res, 'ether'));
                this.setState({ eth_balance });
            })
            this.setState({
                walletAddress: walletAddress,
                walletName: walletName
            }, () => {
                this.props.walletInfo({ wallet_address: this.state.walletAddress })
                console.log(store.getState())
            })
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.walletInfo}>
                    <View style={styles.walletInfo_item}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.navigation.navigate('WalletInfo')}>
                            <Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')} />
                        </TouchableHighlight>
                        <Text style={styles.walletName}>
                            {this.state.walletName}
                        </Text>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.navigation.navigate('Receipt')}>
                            <View style={styles.walletAddress}>
                                <Text style={styles.walletAddress_item}>
                                    {this.state.walletAddress.replace(this.state.walletAddress.slice('9', '35'), '......')}
                                </Text>
                                <Image style={styles.addressErcode} source={require('../../assets/images/asset/ercode_2x.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.addCurrency}>
                    <View style={styles.addCurrency_item}>
                        <View>
                            <Text style={styles.currency_text}>账户总资产(￥)</Text>
                            <Text>{this.state.eth_balance}</Text>
                        </View>
                        <TouchableHighlight style={styles.currency_item}>
                            <Text style={styles.currency_item_text}>新增币种</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList
                    data={[{ currency_name: 'ETH' }, { currency_name: 'TRUE' }]}
                    renderItem={({ item }) => <CurrencyList
                        item={item}
                        navigate={this.navigate}
                    />}
                />
            </View>
        );
    }
}

export default connect(
    state => state.walletInfo,
    actions
)(Assets)

// export default connect(
//     state => state.walletInfo,
//     actions
// )(CreateWallet)

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

