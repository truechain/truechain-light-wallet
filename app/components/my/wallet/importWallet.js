import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { I18n } from '../../../../language/i18n';
import lightWallet from 'eth-lightwallet';
import { withNavigation } from 'react-navigation';
import LoadingView from '../../public/loadingView';
import TextWidget from '../../public/textWidget/textWidget';
import { CheckBox, Button, Input } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

class ImportWallet extends Component {
	static navigationOptions = {
		title: `${I18n.t('guide.importWallet')}`,
		headerTintColor: '#000'
	};

	constructor() {
		super();
		this.state = {
			mnemonic: null,
			mnemonicFlag: true,
			hdPathString: "m/44'/60'/0'/0",
			pwd: null,
			confirmPwd: null,
			isAgree: false,
			disabledImport: false,
			showLoading: false
		};
	}

	componentWillMount() {
		this.path = {
			placeholder: I18n.t('wallet.path'),
			value: this.state.hdPathString,
			inputContainerStyle: styles.textInput,
			onChangeText: (hdPathString) => {
				this.setState({
					hdPathString: hdPathString
				});
			}
		};
	}

	mnemonicArea = {
		placeholder: I18n.t('wallet.mnemonicPlaceholder'),
		multiline: true,
		style: styles.mnemonicArea,
		onChange: (e) => {
			let mnemonic = e.nativeEvent.text;
			let spaceReg = /(^\s*)|(\s*$)/g;
			this.setState(
				{
					mnemonic: mnemonic.replace(spaceReg, ' ')
				},
				() => {
					this.setState({
						mnemonic: this.state.mnemonic.replace(/^[\s　]|[ ]$/gi, ''),
						mnemonicFlag: this.state.mnemonic ? false : true
					});
				}
			);
		},
		onEndEditing: () => {
			let reg = /^[\s　]|[ ]$/gi;
			if (reg.test(this.state.mnemonic)) {
				alert('助记词首尾不能有空格,请重新输入');
			}
		}
	};

	// path = {
	//     placeholder: I18n.t('wallet.path'),
	//     value: this.state.hdPathString,
	//     inputContainerStyle: styles.textInput,
	//     onChangeText: (hdPathString) => {
	//         this.setState({
	//             hdPathString: hdPathString
	//         })
	//     }
	// }

	pwd = {
		placeholder: I18n.t('wallet.enterPwd'),
		inputContainerStyle: styles.textInput,
		secureTextEntry: true,
		onChangeText: (pwd) => {
			this.setState({
				pwd: pwd
			});
		}
	};

	confirmPwd = {
		placeholder: I18n.t('wallet.confirmPwd'),
		inputContainerStyle: styles.textInput,
		secureTextEntry: true,
		onChangeText: (confirmPwd) => {
			this.setState({
				confirmPwd: confirmPwd
			});
		}
	};

	_setSeed(option) {
		this.setState({
			showLoading: true
		});
		setTimeout(() => {
			lightWallet.keystore.createVault(
				{
					password: option.password,
					seedPhrase: option.mnemonic,
					hdPathString: option.hdPathString
				},
				(err, ks) => {
					ks.keyFromPassword(option.password, (err, pwDerivedKey) => {
						ks.generateNewAddress(pwDerivedKey, 1);
						var address = ks.getAddresses();
						let keystoreV3 = web3.eth.accounts
							.privateKeyToAccount('0x' + ks.exportPrivateKey(address[0], pwDerivedKey))
							.encrypt(option.password);
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
								walletName: '新钱包'
							},
							expires: null
						});

						setTimeout(() => {
							this.setState(
								{
									showLoading: false
								},
								() => {
									this.props.navigation.navigate('Home');
								}
							);
						}, 2000);
					});
				}
			);
		}, 50);
	}

	ImportWallet() {
		if (this.state.mnemonicFlag) {
			Alert.alert('提示', '助记词不能为空');
		} else if (!this.state.pwd) {
			Alert.alert('提示', '请输入密码');
		} else if (this.state.pwd.length < 8) {
			Alert.alert('提示', '建议密码不少于8位字符');
		} else if (this.state.pwd !== this.state.confirmPwd) {
			Alert.alert('提示', '两次密码输入不一致');
		} else if (!this.state.isAgree) {
			Alert.alert('提示', '请同意服务及隐私条款');
		} else {
			this._setSeed({
				mnemonic: this.state.mnemonic,
				password: this.state.pwd,
				hdPathString: this.state.hdPathString
			});
		}
	}

	render() {
		return (
			<ScrollableTabView
				style={{ backgroundColor: '#fff' }}
				tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
				tabBarActiveTextColor="#007aff"
				tabBarInactiveTextColor="#000"
				renderTabBar={() => <DefaultTabBar />}
			>
				<View tabLabel={I18n.t('wallet.mnemonic')} style={styles.padding_10}>
					<TextWidget {...this.mnemonicArea} />
					<Input {...this.path} />
					<Input {...this.pwd} errorMessage={this.state.pwd ? ' ' : '不少于8位字符，建议混合大小写字母、数字、特殊字符'} />
					<Input
						{...this.confirmPwd}
						errorMessage={this.state.pwd === this.state.confirmPwd ? ' ' : '两次密码输入不一致'}
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
						<Text style={styles.color_999}>我已仔细阅读并同意</Text>
						<Text style={styles.color_aff}>《服务及隐私条款》</Text>
					</View>

					<Button
						title={I18n.t('guide.importWallet')}
						onPress={this.ImportWallet.bind(this)}
						buttonStyle={styles.buttonStyle}
						disabled={this.state.disabledImport}
						disabledStyle={styles.disabledStyle}
					/>
					<LoadingView showLoading={this.state.showLoading} />
				</View>

				{/* <View tabLabel={I18n.t('wallet.officialWallet')}>
                <Text>官方钱包</Text>
            </View>
            <View tabLabel={I18n.t('wallet.privateKey')}>
                <Text>私钥</Text>
            </View> */}
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
		borderColor: '#E6E6E6'
	},
	textInput: {
		borderBottomWidth: 1,
		borderColor: '#e6e6e6',
		height: 45,
		padding: 5
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
		borderColor: 'transparent'
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
