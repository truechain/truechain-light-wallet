import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { getRanking } from '../../api/loged';

export class Rank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rankData: []
		};
	}

	componentDidMount() {
		getRanking().then((res) => {
			this.setState({
				rankData: res.data.data
			});
		});
	}

	render() {
		return (
			<ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
				<View style={styles.top}>
					<View style={styles.justify}>
						<Image source={require('../../assets/images/my/jp.png')} style={styles.jp} />
					</View>
					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>****</Text>
						<Text style={styles.color_fff}>排名</Text>
					</View>

					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>****</Text>
						<Text style={styles.color_fff}>邀请人数</Text>
					</View>

					<View style={styles.justify}>
						<Text style={[ styles.bigNum, styles.color_fff ]}>****</Text>
						<Text style={styles.color_fff}>积分</Text>
					</View>
				</View>

				<View style={[ styles.contentContainer_bottom, { height: screenHeight - 220 } ]}>
					<View style={styles.record}>
						<Text>排名</Text>
						<Text>钱包地址</Text>
						<Text>邀请人数</Text>
						<Text>总积分</Text>
					</View>

					<ScrollView>
						{this.state.rankData.length > 0 ? (
							this.state.rankData.map((item, index) => {
								return (
									<View
										key={index}
										style={[ styles.record_item, index % 2 === 0 ? styles.single : null ]}
									>
										<Text style={styles.lineH} numberOfLines={1}>
											{index + 1}
										</Text>
										<Text style={styles.lineH} numberOfLines={1} ellipsizeMode="middle">
											{item.address.replace(item.address.slice('5', '38'), '......')}
										</Text>
										<Text style={styles.lineH} numberOfLines={1} ellipsizeMode="middle">
											{item.invit_num}
										</Text>
										<Text style={styles.lineH} numberOfLines={1} ellipsizeMode="middle">
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
