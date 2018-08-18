import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight, Modal, Alert, Linking } from 'react-native';
import { I18n } from '../../../language/i18n';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { checkVersion } from '../../api/index';
var DeviceInfo = require('react-native-device-info');

export class AboutUs extends Component {
	constructor(props) {
		super(props);
		this.state = { modalVisible: false, service_source: null, currentVersion: null, newVersion: '--' };
	}

	componentDidMount() {
		this.setState({
			currentVersion: DeviceInfo.default.getVersion().replace(/\./g, '')
		});
		
		storage
			.load({
				key: 'localLanguage'
			})
			.then((res) => {
				res.localLanguage.includes('zh')
					? this.setState({
							service_source: {
								uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_zh.pdf',
								cache: true
							}
						})
					: this.setState({
							service_source: {
								uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_en.pdf',
								cache: true
							}
						});
			})
			.catch((e) => {
				DeviceInfo.default.getDeviceLocale().includes('zh')
					? this.setState({
							service_source: {
								uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_zh.pdf',
								cache: true
							}
						})
					: this.setState({
							service_source: {
								uri: 'https://qiniu.baixiaojian.com/True_Chain_Wallet_Terms_of_Service_en.pdf',
								cache: true
							}
						});
			});
	}

	_checkVersion() {
		checkVersion()
			.then((result) => {
				return result.data.data;
			})
			.then((res) => {
				this.setState({
					newVersion: res.version
				});
				let ver_new = res.version.replace(/\./g, '');
				if (ver_new > this.state.currentVersion) {
					this.setState({ modalVisible: true });
				} else {
					Alert.alert(null, I18n.t('my.version.noUpdate'));
				}
			});
	}

	render() {
		return (
			<View style={styles.aboutusPage}>
				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
					}}
				>
					<View style={styles.modalCon}>
						<View style={styles.modal}>
							<Text style={styles.modalTitle}>
								{I18n.t('my.version._newVersion')} {this.state.newVersion}
								{I18n.t('my.version._version')}
							</Text>
							{/* <View>
								<Text style={styles.versionText}>版本更新说明版本更新说明版本更新说明 版本更新说明版本更新说明版本更新说</Text>
							</View> */}
							<View style={styles.modalBottomBtn}>
								<View>
									<Text
										style={styles.modalBottomBtnNoText}
										onPress={() => {
											this.setState({
												modalVisible: false
											});
										}}
									>
										{I18n.t('my.version.noEscalation')}
										{/* 暂不升级 */}
									</Text>
								</View>
								<View>
									<Text
										style={styles.modalBottomBtnYesText}
										onPress={() => {
											Linking.openURL('http://wapxk.com/wapindex-1000-6635.html').catch((err) =>
												console.error('An error occurred', err)
											);
										}}
									>
										{I18n.t('my.version.upgradeNow')}
										{/* 立即升级 */}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Modal>
				<View style={styles.topCon}>
					<Image
						resizeMode={Image.resizeMode.stretch}
						source={require('../../assets/images/logo.png')}
						style={styles.logo}
					/>
					<View>
						<Text style={styles.version}>
							{' '}
							{I18n.t('my.home.aboutUs.currentVersion')}：{DeviceInfo.default.getVersion()}
						</Text>
					</View>
					<View>
						<Text style={[ styles.txtCen, styles.descr ]}>
							{I18n.t('my.home.aboutUs.introduction')}
							{/* True是一款移动端轻钱包APP,它旨在为普通用户提供一款安全放心，简单好用，功能强大的数字资产钱包应用。 */}
						</Text>
					</View>
				</View>
				<View style={styles.rowsCon}>
					<TouchableHighlight
						underlayColor={'#ddd'}
						activeOpacity={0.5}
						onPress={() =>
							this.props.navigation.navigate('UserPolicy', {
								service_source: this.state.service_source
							})}
					>
						<View style={styles.row}>
							<View style={styles.rowLf}>
								<Text style={styles.rowLfText}>
									{I18n.t('my.home.aboutUs.useAgreement')}
									{/*用户协议*/}
								</Text>
							</View>
							<View style={styles.rowRi}>
								<Icon name="icon-right" size={15} color="#000" />
							</View>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={'#ddd'}
						activeOpacity={0.5}
						onPress={() =>
							this.props.navigation.navigate('UserPolicy', {
								service_source: this.state.service_source
							})}
					>
						<View style={styles.row}>
							<View style={styles.rowLf}>
								<Text style={styles.rowLfText}>
									{I18n.t('my.home.aboutUs.privacyPolicy')}
									{/*隐私条款*/}
								</Text>
							</View>
							<View style={styles.rowRi}>
								<Icon name="icon-right" size={15} color="#000" />
							</View>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={'#ddd'}
						activeOpacity={0.5}
						onPress={() => this.props.navigation.navigate('Versions')}
					>
						<View style={styles.row}>
							<View style={styles.rowLf}>
								<Text style={styles.rowLfText}>
									{I18n.t('my.home.aboutUs.versionLog')}
									{/*版本日志*/}
								</Text>
							</View>
							<View style={styles.rowRi}>
								<Icon name="icon-right" size={15} color="#000" />
							</View>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={'#ddd'}
						activeOpacity={0.5}
						onPress={() => {
							this._checkVersion();
						}}
					>
						<View style={styles.row}>
							<View style={styles.rowLf}>
								<Text style={styles.rowLfText}>
									{I18n.t('my.home.aboutUs.checkVersion')}
									{/*检测新版*/}
								</Text>
							</View>
							<View style={styles.rowRi}>
								<Icon name="icon-right" size={15} color="#000" />
							</View>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

export default withNavigation(AboutUs);

const styles = StyleSheet.create({
	aboutusPage: {
		flex: 1,
		backgroundColor: 'white'
	},
	topCon: {
		alignItems: 'center',
		borderColor: '#eee',
		borderBottomWidth: 1,
		maxHeight: 250
	},
	logo: {
		width: 90,
		height: 90,
		borderRadius: 10,
		marginTop: 50
	},
	version: {
		marginTop: 10,
		marginBottom: 10,
		fontSize: 12,
		color: '#ccc'
	},
	txtCen: {
		textAlign: 'center',
		flex: 1
	},
	descr: {
		fontSize: 12,
		lineHeight: 24,
		color: '#555',
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 50
	},
	iconArr2R: {
		width: 8,
		height: 14
	},
	rowsCon: {
		paddingLeft: 15
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#eee',
		paddingRight: 15,
		height: 55
	},
	rowLfText: {
		fontSize: 15,
		color: '#222'
	},
	modalCon: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		backgroundColor: 'white',
		width: 260,
		borderRadius: 10
	},
	modalTitle: {
		fontSize: 16,
		color: '#222',
		lineHeight: 50,
		height: 50,
		textAlign: 'center',
		paddingLeft: 15,
		paddingRight: 15
	},
	versionText: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 20
	},
	modalBottomBtn: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopWidth: 1,
		borderColor: '#eee',
		alignItems: 'center',
		height: 50
	},
	modalBottomBtnNoText: {
		color: 'rgb(0,118,255)',
		fontSize: 16,
		textAlign: 'center'
	},
	modalBottomBtnYesText: {
		color: 'rgb(254,56,36)',
		fontSize: 16,
		textAlign: 'center'
	}
});
