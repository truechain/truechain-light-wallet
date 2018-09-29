import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './containers/app';
import SplashScreen from 'react-native-splash-screen';

require('ErrorUtils').setGlobalHandler(function(err) {
	alert(err, 'global error');
});

export default class Root extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
