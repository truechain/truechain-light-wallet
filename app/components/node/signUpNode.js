import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getTeamRank } from '../../api/loged';
import { I18n } from '../../../language/i18n';
import Icon from '../../pages/iconSets';

const screen = Dimensions.get('window');

class TeamList extends Component {
	render() {
		return (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => {
					this.props.navigate('TeamInfo', {
						teamAddress: this.props.item.address,
						title: I18n.t('public.joinTeam'),
						nodeType: this.props.nodeType
					});
				}}
			>
				<View style={styles.teamList_item}>
					<View style={styles.teamList_item_sort}>
						<Text>{this.props.index + 1}</Text>
						<Text style={styles.marginLeft_20}>{this.props.item.nickname}</Text>
					</View>
					<Icon name="icon-right" size={15} color="#000" />
				</View>
			</TouchableHighlight>
		);
	}
}

class SignUpNode extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	constructor(props) {
		super(props);
		this.state = {
			nodeType: null,
			teamList: [],
			lock_num: Number(store.getState().lockAccount.lock_num),
			true_banlance: Number(store.getState().walletInfo.true_banlance)
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentWillMount() {
		const { params } = this.props.navigation.state;
		this.setState(
			{
				nodeType: params.nodeType
			},
			() => {
				getTeamRank({ nodeType: params.nodeType }).then((res) => {
					this.setState({
						teamList: res.data.data
					});
				});
			}
		);
	}

	_personalReg() {
		switch (this.state.nodeType) {
			case '1':
				if (this.state.true_banlance + this.state.lock_num < 2000) {
					Alert.alert(null, I18n.t('node.InsufficientQualification.qu_1'));
				} else {
					this.navigate('SignUpInput', {
						title: I18n.t('node.personSignUp.personSignUp_title'),
						nodeType: this.state.nodeType,
						type: '1'
					});
				}
				break;
			case '2':
				if (this.state.true_banlance + this.state.lock_num < 50000) {
					Alert.alert(null, I18n.t('node.InsufficientQualification.qu_2'));
				} else {
					this.navigate('SignUpInput', {
						title: I18n.t('node.personSignUp.personSignUp_title'),
						nodeType: this.state.nodeType,
						type: '1'
					});
				}
				break;
		}
	}

	_createTeam() {
		if (this.state.true_banlance + this.state.lock_num < 1) {
			Alert.alert(null, I18n.t('node.InsufficientQualification.qu_3'));
		} else {
			this.navigate('CreateTeam', {
				nodeType: this.state.nodeType
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={[ styles.spacing, styles.personalReg ]}
					underlayColor={'transparent'}
					onPress={() => this._personalReg()}
				>
					<View style={styles.personalReg_item}>
						<Text>{I18n.t('node.personSignUp.personSignUp_title')}</Text>
						<Icon name="icon-right" size={15} color="#000" />
					</View>
				</TouchableHighlight>

				<View style={[ styles.spacing, styles.teamList ]}>
					<View style={styles.teamList_header}>
						<Text>{I18n.t('node.teamInfo.teamList')}</Text>
						<TouchableHighlight style={styles.createTeam} onPress={() => this._createTeam()}>
							<Text style={styles.createTeam_text}>{I18n.t('node.teamInfo.createTeam')}</Text>
						</TouchableHighlight>
					</View>
					<ScrollView style={styles.marginBottom_50}>
						{this.state.teamList.map((item, index) => {
							return (
								<TeamList
									item={item}
									index={index}
									key={index}
									navigate={this.navigate}
									nodeType={this.state.nodeType}
								/>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default withNavigation(SignUpNode);

const styles = StyleSheet.create({
	spacing: {
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 6,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	container: {
		flex: 1,
		padding: 30
	},
	personalReg: {
		height: 50
	},
	personalReg_item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	teamList: {
		marginTop: 20,
		backgroundColor: '#fff'
	},
	teamList_header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60
	},
	createTeam: {
		height: 30,
		backgroundColor: '#007AFF',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'green'
	},
	createTeam_text: {
		paddingLeft: 10,
		paddingRight: 10,
		color: '#fff'
	},
	teamList_item: {
		marginTop: 4,
		marginBottom: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	teamList_item_sort: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 35,
		width: screen.width * 0.6
	},
	marginLeft_20: {
		marginLeft: 20
	},
	marginBottom_50: {
		marginBottom: 50
	}
});
