import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	ScrollView,
	RefreshControl,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { getNodeRank, searchTeam } from '../../../api/loged';
import Search from 'react-native-search-box';
const screen = Dimensions.get('window');
const iconUrl = [
	require('../../../assets/images/node/sort_1.png'),
	require('../../../assets/images/node/sort_2.png'),
	require('../../../assets/images/node/sort_3.png')
];

class VoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			NodeData: [],
			fullNodeData: [],
			isRefreshing: false,
			PageIndex: 0,
			nodeType: null
		};
		this.navigate = this.props.navigation.navigate;
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState(
			{
				nodeType: params.nodeType
			},
			() => {
				this._OnRefresh();
			}
		);
	}

	_renderItem(item, index) {
		return (
			<TouchableOpacity
				onPress={() => {
					this.navigate('VoteInfo', {
						teamAddress: item.address,
						type: item.type
					});
				}}
				key={index}
			>
				<View style={styles.nodeItem}>
					{index <= 2 ? (
						<Image style={styles.iconSort} source={iconUrl[index]} />
					) : (
						<View style={styles.iconSort}>
							<Text>{index + 1}</Text>
						</View>
					)}
					<View style={styles.nickName}>
						<Text style={styles.font_12}>{item.nickname}</Text>
						{item.type === 1 ? (
							<Image
								style={styles.iconPersonal}
								source={require('../../../assets/images/node/geren_3x.png')}
							/>
						) : null}
					</View>

					{item.lock_num ? (
						<View style={styles.lockNum}>
							<Text style={styles.font_12}>{item.lock_num} true</Text>
						</View>
					) : (
						<View style={styles.lockNum}>
							<Text style={[ styles.node_text, styles.font_12 ]}>{item.score} 分</Text>
						</View>
					)}
					{item.tickets >= 0 ? (
						<View style={styles.tickets}>
							<Text style={[ styles.node_text, styles.font_12 ]}>{item.tickets} 票</Text>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}

	_OnRefresh() {
		this.setState(
			{
				PageIndex: 0
			},
			() => {
				getNodeRank({
					nodeType: this.state.nodeType,
					pageIndex: this.state.PageIndex,
					pageNumber: 15
				}).then((res) => {
					this.setState({
						NodeData: res.data.data
					});
				});
			}
		);
	}

	_OnScroll(evt) {
		const event = evt['nativeEvent'];
		const _num =
			event['contentSize']['height'] - event['layoutMeasurement']['height'] - event['contentOffset']['y'];

		if (event['contentSize']['height'] > event['layoutMeasurement']['height'] && _num < -50) {
			this.setState(
				{
					PageIndex: this.state.PageIndex + 15
				},
				() => {
					getNodeRank({
						nodeType: this.state.nodeType,
						pageIndex: this.state.PageIndex,
						pageNumber: 15
					}).then((res) => {
						this.setState({
							NodeData: this.state.NodeData.concat(res.data.data)
						});
					});
				}
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Search
					ref="search_box"
					onChangeText={(val) => {
						setTimeout(() => {
							searchTeam({
								nodeType: this.state.nodeType,
								searchValue: val
							})
								.then((result) => {
									return result.data.data;
								})
								.then((res) => {
									this.setState({
										NodeData: res
									});
								});
						}, 1500);
					}}
				/>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._OnRefresh.bind(this)}
							tintColor="#528bf7"
							title="Loading..."
							titleColor="#528bf7"
						/>
					}
					scrollEventThrottle={200}
					onScroll={this._OnScroll.bind(this)}
				>
					>
					{this.state.NodeData.map((item, index) => {
						return this._renderItem(item, index);
					})}
				</ScrollView>
			</View>
		);
	}
}

export default withNavigation(VoteList);

const styles = StyleSheet.create({
	font_12: {
		fontSize: 12
	},
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
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
