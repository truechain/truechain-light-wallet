import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

export class Referrer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text>推荐人</Text>
			</View>
		);
	}
}

export default withNavigation(Referrer);

const styles = StyleSheet.create({});
