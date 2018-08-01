import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { I18n } from '../../../../language/i18n';
import Icon from '../../../pages/iconSets';
const screen = Dimensions.get('window');
class VoteNode extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={styles.standardNode}
					underlayColor={'transparent'}
					onPress={() =>
						this.navigate('VoteList', { nodeType: 2, title: I18n.t('node.fullNode.fullNode_title') })}
				>
					<View style={styles.standardNode_item}>
						<View style={styles.title}>
							<Text style={styles.font_12}>{I18n.t('node.signUp_item.fullNode')}</Text>
							<Icon name="icon-right" size={15} color="#000" />
						</View>
						<Text style={styles.font_12}>{I18n.t('node.signUp_item.fullNode_info')}</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
					style={styles.standardNode}
					underlayColor={'transparent'}
					onPress={() =>
						this.navigate('VoteList', { nodeType: 1, title: I18n.t('node.standNode.standNode_title') })}
				>
					<View style={styles.standardNode_item}>
						<View style={styles.title}>
							<Text style={styles.font_12}>{I18n.t('node.signUp_item.standNode')}</Text>
							<Icon name="icon-right" size={15} color="#000" />
						</View>
						<Text style={styles.font_12}>{I18n.t('node.signUp_item.standNode_info')}</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

export default withNavigation(VoteNode);

const styles = StyleSheet.create({
	font_12: {
		fontSize: 12
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	},
	standardNode: {
		borderWidth: 1,
		borderColor: '#E6E6E6',
		borderRadius: 10,
		padding: 10,
		marginTop: 20
	},
	standardNode_item: {
		height: screen.height * 0.25,
		justifyContent: 'space-around'
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
});
