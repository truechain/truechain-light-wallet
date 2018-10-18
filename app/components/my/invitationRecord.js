import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { getInvitationRecord } from '../../api/loged';

export class InvitationRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recordData: [],
			socrt: 0
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		getInvitationRecord({
			mobile: '17611223665'
		}).then((res) => {
			this.setState({
				recordData: res.data.data,
				socrt: res.data.socrt[0].socrt
			});
		});
	}

	render() {
		return (
			<View style={{ height: screenHeight }}>
				<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
					<Text style={styles.title}>我的邀请</Text>

					<View style={[ styles.contentContainer, { height: 80, alignItems: 'center' } ]}>
						<View style={styles.contentContainer_item}>
							<Text style={styles.textL}>累计邀请人数</Text>
							<Text style={styles.textR}>{this.state.recordData.length}</Text>
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
							<Text style={styles.textL}>累计积分奖励</Text>
							<Text style={styles.textR}>{this.state.socrt}</Text>
						</View>
					</View>

					<View style={[ styles.contentContainer_bottom, { height: screenHeight * 0.5 } ]}>
						<View style={styles.record}>
							<Text>邀请时间</Text>
							<Text>好友地址</Text>
						</View>

						<ScrollView>
							{this.state.recordData ? (
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
							) : null}
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
