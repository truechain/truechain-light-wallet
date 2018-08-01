import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { createTeam, writeUserInfo } from '../../api/loged';
import { I18n } from '../../../language/i18n';

const screen = Dimensions.get('window');
class CreateTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nodeType: null,
			personalNickName: null,
			teamNickName: null,
			declaration: null,
			personalNickNameFlag: true,
			teamNickNameFlag: true,
			declarationFlag: true
		};
		this.navigate = this.props.navigation.navigate;
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({
			nodeType: params.nodeType
		});
	}

	_signUp() {
		createTeam({
			nickname: this.state.teamNickName,
			declaration: this.state.declaration,
			nodeType: this.state.nodeType,
			type: '2'
		}).then((res) => {
			console.log(res);
		});

		writeUserInfo({
			nickName: this.state.personalNickName
		}).then((res) => {
			console.log(res, 'createTeam---------------------');
		});

		this.navigate('Lockpositon', {
			type: 2,
			nodeType: this.state.nodeType
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[ styles.InfoArea, styles.marginTop_10 ]}>
					<Text>
						{/* 个人信息 */}
						{ I18n.t('node.personSignUp.personSignUp_Info')}
					</Text>
					<Input
						placeholder={ I18n.t('node.personalNickName') }
						// "个人昵称"
						maxLength={15}
						onChangeText={(personalNickName) => {
							this.setState({
								personalNickName
							});
							if (personalNickName) {
								this.setState({
									personalNickNameFlag: false
								});
							} else {
								this.setState({
									personalNickNameFlag: true
								});
							}
						}}
						inputContainerStyle={[ styles.inputContainerStyle, styles.marginTop_10 ]}
					/>
				</View>

				<View style={[ styles.InfoArea, styles.marginTop_10 ]}>
					<Text>
						{/* 组队信息 */}
						{ I18n.t('node.teamInfo.teamInfo_Info') }
					</Text>
					<Input
						placeholder={ I18n.t('node.teamNickName') }
						// "组队昵称"
						maxLength={15}
						onChangeText={(teamNickName) => {
							this.setState({
								teamNickName
							});
							if (teamNickName) {
								this.setState({
									teamNickNameFlag: false
								});
							} else {
								this.setState({
									teamNickNameFlag: true
								});
							}
						}}
						inputContainerStyle={[ styles.inputContainerStyle, styles.marginTop_10 ]}
					/>
					<Input
						placeholder={ I18n.t('public.electoralManifesto') }
						// "竞选宣言"
						maxLength={50}
						onChangeText={(declaration) => {
							this.setState({
								declaration
							});
							if (declaration) {
								this.setState({
									declarationFlag: false
								});
							} else {
								this.setState({
									declarationFlag: true
								});
							}
						}}
						inputContainerStyle={[ styles.inputContainerStyle, styles.marginTop_10 ]}
					/>
				</View>

				<TouchableHighlight style={styles.next}>
					<Button
						title={ I18n.t('public.next') }
						// "下一步"
						disabled={
							this.state.personalNickNameFlag || this.state.teamNickNameFlag || this.state.declarationFlag
						}
						buttonStyle={styles.buttonStyle}
						onPress={() => {
							this._signUp();
						}}
					/>
				</TouchableHighlight>
			</View>
		);
	}
}

export default withNavigation(CreateTeam);

const styles = StyleSheet.create({
	marginTop_10: {
		marginTop: 10
	},
	container: {
		flex: 1,
		alignItems: 'center'
	},
	InfoArea: {
		width: screen.width * 0.9,
		backgroundColor: '#fff',
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		borderRadius: 8
	},
	inputContainerStyle: {
		width: screen.width * 0.81,
		borderColor: '#e6e6e6'
	},
	next: {
		marginTop: 30,
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: '#528bf7',
		width: 260,
		height: 45,
		borderRadius: 30
	}
});
