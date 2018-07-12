import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, PixelRatio, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
const screen = Dimensions.get('window');
class LogOut extends React.Component {
	static navigationOptions = {
		headerTitle: '账户管理'
	};

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<View style={styles.account}>
					<Text>账号</Text>
					<Text>{params.mobile}</Text>
				</View>
				<View style={styles.logout}>
					<Button
						title="退出账号"
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
