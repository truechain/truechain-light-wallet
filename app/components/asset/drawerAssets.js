import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, DeviceEventEmitter,
} from 'react-native';
import { Drawer } from 'native-base';
import Asset from './asset';

export default class DrawerAssets extends Component {
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('openDrawer', this.openDrawer.bind(this));
  }

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    return (
      <Drawer
        side="right"
        openDrawerOffset={0.3}
        panCloseMask={0.3}
        ref={(ref) => { this.drawer = ref; }}
        content={(
          <View style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F1F4FA',
          }}
          >
            <Text>钱包管理</Text>
            <TouchableHighlight onPress={() => {
              this.closeDrawer();
            }}
            >
              <Text style={{ color: 'red' }}>Button</Text>
            </TouchableHighlight>
          </View>
)}
        onClose={() => this.closeDrawer()}
      >
        <Asset />
      </Drawer>
    );
  }
}
