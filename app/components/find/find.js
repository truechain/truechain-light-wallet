import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Find extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>
					发现
				</Text>
			</View>
		);
	}
}

export default Find;

const styles = StyleSheet.create({
	container: {
		borderWidth:1,
		borderColor:'red'
	}
});
