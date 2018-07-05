import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modalbox';
const screen = Dimensions.get('window');

class ListFun extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.fun}>
                    <Text style={styles.fun_text}>
                        {this.props.fun_name}
                    </Text>
                    <Text style={styles.color_bbb}>
                        >
                </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

class WalletInfo extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.state = ({
            walletAddress: ' ',
            walletPassword: ' ',
            keystoreV3: ' ',
            onPress: null,
            modalTitle: null
        })
    }

    componentDidMount() {
        storage.load({
            key: 'walletInfo'
        }).then(walletInfo => {
            let walletAddress = walletInfo.walletAddress,
                walletName = walletInfo.walletName,
                keystoreV3 = walletInfo.keystoreV3;
            this.setState({
                walletAddress: walletAddress,
                walletName: walletName,
                keystoreV3: keystoreV3
            })
        });
    }
    pwd = {
        placeholder: '输入您的密码',
        inputContainerStyle: styles.textInput,
        secureTextEntry: true,
        onChangeText: (walletPassword) => {
            this.setState({
                walletPassword: walletPassword
            })
        }
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

                <ListFun
                    fun_name='钱包名称'
                    onPress={() => {
                        alert('修改钱包名称');
                    }}
                />
                <ListFun
                    fun_name='导出私钥'
                    onPress={() => {
                        alert('导出私钥');
                    }}
                />
                <ListFun
                    fun_name='导出keystore'
                    onPress={() => {
                        this.setState({
                            modalTitle: '验证密码'
                        }, () => {
                            this.refs.codeInput.open();
                            this.setState({
                                onPress: () => {
                                    try {
                                        web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.walletPassword);
                                        this.navigate('ExportKeystore', { keystoreV3: this.state.keystoreV3 });
                                        this.refs.codeInput.close();
                                    } catch (error) {
                                        alert('密码错误,请重新输入')
                                    }
                                }
                            })
                        })
                    }}
                />
                <ListFun
                    fun_name='导出助记词'
                    onPress={() => {
                        this.setState({
                            modalTitle: '验证密码'
                        }, () => {
                            this.refs.codeInput.open();
                            this.setState({
                                onPress: () => {
                                    try {
                                        web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.walletPassword);
                                        this.navigate('ExportMnemonic', { walletPassword: this.state.walletPassword });
                                        this.refs.codeInput.close();
                                    } catch (error) {
                                        alert('密码错误,请重新输入')
                                    }
                                }
                            })
                        })
                    }}
                />
                <Button
                    title='删除钱包'
                    buttonStyle={styles.buttonStyle}
                    onPress={() => {
                        this.setState({
                            modalTitle: '验证密码'
                        }, () => {
                            this.refs.codeInput.open();
                            this.setState({
                                onPress: () => {
                                    try {
                                        web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.walletPassword);
                                        storage.remove({
                                            key: 'walletInfo'
                                        });
                                        this.navigate('Guide');
                                    } catch (error) {
                                        alert('密码错误,请重新输入')
                                    }
                                }
                            })
                        })
                    }}
                />
                <Modal style={styles.modalCode} position={"bottom"} ref={"codeInput"} swipeArea={20}>
                    <View style={styles.InputPwd_title}>
                        <Text>
                            {this.state.modalTitle}
                        </Text>
                    </View>
                    <Input {...this.pwd} />
                    <View style={styles.confirm}>
                        <Button
                            title='确定'
                            buttonStyle={styles.confirmButtonStyle}
                            onPress={this.state.onPress}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

export default withNavigation(WalletInfo)


const styles = StyleSheet.create({
    color_bbb: {
        color: '#bbb'
    },
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
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e0df'
    },
    fun_text: {
        color: '#000'
    },
    buttonStyle: {
        backgroundColor: "#bbb",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 30
    },
    modalCode: {
        alignItems: 'center',
        width: screen.width,
        height: screen.height * 0.5
    },
    InputPwd_title: {
        width: screen.width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c8c7cc'
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        height: 45,
        padding: 5
    },
    confirm: {
        alignItems: 'center',
        position: 'relative',
        top: 80
    },
    confirmButtonStyle: {
        backgroundColor: '#528bf7',
        width: 300,
        height: 45,
        borderRadius: 30
    }
})
