import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Clipboard } from 'react-native';
import { I18n } from '../../../language/i18n';
import { Input, Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import Toast from 'react-native-easy-toast';
const screen = Dimensions.get('window');

export default class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			walletAddress: ' '
		};
	}

	componentDidMount() {
		this.setState({
			walletAddress: store.getState().walletInfo.wallet_address
		});
	}

	_setClipboardContent = async () => {
		Clipboard.setString(this.state.walletAddress);
		try {
			var content = await Clipboard.getString();
			// this.refs.toast.show('复制成功!');
			this.refs.toast.show(I18n.t('public.copySuccess'));
		} catch (e) {
			this.refs.toast.show(I18n.t('public.copyFailed'));
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.bg} />
				<View style={styles.avatar}>
					<Image style={styles.avatar_item} source={require('../../assets/images/asset/head_3x.png')} />
				</View>
				<View style={styles.walletAddress}>
					<Text style={styles.walletAddress_item}>{this.state.walletAddress}</Text>
				</View>

				{/* <View style={styles.customAmount}>
                    <Input
                        placeholder='自定义收款'
                        containerStyle={styles.containerStyle}
                    />
                </View> */}

				<View style={styles.qrcode}>
					<View style={styles.qrcode_item}>
						<QRCode value={store.getState().walletInfo.wallet_address} size={200} />
					</View>
				</View>

				<View style={styles.copyAddress}>
					<Button
						title={I18n.t('assets.currency.copyReceiptAddr')}
						// '复制收款地址'
						buttonStyle={styles.buttonStyle}
						onPress={this._setClipboardContent.bind(this)}
					/>
					<Toast ref="toast" position="center" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	bg: {
		height: 75,
		backgroundColor: '#528bf7'
	},
	avatar: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar_item: {
		width: 60,
		height: 60,
		marginTop: -30
	},
	walletAddress: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	walletAddress_item: {
		textAlign: 'center',
		width: screen.width * 0.6
	},
	customAmount: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerStyle: {
		width: screen.width * 0.6
	},
	qrcode: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	qrcode_item: {
		width: 200,
		height: 200
	},
	copyAddress: {
		alignItems: 'center',
		marginTop: 30
	},
	buttonStyle: {
		backgroundColor: '#528bf7',
		width: 300,
		height: 45,
		borderRadius: 30
	}
});
