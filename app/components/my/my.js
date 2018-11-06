import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { I18n } from '../../../language/i18n';
import MenuList from '../public/menuList';
const screen = Dimensions.get('window');
import Icon from '../../pages/iconSets';

class My extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<View style={styles.myPage}>
				<View style={styles.myTopBan}>
					<View style={styles.myTopBanCon}>
						<TouchableHighlight
							style={styles.myTopBanConItem}
							underlayColor={'transparent'}
							onPress={() => {
								this.navigate('WalletInfo');
							}}
						>
							<View style={styles.center}>
								<Icon name="icon-qianbao-" size={40} color="#fff" />
								<Text style={styles.myTopBanConItemText}>{I18n.t('my.home.walletManagement')}</Text>
							</View>
						</TouchableHighlight>

						<TouchableHighlight
							style={styles.myTopBanConItem}
							underlayColor={'transparent'}
							onPress={() => {
								this.navigate('TransactionRecord');
							}}
						>
							<View style={styles.center}>
								<Icon name="icon-jiaoyijilu" size={40} color="#fff" />
								<Text style={styles.myTopBanConItemText}>{I18n.t('my.home.transactionRecord')}</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
				<ScrollView>
					<View style={styles.myColsCon}>
						<View style={styles.myColsConPart}>
							<MenuList
								leftName={I18n.t('my.home.systemSetting')}
								leftIconName="icon-shezhi"
								onPress={() => {
									this.navigate('SysSet');
								}}
							/>
							<MenuList
								leftName={I18n.t('my.home.helpCenter._title')}
								leftIconName="icon-bangzhuzhongxin"
								onPress={() => this.navigate('HelperCenter')}
							/>
							<MenuList
								leftName={I18n.t('my.home.followUs._title')}
								leftIconName="icon-duihuakuang"
								onPress={() => this.navigate('FollowUs')}
							/>
							<MenuList
								leftName={I18n.t('my.home.aboutUs._title')}
								leftIconName="icon-guanyuwomen"
								onPress={() => this.navigate('AboutUs')}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default withNavigation(My);

const styles = StyleSheet.create({
	myPage: {
		flex: 1,
		backgroundColor: '#F6F6F6'
	},
	myTopBan: {
		padding: 8,
		height: screen.height * 0.2,
		backgroundColor: '#528bf7',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	myTopBanCon: {
		flexDirection: 'row',
		width: screen.width,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	myTopBanConItem: {
		width: screen.width * 0.35,
		height: 80,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	myTopBanrecicon_1: {
		width: 30,
		height: 32
	},
	myTopBanrecicon: {
		width: 38,
		height: 30
	},
	myTopBanConItemText: {
		color: 'white',
		marginTop: 5,
		textAlign: 'center'
	},
	myColsCon: {},
	myColsConPart: {
		marginBottom: 10,
		backgroundColor: 'white'
	},
	myColsConPartRow: {
		flexDirection: 'row',
		alignItems: 'stretch',
		height: 60
	},
	myColsConPartRowLf: {
		width: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	myColsConPartRowRi: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10
	},
	bottomLine: {
		borderBottomWidth: 1,
		borderColor: '#eee'
	},
	myColsConPartRowRi2R: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	iconMsg: {
		width: 20,
		height: 17
	},
	iconLinkman: {
		width: 20,
		height: 20,
		resizeMode: 'stretch'
	},
	iconSettings: {
		width: 22,
		height: 21,
		resizeMode: 'stretch'
	},
	iconArr2R: {
		width: 8,
		height: 14
	},
	icon22: {
		width: 35,
		height: 28
	},
	iconHelper: {
		width: 22,
		height: 22
	},
	iconAbout: {
		width: 22,
		height: 22
	},
	newMsgFlag: {
		borderRadius: 10,
		height: 20,
		width: 30,
		textAlign: 'center',
		backgroundColor: 'red',
		fontSize: 13,
		color: 'white',
		lineHeight: 20,
		marginRight: 6
	},
	noSplitLine: {
		borderWidth: 0
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
		width: screen.width * 0.35,
		height: 80,
		justifyContent: 'space-around'
	}
});
