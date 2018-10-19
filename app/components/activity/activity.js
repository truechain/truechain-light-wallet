import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { isSignIn, signIn } from '../../api/loged';

class Activity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_isSignIn: false,
			walletAddress: '',
			continuous_days: 0,
			socrt: 0,
			timeData: [
				{
					socrt: 10,
					date: 1
				},
				{
					socrt: 10,
					date: 2
				},
				{
					socrt: 20,
					date: 3
				},
				{
					socrt: 20,
					date: 4
				},
				{
					socrt: 30,
					date: 5
				},
				{
					socrt: 30,
					date: 6
				},
				{
					socrt: 50,
					date: 7
				}
			]
		};
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
						this._isSignIn();
					}
				);
			});
	}

	_isSignIn() {
		isSignIn({
			address: this.state.walletAddress
		}).then((res) => {
			this.setState({
				continuous_days: Number(res.data.data.continuous_days),
				_isSignIn: res.data.data.isSignIn,
				socrt: res.data.data.socrt
			});
		});
	}

	_signIn() {
		signIn({
			address: this.state.walletAddress,
			type: 1
		}).then((res) => {
			switch (res.data.body.status) {
				case 2:
					this.setState({
						_isSignIn: true
					});
					this._isSignIn();
					Alert.alert(null, '签到成功');
					break;
				case 3:
					Alert.alert(null, '当天已签到,请勿重复签到!');
					break;
				case 4:
					Alert.alert(null, '错误,请稍后重试!');
					break;
			}
		});
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
							<Text style={[ styles.white, { fontSize: 18 } ]}>{this.state.socrt}</Text>
						</View>
					</View>
					<ImageBackground style={styles.bottom_fun} source={require('../../assets/images/activity/c.png')}>
						<ScrollView>
							<View style={[ styles.msg, styles.center ]}>
								<Text style={{ color: '#5D8BE2', fontSize: 15 }}>连续签到7天可以获得积分大礼包哦</Text>
							</View>

							<View style={styles.signInArea}>
								<View style={[ styles.signIn, styles.center ]}>
									{this.state.timeData.map((item, index) => {
										return (
											<View style={styles.sign_top} key={index}>
												<View
													style={[
														styles.signIn_item,
														styles.center,
														this.state.continuous_days === item.date
															? styles.back_b
															: styles.back_c
													]}
												>
													{item.date === 7 ? (
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
													<Text
														style={
															this.state.continuous_days === item.date ? (
																styles.color_b
															) : (
																styles.color_c
															)
														}
													>
														{item.date}天
													</Text>
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
								<Text>今日签到积分 </Text>
								{/* <Text>今日签到积分 +{this.state.continuous_days}</Text> */}
							</View>

							<View style={[ styles.signed, styles.center ]}>
								<View style={[ styles.signed_or, styles.center ]}>
									<TouchableOpacity
										style={[ styles.signed_item, styles.center ]}
										onPress={this._signIn.bind(this)}
									>
										<Text style={{ color: '#fff' }}>{this.state._isSignIn ? '已签到' : '签到'}</Text>
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
		borderRadius: 50
	},
	back_b: {
		backgroundColor: '#F8B530'
	},
	back_c: {
		backgroundColor: '#97B8F8'
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
		color: '#F8B530'
	},
	color_c: {
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
