import React, { Component } from 'react';

import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';

import { withNavigation } from 'react-navigation';

export class TransactionRecord extends Component {
	_keyExtractor = (item, index) => item;

	static navigationOptions = {
		headerTitle: '交易记录'
	};

	render() {
		return (
			<View>
				<Text>交易记录</Text>
			</View>
		);
	}
}

export default withNavigation(TransactionRecord);

const styles = StyleSheet.create({});
