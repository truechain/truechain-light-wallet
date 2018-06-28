import React, {Component} from 'react';
import RootStack from './src/PageRoutes';
import {Provider} from 'react-redux';
import configureStore from './src/store/index'
import store from './src/store/index'

export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <RootStack />
            </Provider>
        )
    }
}