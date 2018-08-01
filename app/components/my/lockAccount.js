import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, PixelRatio, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { I18n } from '../../../language/i18n';
import actions from '../../store/action/lockAccount';
import { getTrueCoin } from '../../api/loged';
const screen = Dimensions.get('window');
import Icon from '../../pages/iconSets';
class LockAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile: null,
			lock_num: 0
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		getTrueCoin()
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				this.setState({
					mobile: res.mobile.substring(0, 3) + '****' + res.mobile.substring(7, 11),
					lock_num: res.true_num
				});
				this.props.lockAccount({
					lock_num: res.true_num
				});
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					underlayColor={'transparent'}
					onPress={() => {
						this.navigate('LogOut', {
							mobile: this.state.mobile
						});
					}}
				>
					<View style={styles.account_mobile}>
						<View style={styles.account_baseInfo}>
							<TouchableOpacity
								style={{
									borderWidth: 1 / 2,
									borderColor: '#ccc',
									width: 65,
									height: 65,
									borderRadius: 50,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Image
									style={{ width: 60, height: 60 }}
									source={require('../../assets/images/asset/head_3x.png')}
								/>
							</TouchableOpacity>
							<Text style={{ marginLeft: 15 }}>{this.state.mobile}</Text>
						</View>
						<Icon name="icon-right" size={15} color="#000" />
					</View>
				</TouchableOpacity>
				<View style={styles.lockInfo}>
					<Text style={styles.color_fff}>TRUE</Text>
					<Text style={[ styles.color_fff, styles.lock_num ]}>
						{this.state.lock_num} {I18n.t('public.lockedWarehouse')}
					</Text>
				</View>

				<View style={styles.bottom_fun}>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_transfer ]}
						onPress={() => {
							this.navigate('Lockpositon', {
								type: '2'
							});
						}}
					>
						{I18n.t('public.transferIn')}
						{/* 转入 */}
					</Text>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_receipt ]}
						onPress={() => {
							// Alert.alert(null, '优先节点投票期间暂不提供转出功能!');
							Alert.alert(null, I18n.t('public.transferOutPrompt'));
						}}
					>
						{I18n.t('public.transferOut')}
						{/* 转出 */}
					</Text>
				</View>
			</View>
		);
	}
}

export default connect((state) => state.walletInfo, actions)(LockAccount);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	account_mobile: {
		height: 100,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	account_baseInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	lockInfo: {
		height: 150,
		backgroundColor: '#528bf7',
		alignItems: 'center',
		justifyContent: 'center'
	},
	color_fff: {
		color: '#fff'
	},
	lock_num: {
		marginTop: 20,
		fontSize: 20
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
		color: '#fff',
		lineHeight: 50,
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
