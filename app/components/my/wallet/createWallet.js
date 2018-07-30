import React, { Component } from 'react';
import '../../../../shim';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { CheckBox, Button, Input } from 'react-native-elements';
import lightwallet from 'eth-lightwallet';
import Loading from 'react-native-whc-loading';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { I18n } from '../../../../language/i18n';

const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https:mainnet.infura.io/'));
class CreateWallet extends Component {
	static navigationOptions = {
		title:I18n.t('wallet.creatWallet'), // '创建钱包',
		headerTintColor: '#000'
	};

	constructor() {
		super();
		this.state = {
			walletName: null,
			pwd: null,
			confirmPwd: null,
			isAgree: false,
			disabledImport: false
		};
	}

	nameInput = {
		placeholder: I18n.t('wallet.creatWalletTip'),//'请输入钱包名称',
		inputContainerStyle: styles.textInput,
		errorStyle: styles.errorStyle,
		onChangeText: (walletName) => {
			this.setState({
				walletName: walletName
			});
		}
	};

	pwd = {
		placeholder: I18n.t('wallet.enterPwd'),//'输入您的密码',
		inputContainerStyle: styles.textInput,
		errorStyle: styles.errorStyle,
		secureTextEntry: true,
		onChangeText: (pwd) => {
			this.setState({
				pwd: pwd
			});
		}
	};

	confirmPwd = {
		placeholder: I18n.t('wallet.enterPwd'),//'确认您的密码',
		inputContainerStyle: styles.textInput,
		errorStyle: styles.errorStyle,
		secureTextEntry: true,
		onChangeText: (confirmPwd) => {
			this.setState({
				confirmPwd: confirmPwd
			});
		}
	};

	CreateWallet() {
		if (!this.state.walletName) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.createWalletTip') ); // 提示 请输入钱包名称
		} else if (!this.state.pwd) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.enterPwd') ); // '提示', '请输入密码'
		} else if (this.state.pwd.length < 8) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.pwdSuggest') ); // '提示', '建议密码不少于8位字符'
		} else if (!this.state.confirmPwd) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.confirmPwd') ); // '提示', '请确认您的密码
		} else if (this.state.pwd !== this.state.confirmPwd) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.pwdIsWrong') ); // '提示', '两次密码不一致请重新输入'
		} else if (!this.state.isAgree) {
			Alert.alert( I18n.t('tips'), I18n.t('wallet.pwdIsWrong') ); // '提示', '请同意服务及隐私条款'
		} else {
			this.refs.loading.show();
			setTimeout(() => {
				let randomSeed = lightwallet.keystore.generateRandomSeed();
				lightwallet.keystore.createVault(
					{
						password: this.state.pwd,
						seedPhrase: randomSeed,
						hdPathString: "m/44'/60'/0'/0"
					},
					(err, ks) => {
						ks.keyFromPassword(this.state.pwd, (err, pwDerivedKey) => {
							ks.generateNewAddress(pwDerivedKey, 1);
							var address = ks.getAddresses();
							let keystoreV3 = web3.eth.accounts
								.privateKeyToAccount('0x' + ks.exportPrivateKey(address[0], pwDerivedKey))
								.encrypt(this.state.pwd);
							storage.save({
								key: 'walletInfo',
								data: {
									walletAddress: address[0],
									keystoreV3: keystoreV3,
									ks: ks
								},
								expires: null
							});
							storage.save({
								key: 'walletName',
								data: {
									walletName: this.state.walletName
								},
								expires: null
							});
							setTimeout(() => {
								this.refs.loading.close();
								let resetAction = StackActions.reset({
									index: 0,
									actions: [
										NavigationActions.navigate({
											routeName: 'ExportMnemonic',
											params: {
												walletPassword: this.state.pwd
											}
										})
									]
								});
								this.props.navigation.dispatch(resetAction);
							}, 100);
						});
					}
				);
			}, 50);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Loading ref="loading" />
				<View style={styles.warning}>
					 <Text style={styles.color_white}>
						·I18n.t('wallet.createWalletTipOfPwd') {/*密码用于加密私钥，强度非常重要！*/} 
					</Text> 
					<Text style={styles.color_white}>
					·I18n.t('wallet.createWalletTipOfNoStore'){/* ·True钱包不会储存密码，也无法帮您找回，请务必牢记！ */}
					</Text>
				</View>
				<View style={styles.padding_10}>
					<Input 
						{...this.nameInput} errorMessage={ this.state.walletName ? ' ' : I18n.t('wallet.createWalletTip') }  
						// '请输入钱包名称'
					/>
					<Input 
						{...this.pwd} errorMessage={this.state.pwd ? ' ' : I18n.t('wallet.pwdSuggest') } 
						// '不少于8位字符，建议混合大小写字母、数字、特殊字符'
					/>
					<Input
						{...this.confirmPwd}
						errorMessage={this.state.pwd === this.state.confirmPwd ? ' ' :I18n.t('wallet.pwdIsWrong') }
						// '两次密码输入不一致'
					/>
					<View style={styles.isAgree_flex}>
						<CheckBox
							title=" "
							iconType="material"
							checkedIcon="check-circle"
							uncheckedIcon="check-circle"
							checkedColor="#007AFF"
							checked={this.state.isAgree}
							containerStyle={styles.checkBox}
							onPress={() => {
								this.setState({ isAgree: !this.state.isAgree });
							}}
						/>
						<Text style={styles.color_999}>
						    { I18n.t('wallet.iAgreeTerm') }
							{/* 我已仔细阅读并同意 */}
						</Text>
						<Text
							style={styles.color_aff}
							onPress={() => {
								this.props.navigation.navigate('UserPolicy');
							}}
						>
							{"《" + I18n.t('wallet.term')+ "》" }
							{/* 《服务及隐私条款》 */}
						</Text>
					</View>
					<Button
						title={ I18n.t('wallet.creatWallet') }
						// "创建钱包"
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

export default withNavigation(CreateWallet);

const styles = StyleSheet.create({
	color_white: {
		color: '#fff'
	},
	padding_10: {
		padding: 10
	},
	container: {
		flex: 1,
		backgroundColor:'#fff'
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
		padding: 5
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
		borderWidth: 0,
		backgroundColor: 'transparent'
	},
	color_999: {
		color: '#999'
	},
	color_aff: {
		color: '#007AFF'
	},
	buttonStyle: {
		backgroundColor: '#007AFF',
		height: 45,
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 30
	},
	disabledStyle: {
		borderWidth: 2,
		backgroundColor: '#ced4da'
	}
});
