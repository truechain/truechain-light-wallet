import React, { Component } from 'react';
import RootStack from './src/PageRoutes';
import { Provider } from 'react-redux';
import configureStore from './src/store/index'
import store from './src/store/index';
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https:mainnet.infura.io/'));
window.web3 = web3;

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        )
    }
}