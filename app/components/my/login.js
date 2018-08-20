import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { I18n } from '../../../language/i18n';
import { Button } from 'react-native-elements';
import { getCode, login } from '../../api/index';
import { serverUrl } from '../../utils/config';

const screen = Dimensions.get('window');
import Svg, { Path } from 'react-native-svg';
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cca2: 'CN',
			callingCode: '86',
			countryName: 'China',
			countdown: -1,
			disabled: false,
			tel: null,
			captcha: null,
			cap_code: null,
			v_code: null,
			disabledLogin: false,
			cap_code_flag: false,
			pathArr: [],
			address: null,
			smsType: 2
		};
		this.backgroundTime = 0;
		this.regPhone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
		this.navigate = this.props.navigation.navigate;
		this.strHandle = this.strHandle.bind(this);
	}

	strHandle(svgStr) {
		let arr = [];
		let currentStartIndex = 1;
		let currentEndIndex = 0;
		let strFragment = '';

		while (true) {
			currentStartIndex = svgStr.indexOf('path', currentEndIndex);
			currentEndIndex = svgStr.indexOf('>', currentStartIndex);
			if (currentStartIndex < 0) {
				break;
			}
			strFragment = svgStr.substring(currentStartIndex, currentEndIndex);

			let subArr = [];
			let subCurrentStartIndex = 1;
			let subCurrentEndIndex = 0;
			let subStrFragment = '';
			subwhile: while (true) {
				subCurrentStartIndex = strFragment.indexOf('"', subCurrentEndIndex + 1);
				subCurrentEndIndex = strFragment.indexOf('"', subCurrentStartIndex + 1);
				if (subCurrentStartIndex < 0) {
					break subwhile;
				}
				subStrFragment = strFragment.substring(subCurrentStartIndex + 1, subCurrentEndIndex);
				subArr.push(subStrFragment);
			}

			arr.push(subArr);
		}
		return arr;
	}

	componentWillMount() {
		this._fetchCode();
		this.setState({
			address: store.getState().walletInfo.wallet_address
		});
	}

	_fetchCode() {
		fetch(serverUrl)
			.then((x) => {
				return x.json();
			})
			.then((x) => {
				// const log = console.log;
				// log(x);
				let pathArr = [];
				// const arr = x.data.match(/<path.*?\/>/g);
				// arr.forEach((ele) => {
				// 	pathArr.push(ele.match(/(?<=\s*.*\w+=")[^"]*(?=")/g));
				// });
				pathArr = this.strHandle(x.data);
				this.setState({
					pathArr: pathArr
				});
			});
	}
	setCountdown(countdown) {
		this.setState({
			countdown: countdown
		});
	}
	_getCode() {
		getCode({
			mobile: this.state.tel,
			captcha: this.state.cap_code,
			countryCode: this.state.callingCode,
			smsType: this.state.smsType
		}).then((res) => {
			if (res.data.body.status == 202) {
				// Alert.alert(null, '图形验证码错误,请重新验证!');
				Alert.alert(null, I18n.t('public.captchaError'));
			} else {
				this.setCountdown(60);
				this.startCountDown();
			}
		});
	}

	_login() {
		login({
			mobile: this.state.tel,
			code: this.state.v_code,
			address: this.state.address
		}).then((res) => {
			if (res.data.body.status == 0) {
				storage.save({
					key: 'token',
					data: {
						token: res.data.body.data.token
					}
				});
				this.navigate('Node');
			} else if (res.data.body.status == 202) {
				Alert.alert(null, I18n.t('public.verificationCodeError'));
			} else if (res.data.body.status == 203) {
				Alert.alert(null, I18n.t('public.hasBind'));
				// Alert.alert(null, '该手机号已绑定钱包地址');
			}
		});
	}

	getCountdown() {
		return this.state.countdown;
	}

	startCountDown() {
		this.interval = setInterval(() => {
			if (this.backgroundTime < this.getCountdown()) {
				this.setState(
					{
						countdown: this.getCountdown() - this.backgroundTime - 1
					},
					() => {
						this.backgroundTime = 0;
						if (this.getCountdown() < 0) {
							this.interval && clearInterval(this.interval);
						}
						if (this.getCountdown() >= 0) {
							this.setButtonClickDisable(true);
						} else {
							this.setButtonClickDisable(false);
						}
					}
				);
			} else {
				this.setCountdown(-1);
				this.setButtonClickDisable(false);
				this.interval && clearInterval(this.interval);
			}
		}, 1000);
		this.setButtonClickDisable(true);
	}

	setButtonClickDisable(enable) {
		this.setState({
			disabled: enable
		});
	}
	setTime = () => {
		if (this.state.callingCode === '86') {
			this.setState({
				smsType: 1
			});
		}
		if (!this.state.tel) {
			// alert('请输入手机号');
			Alert.alert(null, I18n.t('public.enterMobile'));
		} else if (this.state.callingCode === '86' && !this.regPhone.test(this.state.tel)) {
			Alert.alert(null, I18n.t('public.enter_the_legal_mobile_number'));
			// Alert.alert(null, '请输入合法手机号');
		} else if (!this.state.cap_code) {
			Alert.alert(null, I18n.t('public.enterCaptcha'));
			// alert('请输入图形验证码');
		} else {
			this._getCode();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={[ styles.country_select, styles.line_bottom ]}>
					<Text>{I18n.t('my.home.lockAccount.country_region')}</Text>
					<View>
						<Text>{this.state.countryName}</Text>
						<CountryPicker
							onChange={(value) => {
								this.setState({
									cca2: value.cca2,
									callingCode: value.callingCode,
									countryName: value.name
								});
							}}
							cca2={this.state.cca2}
							filterable
						/>
					</View>
				</View>

				<View style={[ styles.input, styles.line_bottom ]}>
					<Text>+{this.state.callingCode}</Text>
					<TextInput
						maxLength={11}
						onChangeText={(tel) => this.setState({ tel })}
						style={[ styles.input_item, styles.tel_input ]}
						placeholder={I18n.t('public.enterMobile')}
						underlineColorAndroid="transparent"
					/>
				</View>

				<View style={[ styles.input, styles.cap, styles.line_bottom ]}>
					<TextInput
						maxLength={4}
						onChangeText={(cap_code) => this.setState({ cap_code })}
						style={[ styles.input_item, styles.cap_input ]}
						placeholder={I18n.t('public.enterCaptcha')}
						underlineColorAndroid="transparent"
					/>
					<View>
						<Text onPress={() => this._fetchCode()} style={styles.authCode} />
						<Svg height="50" width="150">
							{this.state.pathArr.map((item, index) => {
								if (item.length === 3) {
									return <Path fill="#222" d={item[0]} key={index} stroke={item[1]} fill={item[2]} />;
								} else {
									return <Path fill="#222" d={item[1]} key={index} />;
								}
							})}
						</Svg>
					</View>
				</View>

				<View style={[ styles.input, styles.cap, styles.line_bottom ]}>
					<TextInput
						maxLength={6}
						style={[ styles.input_item, styles.cap_input ]}
						onChangeText={(v_code) => this.setState({ v_code })}
						placeholder={I18n.t('public.enterMobileCode')}
						underlineColorAndroid="transparent"
					/>
					<TouchableOpacity disabled={this.state.disabled} onPress={this.setTime}>
						{this.state.countdown >= 0 ? (
							<Text style={styles.color_bu}>
								{`${this.state.countdown}`} {I18n.t('public.second')}
							</Text>
						) : (
							<Text style={styles.color_bu}>{I18n.t('public.getMobileCode')}</Text>
						)}
					</TouchableOpacity>
				</View>

				<Button
					title={I18n.t('my.home.lockAccount.loginIn')} //"登录"
					onPress={() => {
						this._login();
					}}
					buttonStyle={styles.buttonStyle}
					disabled={this.state.disabledLogin}
					disabledStyle={styles.disabledStyle}
				/>
				<View style={styles.prompt}>
					<Text>{I18n.t('my.home.lockAccount.prompt')}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	authCode: {
		width: 150,
		height: 50,
		zIndex: 999,
		position: 'absolute'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingLeft: 20,
		paddingRight: 20
	},
	line_bottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#E6E6E6'
	},
	country_select: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	input: {
		height: 50,
		alignItems: 'center',
		flexDirection: 'row'
	},
	input_item: {
		height: 50
	},
	tel_input: {
		marginLeft: 10,
		width: screen.width * 0.8
	},
	cap: {
		justifyContent: 'space-between'
	},
	cap_input: {
		width: screen.width * 0.5
	},
	buttonStyle: {
		backgroundColor: '#007AFF',
		height: 45,
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 30
	},
	prompt: {
		marginTop: 30,
		alignItems: 'center'
	},
	color_bu: {
		color: '#007AFF'
	},
	disabledStyle: {
		backgroundColor: '#ccc'
	}
});
