import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './containers/app';
require('ErrorUtils').setGlobalHandler(function(err) {
	alert(err, 'global error');
});

const Root = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default Root;
