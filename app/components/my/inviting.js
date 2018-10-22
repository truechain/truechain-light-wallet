import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { getReferrerCode } from '../../api/loged';
import { I18n } from '../../../language/i18n';

export class MenuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parent_promo_code: '-----'
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		storage.load({ key: 'walletInfo' }).then((res) => {
			getReferrerCode({
				address: res.walletAddress
			}).then((res) => {
				if (res.data.status === 2) {
					this.setState({
						parent_promo_code: res.data.referrer_code
					});
				}
			});
		});
	}

	render() {
		return (
			<ScrollView>
				<View style={{ height: screenHeight }}>
					<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
						<Text style={styles.title}>{I18n.t('my.home.inviteFriends.lightWallet')}</Text>
						<View>
							<View
								style={[
									styles.cardArea,
									{
										height: 120,
										marginTop: 30,
										borderTopLeftRadius: 20,
										borderTopRightRadius: 20
									}
								]}
							>
								<Text>{I18n.t('my.home.inviteFriends.InvitationCode')}</Text>
								<Text style={{ fontSize: 30 }}>
									{this.state.parent_promo_code ? this.state.parent_promo_code : '-----'}
								</Text>
							</View>
							<View style={styles.roundArea}>
								<View
									style={[
										styles.round,
										{
											marginLeft: -10
										}
									]}
								/>
								<View
									style={{
										width: screenWidth * 0.8 - 20,
										height: 1,
										borderWidth: 1,
										borderStyle: 'dashed',
										borderColor: '#d9d8d8'
									}}
								/>
								<View
									style={[
										styles.round,
										{
											marginRight: -10
										}
									]}
								/>
							</View>
							<View
								style={{
									width: screenWidth * 0.8,
									padding: 15,
									backgroundColor: '#fff',
									justifyContent: 'space-around',
									height: 300,
									marginTop: -10,
									borderBottomLeftRadius: 20,
									borderBottomRightRadius: 20,
									alignItems: 'center'
								}}
							>
								<Image
									source={require('../../assets/images/my/gw.png')}
									style={{ width: 150, height: 150 }}
								/>
								<Text style={{ fontSize: 15, color: '#6A6A6A' }}>
									{I18n.t('my.home.inviteFriends.scanQr')}
								</Text>
								<Text style={{ color: '#6187DF' }}>{I18n.t('my.home.inviteFriends.joinWallet')}</Text>
							</View>
						</View>
						<View style={styles.rule}>
							<View style={styles.rule_title}>
								<View style={styles.line} />
								<Text
									style={[ styles.color_white, { fontSize: 16, paddingLeft: 10, paddingRight: 10 } ]}
								>
									{I18n.t('public.rule')}
								</Text>
								<View style={styles.line} />
							</View>
							<Text style={styles.rule_text}>邀请好友下载轻钱包可获得积分,同时每天签到即可获得积分。</Text>
						</View>
					</ImageBackground>
				</View>
			</ScrollView>
		);
	}
}

export default withNavigation(MenuList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center'
	},
	color_white: {
		color: '#FFF'
	},
	title: {
		marginTop: 30,
		fontSize: 18,
		color: '#F3FFFF',
		fontWeight: 'bold'
	},
	cardArea: {
		width: screenWidth * 0.8,
		padding: 15,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	roundArea: {
		zIndex: 99,
		marginTop: -10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	round: {
		width: 20,
		height: 20,
		backgroundColor: '#528BF7',
		borderRadius: 50
	},
	line: {
		width: screenWidth * 0.3,
		height: 1,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#d9d8d8'
	},
	rule: {
		marginTop: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	rule_title: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	rule_text: {
		marginTop: 10,
		color: '#fff'
	}
});
