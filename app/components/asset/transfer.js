import React, { Component } from 'react';
import { View, Text, Image, Alert, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Slider, Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import { withNavigation } from 'react-navigation';
import sendEth from '../../utils/sendEth';
import sendTokens from '../../utils/sendTokens';
import iterface from '../../utils/trueIterface';
import { I18n } from '../../../language/i18n';
import Loading from 'react-native-whc-loading';

const screen = Dimensions.get('window');

class Detail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.paymentDetails_item}>
				<Text style={styles.paymentDetails_item_key}>{this.props.key_k}</Text>
				<Text style={[ styles.paymentDetails_item_key, this.props.style ]}>{this.props.val}</Text>
			</View>
		);
	}
}

class Transfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromAddr: '',
			toAddress: '',
			amount: 0,
			remarks: null,
			cost: 0.0004284,
			disabledNext: true,
			toAddressFlag: false,
			keystoreV3: null,
			password: null,
			ContractAddr: null,
			gas: 25200,
			gasPrice: 17000000000
		};
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: I18n.t('assets.currency.transfer'), // 转账
		headerRight: (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => {
					navigation.state.params.navigate('QRscanner');
				}}
			>
				<Image
					style={{
						width: 20,
						height: 20,
						marginRight: 10
					}}
					source={require('../../assets/images/common/ercodeicon.png')}
				/>
			</TouchableHighlight>
		)
	});

	show(num) {
		num += '';
		num = num.replace(/[^0-9|\.]/g, '');
		if (/^0+/) {
			num = num.replace(/^0+/, '');
		}
		if (!/\./.test(num)) {
			num += '.00000';
		}
		if (/^\./.test(num)) {
			num = '0' + num;
		}
		num += '00000';
		num = num.match(/\d+\.\d{8}/)[0];
		return num;
	}

	componentDidMount() {
		web3.eth.getGasPrice().then((res) => {
			this.setState({
				gasPrice: res,
				cost: res * web3.utils.fromWei(this.state.gas.toString(), 'ether')
			});
		});

		storage.load({ key: 'walletInfo' }).then((res) => {
			this.setState({
				fromAddr: res.walletAddress,
				keystoreV3: res.keystoreV3
			});
		});
		const { params } = this.props.navigation.state;
		if (params.currencyName == 'ETH') {
			this.setState(
				{
					gas: 25200
				},
				() => {
					this._sendTokens = () =>
						sendEth(
							this.state.fromAddr,
							this.state.toAddress,
							this.state.amount,
							this.state.password,
							this.state.keystoreV3,
							this.state.gas.toString(),
							web3.utils.toWei(this.state.gasPrice.toString(), 'Gwei'),
							(err, tx) => {
								if (err) {
									this.refs.loading.close();
									setTimeout(() => {
										Alert.alert(null, I18n.t('public.transactionFailed'));
										// Alert.alert(null, '发布交易失败，请稍后重试！');
									}, 100);
									console.log(err);
								} else {
									this.refs.loading.close();
									setTimeout(() => {
										// 发布交易成功！
										Alert.alert(null, I18n.t('public.transactionSuccess'), [
											{
												text: 'OK',
												onPress: () => {
													this.props.navigation.navigate('Home');
												}
											}
										]);
									}, 100);
									console.log(tx, '=======');
								}
							}
						);
				}
			);
		} else {
			this.setState(
				{
					gas: 80000
				},
				() => {
					this._sendTokens = () =>
						sendTokens(
							iterface,
							this.state.fromAddr,
							this.state.toAddress,
							this.state.amount,
							this.state.password,
							this.state.keystoreV3,
							this.state.ContractAddr,
							this.state.gas.toString(),
							web3.utils.toWei(this.state.gasPrice.toString(), 'Gwei'),
							(err, tx) => {
								if (err) {
									this.refs.loading.close();
									setTimeout(() => {
										Alert.alert(null, I18n.t('public.transactionFailed'));
										// Alert.alert(null, '发布交易失败，请稍后重试！');
									}, 100);
									console.log(err);
								} else {
									this.refs.loading.close();
									setTimeout(() => {
										// 发布交易成功！
										Alert.alert(null, I18n.t('public.transactionSuccess'), [
											{
												text: 'OK',
												onPress: () => {
													this.props.navigation.navigate('Home');
												}
											}
										]);
									}, 100);
									console.log(tx, '=======');
								}
							}
						);
				}
			);
			let ContractAddr = params.currencyName + 'ContractAddr';
			this.setState({
				ContractAddr: store.getState().contractAddr[ContractAddr]
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			toAddress: nextProps.navigation.state.params.res
		});
		console.log(nextProps.navigation.state.params.res);
	}

	render() {
		return (
			<View style={styles.container}>
				<Input
					placeholder={I18n.t('assets.currency.receiptAddr')}
					//"收款人钱包地址"
					//     <Icon
					//         name='user'
					//         size={25}
					//         onPress={() => {
					//             alert('联系人')
					//         }}
					//     />
					// }
					value={this.state.toAddress.length > 0 ? this.state.toAddress : null}
					onChangeText={(toAddress) => this.setState({ toAddress })}
					onEndEditing={(event) => {
						if (!web3.utils.isAddress(event.nativeEvent.text)) {
							this.setState({
								toAddressFlag: false,
								disabledNext: true
							});
							Alert.alert(null, I18n.t('assets.transfer.checkAddress'));
							// Alert.alert(null, '地址无效，请仔细检查！');
						} else {
							this.setState(
								{
									toAddressFlag: true
								},
								() => {
									if (this.state.toAddressFlag && this.state.amountFlag) {
										this.setState({
											disabledNext: false
										});
									}
								}
							);
						}
					}}
					inputContainerStyle={styles.inputContainerStyle}
				/>
				<Input
					placeholder={I18n.t('assets.currency.transferCount')}
					// "转账金额"
					onChangeText={(amount) => {
						this.setState({ amount });
						if (amount) {
							this.setState(
								{
									amountFlag: true
								},
								() => {
									if (this.state.toAddressFlag && this.state.amountFlag) {
										this.setState({
											disabledNext: false
										});
									}
								}
							);
						} else {
							this.setState({
								amountFlag: false,
								disabledNext: true
							});
						}
					}}
					inputContainerStyle={styles.inputContainerStyle}
				/>
				<Input
					placeholder={I18n.t('assets.currency.transferRemarks')}
					// "备注"
					onChangeText={(remarks) => this.setState({ remarks })}
					inputContainerStyle={styles.inputContainerStyle}
				/>
				<Text style={styles.minerCosts_text}>
					{I18n.t('assets.currency.transferFee')}
					{/* 矿工费用 */}
				</Text>
				<Slider
					value={this.state.cost}
					onValueChange={(cost) => {
						this.setState({ cost: Number(cost.toFixed(6)) });
					}}
					onSlidingComplete={(res) => {
						this.setState({
							gasPrice: web3.utils.toWei(res.toFixed(6), 'ether') / this.state.gas
						});
					}}
					minimumTrackTintColor="#528bf7"
					thumbTintColor="#528bf7"
					minimumValue={0.0}
					step={0.0000001}
					maximumValue={0.00251999}
				/>
				<View style={styles.gasPrice}>
					<Text>
						{I18n.t('assets.currency.transferSpeedSlow')}
						{/* 慢 */}
					</Text>
					<Text style={styles.textAlign}>{this.show(this.state.cost)}ether</Text>
					<Text>
						{I18n.t('assets.currency.transferSpeedFast')}
						{/* 快 */}
					</Text>
				</View>
				<View style={styles.next}>
					<Button
						title={I18n.t('assets.currency.nextStep')}
						// "下一步"
						buttonStyle={styles.buttonStyle}
						disabledStyle={styles.borderRadius}
						disabled={this.state.disabledNext}
						onPress={() => {
							this.refs.transferDetail.open();
						}}
					/>
					<Loading ref="loading" />
				</View>
				<Modal
					style={styles.modal}
					position={'bottom'}
					coverScreen={true}
					ref={'transferDetail'}
					swipeArea={20}
				>
					<ScrollView>
						<View style={styles.paymentDetails_title}>
							{/* <Text>支付详情</Text> */}
							<Text>{I18n.t('public.payDetail')}</Text>
						</View>
						{/* 订单信息 */}
						<Detail
							key_k={I18n.t('assets.currency.orderInformation')}
							val={I18n.t('assets.currency.transfer')}
							style={styles.marginLeft_20}
						/>
						<Detail
							key_k={I18n.t('assets.transfer.transferInAddress')} //"转入地址"
							val={this.state.fromAddr.replace(this.state.fromAddr.slice('10', '25'), '......')}
							style={styles.marginLeft_20}
						/>
						<Detail
							key_k={I18n.t('assets.transfer.transferOutAddress')} //"转出地址"
							val={this.state.toAddress.replace(this.state.toAddress.slice('10', '25'), '......')}
							style={styles.marginLeft_20}
						/>
						<Detail
							key_k={I18n.t('assets.currency.transferFee')} //"矿工费用"
							gasPrice="666"
							val={
								'≈ Gas(' +
								this.state.gas +
								') * Gas Price(' +
								web3.utils.fromWei(this.state.gasPrice.toString(), 'Gwei') +
								'gwei)'
							}
							style={styles.paymentDetails_item_gasPOramount}
						/>
						{/* 金额 */}
						<Detail
							key_k={I18n.t('assets.currency.transferCount')}
							val={this.state.amount}
							style={styles.paymentDetails_item_gasPOramount}
						/>
						<View style={styles.next}>
							<Button
								title={I18n.t('public.next')}
								// title="下一步"
								buttonStyle={styles.buttonStyle}
								onPress={() => {
									this.refs.transferPwd.open();
								}}
							/>
						</View>
						<Modal
							style={styles.modal}
							coverScreen={true}
							position={'bottom'}
							ref={'transferPwd'}
							isOpen={this.state.huhu}
							swipeArea={20}
						>
							<ScrollView>
								<View style={styles.paymentDetails_title}>
									<Text>{I18n.t('public.verifyPwd')}</Text>
								</View>
								<Input
									placeholder={I18n.t('public.inputPwd')} //"请输入你的密码"
									secureTextEntry={true}
									onChangeText={(password) => this.setState({ password })}
									inputContainerStyle={[ styles.inputContainerStyle, styles.pwdStyle ]}
								/>
								<View style={styles.pwdNext}>
									<Button
										title={I18n.t('public.next')} //"下一步"
										buttonStyle={styles.buttonStyle}
										onPress={() => {
											this.refs.transferDetail.close();
											this.refs.transferPwd.close();
											setTimeout(() => {
												this.refs.loading.show();
												if (!this.state.password) {
													this.refs.loading.close();
													setTimeout(() => {
														// Alert.alert(null, '请输入密码');
														Alert.alert(null, I18n.t('public.inputPwd'));
													}, 100);
												} else {
													setTimeout(() => {
														try {
															web3.eth.accounts.decrypt(
																this.state.keystoreV3,
																this.state.password
															);
															this._sendTokens();
															this.setState({
																password: null
															});
														} catch (error) {
															this.refs.loading.close();
															setTimeout(() => {
																this.setState(
																	{
																		password: null
																	},
																	() => {
																		Alert.alert(null, I18n.t('public.wrongPwd'));
																		// Alert.alert(null, '密码错误,请重新输入');
																	}
																);
															}, 100);
														}
													}, 100);
												}
											}, 1000);
										}}
									/>
								</View>
							</ScrollView>
						</Modal>
					</ScrollView>
				</Modal>
			</View>
		);
	}
}

export default withNavigation(Transfer);

const styles = StyleSheet.create({
	textAlign: {
		textAlign: 'center'
	},
	textRight: {
		flex: 1,
		textAlign: 'right'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 30
	},
	inputContainerStyle: {
		width: screen.width - 20,
		borderColor: '#e6e6e6'
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
	next: {
		marginTop: 30,
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: '#528bf7',
		width: 260,
		height: 45,
		borderRadius: 30
	},
	modal: {
		height: screen.height * 0.5
	},
	paymentDetails_title: {
		width: screen.width,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#c8c7cc' //  支付详情分割线
	},
	marginLeft_20: {
		marginLeft: 20
	},
	paymentDetails_item: {
		marginLeft: 10,
		marginRight: 10,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#8f8f94'
	},
	borderRadius: {
		borderRadius: 50
	},
	paymentDetails_item_key: {
		color: '#8f8f94'
	},
	paymentDetails_item_gasPOramount: {
		flex: 1,
		color: '#000',
		textAlign: 'right'
	},
	pwdStyle: {
		marginTop: 30,
		width: screen.width,
		borderBottomWidth: 1,
		borderBottomColor: '#8f8f94'
	},
	pwdNext: {
		alignItems: 'center',
		marginTop: 100
	}
});
