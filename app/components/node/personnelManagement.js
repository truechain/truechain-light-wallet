import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { getMemberList, isJoinTeam } from '../../api/loged';
import { withNavigation } from 'react-navigation';
import { CheckBox } from 'react-native-elements';
import { I18n } from '../../../language/i18n';
const screen = Dimensions.get('window');

const ICONS = {
	up: require('../../assets/images/node/arrow-up.png'),
	down: require('../../assets/images/node/arrow-down.png')
};

class Panel extends Component {
	static defaultProps = {
		expanded: true
	};

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
			animation: new Animated.Value()
		};
	}

	toggle = () => {
		const { expanded, maxHeight, minHeight, animation } = this.state;
		const initialValue = expanded ? minHeight + maxHeight : minHeight;
		const finalValue = expanded ? minHeight : minHeight + maxHeight;

		this.setState({ expanded: !expanded });
		animation.setValue(initialValue);

		Animated.timing(animation, {
			toValue: finalValue
		}).start();
	};

	render() {
		const { expanded, animation, maxHeight } = this.state;
		const icon = expanded ? 'up' : 'down';

		return (
			<Animated.View style={[ styles.container_item, { height: animation } ]}>
				<View
					style={styles.titleContainer}
					onLayout={(event) => this.setState({ minHeight: event.nativeEvent.layout.height })}
				>
					{this.props.radio}
					<Text style={styles.title}>{this.props.title}</Text>
					<TouchableHighlight style={styles.button} onPress={this.toggle} underlayColor="#f1f1f1">
						<Image style={styles.buttonImage} source={ICONS[icon]} />
					</TouchableHighlight>
				</View>
				<View
					style={styles.body}
					onLayout={(event) => !maxHeight && this.setState({ maxHeight: event.nativeEvent.layout.height })}
				>
					{this.props.children}
				</View>
			</Animated.View>
		);
	}
}

class PersonnelManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamAddress: store.getState().walletInfo.wallet_address,
			applicationList: []
		};
		this.navigate = this.props.navigation;
	}

	componentDidMount() {
		getMemberList({
			teamAddress: this.state.teamAddress
		})
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				this.setState({
					applicationList: res
				});
			});
	}

	_isJoinTeam(option) {
		let userAddress_item = [];
		this.state.applicationList
			.filter((item, index) => {
				return item.checked;
			})
			.forEach((item) => {
				userAddress_item.push(item.address);
			});
		const userAddress = userAddress_item.join();
		isJoinTeam({
			status: option.status,
			userAddress: userAddress
		}).then((res) => {
			this.navigate.goBack(null);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} style={{ marginBottom: 50 }}>
					{this.state.applicationList.map((item, index) => {
						return (
							<Panel
								radio={
									<CheckBox
										title=""
										iconType="material"
										checkedIcon="check-circle"
										uncheckedIcon="check-circle"
										checkedColor="#007AFF"
										checked={item.checked}
										containerStyle={styles.checkBox}
										onPress={() => {
											let old = this.state.applicationList;
											old[index].checked = !old[index].checked;
											this.setState({
												applicationList: old
											});
										}}
									/>
								}
								title={item.nickname}
								key={index}
							>
								{/* <Text>申请理由: {item.reason}</Text> */}
								<Text>
									{I18n.t('node.fillInfo.reason')}：{item.reason}
								</Text>
								<Text>
									{I18n.t('node.fillInfo.contactInformation')}: {item.mobile}
								</Text>
								{/* <Text>联系方式: {item.mobile}</Text> */}
							</Panel>
						);
					})}
				</ScrollView>
				<View style={styles.bottom_fun}>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_refuse ]}
						onPress={() =>
							this._isJoinTeam({
								status: 3
							})}
					>
						{I18n.t('public.refuse')}
						{/* 拒绝 */}
					</Text>
					<Text
						style={[ styles.bottom_fun_item, styles.bottom_fun_item_agree ]}
						onPress={() =>
							this._isJoinTeam({
								status: 2
							})}
					>
						{I18n.t('public.agree')}
						{/* 同意 */}
					</Text>
				</View>
			</View>
		);
	}
}

export default withNavigation(PersonnelManagement);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bottom_fun: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	bottom_fun_item: {
		color: '#fff',
		height: 50,
		lineHeight: 50,
		textAlign: 'center',
		width: screen.width / 2
	},
	bottom_fun_item_refuse: {
		backgroundColor: '#35ccbf'
	},
	bottom_fun_item_agree: {
		backgroundColor: '#528bf7'
	},
	checkBox: {
		padding: 0,
		width: 26,
		borderWidth: 0,
		backgroundColor: 'transparent'
	},
	container_item: {
		backgroundColor: '#fff',
		margin: 10,
		overflow: 'hidden'
	},
	titleContainer: {
		flexDirection: 'row'
	},
	title: {
		flex: 1,
		padding: 10,
		color: '#2a2f43',
		fontWeight: 'bold'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonImage: {
		width: 25,
		height: 20
	},
	body: {
		padding: 10,
		paddingTop: 0
	}
});
