import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import MenuList from '../public/menuList';

export class ContactUs extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView style={styles.contactPage}>
				<MenuList
					leftName="官网"
					rightName="https://www.truechain.pro"
					onPress={() => {
						// Linking.canOpenURL('weixin://').then((supported) => {
						// 	if (supported) {
						// 		Linking.openURL('weixin://');
						// 	} else {
						// 		alert(`请先安装XXX`);
						// 	}
						// });
						Linking.openURL('https://www.truechain.pro').catch((err) =>
							console.error('An error occurred', err)
						);
					}}
				/>
				<MenuList leftName="官方公众号" rightName="TrueChain" onPress={() => {}} />
				<MenuList leftName="Twitter" rightName="@truechaingroup" onPress={() => {}} />
				<MenuList leftName="Facebook" rightName="@truechaingroup" onPress={() => {}} />
				<MenuList leftName="reddit" rightName="r/truechain" onPress={() => {}} />
				<MenuList leftName="medium" rightName="@truechainfroup" onPress={() => {}} />
				<MenuList leftName="中文电报群" rightName="https://t.me/truechain" onPress={() => {}} />
				<MenuList leftName="英文电报群" rightName="https://t.me/truechainglobal" onPress={() => {}} />
				<MenuList leftName="越南电报群" rightName="https://t.me/truechainvietnam" onPress={() => {}} />
			</ScrollView>
		);
	}
}

export default withNavigation(ContactUs);

const styles = StyleSheet.create({
	contactPage: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 15
	}
});
