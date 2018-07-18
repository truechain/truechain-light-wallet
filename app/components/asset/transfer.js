import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Slider, Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import { withNavigation } from 'react-navigation';
import sendEth from '../../utils/sendEth';
import sendTokens from '../../utils/sendTokens';
import iterface from '../../utils/trueIterface';

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
		headerTitle: '转账',
		headerRight: (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => {
					alert('暂停');
					// navigation.state.params.navigate('QRscanner');
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
		storage.load({ key: 'walletInfo' }).then((res) => {
			this.setState({
				fromAddr: res.walletAddress,
				keystoreV3: res.keystoreV3
			});
		});
		const { params } = this.props.navigation.state;
		if (params.currencyName == 'ETH') {
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
							this.refs.transferDetail.close();
							alert('发布交易失败，请稍后重试！');
							console.log(err);
						} else {
							this.refs.transferDetail.close();
							alert('发布交易成功！');
							console.log(tx, '=======');
						}
					}
				);
			this.setState({
				gas: 25200
			});
		} else {
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
							this.refs.transferDetail.close();
							alert('发布交易失败，请稍后重试！');
							console.log(err);
						} else {
							this.refs.transferDetail.close();
							alert('发布交易成功！');
							console.log(tx, '=======');
						}
					}
				);
			this.setState({
				gas: 80000
			});
			let ContractAddr = params.currencyName + 'ContractAddr';
			this.setState({
				ContractAddr: store.getState().contractAddr[ContractAddr]
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Input
					placeholder="收款人钱包地址"
					//     <Icon
					//         name='user'
					//         size={25}
					//         onPress={() => {
					//             alert('联系人')
					//         }}
					//     />
					// }
					onChangeText={(toAddress) => this.setState({ toAddress })}
					onEndEditing={(event) => {
						if (!web3.utils.isAddress(event.nativeEvent.text)) {
							this.setState({
								toAddressFlag: false,
								disabledNext: true
							});
							alert('地址无效，请仔细检查！');
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
					placeholder="转账金额"
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
					placeholder="备注"
					onChangeText={(remarks) => this.setState({ remarks })}
					inputContainerStyle={styles.inputContainerStyle}
				/>
				<Text style={styles.minerCosts_text}>矿工费用</Text>
				<Slider
					value={this.state.cost}
					onValueChange={(cost) => {
						this.setState({ cost }, () => {
							this.setState({
								gasPrice:
									Math.round(
										this.state.cost / web3.utils.fromWei(this.state.gas.toString(), 'Gwei') * 100
									) / 100
							});
						});
					}}
					minimumTrackTintColor="#528bf7"
					thumbTintColor="#528bf7"
					minimumValue={0.00022932}
					step={0.0000001}
					maximumValue={0.00251999}
				/>
				<View style={styles.gasPrice}>
					<Text>慢</Text>
					<Text style={styles.textAlign}>{this.show(this.state.cost)}ether</Text>
					<Text>快</Text>
				</View>
				<View style={styles.next}>
					<Button
						title="下一步"
						buttonStyle={styles.buttonStyle}
						disabled={this.state.disabledNext}
						onPress={() => {
							setTimeout(() => {
								this.refs.transferDetail.open();
								this.setState({
									gasPrice:
										Math.round(
											this.state.cost /
												web3.utils.fromWei(this.state.gas.toString(), 'Gwei') *
												100
										) / 100
								});
							}, 100);
						}}
					/>
				</View>
				<Modal style={styles.modal} position={'bottom'} ref={'transferDetail'} swipeArea={20}>
					<ScrollView>
						<View style={styles.paymentDetails_title}>
							<Text>支付详情</Text>
						</View>
						<Detail key_k="订单信息" val="转账" style={styles.marginLeft_20} />
						<Detail
							key_k="转入地址"
							val={this.state.fromAddr.replace(this.state.fromAddr.slice('10', '25'), '......')}
							style={styles.marginLeft_20}
						/>
						<Detail
							key_k="转出地址"
							val={this.state.toAddress.replace(this.state.toAddress.slice('10', '25'), '......')}
							style={styles.marginLeft_20}
						/>
						<Detail
							key_k="矿工费用"
							gasPrice="666"
							val={'≈ Gas(' + this.state.gas + ') * Gas Price(' + this.state.gasPrice + 'gwei)'}
							style={styles.paymentDetails_item_gasPOramount}
						/>
						<Detail key_k="金额" val={this.state.amount} style={styles.paymentDetails_item_gasPOramount} />
						<View style={styles.next}>
							<Button
								title="下一步"
								buttonStyle={styles.buttonStyle}
								onPress={() => {
									setTimeout(() => {
										this.refs.transferPwd.open();
									}, 100);
								}}
							/>
						</View>
						<Modal style={styles.modal} position={'bottom'} ref={'transferPwd'} swipeArea={20}>
							<ScrollView>
								<View style={styles.paymentDetails_title}>
									<Text>钱包密码</Text>
								</View>
								<Input
									placeholder="请输入你的密码"
									secureTextEntry={true}
									onChangeText={(password) => this.setState({ password })}
									inputContainerStyle={[ styles.inputContainerStyle, styles.pwdStyle ]}
								/>
								<View style={styles.pwdNext}>
									<Button
										title="下一步"
										buttonStyle={styles.buttonStyle}
										onPress={() => {
											if (!this.state.password) {
												alert('请输入密码');
											} else {
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
													alert('密码错误,请重新输入');
												}
											}
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
		height: screen.height * 0.65
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
		position: 'relative',
		top: 100
	}
});
