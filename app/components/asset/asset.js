import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	ScrollView,
	RefreshControl,
	TouchableHighlight,
	Modal,
	Linking
} from 'react-native';
import Icon from '../../pages/iconSets';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import actions from '../../store/action/walletInfo';
import getBalance from '../../utils/addTokens';
import iterface from '../../utils/iterface';
import { I18n } from '../../../language/i18n';
import { checkVersion } from '../../api/index';
import CurrencyList from './currencyList';
import {withNavigation} from 'react-navigation';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
var DeviceInfo = require('react-native-device-info');

class Assets extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
		this.state = {
			walletName: ' ',
			walletAddress: ' ',
			eth_banlance: 0,
			true_banlance: 0,
			ttr_banlance: 0,
			true_beta_banlance: 0,
			lock_num: 0,
			newVersion: '--',
			modalVisible: false,
			currentVersion: null,
			isRefreshing: true
		};
	}

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
		num = num.match(/\d+\.\d{5}/)[0];
		return num;
	}

	getAllBalance() {
		this.setState({
			isRefreshing: true
		});

		web3.eth.getBalance(this.state.walletAddress).then((res) => {
			let eth_banlance = this.show(web3.utils.fromWei(res, 'ether'));
			this.setState({ eth_banlance });
		});

		// webtrue.getBalance(this.state.walletAddress).then((res) => {
		// 	let true_beta_banlance = this.show(web3.utils.fromWei(res, 'ether'));
		// 	this.setState({ true_beta_banlance });
		// });

		// getBalance(
		// 	iterface,
		// 	this.state.walletAddress,
		// 	store.getState().contractAddr.TRUEContractAddr,
		// 	(true_banlance) => {
		// 		true_banlance = this.show(true_banlance);
		// 		this.setState({ true_banlance });
		// 	}
		// );
		// getBalance(
		// 	iterface,
		// 	this.state.walletAddress,
		// 	store.getState().contractAddr.TTRContractAddr,
		// 	(ttr_banlance) => {
		// 		ttr_banlance = this.show(ttr_banlance);
		// 		this.setState({ ttr_banlance });
		// 	}
		// );
		this.updataWalletName();

		setTimeout(() => {
			this.setState({
				isRefreshing: false
			});
		}, 1000);
	}

	componentDidMount() {
		storage
			.load({
				key: 'walletInfo'
			})
			.then((walletInfo) => {
				let walletAddress = walletInfo.walletAddress;
				this.setState(
					{
						walletAddress: walletAddress
					},
					() => {
						this.getAllBalance();
					}
				);
			})
			.catch((x) => {
				console.log(x);
			});
		this.updataWalletName();

		this.setState({
			currentVersion: DeviceInfo.default.getVersion().replace(/\./g, '')
		});

		checkVersion()
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				this.setState({
					newVersion: res.version
				});
				let ver_new = res.version.replace(/\./g, '');
				if (ver_new !== this.state.currentVersion) {
					this.setState({ modalVisible: true });
				}
			});
	}

	updataWalletName() {
		storage
			.load({
				key: 'walletName'
			})
			.then((res) => {
				let walletName = res.walletName;
				this.setState({
					walletName: walletName
				});
			})
			.catch((x) => {
				console.log('没有发现钱包名称');
			});
	}

	componentWillUpdate() {
		this.props.walletInfo({
			wallet_address: this.state.walletAddress,
			eth_banlance: this.state.eth_banlance,
			true_banlance: this.state.true_banlance,
			ttr_banlance: this.state.ttr_banlance
		});
	}

	render() {
		const currencyData = [
			{
				currency_name: 'TRUE',
				balance: this.state.eth_banlance,
				logo_url: require('../../assets/images/currency_logo/true_logo.png')
			}
		];

		return (
			<View style={styles.container}>
			<ImageBackground source={require('../../assets/images/asset/assets_bj.png')} style={styles.walletInfo}>
					<Button transparent style={{ position:'absolute', right: 10, top: 30, zIndex:999 }} onPress={this.openDrawer}>
						<Icon name='icon-qianbao' size={23} />
          </Button>
				<View style={styles.walletInfo_item}>
						<TouchableHighlight
							underlayColor={'transparent'}
							onPress={() => this.navigate('WalletInfo')}
						>
							<Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')} />
						</TouchableHighlight>
						<Text style={styles.walletName}>{this.state.walletName}</Text>
						<TouchableHighlight
							underlayColor={'transparent'}
							onPress={() => this.navigate('Receipt')}
						>
							<View style={styles.walletAddress}>
								<Text style={styles.walletAddress_item}>
									{this.state.walletAddress.replace(
										this.state.walletAddress.slice('9', '35'),
										'......'
									)}
								</Text>
								<Image
									style={styles.addressErcode}
									source={require('../../assets/images/asset/ercode_2x.png')}
								/>
							</View>
						</TouchableHighlight>
					</View>
			</ImageBackground>

				<View style={styles.addCurrency}>
					<View style={styles.addCurrency_item}>
						<View>
							<Text style={styles.currency_text}>{I18n.t('assets.totalAssets')}</Text>
							<Text>{this.state.true_banlance}</Text>
						</View>
						<TouchableHighlight style={styles.currency_item}>
							<Text style={styles.currency_item_text}>新增币种</Text>
						</TouchableHighlight>
					</View>
				</View>

				<ScrollView
					style={styles._scrollview}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={() => {
								this.getAllBalance();
							}}
							tintColor="#BABEBA"
							title="Loading..."
							titleColor="#9FA3A0"
						/>
					}
				>
					{currencyData.map((item, index) => {
						return <CurrencyList item={item} index={index} key={index} navigate={this.navigate} />;
					})}
				</ScrollView>

				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
					}}
				>
					<View style={styles.modalCon}>
						<View style={styles.modal}>
							<Text style={styles.modalTitle}>发现True {this.state.newVersion}版本</Text>
							<View style={styles.modalBottomBtn}>
								<View>
									<Text
										style={styles.modalBottomBtnNoText}
										onPress={() => {
											this.setState({
												modalVisible: false
											});
										}}
									>
										暂不升级
									</Text>
								</View>
								<View>
									<Text
										style={styles.modalBottomBtnYesText}
										onPress={() => {
											Linking.openURL('https://www.truechain.pro/').catch((err) =>
												console.error('An error occurred', err)
											);
										}}
									>
										立即升级
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

export default connect((state) => state.walletInfo, actions)(withNavigation(Assets));

const styles = StyleSheet.create({
	marginLeft: {
		marginLeft: 20
	},
	alignRight: {
		textAlign: 'right'
	},
	container: {
		width: screenWidth,
		height: screenHeight - 50,
		backgroundColor: '#fff'
	},
	walletInfo: {
		height: 230,
		backgroundColor: '#528bf7'
	},
	walletInfo_item: {
		flex: 1,
		marginTop: 20,
		height: 210,
		alignItems: 'center',
		justifyContent: 'center'
	},
	avatar: {
		width: 70,
		height: 70,
		marginBottom: 10
	},
	walletName: {
		color: '#fff',
		fontSize: 18,
		marginBottom: 10
	},
	walletAddress: {
		flexDirection: 'row'
	},
	addressErcode: {
		width: 15,
		height: 15,
		marginLeft: 5
	},
	walletAddress_item: {
		color: '#fff',
		fontSize: 12
	},
	//新增币种
	addCurrency: {
		alignItems: 'center',
		backgroundColor:'transparent'
	},
	addCurrency_item: {
		position:'relative',
		top:-20,
		borderRadius: 15,
		padding: 30,
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		width: screenWidth * 0.9,
		shadowColor: '#0c2848',
		shadowOpacity: 0.5,
		shadowOffset: {
			width: 0,
			height: 2
		}
	},
	currency_text: {
		color: '#ccc',
		fontSize: 12
	},
	currency_item: {
		width: 80,
		height: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0071BC'
	},
	currency_item_text: {
		color: '#fff'
	},
	_scrollview:{
		backgroundColor: '#F1F4FA'
	},
	// version
	modalCon: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		backgroundColor: 'white',
		width: 260,
		borderRadius: 10
	},
	modalTitle: {
		fontSize: 16,
		color: '#222',
		lineHeight: 50,
		height: 50,
		textAlign: 'center',
		paddingLeft: 15,
		paddingRight: 15
	},
	versionText: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 20
	},
	modalBottomBtn: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopWidth: 1,
		borderColor: '#eee',
		alignItems: 'center',
		height: 50
	},
	modalBottomBtnNoText: {
		color: 'rgb(0,118,255)',
		fontSize: 16,
		textAlign: 'center'
	},
	modalBottomBtnYesText: {
		color: 'rgb(254,56,36)',
		fontSize: 16,
		textAlign: 'center'
	}
});
