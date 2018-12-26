import React, { Component } from 'react';
import '../../../../shim';
import {
  StyleSheet, Text, View, Alert, Dimensions,
} from 'react-native';
import { CheckBox, Button, Input } from 'react-native-elements';
import lightwallet from 'eth-lightwallet';
import Loading from 'react-native-whc-loading';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { I18n } from '../../../../language/i18n';
import Icon from '../../../pages/iconSets';
import { setStore } from '../../../utils/config';

const screen = Dimensions.get('window');
const DeviceInfo = require('react-native-device-info');

class CreateWallet extends Component {
  constructor() {
    super();
    this.state = {
      walletName: null,
      pwd: '',
      confirmPwd: null,
      isAgree: false,
      disabledCreat: true,
      service_source: null,
    };
  }

  componentDidMount() {
    storage
      .load({
        key: 'localLanguage',
      })
      .then((res) => {
        res.localLanguage.includes('zh')
          ? this.setState({
            service_source: {
              uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_zh.pdf',
              cache: true,
            },
          })
          : this.setState({
            service_source: {
              uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_en.pdf',
              cache: true,
            },
          });
      })
      .catch((e) => {
        DeviceInfo.default.getDeviceLocale().includes('zh')
          ? this.setState({
            service_source: {
              uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_zh.pdf',
              cache: true,
            },
          })
          : this.setState({
            service_source: {
              uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_en.pdf',
              cache: true,
            },
          });
      });
  }

	nameInput = {
	  placeholder: I18n.t('wallet.createWalletTip'), // '请输入钱包名称',
	  inputContainerStyle: styles.textInput,
	  errorStyle: styles.errorStyle,
	  onChangeText: (walletName) => {
	    this.setState({
	      walletName,
	    }, this.isCreate);
	  },
	};

	pwd = {
	  placeholder: I18n.t('wallet.enterPwd'), // '输入您的密码',
	  inputContainerStyle: styles.textInput,
	  errorStyle: styles.errorStyle,
	  secureTextEntry: true,
	  onChangeText: (pwd) => {
	    this.setState({
	      pwd,
	    }, this.isCreate);
	  },
	};

	confirmPwd = {
	  placeholder: I18n.t('wallet.enterPwd_2'), // '确认您的密码',
	  inputContainerStyle: styles.textInput,
	  errorStyle: styles.errorStyle,
	  secureTextEntry: true,
	  onChangeText: (confirmPwd) => {
	    this.setState({
	      confirmPwd,
	    }, this.isCreate);
	  },
	};

	isCreate() {
	  this.setState({
	    disabledCreat: !((this.state.walletName && this.state.pwd && this.state.confirmPwd && this.state.pwd.length > 7 && this.state.pwd === this.state.confirmPwd && this.state.isAgree)),
	  });
	}

	_CreateWallet() {
	  const {
	    walletName, pwd, confirmPwd, isAgree,
	  } = this.state;
	  if (!walletName) {
	    Alert.alert(null, I18n.t('wallet.createWalletTip')); // 提示 请输入钱包名称
	  } else if (!pwd) {
	    Alert.alert(null, I18n.t('wallet.enterPwd')); // '提示', '请输入密码'
	  } else if (pwd.length < 8) {
	    Alert.alert(null, I18n.t('wallet.pwdSuggest')); // '提示', '建议密码不少于8位字符'
	  } else if (!confirmPwd) {
	    Alert.alert(null, I18n.t('wallet.confirmPwd')); // '提示', '请确认您的密码
	  } else if (pwd !== confirmPwd) {
	    Alert.alert(null, I18n.t('wallet.pwdIsWrong')); // '提示', '两次密码不一致请重新输入'
	  } else if (!isAgree) {
	    Alert.alert(null, I18n.t('wallet.agreeTerm')); // '提示', '请同意服务及隐私条款'
	  } else {
	    this.refs.loading.show();
	    const data = [];
	    setTimeout(() => {
	      const randomSeed = lightwallet.keystore.generateRandomSeed();
	      lightwallet.keystore.createVault(
	        {
	          password: pwd,
	          seedPhrase: randomSeed,
	          hdPathString: "m/44'/60'/0'/0",
	        },
	        (err, ks) => {
	          ks.keyFromPassword(pwd, (err, pwDerivedKey) => {
	            ks.generateNewAddress(pwDerivedKey, 1);
	            const address = ks.getAddresses();
	            const keystoreV3 = web3.eth.accounts
	              .privateKeyToAccount(`0x${ks.exportPrivateKey(address[0], pwDerivedKey)}`)
	              .encrypt(pwd);

	            const DataTRUE = {
	              ks,
	              keystoreV3,
	              walletName,
	              walletAddress: address[0],
	              isChecked: true,
	              chain: 'TRUE',
	            };

	            const DataETH = {
	              ks,
	              keystoreV3,
	              walletName,
	              walletAddress: address[0],
	              isChecked: false,
	              chain: 'ETH',
	            };
	            data.push(DataTRUE, DataETH);
	            setStore('walletInfo', data);
	            setTimeout(() => {
	              this.refs.loading.close();
	              const resetAction = StackActions.reset({
	                index: 0,
	                actions: [
	                  NavigationActions.navigate({
	                    routeName: 'ExportMnemonic',
	                    params: {
	                      walletPassword: this.state.pwd,
	                    },
	                  }),
	                ],
	              });
	              this.props.navigation.dispatch(resetAction);
	            }, 100);
	          });
	        },
	      );
	    }, 50);
	  }
	}

	render() {
	  return (
  <View style={styles.container}>
    <Loading ref="loading" />
    <View style={styles.warning_area}>
      <View style={styles.warning}>
        <Icon name="icon-tixing" size={20} color="#6E5500" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.color_waring}>
            {I18n.t('wallet.createWalletTipOfPwd')}
            {' '}
            {/* 密码用于加密私钥，强度非常重要！ */}
          </Text>
          <Text style={styles.color_waring}>
            {I18n.t('wallet.createWalletTipOfNoStore')}
            {/* ·True钱包不会储存密码，也无法帮您找回，请务必牢记！ */}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.padding_10}>
      <Input
        {...this.nameInput}
      />
      <Input
        {...this.pwd}
      />
      <Input
        {...this.confirmPwd}
      />
      <View style={styles.isAgree_flex}>
        <CheckBox
          title=" "
          iconType="material"
          checkedIcon="check-circle"
          uncheckedIcon="check-circle"
          checkedColor="#0071BC"
          checked={this.state.isAgree}
          containerStyle={styles.checkBox}
          onPress={() => {
							  this.setState({ isAgree: !this.state.isAgree }, this.isCreate);
          }}
        />
        <Text style={styles.color_999}>
          {I18n.t('wallet.iAgreeTerm')}
          {/* 我已仔细阅读并同意 */}
          <Text
            style={styles.color_aff}
            onPress={() => {
								  this.props.navigation.navigate('UserPolicy', {
								    service_source: this.state.service_source,
								  });
            }}
          >
            {`《${I18n.t('wallet.term')}》`}
            {/* 《服务及隐私条款》 */}
          </Text>
        </Text>
      </View>
      <Button
        title={I18n.t('wallet.creatWallet')}
						// "创建钱包"
        onPress={this._CreateWallet.bind(this)}
        buttonStyle={styles.buttonStyle}
        disabled={this.state.disabledCreat}
        disabledStyle={styles.disabledStyle}
      />
    </View>
  </View>
	  );
	}
}

export default withNavigation(CreateWallet);

const styles = StyleSheet.create({
  color_waring: {
    color: '#6E5500',
    fontSize: 12,
  },
  padding_10: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  warning_area: {
    padding: 20,
  },
  warning: {
    backgroundColor: '#FFD74E',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    height: 45,
    padding: 5,
  },
  errorStyle: {
    paddingLeft: 10,
  },
  isAgree_flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    padding: 0,
    width: 26,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  color_999: {
    color: '#999',
    width: screen.width - 50,
  },
  color_aff: {
    color: '#0071BC',
  },
  buttonStyle: {
    backgroundColor: '#0071BC',
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 50,
    marginTop: 30,
  },
  disabledStyle: {
    borderWidth: 2,
    backgroundColor: '#ced4da',
  },
});
