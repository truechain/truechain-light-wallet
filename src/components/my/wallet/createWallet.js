import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../store/action/createWallet'
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions
} from 'react-native';
import { CheckBox, Button, Input } from 'react-native-elements';
import lightwallet from 'eth-lightwallet'
import LoadingView from '../../public/loadingView'
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https:mainnet.infura.io/'));

const screen = Dimensions.get('window');
class CreateWallet extends Component {
    static navigationOptions = {
        title: '创建钱包',
        headerTintColor: '#000'
    };

    constructor() {
        super();
        this.state = {
            walletName: null,
            pwd: null,
            confirmPwd: null,
            isAgree: false,
            disabledImport: false,
            showLoading: false
        }
    }

    nameInput = {
        placeholder: '请输入钱包名称',
        inputContainerStyle: styles.textInput,
        errorStyle: styles.errorStyle,
        onChangeText: (walletName) => {
            this.setState({
                walletName: walletName
            })
        }
    }
    pwd = {
        placeholder: '输入您的密码',
        inputContainerStyle: styles.textInput,
        errorStyle: styles.errorStyle,
        secureTextEntry: true,
        onChangeText: (pwd) => {
            this.setState({
                pwd: pwd
            })
        }
    }

    confirmPwd = {
        placeholder: '确认您的密码',
        inputContainerStyle: styles.textInput,
        errorStyle: styles.errorStyle,
        secureTextEntry: true,
        onChangeText: (confirmPwd) => {
            this.setState({
                confirmPwd: confirmPwd
            })
        }
    }

    CreateWallet() {
        if (!this.state.walletName) {
            Alert.alert('提示', '请输入钱包名称')
        } else if (!this.state.pwd) {
            Alert.alert('提示', '请输入密码')
        } else if (!this.state.confirmPwd) {
            Alert.alert('提示', '请确认您的密码')
        } else if (this.state.pwd !== this.state.confirmPwd) {
            Alert.alert('提示', '两次密码不一致请重新输入')
        } else if (!this.state.isAgree) {
            Alert.alert('提示', '请同意服务及隐私条款')
        } else {
            this.setState({
                showLoading: true
            });
            setTimeout(() => {
                var randomSeed = lightwallet.keystore.generateRandomSeed();
                lightwallet.keystore.createVault({
                    password: this.state.pwd,
                    seedPhrase: randomSeed,
                    hdPathString: "m/44'/60'/0'/0"
                }, (err, ks) => {
                    ks.keyFromPassword(this.state.pwd, (err, pwDerivedKey) => {
                        ks.generateNewAddress(pwDerivedKey, 1);
                        var address = ks.getAddresses();
                        let keystoreV3 = web3.eth.accounts.privateKeyToAccount('0x' + ks.exportPrivateKey(address[0], pwDerivedKey)).encrypt(this.state.pwd);
                        this.props.walletInfo(this.state.walletName, address[0], keystoreV3);
                        setTimeout(() => {
                            this.setState({
                                showLoading: false
                            });
                        }, 2000);
                    })
                })
            }, 100);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingView showLoading={this.state.showLoading} />
                <View style={styles.warning}>
                    <Text style={styles.color_white}>
                        ·密码用于加密私钥，强度非常重要！
                            </Text>
                    <Text style={styles.color_white}>
                        ·True钱包不会储存密码，也无法帮您找回，请务必牢记！
                            </Text>
                </View>
                <View style={styles.padding_10}>
                    <Input {...this.nameInput}
                        errorMessage={this.state.walletName ? ' ' : '请输入钱包名称'}
                    />
                    <Input {...this.pwd}
                        errorMessage={this.state.pwd ? ' ' : '不少于8位字符，建议混合大小写字母、数字、特殊字符'}
                    />
                    <Input {...this.confirmPwd}
                        errorMessage={this.state.pwd === this.state.confirmPwd ? ' ' : '两次密码输入不一致'}
                    />
                    <View style={styles.isAgree_flex}>
                        <CheckBox
                            title=' '
                            iconType='material'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checkedColor='#007AFF'
                            checked={this.state.isAgree}
                            containerStyle={styles.checkBox}
                            onPress={() => {
                                this.setState({ isAgree: !this.state.isAgree })
                            }}
                        />
                        <Text style={styles.color_999}>我已仔细阅读并同意</Text>
                        <Text style={styles.color_aff}>《服务及隐私条款》</Text>
                    </View>
                    <Button
                        title='创建钱包'
                        onPress={this.CreateWallet.bind(this)}
                        buttonStyle={styles.buttonStyle}
                        disabled={this.state.disabledImport}
                        disabledStyle={styles.disabledStyle}
                    />
                </View>
            </View>
        );
    }
}

export default connect(
    state => state.createWallet,
    actions
)(CreateWallet)

const styles = StyleSheet.create({
    color_white: {
        color: '#fff'
    },
    padding_10: {
        padding: 10
    },
    container: {
        flex: 1
    },
    warning: {
        height: 60,
        backgroundColor: '#528bf7',
        justifyContent: 'center',
        paddingLeft: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        height: 45,
        padding: 5,
    },
    errorStyle: {
        paddingLeft: 10
    },
    isAgree_flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox: {
        padding: 0,
        width: 26,
        borderColor: 'transparent',
    },
    color_999: {
        color: '#999'
    },
    color_aff: {
        color: '#007AFF'
    },
    buttonStyle: {
        backgroundColor: "#007AFF",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 30
    },
    disabledStyle: {
        borderWidth: 2,
        backgroundColor: "#ced4da"
    }
})
