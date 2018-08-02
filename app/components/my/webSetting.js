import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { I18n } from '../../../language/i18n';
import RNRestart from 'react-native-restart';

let _this = null;
class WebSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: window.host
		};
		this.navigate = this.props.navigation.navigate;
	}

	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => {
					storage.save({
						key: 'webHost',
						data: {
							webHost: _this.state.url
						},
						expires: null
					});
					RNRestart.Restart();
				}}
			>
				<Text style={{ marginRight: 10 }}>
					{I18n.t('public.save')}
					{/* 保存 */}
				</Text>
			</TouchableHighlight>
		)
	});

	componentDidMount() {
		_this = this;
		storage
			.load({
				key: 'webHost'
			})
			.then(({ webHost }) => {
				this.setState({
					url: webHost
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>WALLET SERVICE URL</Text>
				<TextInput
					style={{ height: 50, borderBottomWidth: 1, borderColor: '#ccc' }}
					placeholder={this.state.url}
					underlineColorAndroid="transparent"
					onChangeText={(url) => {
						this.setState({
							url
						});
					}}
				/>
			</View>
		);
	}
}

export default withNavigation(WebSetting);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	}
});
