import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Alert, ScrollView, Dimensions,
} from 'react-native';
import lightWallet from 'eth-lightwallet';
import { withNavigation } from 'react-navigation';
import { CheckBox, Button, Input } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Loading from 'react-native-whc-loading';
import TextWidget from '../../public/textWidget/textWidget';
import { I18n } from '../../../../language/i18n';
import { setStore } from '../../../utils/config';
import '../../../../shim';

const screen = Dimensions.get('window');
const DeviceInfo = require('react-native-device-info');
const Mnemonic = require('bitcore-mnemonic');

class ImportWallet extends Component {
  constructor() {
    super();
    this.state = {
      mnemonic: null,
      privateFile: null,
      mnemonicFlag: true,
      hdPathString: "m/44'/60'/0'/0",
      mnemonicPwd: null,
      privatePwd: null,
      confirmPrivatePwd: null,
      confirmMnemonicPwd: null,
      mnemonisAgree: false,
      privateisAgree: false,
      disabledMImport: true,
      disabledKImport: true,
      disabledPImport: true,
      privateFileFlag: true,
      keystoreFile: null,
      keystoreFileFlag: true,
      keystorePwd: null,
      keystoreisAgree: false,
      service_source: null,
    };
  }

  componentDidMount() {
    this._serviceSource();
  }

	mnemonicArea = {
	  placeholder: I18n.t('wallet.mnemonicPlaceholder'),
	  multiline: true,
	  style: styles.mnemonicArea,
	  onChange: (e) => {
	    const mnemonic = e.nativeEvent.text;
	    // let spaceReg = /(^\s*)|(\s*$)/g;
	    const spaceReg = /^[\s　]|[ ]$/gi;
	    this.setState(
	      {
	        mnemonic: mnemonic.replace(spaceReg, ' '),
	      },
	      () => {
	        this.setState({
	          mnemonicFlag: !this.state.mnemonic,
	          disabledMImport: !((this.state.mnemonic && this.state.mnemonicPwd && this.state.mnemonicPwd.length > 7 && this.state.mnemonicPwd === this.state.confirmMnemonicPwd && this.state.mnemonisAgree)),
	        });
	      },
	    );
	  },
	  onEndEditing: () => {
	    const reg = /^[\s　]|[ ]$/gi;
	    if (reg.test(this.state.mnemonic)) {
	      Alert.alert(I18n.t('wallet.mnemonicTip')); // '助记词首尾不能有空格,请重新输入'
	    }
	  },
	};

	keystoreArea = {
	  placeholder: 'keystore',
	  multiline: true,
	  style: styles.mnemonicArea,
	  onChange: (e) => {
	    this.setState(
	      {
	        keystoreFile: e.nativeEvent.text,
	      },
	      () => {
	        this.setState({
	          keystoreFileFlag: !this.state.keystoreFile,
	          disabledKImport: !((this.state.keystoreFile && this.state.keystorePwd && this.state.keystorePwd && this.state.keystoreisAgree)),
	        });
	      },
	    );
	  },
	};

	privateKeyArea = {
	  placeholder: 'PrivateKey',
	  multiline: true,
	  style: styles.mnemonicArea,
	  onChange: (e) => {
	    this.setState(
	      {
	        privateFile: e.nativeEvent.text,
	      },
	      () => {
	        this.setState({
	          privateFileFlag: !this.state.privateFile,
	          disabledPImport: !((this.state.privateFile && this.state.privatePwd && this.state.privatePwd.length > 7 && this.state.privatePwd === this.state.confirmPrivatePwd && this.state.privateisAgree)),
	        });
	      },
	    );
	  },
	};

	_serviceSource() {
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

	mnemonicPwd = {
	  placeholder: I18n.t('wallet.enterPwd'),
	  inputContainerStyle: styles.textInput,
	  secureTextEntry: true,
	  onChangeText: (mnemonicPwd) => {
	    this.setState({
	      mnemonicPwd,
	    }, () => {
	      this.setState({
	        disabledMImport: !((this.state.mnemonic && this.state.mnemonicPwd && this.state.mnemonicPwd.length > 7 && this.state.mnemonicPwd === this.state.confirmMnemonicPwd && this.state.mnemonisAgree)),
	      });
	    });
	  },
	};

	keystorePwd = {
	  placeholder: I18n.t('wallet.enterPwd'),
	  inputContainerStyle: styles.textInput,
	  secureTextEntry: true,
	  onChangeText: (keystorePwd) => {
	    this.setState({
	      keystorePwd,
	    }, () => {
	      this.setState({
	        disabledKImport: !((this.state.keystoreFile && this.state.keystorePwd && this.state.keystorePwd && this.state.keystoreisAgree)),
	      });
	    });
	  },
	};

	privatePwd = {
	  placeholder: I18n.t('wallet.enterPwd'),
	  inputContainerStyle: styles.textInput,
	  secureTextEntry: true,
	  onChangeText: (privatePwd) => {
	    this.setState({
	      privatePwd,
	    }, () => {
	      this.setState({
	        disabledPImport: !((this.state.privateFile && this.state.privatePwd && this.state.privatePwd.length > 7 && this.state.privatePwd === this.state.confirmPrivatePwd && this.state.privateisAgree)),
	      });
	    });
	  },
	};

	confirmMnemonicPwd = {
	  placeholder: I18n.t('wallet.confirmPwd'),
	  inputContainerStyle: styles.textInput,
	  secureTextEntry: true,
	  onChangeText: (confirmMnemonicPwd) => {
	    this.setState({
	      confirmMnemonicPwd,
	    }, () => {
	      this.setState({
	        disabledMImport: !((this.state.mnemonic && this.state.mnemonicPwd && this.state.mnemonicPwd.length > 7 && this.state.mnemonicPwd === this.state.confirmMnemonicPwd && this.state.mnemonisAgree)),
	      });
	    });
	  },
	};

	confirmPrivatePwd = {
	  placeholder: I18n.t('wallet.confirmPwd'),
	  inputContainerStyle: styles.textInput,
	  secureTextEntry: true,
	  onChangeText: (confirmPrivatePwd) => {
	    this.setState({
	      confirmPrivatePwd,
	    }, () => {
	      this.setState({
	        disabledPImport: !((this.state.privateFile && this.state.privatePwd && this.state.privatePwd.length > 7 && this.state.privatePwd === this.state.confirmPrivatePwd && this.state.privateisAgree)),
	      });
	    });
	  },
	};

	_setSeed(option) {
	  option._this.refs.loading.show();
	  setTimeout(() => {
	    const words = option.mnemonic.split(' ');
	    if (!Mnemonic.isValid(option.mnemonic, Mnemonic.Words.ENGLISH) || words.length !== 12) {
	      option._this.refs.loading.close();
	      setTimeout(() => {
	        Alert.alert(I18n.t('wallet.mnemonicIsWrong')); // '助记词无效，请重新输入'
	      }, 100);
	    } else {
	      lightWallet.keystore.createVault(
	        {
	          password: option.password,
	          seedPhrase: option.mnemonic,
	          hdPathString: option.hdPathString,
	        },
	        (err, ks) => {
	          ks.keyFromPassword(option.password, (err, pwDerivedKey) => {
	            ks.generateNewAddress(pwDerivedKey, 1);
	            const address = ks.getAddresses();
	            const keystoreV3 = web3.eth.accounts
	              .privateKeyToAccount(`0x${ks.exportPrivateKey(address[0], pwDerivedKey)}`)
	              .encrypt(option.password);

	            setStore('walletInfo', {
	              walletAddress: address[0],
	              keystoreV3,
	              ks,
	            });
	            setStore('walletName', {
	              walletName: '新钱包',
	            });

	            setTimeout(() => {
	              option._this.refs.loading.close();
	              option._this.props.navigation.navigate('Home');
	            }, 100);
	          });
	        },
	      );
	    }
	  }, 300);
	}

	check(option, cb) {
	  if (option.content) {
	    Alert.alert('提示', option.msg);
	  } else if (!option.pwd) {
	    Alert.alert(null, I18n.t('wallet.enterPwd')); // '提示', '请输入密码'
	  } else if (option.pwd.length < 8) {
	    Alert.alert(null, I18n.t('wallet.pwdSuggest')); // '提示', '建议密码不少于8位字符'
	  } else if (option.pwd !== option.confirmPwd) {
	    Alert.alert(null, I18n.t('wallet.pwdIsWrong')); // '提示', '两次密码不一致请重新输入'
	  } else if (!option.isAgree) {
	    Alert.alert(null, I18n.t('wallet.agreeTerm')); // '提示', '请同意服务及隐私条款'
	  } else {
	    cb({
	      mnemonic: this.state.mnemonic,
	      password: this.state.mnemonicPwd,
	      hdPathString: this.state.hdPathString,
	      _this: this,
	    });
	  }
	}

	_mnemonicImport() {
	  this.check(
	    {
	      content: this.state.mnemonicFlag,
	      pwd: this.state.mnemonicPwd,
	      confirmPwd: this.state.confirmMnemonicPwd,
	      isAgree: this.state.mnemonisAgree,
	      msg: I18n.t('wallet.mnemonicIsNull'), // '助记词不能为空'
	    },
	    this._setSeed,
	  );
	}

	_privateKeyImport() {
	  this.check(
	    {
	      content: this.state.privateFileFlag,
	      pwd: this.state.privatePwd,
	      confirmPwd: this.state.confirmPrivatePwd,
	      isAgree: this.state.privateisAgree,
	      msg: I18n.t('wallet.privateKeyIsNull'), // '私钥不能为空'
	    },
	    () => {
	      this.refs.loading.show();
	      setTimeout(() => {
	        try {
	          const keystoreV3 = web3.eth.accounts.encrypt(this.state.privateFile, this.state.privatePwd);
	          setStore('walletInfo', {
	            walletAddress: `0x${keystoreV3.address}`,
	            keystoreV3,
	          });

	          setStore('walletName', {
	            walletName: 'My Wallet',
	          });
	          setTimeout(() => {
	            this.refs.loading.close();
	            this.props.navigation.navigate('Home');
	          }, 100);
	        } catch (err) {
	          this.refs.loading.close();
	          setTimeout(() => {
	            Alert.alert(null, I18n.t('wallet.privateKeyIsWrong')); // '提示', '私钥无效,请重新输入！'
	          }, 100);
	        }
	      }, 500);
	    },
	  );
	}

	_keystoreImport() {
	  if (this.state.keystoreFileFlag) {
	    Alert.alert(null, I18n.t('wallet.keystoreIsNull')); // '提示', '请输入keystore信息'
	  } else if (!this.state.keystorePwd) {
	    Alert.alert(null, I18n.t('wallet.enterPwd')); // '提示', '请输入密码'
	  } else if (!this.state.keystoreisAgree) {
	    Alert.alert(null, I18n.t('wallet.agreeTerm')); // '提示', '请同意服务及隐私条款'
	  } else {
	    this.refs.loading.show();
	    setTimeout(() => {
	      try {
	        const account = web3.eth.accounts.decrypt(this.state.keystoreFile, this.state.keystorePwd);
	        setStore('walletInfo', {
	          walletAddress: account.address,
	          keystoreV3: JSON.parse(this.state.keystoreFile),
	        });

	        setStore('walletName', {
	          walletName: 'My Wallet',
	        });
	        setTimeout(() => {
	          this.refs.loading.close();
	          this.props.navigation.navigate('Home');
	        }, 100);
	      } catch (e) {
	        this.refs.loading.close();
	        setTimeout(() => {
	          Alert.alert(null, I18n.t('wallet.wrongByKeystoreOrPwd'));
	          // '提示', '导入钱包失败, 请检查keystore或者密码是否正确');
	        }, 100);
	      }
	    }, 500);
	  }
	}

	render() {
	  return (
  <ScrollableTabView
    style={{ backgroundColor: '#fff' }}
    tabBarUnderlineStyle={{ backgroundColor: '#0071BC', height: 2 }}
    tabBarActiveTextColor="#0071BC"
    tabBarInactiveTextColor="#000"
    renderTabBar={() => <DefaultTabBar />}
  >
    {/* 助记词导入 */}
    <View tabLabel={I18n.t('wallet.mnemonic')} style={styles.padding_10}>
      <ScrollView>
        <TextWidget {...this.mnemonicArea} />
        <Input
          {...this.mnemonicPwd}
        />
        <Input
          {...this.confirmMnemonicPwd}
        />
        <View style={styles.isAgree_flex}>
          <CheckBox
            title=" "
            iconType="material"
            checkedIcon="check-circle"
            uncheckedIcon="check-circle"
            checkedColor="#0071BC"
            checked={this.state.mnemonisAgree}
            containerStyle={styles.checkBox}
            onPress={() => {
								  this.setState({ mnemonisAgree: !this.state.mnemonisAgree }, () => {
								    this.setState({
								      disabledMImport: !((this.state.mnemonic && this.state.mnemonicPwd && this.state.mnemonicPwd.length > 7 && this.state.mnemonicPwd === this.state.confirmMnemonicPwd && this.state.mnemonisAgree)),
								    });
								  });
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
          title={I18n.t('guide.importWallet')}
          onPress={this._mnemonicImport.bind(this)}
          buttonStyle={styles.buttonStyle}
          disabled={this.state.disabledMImport}
          disabledStyle={styles.disabledStyle}
        />
        <Loading ref="loading" />
      </ScrollView>
    </View>
    {/* keystore导入 */}
    <View tabLabel={I18n.t('wallet.officialWallet')} style={styles.padding_10}>
      <ScrollView>
        <Text style={styles.color_999}>
          {I18n.t('wallet.copyKeystoreTip')}
          {/* 直接复制粘贴以太坊官方钱包keystore文件内容至输入框。 */}
        </Text>
        <TextWidget {...this.keystoreArea} />
        <Input {...this.keystorePwd} />
        <View style={styles.isAgree_flex}>
          <CheckBox
            title=" "
            iconType="material"
            checkedIcon="check-circle"
            uncheckedIcon="check-circle"
            checkedColor="#0071BC"
            checked={this.state.keystoreisAgree}
            containerStyle={styles.checkBox}
            onPress={() => {
								  this.setState({ keystoreisAgree: !this.state.keystoreisAgree }, () => {
								    this.setState({
								      disabledKImport: !((this.state.keystoreFile && this.state.keystorePwd && this.state.keystorePwd && this.state.keystoreisAgree)),
								    });
								  });
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
          title={I18n.t('guide.importWallet')}
          onPress={this._keystoreImport.bind(this)}
          buttonStyle={styles.buttonStyle}
          disabled={this.state.disabledKImport}
          disabledStyle={styles.disabledStyle}
        />
      </ScrollView>
    </View>
    {/* 私钥导入 */}
    <View tabLabel={I18n.t('wallet.privateKey')} style={styles.padding_10}>
      <ScrollView>
        <TextWidget {...this.privateKeyArea} />
        <Input
          {...this.privatePwd}
        />
        <Input
          {...this.confirmPrivatePwd}
        />
        <View style={styles.isAgree_flex}>
          <CheckBox
            title=" "
            iconType="material"
            checkedIcon="check-circle"
            uncheckedIcon="check-circle"
            checkedColor="#0071BC"
            checked={this.state.privateisAgree}
            containerStyle={styles.checkBox}
            onPress={() => {
								  this.setState({ privateisAgree: !this.state.privateisAgree }, () => {
								    this.setState({
								      disabledPImport: !((this.state.privateFile && this.state.privatePwd && this.state.privatePwd.length > 7 && this.state.privatePwd === this.state.confirmPrivatePwd && this.state.privateisAgree)),
								    });
								  });
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
          title={I18n.t('guide.importWallet')}
          onPress={this._privateKeyImport.bind(this)}
          buttonStyle={styles.buttonStyle}
          disabled={this.state.disabledPImport}
          disabledStyle={styles.disabledStyle}
        />
      </ScrollView>
    </View>
  </ScrollableTabView>
	  );
	}
}

export default withNavigation(ImportWallet);

const styles = StyleSheet.create({
  mnemonicArea: {
    minHeight: 150,
    maxHeight: 350,
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 20,
    borderColor: '#E6E6E6',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    height: 45,
    padding: 5,
  },
  padding_10: {
    padding: 10,
    flex: 1,
  },
  isAgree_flex: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  color_999: {
    color: '#999',
    width: screen.width - 50,
  },
  color_aff: {
    color: '#0071BC',
  },
  checkBox: {
    padding: 0,
    width: 26,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
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
