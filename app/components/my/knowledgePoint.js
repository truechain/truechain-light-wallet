import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
class KnowledgePoint extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={styles.container}>
				<ScrollView>
					<Text style={{ letterSpacing: 2 }}>{params.content}</Text>
					<Text style={{ marginTop: 20 }}>{params.ps}</Text>
				</ScrollView>
			</View>
		);
	}
}

export default KnowledgePoint;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	}
});
