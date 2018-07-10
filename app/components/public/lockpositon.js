import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Slider,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import RadiusBtn from './radiusbtn';
import sendTokens from '../../utils/sendTokens'
import iterface from '../../utils/iterface';
import { withNavigation } from 'react-navigation';
import LoadingView from '../public/loadingView'

/**
 * 这是抽象出来的锁仓界面组件
 * 使用时传入相应属性的数据
 * 示例:
 * 
 */

const screen = Dimensions.get('window');

class LockPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromAddress: null,
            toAddress: '0x08C62C32226CE2D9148A80F71A03dDB73B673792',
            lock_num: '2000',
            modalVisible: false,
            cost: 0.00042840,
            gas: 80000,
            gasPrice: 17,
            pwd: null,
            keystoreV3: null,
            ContractAddr: null,
            isSuccess: false,
            showLoading: false
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '锁仓'
    });

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        this.setState({
            fromAddress: store.getState().walletInfo.wallet_address,
            ContractAddr: store.getState().contractAddr.TRUEContractAddr,
            pwd: null
        });

        storage.load({
            key: 'walletInfo'
        }).then(res => {
            this.setState({
                keystoreV3: res.keystoreV3
            })
        })

        const { params } = this.props.navigation.state;
        if (params.type === '1') {
            if (params.nodeType === '1') {
                this.setState({
                    lock_num: '2000'
                })
            } else {
                this.setState({
                    lock_num: '50000'
                })
            }
        } else {
            this.setState({
                lock_num: '2000'
            })
        }
    }

    _sendTokens() {
        sendTokens(iterface, this.state.fromAddress, this.state.toAddress, this.state.lock_num, this.state.pwd, this.state.keystoreV3, this.state.ContractAddr, this.state.gas.toString(), web3.utils.toWei(this.state.gasPrice.toString(), 'Gwei'), (err, tx) => {
            if (err) {
                this.setState({
                    showLoading: false
                }, () => {
                    setTimeout(() => {
                        alert('发布交易失败，请稍后重试！');
                    }, 100);
                })
                console.log(err);
            } else {
                this.setState({
                    isSuccess: true,
                    showLoading: false
                })
                console.log(tx);
            }
        });
    }

    show(num) {
        num += '';
        num = num.replace(/[^0-9|\.]/g, '');
        if (/^0+/) {
            num = num.replace(/^0+/, '');
        }
        ;
        if (!/\./.test(num)) {
            num += '.00000';
        }
        ;
        if (/^\./.test(num)) {
            num = '0' + num;
        }
        ;
        num += '00000';
        num = num.match(/\d+\.\d{8}/)[0];
        return num
    };

    render() {
        return (
            <View style={styles.inputPage}>
                <LoadingView showLoading={this.state.showLoading} />
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxTitle}>锁仓地址</Text>
                    <View style={styles.splitLine}></View>
                    <Text>
                        {this.state.lock_num} true
                    </Text>
                    <View style={styles.splitLine}></View>
                    <Text style={styles.minerCosts_text}>矿工费用</Text>
                    <Slider
                        value={this.state.cost}
                        onValueChange={(cost) => {
                            this.setState({ cost }, () => {
                                this.setState({
                                    gasPrice: Math.round((this.state.cost / web3.utils.fromWei(this.state.gas.toString(), 'Gwei')) * 100) / 100
                                })
                            })
                        }}
                        minimumTrackTintColor='#528bf7'
                        thumbTintColor='#528bf7'
                        minimumValue={0.00022932}
                        step={0.0000001}
                        maximumValue={0.00599999}
                    />
                    <View style={styles.gasPrice}>
                        <Text>
                            慢
                    </Text>
                        <Text style={styles.textAlign}>
                            {this.show(this.state.cost)}ether
                        </Text>
                        <Text>
                            快
                    </Text>
                    </View>
                </View>
                <RadiusBtn
                    btnText={this.props.bottomBtnText}
                    onPress={() => { this.setModalVisible(true) }}
                />

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isSuccess}
                >
                    <View style={styles.success}>
                        <View style={styles.success_item}>>
                                <Text style={styles.success_text}>
                                报名成功
                                </Text>
                            <Text style={styles.marginBottom}>
                                恭喜您报名成功！
                                </Text>
                            <RadiusBtn
                                btnText='返回'
                                onPress={() => {
                                    this.setState({
                                        isSuccess: false
                                    })
                                    this.props.navigation.navigate('Home');
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }); }}
                >
                    <View style={styles.modalCon}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>输入密码</Text>
                            <View style={styles.modalInput}>
                                <TextInput
                                    style={{ height: 50 }}
                                    placeholder="输入密码"
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(pwd) => {
                                        this.setState({ pwd })
                                    }}
                                />
                            </View>
                            <View style={styles.modalBottomBtn}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    activeOpacity={0.5}
                                    underlayColor={"#ddd"} activeOpacity={0.5}
                                    onPress={() => {
                                        this.setModalVisible(false)
                                    }}>
                                    <View style={styles.modalBottomBtnNo}>
                                        <Text style={styles.modalBottomBtnNoText}>取消</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    activeOpacity={0.5}
                                    underlayColor={"#ddd"}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.setModalVisible(false);
                                        this.setState({
                                            showLoading: true
                                        });
                                        setTimeout(() => {
                                            if (!this.state.pwd) {
                                                this.setState({ showLoading: false }, () => {
                                                    alert('请输入密码!');
                                                })
                                            } else {
                                                try {
                                                    web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.pwd);
                                                    this._sendTokens();
                                                } catch (error) {
                                                    console.log(error);
                                                    this.setState({ showLoading: false }, () => {
                                                        alert('密码错误,请重新输入')
                                                    })
                                                }
                                            }
                                        }, 1000);
                                    }}>
                                    <View style={styles.modalBottomBtnYes}>
                                        <Text style={styles.modalBottomBtnYesText}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default withNavigation(LockPosition);

const styles = StyleSheet.create({
    inputPage: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 30
    },
    infoBox: {
        backgroundColor: "white",
        marginBottom: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10
    },
    infoBoxTitle: {
        fontSize: 15,
        color: "#666",
    },
    splitLine: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#eee",
        marginBottom: 10,
        marginTop: 10
    },
    feeCon: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalCon: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    modal: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 15,
        paddingRight: 15
    },
    modalTitle: {
        fontSize: 16,
        color: "#222",
        lineHeight: 56,
        height: 56,
        textAlign: "center",
        paddingLeft: 15,
        paddingRight: 15
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 4,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 50
    },
    modalBottomBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 40
    },
    modalBottomBtnNo: {

        backgroundColor: "#35CCBF",
        height: 45,
        borderTopLeftRadius: 23,
        borderBottomLeftRadius: 23
    },
    modalBottomBtnYes: {
        backgroundColor: "#528BF7",
        borderTopRightRadius: 23,
        borderBottomRightRadius: 23
    },
    modalBottomBtnNoText: {
        color: "white",
        height: 45,
        lineHeight: 45,
        textAlign: "center",

    },
    modalBottomBtnYesText: {
        color: "white",
        height: 45,
        lineHeight: 45,
        textAlign: "center",

    },
    minerCosts_text: {
        marginTop: 15,
        marginLeft: 10,
        color: '#999',
        fontSize: 16
    },
    gasPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    success: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height: 100,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    success_item: {
        width: screen.width * 0.9,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
    },
    success_text: {
        textAlign: 'center',
        marginBottom: 20
    },
    marginBottom: {
        marginBottom: 20
    }
})