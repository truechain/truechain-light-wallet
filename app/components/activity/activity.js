import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/Dimensions';

class Activity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeData: [
				{
					socrt: 1,
					date: 1
				},
				{
					socrt: 1,
					date: 2
				},
				{
					socrt: 2,
					date: 3
				},
				{
					socrt: 2,
					date: 4
				},
				{
					socrt: 3,
					date: 5
				},
				{
					socrt: 3,
					date: 6
				},
				{
					socrt: 4,
					date: 7
				}
			]
		};
	}

	render() {
		return (
			<View style={{ width: screenWidth, height: screenHeight }}>
				<ImageBackground style={styles.container} source={require('../../assets/images/activity/bl.png')}>
					<View style={[ styles.top_fun, styles.center ]}>
						<Image
							style={{ width: screenWidth * 0.6, height: screenHeight * 0.2 }}
							source={require('../../assets/images/activity/signin.png')}
						/>
						<View style={[ styles.socrt, styles.center ]}>
							<Text style={[ styles.white, { fontSize: 12 } ]}>积分:</Text>
							<Text style={[ styles.white, { fontSize: 18 } ]}>265</Text>
						</View>
					</View>
					<ImageBackground style={styles.bottom_fun} source={require('../../assets/images/activity/c.png')}>
						<ScrollView>
							<View style={[ styles.msg, styles.center ]}>
								<Text style={{ color: '#5D8BE2', fontSize: 15 }}>连续签到7天可以获得大礼包哦</Text>
							</View>

							<View style={styles.signInArea}>
								<View style={[ styles.signIn, styles.center ]}>
									{this.state.timeData.map((item, index) => {
										return (
											<View style={styles.sign_top} key={index}>
												<View style={[ styles.signIn_item, styles.center ]}>
													{item.socrt === 4 ? (
														<Image
															style={{
																width: (screenWidth - 150) / 7 - 15,
																height: (screenWidth - 150) / 7 - 15
															}}
															source={require('../../assets/images/activity/gift.png')}
														/>
													) : (
														<Text style={styles.white}>+{item.socrt}</Text>
													)}
													{/* <Text style={styles.white}>+{item.socrt}</Text> */}
												</View>
												{index === this.state.timeData.length - 1 ? null : (
													<View style={styles.line} />
												)}
											</View>
										);
									})}
								</View>
								<View style={[ styles.signIn_date, styles.center ]}>
									{this.state.timeData.map((item, index) => {
										return (
											<View style={styles.sign_top} key={index}>
												<View style={[ styles.signIn_item_text, styles.center ]}>
													<Text style={styles.color_b}>{item.date}天</Text>
												</View>
												{index === this.state.timeData.length - 1 ? null : (
													<View style={styles.line_done} />
												)}
											</View>
										);
									})}
								</View>
							</View>

							<View style={[ styles.today, styles.center ]}>
								<Text>今日签到积分 +1</Text>
							</View>

							<View style={[ styles.signed, styles.center ]}>
								<View style={[ styles.signed_or, styles.center ]}>
									<TouchableOpacity
										style={[ styles.signed_item, styles.center ]}
										onPress={() => {
											Alert.alert(null, '签到');
										}}
									>
										<Text style={{ color: '#fff' }}>{true ? '已签到' : '签到'}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</ScrollView>
					</ImageBackground>
				</ImageBackground>
			</View>
		);
	}
}

export default Activity;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	white: {
		color: '#fff'
	},
	top_fun: {
		height: screenHeight * 0.4
	},
	socrt: {
		width: screenWidth * 0.4,
		height: 40,
		flexDirection: 'row',
		backgroundColor: '#4684F4',
		borderRadius: 30,
		bottom: -25
	},
	bottom_fun: {
		paddingTop: 20,
		height: screenHeight - 50
	},
	msg: {
		height: 50
	},
	signInArea: {
		height: 80,
		justifyContent: 'center'
	},
	signIn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	signIn_date: {
		flexDirection: 'row'
	},
	sign_top: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	signIn_item: {
		width: (screenWidth - 150) / 7,
		height: (screenWidth - 150) / 7,
		backgroundColor: '#97B8F8',
		borderRadius: 50
	},
	signIn_item_text: {
		width: (screenWidth - 150) / 7,
		marginTop: 8
	},
	line: {
		borderWidth: 1,
		borderColor: '#97B8F8',
		width: 15
	},
	line_done: {
		width: 15
	},
	today: {
		height: screenHeight * 0.1
	},
	color_b: {
		color: '#97B8F8'
	},
	signed: {
		height: screenHeight * 0.15
	},
	signed_or: {
		width: screenHeight * 0.1 + 15,
		height: screenHeight * 0.1 + 15,
		borderRadius: 50,
		backgroundColor: '#C6D8FE'
	},
	signed_item: {
		width: screenHeight * 0.1,
		height: screenHeight * 0.1,
		borderRadius: 50,
		backgroundColor: '#4382F8'
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
