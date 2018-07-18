import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	ScrollView,
	RefreshControl,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { getNodeRank, getMemberStatus, getTeamAddress } from '../../api/loged';
import { I18n } from '../../../language/i18n';

const screen = Dimensions.get('window');

class NodeItem extends Component {
	render() {
		const iconUrl = [
			require('../../assets/images/node/sort_1.png'),
			require('../../assets/images/node/sort_2.png'),
			require('../../assets/images/node/sort_3.png')
		];
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigate('VoteInfo', {
						teamAddress: this.props.item.address,
						type: this.props.item.type
					});
				}}
			>
				<View style={styles.nodeItem}>
					{this.props.index <= 2 ? (
						<Image style={styles.iconSort} source={iconUrl[this.props.index]} />
					) : (
						<View style={styles.iconSort}>
							<Text>{this.props.index + 1}</Text>
						</View>
					)}
					<View style={styles.nickName}>
						<Text style={styles.font_12}>{this.props.item.nickname}</Text>
						{this.props.item.type === 1 ? (
							<Image
								style={styles.iconPersonal}
								source={require('../../assets/images/node/geren_3x.png')}
							/>
						) : null}
					</View>

					{this.props.item.lock_num ? (
						<View style={styles.lockNum}>
							<Text style={styles.font_12}>{this.props.item.lock_num} true</Text>
						</View>
					) : (
						<View style={styles.lockNum}>
							<Text style={[ styles.node_text, styles.font_12 ]}>
								{this.props.item.score} {I18n.t('public.score')}
							</Text>
						</View>
					)}
					{this.props.item.tickets >= 0 ? (
						<View style={styles.tickets}>
							<Text style={[ styles.node_text, styles.font_12 ]}>
								{this.props.item.tickets} {I18n.t('public.tickets')}
							</Text>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}
}
class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			standardNodeData: [],
			fullNodeData: [],
			teamAddress: null,
			standPageIndex: 0,
			fullPageIndex: 0
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		this._fullOnRefresh();
		this._standOnRefresh();
	}

	_fullOnRefresh() {
		this.setState(
			{
				fullPageIndex: 0
			},
			() => {
				getNodeRank({
					nodeType: 2,
					pageIndex: this.state.fullPageIndex
				}).then((res) => {
					this.setState({
						fullNodeData: res.data.data
					});
				});
			}
		);
	}

	_standOnRefresh() {
		this.setState(
			{
				standPageIndex: 0
			},
			() => {
				getNodeRank({
					nodeType: 1,
					pageIndex: this.state.standPageIndex
				}).then((res) => {
					this.setState({
						standardNodeData: res.data.data
					});
				});
			}
		);
	}

	_getTeamAddress(option) {
		getTeamAddress()
			.then((result) => {
				return result.data.data[0];
			})
			.then((res) => {
				this.navigate('TeamInfo', {
					status: option.status,
					title: I18n.t('node.teamInfo.teamInfo_Info'),
					teamAddress: res.team_address
				});
			});
	}

	_signUp() {
		//获取申请状态
		getMemberStatus()
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				switch (res.status) {
					case 0:
						this.navigate('SignUp');
						break;
					case 1:
						console.log(res, '已申请');
						this._getTeamAddress({
							status: 1
						});
						break;
					case 2:
						// console.log(res, '已通过');
						if (res.type === 1) {
							// console.log('个人报名', res.role);
							this.navigate('SignUpSuccess', {
								type: res.type
							});
						} else {
							console.log('组队', res.role);
							if (res.role === 2) {
								// console.log('自己创建组队');
								this.navigate('MyTeam', {
									type: res.type
								});
							} else {
								this._getTeamAddress({
									status: 2
								});
							}
						}
						break;
					case 3:
						console.log('已拒绝');
						this._getTeamAddress({
							status: 3
						});
						break;
					default:
						console.log('默认');
						this.navigate('SignUp');
						break;
				}
			});
	}

	_fullOnScroll(evt) {
		const event = evt['nativeEvent'];
		const _num =
			event['contentSize']['height'] - event['layoutMeasurement']['height'] - event['contentOffset']['y'];
		if (event['contentSize']['height'] > event['layoutMeasurement']['height'] && _num < -50) {
			this.setState(
				{
					fullPageIndex: this.state.fullPageIndex + 10
				},
				() => {
					getNodeRank({
						nodeType: 2,
						pageIndex: this.state.fullPageIndex
					}).then((res) => {
						this.setState({
							fullNodeData: this.state.fullNodeData.concat(res.data.data)
						});
					});
				}
			);
		}
	}

	_standOnScroll(evt) {
		const event = evt['nativeEvent'];
		const _num =
			event['contentSize']['height'] - event['layoutMeasurement']['height'] - event['contentOffset']['y'];
		if (event['contentSize']['height'] > event['layoutMeasurement']['height'] && _num < -50) {
			this.setState(
				{
					standPageIndex: this.state.standPageIndex + 10
				},
				() => {
					getNodeRank({
						nodeType: 1,
						pageIndex: this.state.standPageIndex
					}).then((res) => {
						this.setState({
							standardNodeData: this.state.standardNodeData.concat(res.data.data)
						});
					});
				}
			);
		}
	}

	render() {
		let arr = this.state.fullNodeData;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.header_item}>
						<TouchableHighlight
							underlayColor={'transparent'}
							onPress={() => {
								this._signUp();
							}}
						>
							<View style={styles.fun}>
								<Image
									source={require('../../assets/images/node/baoming_2x.png')}
									style={styles.fun_icon}
								/>
								<Text style={styles.color_white}>{I18n.t('node.signUp')}</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor={'transparent'}
							onPress={() => {
								this.navigate('VoteNode');
							}}
						>
							<View style={styles.fun}>
								<Image
									source={require('../../assets/images/node/toupiao_2x.png')}
									style={styles.fun_icon}
								/>
								<Text style={styles.color_white}>{I18n.t('node.vote')}</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>

				<ScrollableTabView
					style={{ backgroundColor: '#fff' }}
					tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
					tabBarActiveTextColor="#007aff"
					tabBarInactiveTextColor="#000"
					renderTabBar={() => <DefaultTabBar />}
				>
					<View tabLabel={I18n.t('node.fullNodeRank')}>
						<ScrollView
							style={styles.scrollview}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this._fullOnRefresh.bind(this)}
									tintColor="#528bf7"
									title="Loading..."
									titleColor="#528bf7"
								/>
							}
							scrollEventThrottle={200}
							onScroll={this._fullOnScroll.bind(this)}
						>
							>
							{this.state.fullNodeData.map((item, index) => {
								return <NodeItem navigate={this.navigate} item={item} index={index} key={index} />;
							})}
						</ScrollView>
					</View>

					<View tabLabel={I18n.t('node.standNodeRank')}>
						<ScrollView
							style={styles.scrollview}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this._standOnRefresh.bind(this)}
									tintColor="#528bf7"
									title="Loading..."
									titleColor="#528bf7"
								/>
							}
							scrollEventThrottle={200}
							onScroll={this._standOnScroll.bind(this)}
						>
							{this.state.standardNodeData.map((item, index) => {
								return <NodeItem navigate={this.navigate} item={item} index={index} key={index} />;
							})}
						</ScrollView>
					</View>
				</ScrollableTabView>
			</View>
		);
	}
}
export default withNavigation(Node);

const styles = StyleSheet.create({
	font_12: {
		fontSize: 12
	},
	color_white: {
		color: '#fff'
	},
	container: {
		flex: 1
	},
	header: {
		padding: 8,
		height: screen.height * 0.2,
		backgroundColor: '#528bf7',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	header_title: {
		fontSize: 18
	},
	header_item: {
		flexDirection: 'row',
		width: screen.width,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	fun: {
		width: screen.width * 0.35,
		height: 80,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	fun_icon: {
		width: 35,
		height: 28
	},
	// scrollview: {
	//     borderWidth: 1,
	//     borderColor: 'red',
	// },
	//排行
	nodeItem: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'space-between'
	},
	iconSort: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 25,
		height: 30
	},
	iconPersonal: {
		width: 20,
		height: 10
	},
	nickName: {
		marginLeft: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: screen.width * 0.4
	},
	lockNum: {
		width: screen.width * 0.25
	},
	tickets: {
		width: screen.width * 0.2
	},
	node_text: {
		color: '#528bf7'
	}
});
