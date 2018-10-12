import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

export class InvitationRecord extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<View style={{ height: screenHeight }}>
				<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
					<Text style={styles.title}>我的邀请</Text>

					<View style={[ styles.contentContainer, { height: 80, alignItems: 'center' } ]}>
						<View style={styles.contentContainer_item}>
							<Text style={styles.textL}>累计邀请人数</Text>
							<Text style={styles.textR}>12</Text>
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
							<Text style={styles.textR}>120</Text>
						</View>
					</View>

					<View style={[ styles.contentContainer, { height: 300 } ]}>
						<Text>时间</Text>
						<Text>好友钱包地址</Text>
						<Text>奖励</Text>
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
	}
});
