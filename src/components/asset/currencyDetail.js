import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    FlatList
} from 'react-native';

class TransactionRecord extends Component {
    render() {
        return (
            <View>
                <Text>
                    {
                        this.props.data.item.from === '0x5833fa6053e6e781eafb8695d63d90f6b3571e5e' ? '转出' : '转入'
                    }
                </Text>
            </View>
        )
    }
}

export default class currencyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordData: null
        }
    }

    static navigationOptions = {
        headerTitle: '币种名称'
    };

    componentWillMount() {
        // const { params } = this.props.navigation.state;
        // this.setState({
        //     title: params.currencyName
        // })
    }
    componentDidMount() {
        let apiUrl = 'http://api.etherscan.io/api?module=account&action=txlist&address=0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e&sort=desc&apikey=YourApiKeyToken';
        fetch(apiUrl).then((response) => {
            return response.json()
        }).then((responseData) => {
            this.setState({
                recordData: responseData.result
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            // <ActivityIndicator size="large" style={{ marginTop: 100 }}></ActivityIndicator>
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Text style={[styles.color_white, styles.balance_text_big]}>
                        1.0000
                   </Text>
                    <Text style={[styles.color_white, styles.marginTop_20]}>
                        市值：9999.00CNY
                   </Text>
                </View>
                <View style={styles.record}>
                    <Text>
                        近期交易记录
                    </Text>
                    <FlatList
                        style={styles.marginTop_20}
                        data={this.state.recordData}
                        renderItem={(item) =>
                            <TransactionRecord
                                data={item}
                            />}
                    />
                </View>
                <View style={styles.bottom_fun}>
                    <Text style={[styles.bottom_fun_item, styles.bottom_fun_item_transfer]}>
                        转账
                    </Text>
                    <Text style={[styles.bottom_fun_item, styles.bottom_fun_item_receipt]}>
                        收款
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    color_white: {
        color: '#fff'
    },
    marginTop_20: {
        marginTop: 20
    },
    container: {
        flex: 1,
    },
    balance: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#528bf7'
    },
    balance_text_big: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    record: {
        borderWidth: 2,
        borderColor: 'red',
        padding: 20,
        position: 'absolute',
        top: 150,
        bottom: 50,
        left: 0,
        right: 0
    },
    bottom_fun: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottom_fun_item: {
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        width: Dimensions.get('window').width / 2,
    },
    bottom_fun_item_transfer: {
        backgroundColor: '#35ccbf'
    }, bottom_fun_item_receipt: {
        backgroundColor: '#528bf7'
    }
})
