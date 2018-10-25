import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import {
	Text,
	View,
	StyleSheet,
	ImageBackground,
	ScrollView,
	RefreshControl,
	TouchableHighlight,
	Image
} from 'react-native';
import { getInvitationRecord } from '../../api/loged';
import { I18n } from '../../../language/i18n';

export class InvitationRecord extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: I18n.t('my.home.invitationRecord._title'),
		headerRight: (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => {
					navigation.state.params.navigate('Rank');
				}}
			>
				<Text
					style={{
						marginRight: 10
					}}
				>
					{I18n.t('my.home.invitationRecord.ranking')}
				</Text>
			</TouchableHighlight>
		)
	});

	constructor(props) {
		super(props);
		this.state = {
			recordData: [],
			socrt: 0,
			isRefreshing: false,
			walletAddress: ''
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		storage
			.load({
				key: 'walletInfo'
			})
			.then((walletInfo) => {
				this.setState(
					{
						walletAddress: walletInfo.walletAddress
					},
					() => {
						this.refresh();
					}
				);
			});
	}

	refresh() {
		getInvitationRecord({
			address: this.state.walletAddress
		}).then((res) => {
			this.setState({
				recordData: res.data.data,
				socrt: res.data.socrt
			});
		});
	}

	render() {
		return (
			<View style={{ height: screenHeight }}>
				<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
					<Text style={styles.title}>{I18n.t('my.home.invitationRecord.myInvitation')}</Text>

					<View style={[ styles.contentContainer, { height: 80, alignItems: 'center' } ]}>
						<View style={styles.contentContainer_item}>
							<Text style={styles.textL}>{I18n.t('my.home.invitationRecord.inviteesNum')}</Text>
							<Text style={styles.textR}>{this.state.recordData.length || '0'}</Text>
						</View>
						<View
							style={{
								borderWidth: 1,
								height: 40,
								borderColor: '#e6e6e6',
								borderRadius: 5
							}}
						/>
						<View style={styles.contentContainer_item}>
							<Text style={styles.textL}>{I18n.t('my.home.invitationRecord.pointReward')}</Text>
							<Text style={styles.textR}>{this.state.socrt || '0'}</Text>
						</View>
					</View>

					<View style={[ styles.contentContainer_bottom, { height: screenHeight * 0.5 } ]}>
						<View style={styles.record}>
							<Text>{I18n.t('my.home.invitationRecord.invitationTime')}</Text>
							<Text>{I18n.t('my.home.invitationRecord.friendAddress')}</Text>
						</View>

						<ScrollView
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={() => {
										this.refresh();
									}}
									tintColor="#BABEBA"
									title="Loading..."
									titleColor="#9FA3A0"
								/>
							}
						>
							{this.state.recordData.length > 0 ? (
								this.state.recordData.map((item, index) => {
									return (
										<View
											key={item.create_time}
											style={[ styles.record_item, index % 2 === 0 ? styles.single : null ]}
										>
											<Text style={styles.lineH} numberOfLines={1}>
												{
													new Date(Number(item.create_time))
														.toLocaleString()
														.match(/^\d+\/\d+\/\d+/g)[0]
												}
											</Text>
											<Text style={styles.lineH} numberOfLines={1} ellipsizeMode="middle">
												{item.address}
											</Text>
										</View>
									);
								})
							) : (
								<Text style={{ textAlign: 'center' }}>
									{I18n.t('my.home.invitationRecord.noRecord')}
								</Text>
							)}
						</ScrollView>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

export default withNavigation(InvitationRecord);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center'
	},
	title: {
		marginTop: 30,
		fontSize: 18,
		color: '#F3FFFF',
		fontWeight: 'bold'
	},
	contentContainer: {
		flexDirection: 'row',
		marginTop: 20,
		width: screenWidth * 0.9,
		justifyContent: 'space-around',
		// alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#fff',
		padding: 20
	},
	contentContainer_item: {
		height: 60,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	textL: {
		color: '#646464',
		width: screenWidth * 0.3,
		textAlign: 'center',
		letterSpacing: 1
	},
	textR: {
		color: '#7eaaf5',
		fontWeight: 'bold'
	},
	contentContainer_bottom: {
		borderRadius: 5,
		backgroundColor: '#fff',
		marginTop: 20
	},
	record: {
		width: screenWidth * 0.9,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	record_item: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	lineH: {
		width: screenWidth * 0.9 / 2,
		lineHeight: 40,
		fontSize: 12,
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10
	},
	single: {
		backgroundColor: '#EFEEF3'
	}
});
