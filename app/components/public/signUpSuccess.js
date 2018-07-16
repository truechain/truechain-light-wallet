import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { getTeamInfo } from '../../api/loged';

class SignUpSuccess extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: '报名成功'
	});

	constructor(props) {
		super(props);
		this.state = {
			teamAddress: store.getState().walletInfo.wallet_address,
			type: null,
			nickName: null,
			declaration: null,
			tickets: null,
			lock_num: null
		};
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState(
			{
				type: params.type
			},
			() => {
				getTeamInfo({
					type: this.state.type,
					address: this.state.teamAddress
				})
					.then((result) => {
						return result.data.data[0];
					})
					.then((res) => {
						this.setState({
							nickName: res.nickname,
							declaration: res.declaration,
							tickets: res.tickets,
							lock_num: res.lock_num
						});
					});
			}
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.personalInfo}>
					<View style={styles.headerInfo}>
						<View style={styles.headerInfo_item}>
							<View style={styles.baseInfo}>
								<Text>个人信息</Text>
								<TouchableHighlight style={styles.lock_num}>
									<Text style={styles.color_fff}>{this.state.lock_num} TRUE</Text>
								</TouchableHighlight>
							</View>
							<Text style={styles.color_999}>{this.state.nickName}</Text>
						</View>

						<TouchableHighlight style={styles.ticket}>
							<Text style={styles.color_fff}>{this.state.tickets} 票</Text>
						</TouchableHighlight>
					</View>
					<View>
						<Text style={[ styles.color_999, styles.marginTop_10 ]}>{this.state.declaration}</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default SignUpSuccess;

const styles = StyleSheet.create({
	color_fff: {
		color: '#fff'
	},
	color_999: {
		color: '#999999'
	},
	marginTop_10: {
		marginTop: 10
	},
	container: {
		flex: 1,
		padding: 20
	},
	personalInfo: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 8
	},
	headerInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerInfo_item: {
		justifyContent: 'space-between',
		height: 35
	},
	ticket: {
		backgroundColor: '#528bf7',
		padding: 6,
		borderRadius: 50
	},
	baseInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	lock_num: {
		marginLeft: 10,
		backgroundColor: '#528bf7',
		padding: 5,
		borderRadius: 50
	}
});
