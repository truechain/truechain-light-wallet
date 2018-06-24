import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Guide from './guide/guide';
import Store from './store';
import Home from './components/Home'

export default class Root extends Component {
  render() {
    return (
      <Provider store={Store}>
        {/* <Guide /> */}
        <Home />
      </Provider>
    );
  }
}
