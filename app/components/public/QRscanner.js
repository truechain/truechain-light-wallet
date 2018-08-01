import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import {QRscanner} from 'react-native-qr-scanner';
import { I18n } from '../../../language/i18n';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <QRscanner onRead={this.onRead} finderY={-20}/> */}
        <Text>
          {/* 扫描 */}
          { I18n.t('public.scan') }
        </Text>
      </View>
    );
  }
  onRead = (res) => {
    console.log(res);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});