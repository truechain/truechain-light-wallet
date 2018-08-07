import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { I18n } from '../../../language/i18n';

import RadiusBtn from './radiusbtn';
import { createTeam } from '../../api/loged';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
/**
 * 这是抽象出来的个人报名界面组件
 * 使用时传入相应属性的数据
 * 示例:
 * <PersonalInfoInput 
        inputPageBtnText="下一步" 
        pressBtn={this.pressBtn}        
    />
 */

class SignUpInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickName: null,
			declaration: null,
			nodeType: null,
			type: null,
			nickNameFlag: false,
			declarationFlag: false,
			isNext: true
		};
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({
			nodeType: params.nodeType,
			type: params.type
		});
		this.navigate = this.props.navigation.navigate;
	}

	_ReqReg() {
		createTeam({
			nickname: this.state.nickName,
			declaration: this.state.declaration,
			nodeType: this.state.nodeType,
			type: this.state.type
		}).then((res) => {
			this.navigate('Lockpositon', {
				nodeType: this.state.nodeType,
				type: this.state.type
			});
		});
	}

	render() {
		return (
			<View style={styles.inputPage}>
				<View style={styles.infoBox}>
					<Text style={styles.infoBoxTitle}>
						{/* 个人信息 */}
						{I18n.t('public.personalSign')}
					</Text>
					<TextInput
						style={styles.textInput}
						placeholder={I18n.t('public.nickName')}
						// '昵称'
                        maxLength={15}                   
						selectionColor="#528BF7"
						underlineColorAndroid="#528BF7"
						onChangeText={(nickName) => {
							this.setState(
								{
									nickName: nickName,
									nickNameFlag: true
								},
								() => {
									if (this.state.nickNameFlag && this.state.declarationFlag) {
										this.setState({
											isNext: false
										});
									}
								}
							);
						}}
					/>
					<TextInput
						style={[ styles.textInput, styles.textInputBig ]}
						placeholder={I18n.t('public.electoralManifesto')}
						//'竞选宣言'
						multiline={true}
						maxLength={50}
						selectionColor="#528BF7"
						underlineColorAndroid="#528BF7"
						onChangeText={(declaration) => {
							this.setState(
								{
									declaration: declaration,
									declarationFlag: true
								},
								() => {
									if (this.state.nickNameFlag && this.state.declarationFlag) {
										this.setState({
											isNext: false
										});
									}
								}
							);
						}}
					/>
				</View>

				<TouchableHighlight style={styles.center}>
					<Button
						title={I18n.t('public.next')}
						//'下一步'
						buttonStyle={styles.buttonStyle}
						disabled={this.state.isNext}
						disabledStyle={styles.borderRadius}
						onPress={() => {
							this._ReqReg();
						}}
					/>
				</TouchableHighlight>
			</View>
		);
	}
}
export default withNavigation(SignUpInput);

const styles = StyleSheet.create({
	inputPage: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		paddingBottom: 30
	},
	borderRadius: {
		borderRadius: 50
	},
	infoBox: {
		backgroundColor: 'white',
		marginBottom: 30,
		borderRadius: 10,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 15,
		paddingRight: 15
	},
	infoBoxTitle: {
		fontSize: 15,
		color: '#222'
	},
	textInput: {
		marginTop: 20,
		borderColor: '#eee',
		borderWidth: 1 / 2,
		borderColor: '#ccc',
		borderRadius: 6
	},
	textInputBig: {
		height: 50
	},
	bottomBtn: {
		height: 45,
		fontSize: 15,
		borderRadius: 23
	},
	center: {
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: '#528bf7',
		width: 260,
		height: 45,
		borderRadius: 30
	}
});
