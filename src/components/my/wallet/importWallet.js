import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import I18n from '../../../../language/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextWidget from '../../public/textWidget/textWidget';
import { CheckBox, Button, Input } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import Asset from '../../asset/asset'
import { StackNavigator } from 'react-navigation'

export default class ImportWallet extends Component {
    static navigationOptions = {
        title: `${I18n.t('guide.importWallet')}`,
        headerTintColor: '#000'
    };

    constructor() {
        super();
        this.state = {
            mnemonic: '',
            mnemonicFlag: true,
            pwd: '',
            confirmPwd: '',
            isAgree: false,
            disabledImport: false
        }
    }

    mnemonicArea = {
        placeholder: I18n.t('wallet.mnemonicPlaceholder'),
        multiline: true,
        style: styles.mnemonicArea,
        onChange: (e) => {
            let mnemonic = e.nativeEvent.text
            let spaceReg = /(^\s*)|(\s*$)/g;
            this.setState({
                mnemonic: mnemonic.replace(spaceReg, '')
            }, () => {
                this.setState({
                    mnemonicFlag: this.state.mnemonic ? false : true
                })
            })
        }
    }

    path = {
        placeholder: I18n.t('wallet.path'),
        value: "m/44'/60'/0'/0/0",
        inputContainerStyle: styles.textInput
    }

    pwd = {
        placeholder: I18n.t('wallet.enterPwd'),
        inputContainerStyle: styles.textInput,
        secureTextEntry: true,
        onChangeText: (pwd) => {
            this.setState({
                pwd: pwd
            })
        }
    }

    confirmPwd = {
        placeholder: I18n.t('wallet.confirmPwd'),
        inputContainerStyle: styles.textInput,
        secureTextEntry: true,
        onChangeText: (confirmPwd) => {
            this.setState({
                confirmPwd: confirmPwd
            })
        }
    }

    ImportWallet() {
        if (this.state.mnemonicFlag) {
            Alert.alert('提示', '助记词不能为空')
        } else if (!this.state.pwd) {
            Alert.alert('提示', '请输入密码')
        } else if (this.state.pwd !== this.state.confirmPwd) {
            Alert.alert('提示', '两次密码输入不一致')
        } else if (!this.state.isAgree) {
            Alert.alert('提示', '请同意服务及隐私条款')
        } else {
            let mnemonic = this.state.mnemonic,
                pwd = this.state.pwd;
            navigate('Asset', { name: 'Asset' })
        }
    }

    render() {
        return <ScrollableTabView
            style={{ backgroundColor: '#fff' }}
            tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
            tabBarActiveTextColor='#007aff'
            tabBarInactiveTextColor='#000'
            renderTabBar={() => <DefaultTabBar />}
        >
            <View tabLabel={I18n.t('wallet.mnemonic')} style={styles.padding_10} >
                <TextWidget {...this.mnemonicArea} />
                <Input {...this.path} />
                <Input {...this.pwd} />
                <Input {...this.confirmPwd} />
                <View style={styles.isAgree_flex}>
                    <CheckBox
                        title=''
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
                    title={I18n.t('guide.importWallet')}
                    onPress={this.ImportWallet.bind(this)}
                    buttonStyle={styles.buttonStyle}
                    disabled={this.state.disabledImport}
                    disabledStyle={styles.disabledStyle}
                ></Button>
            </View>

            {/* <View tabLabel={I18n.t('wallet.officialWallet')}>
                <Text>官方钱包</Text>
            </View>
            <View tabLabel={I18n.t('wallet.privateKey')}>
                <Text>私钥</Text>
            </View> */}
        </ScrollableTabView>;
    }
}

const styles = StyleSheet.create({
    mnemonicArea: {
        minHeight: 150,
        maxHeight: 350,
        padding: 8,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#E6E6E6',
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        height: 45,
        padding: 5,
    },
    padding_10: {
        padding: 10
    },
    isAgree_flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    color_999: {
        color: '#999'
    },
    color_aff: {
        color: '#007AFF'
    },
    checkBox: {
        padding: 0,
        width: 26,
        borderColor: 'transparent',
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
});
