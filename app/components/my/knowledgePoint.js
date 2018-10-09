import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
class KnowledgePoint extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.title
	});

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={styles.container}>
				<ScrollView>
					<MarkdownView>
						{params.content}
						{'\n'}
						{'\n'}
						{params.ps}
					</MarkdownView>
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
