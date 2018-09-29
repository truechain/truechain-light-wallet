import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { QRscanner } from 'react-native-qr-scanner';
import { I18n } from '../../../language/i18n';

class Scanner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.navigate = this.props.navigation.navigate;
	}
	render() {
		return (
			<View style={styles.container}>
				<QRscanner onRead={this.onRead} finderY={-20} />
				<Text>
					{/* 扫描 */}
					{I18n.t('public.scan')}
				</Text>
			</View>
		);
	}
	onRead = (res) => {
		this.navigate('Transfer', {
			res: res.data
		});
		// this.navigate.goBack(null);
	};
}

export default withNavigation(Scanner);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000'
	}
});
