import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { getRanking, getIntegralInfo } from '../../api/loged';
import { I18n } from '../../../language/i18n';

export class Rank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rankData: [],
			selfRank: '--',
			selftotal: '--',
			selfInvit_num: '--'
		};
	}

	componentDidMount() {
		storage
			.load({
				key: 'walletInfo'
			})
			.then((walletInfo) => {
				getIntegralInfo({
					address: walletInfo.walletAddress
				}).then((res) => {
					if (res) {
						this.setState({
							selfRank: res.data.data.rank,
							selftotal: res.data.data.Total,
							selfInvit_num: res.data.data.invit_num
						});
					}
				});
			});

		getRanking().then((res) => {
			this.setState({
				rankData: res.data.data
			});
		});
	}

	render() {
		const iconUrl = [
			require('../../assets/images/node/sort_1.png'),
			require('../../assets/images/node/sort_2.png'),
			require('../../assets/images/node/sort_3.png')
		];
		return (
			<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
				<View style={styles.top}>
					<View style={styles.justify}>
						<Image source={require('../../assets/images/my/jp.png')} style={styles.jp} />
					</View>
					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>{this.state.selfRank}</Text>
						<Text style={styles.color_fff}>{I18n.t('my.home.invitationRecord.rank')}</Text>
					</View>

					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>{this.state.selfInvit_num}</Text>
						<Text style={styles.color_fff}>{I18n.t('my.home.invitationRecord.inviteesNum')}</Text>
					</View>

					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>{this.state.selftotal}</Text>
						<Text style={styles.color_fff}>{I18n.t('public.score')}</Text>
					</View>
				</View>

				<View style={[ styles.contentContainer_bottom, { height: screenHeight - 220 } ]}>
					<View style={styles.record}>
						<Text>{I18n.t('my.home.invitationRecord.rank')}</Text>
						<Text>{I18n.t('public.walletAddress')}</Text>
						<Text>{I18n.t('my.home.invitationRecord.inviteesNum')}</Text>
						<Text>{I18n.t('public.score')}</Text>
					</View>

					<ScrollView>
						{this.state.rankData.length > 0 ? (
							this.state.rankData.map((item, index) => {
								return (
									<View
										key={index}
										style={[ styles.record_item, index % 2 === 0 ? styles.single : null ]}
									>
										{index <= 2 ? (
											<Image style={styles.iconSort} source={iconUrl[index]} />
										) : (
											<Text style={styles.lineH} numberOfLines={1}>
												{index + 1}
											</Text>
										)}

										<Text
											style={[ styles.lineH, { width: screenWidth * 0.32 } ]}
											numberOfLines={1}
											ellipsizeMode="middle"
										>
											{item.address.replace(item.address.slice('5', '39'), '......')}
										</Text>
										<Text
											style={[ styles.lineH, { width: screenWidth * 0.16 } ]}
											numberOfLines={1}
											ellipsizeMode="middle"
										>
											{item.invit_num}
										</Text>
										<Text
											style={[ styles.lineH, { width: screenWidth * 0.16 } ]}
											numberOfLines={1}
											ellipsizeMode="middle"
										>
											{item.Total}
										</Text>
									</View>
								);
							})
						) : null}
					</ScrollView>
				</View>
			</ImageBackground>
		);
	}
}

export default withNavigation(Rank);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	top: {
		width: screenWidth * 0.9,
		height: 100,
		borderRadius: 5,
		backgroundColor: '#3B61EB',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	jp: {
		width: screenWidth * 0.9 / 4,
		height: 80
	},
	bigNum: {
		fontSize: 25
	},
	color_fff: {
		color: '#fff'
	},
	justify: {
		width: screenWidth * 0.9 / 4.2,
		height: 100,
		alignItems: 'center',
		justifyContent: 'space-around'
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
		width: screenWidth * 0.9,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	lineH: {
		// width: screenWidth * 0.9 / 4.5,
		lineHeight: 40,
		fontSize: 12,
		textAlign: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	single: {
		backgroundColor: '#EFEEF3'
	},
	iconSort: {
		width: 25,
		height: 33
	}
});
