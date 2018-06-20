import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import I18n from '../../../../language/i18n';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TextWidget from '../../public/textWidget/textWidget';
import { CheckBox, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ImportWallet extends Component {
    static navigationOptions = {
        title: `${I18n.t('guide.importWallet')}`,
        headerTintColor: '#000'
    };

    constructor() {
        super();
        this.state = {
            pwd: null,
            confirmPwd: null,
            isAgree: false,
            isImport: false
        }
    }
    mnemonicArea = {
        placeholder: I18n.t('wallet.mnemonicPlaceholder'),
        style: styles.mnemonicArea,
        autoFocus: true,
        multiline: true
    }

    path = {
        placeholder: I18n.t('wallet.path'),
        value: "m/44'/60'/0'/0/0",
        style: styles.textInput
    }
    pwd = {
        placeholder: I18n.t('wallet.enterPwd'),
        style: styles.textInput,
        onEndEditing: (e) => {
            this.setState({
                pwd: e.nativeEvent.text
            }, () => {
                console.log('输入的密码:', this.state.pwd);
            })
        }
    }
    confirmPwd = {
        placeholder: I18n.t('wallet.confirmPwd'),
        style: styles.textInput,
        onEndEditing: (e) => {
            this.setState({
                confirmPwd: e.nativeEvent.text
            }, () => {
                console.log('确认密码:', this.state.confirmPwd);
            })
        }
    }

    ImportWallet() {
        alert('导入钱包事件')
    }
    render() {
        return <ScrollableTabView
            style={{ backgroundColor: '#fff' }}
            tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
            tabBarActiveTextColor='#007aff'
            tabBarInactiveTextColor='#000'
            renderTabBar={() => <DefaultTabBar />}
        >
            {/* 助记词导入 */}
            <View tabLabel={I18n.t('wallet.mnemonic')} style={styles.padding_10} >
                <TextWidget {...this.mnemonicArea} />
                <TextWidget {...this.path} />
                <TextWidget {...this.pwd} />
                <TextWidget {...this.confirmPwd} />
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
                    onPress={this.ImportWallet}
                    buttonStyle={styles.buttonStyle}
                    disabled={this.state.isImport}
                    disabledStyle={styles.disabledStyle}
                ></Button>
            </View>

            <View tabLabel={I18n.t('wallet.officialWallet')}>
                <Text>官方钱包</Text>
            </View>
            <View tabLabel={I18n.t('wallet.privateKey')}>
                <Text>私钥</Text>
            </View>
        </ScrollableTabView>;
    }
}

const styles = StyleSheet.create({
    mnemonicArea: {
        minHeight: 100,
        maxHeight: 150,
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
        width: 300,
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
