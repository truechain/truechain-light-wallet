import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Clipboard, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
import QRCode from 'react-native-qrcode';
import { I18n } from '../../../language/i18n';

export default class ExportKeystore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keystoreV3: null
		};
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		this.setState({
			keystoreV3: JSON.stringify(params.keystoreV3)
		});
	}

	_setClipboardContent = async () => {
		Clipboard.setString(this.state.keystoreV3);
		try {
			var content = await Clipboard.getString();
			this.refs.toast.show(I18n.t('public.copySuccess'));
		} catch (e) {
			this.refs.toast.show(I18n.t('public.copyFailed'));
		}
	};

	render() {
		return (
			<ScrollableTabView
				style={{ backgroundColor: '#fff' }}
				tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
				tabBarActiveTextColor="#007aff"
				tabBarInactiveTextColor="#000"
				renderTabBar={() => <DefaultTabBar />}
			>
				<View tabLabel={I18n.t('assets.walletInfo.keystoreFile')} style={styles.container}>
					<ScrollView>
						<View style={styles.warningBox}>
							<Text style={styles.color_cbf}>
								{I18n.t('assets.walletInfo.keystore_save')}
								{/* 离线保存 */}
							</Text>
							<Text style={styles.color_999}>{I18n.t('assets.walletInfo.keystore_save_item')}</Text>
						</View>
						<View style={styles.warningBox}>
							<Text style={styles.color_cbf}>
								{I18n.t('assets.walletInfo.keystore_network')}
								{/* 请勿使用网络传输 */}
							</Text>
							<Text style={styles.color_999}>{I18n.t('assets.walletInfo.keystore_network_item')}</Text>
						</View>
						<View style={styles.warningBox}>
							<Text style={styles.color_cbf}>
								{I18n.t('assets.walletInfo.keystore_pwdsave')}
								{/* 密码保险箱保存 */}
							</Text>
							<Text style={styles.color_999}>{I18n.t('assets.walletInfo.keystore_pwdsave_item')}</Text>
						</View>
						<TouchableHighlight style={styles.keystore_area}>
							<Text>{this.state.keystoreV3}</Text>
						</TouchableHighlight>
						<Button
							title={I18n.t('assets.walletInfo.copyKeystore')}
							onPress={this._setClipboardContent.bind(this)}
							buttonStyle={styles.buttonStyle}
						/>
						<Toast ref="toast" position="center" />
					</ScrollView>
				</View>
				<View tabLabel={I18n.t('assets.walletInfo.qrcode')} style={styles.container}>
					<View style={styles.warningBox}>
						<Text style={styles.color_cbf}>
							{I18n.t('assets.walletInfo.keystore_scanning')}
							{/* 仅供直接扫描 */}
						</Text>
						<Text style={styles.color_999}>{I18n.t('assets.walletInfo.keystore_scanning_item')}</Text>
					</View>
					<View style={styles.warningBox}>
						<Text style={styles.color_cbf}>
							{I18n.t('assets.walletInfo.keystore_surround')}
							{/* 在安全的环境下使用 */}
						</Text>
						<Text style={styles.color_999}>{I18n.t('assets.walletInfo.keystore_surround_item')}</Text>
					</View>
					<View style={styles.qrcode}>
						<QRCode value={this.state.keystoreV3} size={200} />
					</View>
				</View>
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	warningBox: {
		justifyContent: 'space-around'
	},
	color_999: {
		color: '#999'
	},
	color_cbf: {
		color: '#35ccbf'
	},
	keystore_area: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 10,
		marginTop: 10
	},
	buttonStyle: {
		backgroundColor: '#007AFF',
		height: 45,
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 30
	},
	qrcode: {
		alignItems: 'center',
		marginTop: 50
	}
});
