import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import MenuList from '../public/menuList';

export class ContactUs extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.contactPage}>
				<MenuList
					leftName="官网"
					rightName="https://www.truechain.pro"
					onPress={() => {
						Linking.openURL('https://www.truechain.pro').catch((err) =>
							console.error('An error occurred', err)
						);
					}}
				/>
				<MenuList leftName="官方公众号" rightName="TrueChain" onPress={() => {}} />
				<MenuList leftName="Twitter" rightName="@truechaingroup" onPress={() => {}} />
				<MenuList leftName="官方电报群" rightName="www.t.me/truechain" onPress={() => {}} />
				<MenuList leftName="Facebook" rightName="@truechaingroup" onPress={() => {}} />
				<MenuList leftName="reddit" rightName="r/truechain" onPress={() => {}} />
				<MenuList leftName="medium" rightName="@truechainfroup" onPress={() => {}} />
			</View>
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
