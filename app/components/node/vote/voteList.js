import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getNodeRank } from '../../../api/loged';
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
			fullNodeData: []
		};
		this.navigate = this.props.navigation.navigate;
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	componentDidMount() {
		const { params } = this.props.navigation.state;
		getNodeRank({
			nodeType: params.nodeType,
			pageIndex: 0
		})
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				this.setState({
					NodeData: res
				});
			});
	}

	// beforeFocus = () => {
	// 	return new Promise((resolve, reject) => {
	// 		console.log('beforeFocus');
	// 		resolve();
	// 	});
	// };

	// onFocus = (text) => {
	// 	return new Promise((resolve, reject) => {
	// 		console.log('onFocus', text);
	// 		resolve();
	// 	});
	// };

	// afterFocus = () => {
	// 	return new Promise((resolve, reject) => {
	// 		console.log('afterFocus');
	// 		resolve();
	// 	});
	// };
	_renderItem(item) {
		return (
			<TouchableOpacity
				onPress={() => {
					this.navigate('VoteInfo', {
						teamAddress: item.item.address,
						type: item.item.type
					});
				}}
			>
				<View style={styles.nodeItem}>
					{item.index <= 2 ? (
						<Image style={styles.iconSort} source={iconUrl[item.index]} />
					) : (
						<View style={styles.iconSort}>
							<Text>{item.index + 1}</Text>
						</View>
					)}
					<View style={styles.nickName}>
						<Text style={styles.font_12}>{item.item.nickname}</Text>
						{item.item.type === 1 ? (
							<Image
								style={styles.iconPersonal}
								source={require('../../../assets/images/node/geren_3x.png')}
							/>
						) : null}
					</View>

					{item.item.lock_num ? (
						<View style={styles.lockNum}>
							<Text style={styles.font_12}>{item.item.lock_num} true</Text>
						</View>
					) : (
						<View style={styles.lockNum}>
							<Text style={[ styles.node_text, styles.font_12 ]}>{item.item.score} 分</Text>
						</View>
					)}
					{item.item.tickets ? (
						<View style={styles.tickets}>
							<Text style={[ styles.node_text, styles.font_12 ]}>{item.item.tickets} 票</Text>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Search ref="search_box" />
				<FlatList data={this.state.NodeData} renderItem={(item) => this._renderItem(item)} />
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
