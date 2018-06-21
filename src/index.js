import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Guide from './guide/guide';
import Store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Guide />
      </Provider>
    );
  }
}
