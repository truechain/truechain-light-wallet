import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	ScrollView,
	RefreshControl,
	TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { getNodeRank, getMemberStatus } from '../../api/index';

const screen = Dimensions.get('window');

class NodeItem extends Component {
	render() {
		const iconUrl = [
			require('../../assets/images/node/sort_1.png'),
			require('../../assets/images/node/sort_2.png'),
			require('../../assets/images/node/sort_3.png')
		];
		return (
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
						<Image style={styles.iconPersonal} source={require('../../assets/images/node/geren_3x.png')} />
					) : null}
				</View>

				{this.props.item.lock_num ? (
					<View style={styles.lockNum}>
						<Text style={styles.font_12}>{this.props.item.lock_num} true</Text>
					</View>
				) : (
					<View style={styles.lockNum}>
						<Text style={[ styles.node_text, styles.font_12 ]}>{this.props.item.score} 分</Text>
					</View>
				)}
				{this.props.item.tickets ? (
					<View style={styles.tickets}>
						<Text style={[ styles.node_text, styles.font_12 ]}>{this.props.item.tickets} 票</Text>
					</View>
				) : null}
			</View>
		);
	}
}

class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			standardNodeData: [],
			fullNodeData: []
		};
		this.navigate = this.props.navigation.navigate;
		this.huhu = true;
	}

	componentDidMount() {
		this._getNodeRank(); //获取节点排行
	}

	_getNodeRank() {
		getNodeRank({
			nodeType: 2,
			pageIndex: 0
		}).then((res) => {
			this.setState({
				fullNodeData: res.data.data
			});
		});
		getNodeRank({
			nodeType: 1,
			pageIndex: 0
		}).then((res) => {
			this.setState({
				standardNodeData: res.data.data
			});
		});
	}

	_onRefresh() {
		this._getNodeRank();
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
						console.log('已申请');
						break;
					case 2:
						console.log(res, '已通过');
						break;
					case 3:
						console.log('已拒绝');
						break;
				}
			});
		// this.navigate('SignUp');
	}

	render() {
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
								<Text style={styles.color_white}>报名参选</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor={'transparent'}
							onPress={() => {
								alert('投票');
							}}
						>
							<View style={styles.fun}>
								<Image
									source={require('../../assets/images/node/toupiao_2x.png')}
									style={styles.fun_icon}
								/>
								<Text style={styles.color_white}>投票</Text>
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
					<View tabLabel="全节点排行">
						<ScrollView
							style={styles.scrollview}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this._onRefresh.bind(this)}
									tintColor="#ff0000"
									title="Loading..."
									titleColor="green"
									colors={[ '#ff0000', '#00ff00', '#0000ff' ]}
									progressBackgroundColor="#ffff00"
								/>
							}
						>
							{this.state.fullNodeData.map((item, index) => {
								return <NodeItem item={item} index={index} key={index} />;
							})}
						</ScrollView>
					</View>

					<View tabLabel="标准节点排行">
						<ScrollView
							style={styles.scrollview}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this._onRefresh.bind(this)}
									tintColor="#ff0000"
									title="Loading..."
									titleColor="green"
									colors={[ '#ff0000', '#00ff00', '#0000ff' ]}
									progressBackgroundColor="#ffff00"
								/>
							}
						>
							{this.state.standardNodeData.map((item, index) => {
								return <NodeItem item={item} index={index} key={index} />;
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
