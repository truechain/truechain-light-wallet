import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { getTeamInfo, getTeamMember } from '../../api/loged';
import { I18n } from '../../../language/i18n'

class TeamMemberList extends Component {
	render() {
		return (
			<View style={styles.memberList}>
				<View style={styles.baseInfo}>
					{this.props.item.role === 2 ? (
						<Image style={styles.avatar} source={require('../../assets/images/node/duizhang_3x.png')} />
					) : (
						<Image style={styles.avatar} source={require('../../assets/images/node/duiyuan_3x.png')} />
					)}
					<Text style={{ marginLeft: 5 }}>{this.props.item.nickname}</Text>
				</View>
				<Text style={{ color: '#528BF7' }}>{this.props.item.lock_num} TRUE</Text>
			</View>
		);
	}
}

class MyTeam extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: I18n.t('node.myTeam') //'我的战队'
	});

	constructor(props) {
		super(props);
		this.state = {
			teamAddress: store.getState().walletInfo.wallet_address,
			type: null,
			nickName: null,
			declaration: null,
			tickets: null,
			lock_num: null,
			teamMemberData: []
		};
		this.navigate = this.props.navigation.navigate;
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

				getTeamMember({
					teamAddress: this.state.teamAddress
				})
					.then((result) => {
						return result.data.data;
					})
					.then((res) => {
						this.setState({
							teamMemberData: res
						});
					});
			}
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					underlayColor={'transparent'}
					onPress={() => {
						this.navigate('PersonnelManagement');
					}}
				>
					<View style={[ styles.personnelManagement, styles.personalInfo ]}>
						<Text>{ I18n.t('node.futureMember') }</Text>
						{/* 待加入人员管理 */}
						<Image
							style={{
								width: 8,
								height: 14
							}}
							resizeMode={Image.resizeMode.stretch}
							source={require('../../assets/images/common/arr2ri.png')}
						/>
					</View>
				</TouchableHighlight>
				<View style={styles.personalInfo}>
					<View style={styles.headerInfo}>
						<View style={styles.headerInfo_item}>
							<View style={styles.baseInfo}>
								{/* 组队信息 */}
								<Text>{ I18n.t('node.teamInfo.teamInfo_Info') } </Text>
								<TouchableHighlight style={styles.lock_num}>
									<Text style={styles.color_fff}>{this.state.lock_num} TRUE</Text>
								</TouchableHighlight>
							</View>
							<Text style={styles.color_999}>{this.state.nickName}</Text>
						</View>

						<TouchableHighlight style={styles.ticket}>
							{/* 票数 */}
							<Text style={styles.color_fff}>{this.state.tickets} { I18n.t('public.tickets') } </Text>
						</TouchableHighlight>
					</View>
					<View>
						<Text style={[ styles.color_999, styles.marginTop_10 ]}>{this.state.declaration}</Text>
					</View>
					<ScrollView style={{ marginBottom: 50 }}>
						{this.state.teamMemberData.map((item, index) => {
							return <TeamMemberList item={item} key={index} />;
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default withNavigation(MyTeam);

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
	personnelManagement: {
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
	},
	memberList: {
		height: 35,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#E6E6E6',
		justifyContent: 'space-between'
	},
	baseInfo: {
		flexDirection: 'row'
	},
	avatar: {
		width: 20,
		height: 20
	}
});
