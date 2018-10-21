import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { Text, View, Image, StyleSheet, TouchableHighlight, Modal, Alert, Linking } from 'react-native';

export class MenuList extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<TouchableHighlight
				onPress={() => {
					this.props.onPress() || null;
				}}
				underlayColor={'transparent'}
				activeOpacity={0.5}
			>
				<View style={styles.myColsConPartRow}>
					{this.props.leftIconName ? (
						<View style={styles.myColsConPartRowLf}>
							<Icon name={this.props.leftIconName} size={20} color="#528bf7" />
						</View>
					) : null}
					<View style={[ styles.myColsConPartRowRi, styles.noSplitLine ]}>
						<Text>{this.props.leftName}</Text>
						<View style={styles.myColsConPartRowRi2R}>
							{this.props.rightName ? <Text>{this.props.rightName}</Text> : null}
							<Icon name="icon-right" size={15} color="#000" />
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default withNavigation(MenuList);

const styles = StyleSheet.create({
	myColsConPartRow: {
		flexDirection: 'row',
		alignItems: 'stretch',
		height: 60
	},
	myColsConPartRowLf: {
		width: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	myColsConPartRowRi: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10
	},
	myColsConPartRowRi2R: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	}
});
