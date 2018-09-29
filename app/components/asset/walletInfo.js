import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Clipboard, TouchableHighlight, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modalbox';
import Loading from 'react-native-whc-loading';
import Toast from 'react-native-easy-toast';
import { I18n } from '../../../language/i18n';
import Icon from '../../pages/iconSets';

const screen = Dimensions.get('window');

class ListFun extends Component {
	render() {
		return (
			<TouchableHighlight underlayColor={'transparent'} onPress={this.props.onPress}>
				<View style={styles.fun}>
					<Text style={styles.fun_text}>{this.props.fun_name}</Text>
					<Icon name="icon-right" size={15} color="#000" />
				</View>
			</TouchableHighlight>
		);
	}
}

class WalletInfo extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
		this.state = {
			walletAddress: ' ',
			walletPassword: null,
			keystoreV3: ' ',
			onPress: null,
			modalTitle: null,
			deleteBtnshow: true,
			selectExportMnemonic: false
		};
		this.verifyPwd = this.verifyPwd.bind(this);
	}

	componentDidMount() {
		storage
			.load({
				key: 'walletInfo'
			})
			.then((walletInfo) => {
				if (walletInfo.ks) {
					this.setState({
						selectExportMnemonic: true
					});
				} else {
					this.setState({
						selectExportMnemonic: false
					});
				}

				let walletAddress = walletInfo.walletAddress,
					keystoreV3 = walletInfo.keystoreV3;
				this.setState({
					walletAddress: walletAddress,
					keystoreV3: keystoreV3,
					PrivateKey: null
				});
			});

		storage
			.load({
				key: 'walletName'
			})
			.then((res) => {
				let walletName = res.walletName;
				this.setState({
					walletName: walletName
				});
			});
	}
	pwd = {
		placeholder: I18n.t('public.inputPwd'),
		inputContainerStyle: styles.textInput,
		secureTextEntry: true,
		onChangeText: (walletPassword) => {
			this.setState({
				walletPassword: walletPassword
			});
		},
		ref: 'pwdInput'
	};
	walletName = {
		placeholder: I18n.t('assets.walletInfo.enterWalletName'), //'输入您的钱包名称',
		inputContainerStyle: styles.walletNameStyle,
		onChangeText: (walletName) => {
			this.setState({
				walletName: walletName
			});
		}
	};

	verifyPwd() {
		try {
			web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.walletPassword);
			this.refs.codeInput.close();
			this.navigate('ExportMnemonic');
		} catch (e) {
			Alert.alert(null, I18n.t('wallet.wrongPwd')); //'密码错误,请重新输入');
			this.setState({
				walletPassword: null
			});
			this.refs.pwdInput.clear();
		}
	}

	_setClipboardContent = async () => {
		Clipboard.setString(this.state.PrivateKey);
		try {
			var content = await Clipboard.getString();
			this.refs.toast.show(I18n.t('public.copySuccess'));
		} catch (e) {
			this.refs.toast.show(I18n.t('public.copyFailed'));
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.walletInfo}>
					<Image style={styles.walletAvatar} source={require('../../assets/images/asset/head_2x.png')} />
					<View style={styles.walletInfo_item}>
						<Text>{this.state.walletName}</Text>
						<Text>
							{this.state.walletAddress.replace(this.state.walletAddress.slice('9', '35'), '......')}
						</Text>
					</View>
				</View>
				<ListFun
					fun_name={I18n.t('assets.walletInfo.walletName')}
					onPress={() => {
						this.setState(
							{
								modalTitle: I18n.t('assets.walletInfo.walletName') //'钱包名称'
							},
							() => {
								this.refs.changeWalletName.open();
							}
						);
					}}
				/>
				<ListFun
					fun_name={I18n.t('assets.walletInfo.exportPrivateKey')}
					onPress={() => {
						this.setState(
							{
								modalTitle: I18n.t('assets.walletInfo.exportPrivateKey')
							},
							() => {
								this.refs.codeInput.open();
								this.setState({
									onPress: () => {
										this.refs.codeInput.close();
										setTimeout(() => {
											if (!this.state.walletPassword) {
												alert('输入密码');
											} else {
												this.refs.loading.show();
												setTimeout(() => {
													try {
														web3.eth.accounts.decrypt(
															this.state.keystoreV3,
															this.state.walletPassword
														);
														storage.load({ key: 'walletInfo' }).then((res) => {
															let PrivateKey = web3.eth.accounts.decrypt(
																JSON.stringify(res.keystoreV3),
																this.state.walletPassword
															).privateKey;
															this.setState({
																walletPassword: '',
																PrivateKey
															});
														});
														this.refs.privateKey.open();
														this.refs.loading.close();
													} catch (error) {
														this.refs.loading.close();
														setTimeout(() => {
															Alert.alert(null, I18n.t('public.wrongPwd'));
														}, 100);
													}
												}, 100);
											}
										}, 1000);
									}
								});
							}
						);
					}}
				/>
				<ListFun
					fun_name={I18n.t('assets.walletInfo.exportKeystore')}
					onPress={() => {
						this.setState(
							{
								modalTitle: I18n.t('assets.walletInfo.exportKeystore')
							},
							() => {
								this.refs.codeInput.open();
								this.setState({
									onPress: () => {
										this.refs.codeInput.close();
										setTimeout(() => {
											if (!this.state.walletPassword) {
												alert('输入密码');
											} else {
												this.refs.loading.show();
												setTimeout(() => {
													try {
														web3.eth.accounts.decrypt(
															this.state.keystoreV3,
															this.state.walletPassword
														);
														this.setState({
															walletPassword: null
														});
														this.refs.loading.close();
														this.navigate('ExportKeystore', {
															keystoreV3: this.state.keystoreV3
														});
													} catch (error) {
														this.refs.loading.close();
														setTimeout(() => {
															Alert.alert(null, I18n.t('public.wrongPwd'));
														}, 100);
													}
												}, 100);
											}
										}, 1000);
									}
								});
							}
						);
					}}
				/>

				{this.state.selectExportMnemonic ? (
					<ListFun
						fun_name={I18n.t('assets.walletInfo.exportMnemonic')}
						onPress={() => {
							this.setState(
								{
									modalTitle: I18n.t('assets.walletInfo.exportMnemonic')
								},
								() => {
									this.refs.codeInput.open();
									this.setState({
										onPress: () => {
											this.refs.codeInput.close();
											setTimeout(() => {
												if (!this.state.walletPassword) {
													alert('输入密码');
												} else {
													this.refs.loading.show();
													setTimeout(() => {
														try {
															web3.eth.accounts.decrypt(
																this.state.keystoreV3,
																this.state.walletPassword
															);
															this.navigate('ExportMnemonic', {
																walletPassword: this.state.walletPassword
															});
															this.setState({
																walletPassword: null
															});
															this.refs.loading.close();
														} catch (error) {
															this.refs.loading.close();
															setTimeout(() => {
																Alert.alert(null, I18n.t('public.wrongPwd'));
															}, 100);
														}
													}, 100);
												}
											}, 1000);
										}
									});
								}
							);
						}}
					/>
				) : null}
				<Loading ref="loading" />
				{/* <ActivityIndicator animating={this.state.huhu} /> */}
				<Button
					title={I18n.t('assets.walletInfo.deleteWallet')}
					buttonStyle={styles.buttonStyle}
					onPress={() => {
						this.setState(
							{
								modalTitle: I18n.t('public.verifyPwd')
							},
							() => {
								this.refs.codeInput.open();
								this.setState({
									onPress: () => {
										this.refs.codeInput.close();
										setTimeout(() => {
											if (!this.state.walletPassword) {
												alert('输入密码');
											} else {
												this.refs.loading.show();
												setTimeout(() => {
													try {
														web3.eth.accounts.decrypt(
															this.state.keystoreV3,
															this.state.walletPassword
														);
														storage.remove({
															key: 'walletInfo'
														});

														storage.remove({
															key: 'token'
														});
														storage.remove({
															key: 'walletName'
														});
														this.refs.loading.close();
														this.navigate('Guide');
													} catch (error) {
														this.refs.loading.close();
														setTimeout(() => {
															Alert.alert(null, I18n.t('public.wrongPwd'));
														}, 100);
													}
												}, 100);
											}
										}, 1000);
									}
								});
							}
						);
					}}
				/>

				<Modal
					style={styles.modalCode}
					position={'bottom'}
					ref={'codeInput'}
					coverScreen={true}
					swipeArea={20}
					onClosed={() => {
						this.setState({ deleteBtnshow: true });
					}}
					onOpened={() => {
						this.setState({ deleteBtnshow: false });
					}}
				>
					<View style={styles.InputPwd_title}>
						<Text>{this.state.modalTitle}</Text>
					</View>
					<Input {...this.pwd} />
					<View style={styles.confirm}>
						<Button
							title={I18n.t('public.define')} //"确定"
							buttonStyle={styles.confirmButtonStyle}
							onPress={this.state.onPress}
						/>
					</View>
				</Modal>

				<Modal
					style={styles.modalCode}
					position={'bottom'}
					coverScreen={true}
					ref={'changeWalletName'}
					swipeArea={20}
				>
					<View style={styles.InputPwd_title}>
						<Text>{this.state.modalTitle}</Text>
					</View>
					<Input {...this.walletName} />

					<View style={styles.bottom_fun}>
						<TouchableHighlight style={styles.bottom_fun_item_cancel}>
							<Text
								style={styles.bottom_fun_item}
								onPress={() => {
									this.refs.changeWalletName.close();
								}}
							>
								{I18n.t('public.cancel')}
								{/* 取消 */}
							</Text>
						</TouchableHighlight>
						<TouchableHighlight style={styles.bottom_fun_item_done}>
							<Text
								style={styles.bottom_fun_item}
								onPress={() => {
									storage.save({
										key: 'walletName',
										data: {
											walletName: this.state.walletName
										},
										expires: null
									});
									this.refs.changeWalletName.close();
								}}
							>
								{I18n.t('public.define')}
								{/* 确定 */}
							</Text>
						</TouchableHighlight>
					</View>
				</Modal>

				<Modal
					style={styles.privateKey}
					position={'center'}
					coverScreen={true}
					ref={'privateKey'}
					swipeArea={20}
				>
					<View style={styles.privateKeyTitle}>
						<Text>{I18n.t('assets.walletInfo.exportPrivateKey')}</Text>
					</View>
					<TouchableHighlight style={[ styles.spacing, styles.privateKeyWarning ]}>
						<View>
							<Text style={styles.warining_text}>{I18n.t('assets.walletInfo.privateKeyWarning')}</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight style={[ styles.spacing, styles.privateKeyArea ]}>
						<View>
							<Text>{this.state.PrivateKey}</Text>
						</View>
					</TouchableHighlight>
					<Toast ref="toast" position="center" />
					<View style={styles.copy}>
						<Button
							title={I18n.t('assets.walletInfo.copyPrivaateKey')}
							buttonStyle={styles.copyButtonStyle}
							onPress={this._setClipboardContent.bind(this)}
						/>
					</View>
				</Modal>
			</View>
		);
	}
}

export default withNavigation(WalletInfo);

const styles = StyleSheet.create({
	arr: {
		width: 15,
		height: 12
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
		backgroundColor: '#bbb',
		height: 45,
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
	},
	privateKey: {
		width: screen.width * 0.9,
		height: screen.height * 0.5,
		borderRadius: 10,
		padding: 15,
		justifyContent: 'space-between'
	},
	privateKeyTitle: {
		alignItems: 'center'
	},
	spacing: {
		borderRadius: 8,
		paddingTop: 15,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 15
	},
	privateKeyWarning: {
		backgroundColor: '#ff00001a',
		alignItems: 'center'
	},
	warining_text: {
		color: 'red'
	},
	privateKeyArea: {
		backgroundColor: '#ebebeb'
	},
	copy: {
		alignItems: 'center'
	},
	copyButtonStyle: {
		backgroundColor: '#528bf7',
		width: screen.width * 0.72,
		height: 40,
		borderRadius: 30
	},
	walletNameStyle: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		height: 60,
		marginTop: 20,
		backgroundColor: '#fafafa'
	},
	bottom_fun: {
		position: 'absolute',
		bottom: 50,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	bottom_fun_item: {
		height: 50,
		lineHeight: 50,
		color: '#fff',
		textAlign: 'center',
		width: Dimensions.get('window').width / 2
	},
	bottom_fun_item_cancel: {
		borderTopLeftRadius: 30,
		borderBottomLeftRadius: 30,
		backgroundColor: '#35ccbf'
	},
	bottom_fun_item_done: {
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: '#528bf7'
	}
});
