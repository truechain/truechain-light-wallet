import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PixelRatio, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { I18n } from '../../../language/i18n';
const screen = Dimensions.get('window');
class LogOut extends React.Component {
	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<View style={styles.account}>
					<Text>{I18n.t('my.home.lockAccount.accountNumber')}</Text>
					<Text>{params.mobile}</Text>
				</View>
				<View style={styles.logout}>
					<Button
						title={I18n.t('my.home.lockAccount.logOut')}
						buttonStyle={styles.buttonStyle}
						onPress={() => {
							storage
								.remove({
									key: 'token'
								})
								.then((res) => {
									this.props.navigation.navigate('My');
								});
						}}
					/>
				</View>
			</View>
		);
	}
}

export default LogOut;

const styles = StyleSheet.create({
	account: {
		height: 50,
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	logout: {
		marginTop: 30,
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: '#ccc',
		width: screen.width * 0.8,
		height: 45,
		borderRadius: 30
	}
});
