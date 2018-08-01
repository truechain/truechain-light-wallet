import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text, Image, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
=======
import { View, Text, Image, TextInput, Dimensions, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
>>>>>>> 4ce71c5e10da7d2d118d05ddcf043828d7101fa3
import { Button, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { getTeamInfo } from '../../../api/loged';
import iterface from '../../../utils/iterface';
import getVote from '../../../utils/getVote';
import voteToken from '../../../utils/voteToken';
import RadiusBtn from '../../public/radiusbtn';
import { I18n } from '../../../../language/i18n';
<<<<<<< HEAD
import Modal from 'react-native-modalbox';
=======
import Loading from 'react-native-whc-loading';
>>>>>>> 4ce71c5e10da7d2d118d05ddcf043828d7101fa3

const screen = Dimensions.get('window');

class VoteInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamInfoData: { address: '' },
			walletAddress: '',
			ttrBanlance: '-',
			num: null,
			pwd: null,
			modalVisible: false,
			isSuccess: false
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		storage
			.load({
				key: 'walletInfo'
			})
			.then((res) => {
				this.setState({
					keystoreV3: res.keystoreV3
				});
			});

		getTeamInfo({
			type: params.type,
			address: params.teamAddress
		})
			.then((result) => {
				return result.data.data[0];
			})
			.then((res) => {
				this.setState({
					teamInfoData: res,
					walletAddress: store.getState().walletInfo.wallet_address
				});
			});

		getVote(
			{
				iterface,
				ttrContractAddr: store.getState().contractAddr.TTRContractAddr,
				fromAddr: store.getState().walletInfo.wallet_address
			},
			(res) => {
				this.setState({
					ttrBanlance: Math.floor(res)
				});
			}
		);
	}

	_voteToken() {
		voteToken(
			{
				iterface,
				fromAddr: store.getState().walletInfo.wallet_address,
				toAddr: this.state.teamInfoData.address,
				value: this.state.num,
				password: this.state.pwd,
				keystore: this.state.keystoreV3,
				ttrContractAddr: store.getState().contractAddr.TTRContractAddr
			},
			(err, tx) => {
				if (err) {
					this.refs.loading.close();
					this.setState({
						pwd: null
					});
					setTimeout(() => {
						// alert('投票打包失败，请稍后重试！');
						Alert.alert(null, I18n.t('node.voteInfo.voteFail'));
					}, 100);
				} else {
					this.refs.loading.close();
					this.setState({
						isSuccess: true
					});
				}
			}
		);
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	render() {
		return (
			<View style={styles.container}>
				<Loading ref="loading" />
				<View style={styles.Info}>
					<View style={[ styles.headerInfo, styles.line ]}>
						<View style={styles.headerInfo_item}>
							<Text>{I18n.t('node.teamInfo.teamInfo_Info')}</Text>
							{/* 组队信息 */}
							<Text style={styles.color_999}>{this.state.teamInfoData.nickname}</Text>
						</View>
					</View>
					<View style={styles.line}>
						<Text style={[ styles.color_999, styles.marginTop_5 ]}>
							{this.state.teamInfoData.declaration}
						</Text>
					</View>
					<View style={styles.line}>
						<Text style={[ styles.color_999, styles.marginTop_5, styles.address ]}>
							{this.state.teamInfoData.address.replace(
								this.state.teamInfoData.address.slice('15', '25'),
								'......'
							)}
						</Text>
					</View>
				</View>

				<View style={[ styles.Info, styles.marginTop_20 ]}>
					<View style={[ styles.headerInfo, styles.line ]}>
						<View style={styles.headerInfo_item}>
							<Text>{I18n.t('node.personSignUp.personSignUp_Info')}</Text>
							{/* 个人信息 */}
							<Text style={[ styles.color_999, styles.marginTop_5, styles.address ]}>
								{this.state.walletAddress.replace(this.state.walletAddress.slice('15', '25'), '......')}
							</Text>
						</View>
					</View>
					<View style={styles.line}>
						<Text style={[ styles.color_999, styles.marginTop_5 ]}>
							{I18n.t('node.voteInfo._available')}
							{this.state.ttrBanlance}
						</Text>
					</View>

					<Input
						placeholder={I18n.t('node.voteInfo.enterNumber_votes')}
						//"输入投票数量"
						inputContainerStyle={styles.textInput}
						onChangeText={(num) => {
							this.setState({ num });
						}}
					/>

					<Button
						title={I18n.t('node.voteInfo.confirmVote')}
						//"确认投票"
						onPress={() => {
							this.setState({ modalVisible: true });
						}}
						buttonStyle={styles.buttonStyle}
						disabled={this.state.num <= 0}
						disabledStyle={styles.disabledStyle}
					/>
				</View>

				<Modal 
					animationType={'fade'} 
					transparent={true} 
					isOpen={this.state.isSuccess}
				>
					<View style={styles.success}>
						<View style={styles.success_item}>
							>
							<Text style={styles.success_text}>
								{I18n.t('node.voteInfo.voteApplyed')}
								{/* 投票交易发布 */}
							</Text>
							<Text style={styles.marginBottom}>
								{/* 投票交易打包成功 */}
								{I18n.t('node.voteInfo.voteApplyedSuccess')}
							</Text>
							<RadiusBtn
								btnText={I18n.t('public.back')}
								// "返回"
								onPress={() => {
									this.setState({
										isSuccess: false
									});
									this.props.navigation.navigate('Home');
								}}
							/>
						</View>
					</View>
				</Modal>

				<Modal
					style={{ height: 280 }}
					animationType={'fade'}
					transparent={true}
					isOpen={this.state.modalVisible}
					onClosed={() => {
						this.setState({ modalVisible: false });
					}}
				>
					<View style={styles.modalCon}>
						<View style={styles.modal}>
							<Text style={styles.modalTitle}>
								{/* 输入密码 */}
								{I18n.t('public.inputPwd')}
							</Text>
							<View style={styles.modalInput}>
								<TextInput
									style={{ height: 50 }}
									placeholder={I18n.t('public.inputPwd')}
									//"输入密码"
									secureTextEntry={true}
									underlineColorAndroid="transparent"
									onChangeText={(pwd) => {
										this.setState({ pwd });
									}}
								/>
							</View>
							<View style={styles.modalBottomBtn}>
								<TouchableOpacity
									style={{ flex: 1 }}
									activeOpacity={0.5}
									underlayColor={'#ddd'}
									activeOpacity={0.5}
									onPress={() => {
										this.setModalVisible(false);
									}}
								>
									<View style={styles.modalBottomBtnNo}>
										<Text style={styles.modalBottomBtnNoText}>{I18n.t('public.cancel')}</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									style={{ flex: 1 }}
									activeOpacity={0.5}
									underlayColor={'#ddd'}
									activeOpacity={0.5}
									onPress={() => {
										if (!this.state.pwd) {
											this.refs.loading.close();
											setTimeout(() => {
												// alert('请输入密码!');
												Alert.alert(null, I18n.t('public.PwdIsNull'));
											}, 100);
										} else {
											this.setModalVisible(false);
											this.refs.loading.show();

											setTimeout(() => {
												try {
													web3.eth.accounts.decrypt(this.state.keystoreV3, this.state.pwd);
													this._voteToken();
												} catch (error) {
													this.refs.loading.close();
													this.setState({ pwd: null }, () => {
														setTimeout(() => {
															// alert('密码错误,请重新输入');
															Alert.alert(null, I18n.t('public.wrongPwd'));
														}, 100);
													});
												}
											}, 200);
										}
									}}
								>
									<View style={styles.modalBottomBtnYes}>
										<Text style={styles.modalBottomBtnYesText}>
											{/* 确认 */}
											{I18n.t('public.define')}
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

export default withNavigation(VoteInfo);

const styles = StyleSheet.create({
	marginTop_5: {
		marginTop: 5
	},
	marginTop_20: {
		marginTop: 20
	},
	color_999: {
		color: '#999999'
	},
	color_fff: {
		color: '#fff'
	},
	container: {
		flex: 1,
		padding: 20
	},
	Info: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 8
	},
	line: {
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#E6E6E6'
	},
	headerInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerInfo_item: {
		justifyContent: 'space-between',
		height: 40
	},
	ticket: {
		backgroundColor: '#528bf7',
		padding: 5,
		borderRadius: 50
	},
	address: {
		overflow: 'visible'
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#e6e6e6',
		width: screen.width * 0.8,
		borderRadius: 5,
		marginTop: 10,
		height: 35,
		padding: 5
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
		borderRadius: 50
	},
	modalCon: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	modal: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 15,
		paddingRight: 15
	},
	modalTitle: {
		fontSize: 16,
		color: '#222',
		lineHeight: 56,
		height: 56,
		textAlign: 'center',
		paddingLeft: 15,
		paddingRight: 15
	},
	modalInput: {
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 4,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 50
	},
	modalBottomBtn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 40
	},
	modalBottomBtnNo: {
		backgroundColor: '#35CCBF',
		height: 45,
		borderTopLeftRadius: 23,
		borderBottomLeftRadius: 23
	},
	modalBottomBtnYes: {
		backgroundColor: '#528BF7',
		borderTopRightRadius: 23,
		borderBottomRightRadius: 23
	},
	modalBottomBtnNoText: {
		color: 'white',
		height: 45,
		lineHeight: 45,
		textAlign: 'center'
	},
	modalBottomBtnYesText: {
		color: 'white',
		height: 45,
		lineHeight: 45,
		textAlign: 'center'
	},
	success: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	success_item: {
		width: screen.width * 0.9,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		justifyContent: 'center'
	},
	success_text: {
		textAlign: 'center',
		marginBottom: 20
	},
	marginBottom: {
		marginBottom: 20
	}
});
