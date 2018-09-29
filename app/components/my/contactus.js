import React, { Component } from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { withNavigation } from 'react-navigation';

export class ContactUs extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerTitle: '联系我们'
	};

	render() {
		return (
			<View style={styles.contactPage}>
				<Text>联系我们</Text>
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
