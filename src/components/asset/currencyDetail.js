import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation'

class Recording extends Component {
    render() {
        return (
            <View style={styles.recordDetail_item}>
                <Text>{this.props.to.replace(this.props.to.slice('10', '30'), '......')}</Text>
                <Text>-{this.props.value / 1e+18}</Text>
            </View>
        )
    }
}

class TransactionRecord extends Component {
    render() {
        const Recording_item = {
            to: this.props.data.item.to,
            value: this.props.data.item.value
        }
        return (
            <View>
                {
                    this.props.data.item.from === '0x5833fa6053e6e781eafb8695d63d90f6b3571e5e' ?
                        <View style={styles.recordDetail}>
                            <View>
                                <Image style={styles.record_icon} source={require('../../assets/images/asset/expend_3x.png')} />
                            </View>
                            <Recording
                                {...Recording_item}
                            />
                        </View>
                        : <View style={styles.recordDetail}>
                            <View>
                                <Image style={styles.record_icon} source={require('../../assets/images/asset/add_3x.png')} />
                            </View>
                            <Recording
                                {...Recording_item}
                            />
                        </View>
                }
            </View>

        )
    }
}

class currencyDetail extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.state = {
            title: null,
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
                    {
                        this.state.recordData ?
                            <FlatList
                                style={styles.marginTop_20}
                                data={this.state.recordData}
                                renderItem={(item) =>
                                    <TransactionRecord
                                        data={item}
                                    />}
                            /> :
                            <Text style={styles.textAlign}>~</Text>
                    }

                </View>
                <View style={styles.bottom_fun}>
                    <Text style={[styles.bottom_fun_item, styles.bottom_fun_item_transfer]} onPress={() => { this.navigate('Transfer') }}>
                        转账
                    </Text>
                    <Text style={[styles.bottom_fun_item, styles.bottom_fun_item_receipt]} onPress={() => { this.navigate('Receipt') }}>
                        收款
                    </Text>
                </View>
            </View>
        );
    }
}

export default withNavigation(currencyDetail)

const styles = StyleSheet.create({
    textAlign: {
        textAlign: 'center'
    },
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
        padding: 20,
        position: 'absolute',
        top: 150,
        bottom: 50,
        left: 0,
        right: 0
    },
    recordDetail: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center'
    },
    record_icon: {
        width: 50,
        height: 50
    },
    recordDetail_item: {
        flex: 1,
        height: 75,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
