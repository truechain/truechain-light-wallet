import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { I18n, languagePackAll_Data } from '../../../language/i18n';
import RNRestart from 'react-native-restart';

class ListFun extends Component {
	render() {
		return (
			<TouchableHighlight underlayColor={'transparent'} onPress={this.props.onPress}>
				<View style={styles.fun}>
					<Text style={styles.fun_text}>{this.props.fun_name}</Text>
					<Text>{this.props.isSelected ? '✔️' : null}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

class SysLanguage extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
		this.state = {
			localeLanguage: null,
			isSelected: true,
			languagePackAll_Data: {}
		};
	}

	componentDidMount() {
		this.setState({
			languagePackAll_Data: languagePackAll_Data,
			localeLanguage: I18n.locale
		});
	}

	refreshLanguage = (lan) => {
		I18n.locale = lan;
		storage.save({
			key: 'localLanguage',
			data: {
				localLanguage: lan
			},
			expires: null
		});

		RNRestart.Restart();
		// this.props.navigation.goBack(null);

		this.setState({
			localeLanguage: I18n.locale
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{Object.keys(this.state.languagePackAll_Data).map((item, index) => {
					return (
						<ListFun
							fun_name={this.state.languagePackAll_Data[item]}
							key={index}
							isSelected={this.state.localeLanguage.includes(item)}
							onPress={() => this.refreshLanguage(item)}
						/>
					);
				})}
			</View>
		);
	}
}

export default withNavigation(SysLanguage);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff'
	},
	fun: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#e6e0df'
	},
	fun_text: {
		color: '#000'
	}
});
