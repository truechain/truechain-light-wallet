import React, { Component } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getTransactionRecord, getERC20TransactionRecord } from '../../api/index';
import { I18n } from '../../../language/i18n';
import Icon from '../../pages/iconSets';

class Recording extends Component {
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
		num = num.match(/\d+\.\d{4}/)[0];
		return num;
	}

	render() {
		return (
			<View style={styles.recordDetail_item}>
				<Text>{this.props.to.replace(this.props.to.slice('8', '32'), '......')}</Text>
				<Text>{this.show(this.props.value / 1e18)}</Text>
			</View>
		);
	}
}

class TransactionRecord extends Component {
	render() {
		return (
			<View>
				{this.props.data.item.from === store.getState().walletInfo.wallet_address ? (
					<View style={styles.recordDetail}>
						<View>
							<Icon name="icon-zhichusel" size={50} color="#34ccbf" />
						</View>
						<Recording to={this.props.data.item.to} value={this.props.data.item.value} />
					</View>
				) : (
					<View style={styles.recordDetail}>
						<View>
							<Icon name="icon-shourusel" size={50} color="#528bf7" />
						</View>
						<Recording to={this.props.data.item.to} value={this.props.data.item.value} />
					</View>
				)}
			</View>
		);
	}
}

class currencyDetail extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
		this.state = {
			title: null,
			recordData: [],
			ContractAddr: null
		};
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({
			currencyName: params.title,
			banlance: params.banlance
		});
		let ContractAddr = params.title + 'ContractAddr';
		this.setState(
			{
				ContractAddr: store.getState().contractAddr[ContractAddr]
			},
			() => {
				if (params.title === 'ETH') {
					getTransactionRecord(store.getState().walletInfo.wallet_address).then((res) => {
						this.setState({
							recordData: res.data.result
						});
					});
				} else {
					getERC20TransactionRecord(
						store.getState().walletInfo.wallet_address,
						this.state.ContractAddr
					).then((res) => {
						this.setState({
							recordData: res.data.result
						});
					});
				}
			}
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.balance}>
					<Text style={[ styles.color_white, styles.balance_text_big ]}>{this.state.banlance}</Text>
					{/* <Text style={[ styles.color_white, styles.marginTop_20 ]}>市值：*****</Text> */}
				</View>
				<View style={{ paddingLeft: 20, paddingTop: 10 }}>
					<Text>{I18n.t('assets.currency.recentTradeRecord')}</Text>
				</View>
				<View style={styles.record}>
					{this.state.recordData.length >= 1 ? (
						<FlatList
							style={styles.marginTop_20}
							data={this.state.recordData}
							renderItem={(item, index) => <TransactionRecord data={item} key={index} />}
							keyExtractor={(item, index) => index.toString()}
						/>
					) : (
						<Text style={styles.textAlign}>~</Text>
					)}
				</View>
				<View style={styles.bottom_fun}>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_transfer ]}
						onPress={() => {
							this.navigate('Transfer', {
								navigate: this.navigate,
								currencyName: this.state.currencyName
							});
						}}
					>
						{I18n.t('assets.currency.transfer')} {/* 转账 */}
					</Text>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_receipt ]}
						onPress={() => {
							this.navigate('Receipt');
						}}
					>
						{I18n.t('assets.currency.receipt')} {/*  收款 */}
					</Text>
				</View>
			</View>
		);
	}
}

export default withNavigation(currencyDetail);

const styles = StyleSheet.create({
	textAlign: {
		textAlign: 'center'
	},
	color_white: {
		color: '#fff'
	},
	marginTop_20: {
		marginTop: 20
	},
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	balance: {
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#528bf7'
	},
	balance_text_big: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	record: {
		padding: 20,
		position: 'absolute',
		top: 150,
		bottom: 50,
		left: 0,
		right: 0
	},
	recordDetail: {
		height: 75,
		flexDirection: 'row',
		alignItems: 'center'
	},
	record_icon: {
		width: 50,
		height: 50
	},
	recordDetail_item: {
		flex: 1,
		height: 75,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bottom_fun: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'transparent'
	},
	bottom_fun_item: {
		height: 50,
		lineHeight: 50,
		color: '#fff',
		textAlign: 'center',
		width: Dimensions.get('window').width / 2
	},
	bottom_fun_item_transfer: {
		backgroundColor: '#35ccbf'
	},
	bottom_fun_item_receipt: {
		backgroundColor: '#528bf7'
	}
});