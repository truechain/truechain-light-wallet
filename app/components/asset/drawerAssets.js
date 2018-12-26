import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Drawer } from 'native-base';
import Asset from './asset';
import DrawerContent from './drawerContent';

class DrawerAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        ref={(ref) => { this.drawer = ref; }}
        onClose={() => this.closeDrawer()}
        content={<DrawerContent />}
      >
        <Asset />
      </Drawer>
    );
  }
}

export default withNavigation(DrawerAssets);
