import React, { Component } from 'react';
import {
  View, Text, Image, TouchableHighlight, DeviceEventEmitter, StyleSheet,
} from 'react-native';
import { Drawer, Container, Content } from 'native-base';
import Icon from '../../pages/iconSets';
import Asset from './asset';

const drawerStyles = StyleSheet.create({
  color_fff: {
    // color: '#fff',
  },
  all: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  accountArea: {
    width: '90%',
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#F1F4FA',
    borderRadius: 8,
  },
  accountAreaItem: {
    width: '90%',
    minHeight: 60,
    marginBottom: 20,
  },
  accountTitle: {
    margin: 20,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // backgroundColor: '#0071BC',
  },
  accountTitleL: {
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  accountAreaItemC: {
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  accountAreaItemCL: {
    width: '5%',
    minHeight: 60,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  accountAreaItemCLY: {
    backgroundColor: '#0071BC',
  },
  accountAreaItemCArea: {
    width: '86%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  accountAreaItemCAreaImage: {
    width: 40,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F1F3F5',
  },
  info: {
    width: '70%',
    overflow: 'hidden',
  },
  right: {
    width: '9%',
    justifyContent: 'center',
  },
});

export default class DrawerAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // localAccount: [],
      dataTRUECHAIN: [],
      dataETH: [],
    };
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('openDrawer', this.openDrawer.bind(this));
    this.walletInfo();
  }

  walletInfo() {
    storage
      .load({
        key: 'walletInfo',
      })
      .then((localAccount) => {
        const dataTRUECHAIN = localAccount.filter(l => l.chain === 'TRUE');
        const dataETH = localAccount.filter(l => l.chain === 'ETH');
        this.setState({ dataTRUECHAIN, dataETH });
      })
      .catch((x) => {
        console.log(x);
      });
  }

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    const { dataTRUECHAIN, dataETH } = this.state;
    return (
      <Drawer
        side="right"
        ref={(ref) => { this.drawer = ref; }}
        content={(
          <Container style={drawerStyles.container}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#203260',
                }}
              >
                钱包
              </Text>
            </View>

            <View style={drawerStyles.accountArea}>
              <View style={drawerStyles.accountTitle}>
                <View style={drawerStyles.accountTitleL}>
                  <Icon name="icon-logo" size={20} color="#2E7BC5" />
                </View>
                <Text style={[drawerStyles.color_fff, { marginLeft: 8 }]}>TRUE</Text>
              </View>
              {
                dataTRUECHAIN.length > 0
                  ? dataTRUECHAIN.map(l => (
                    <View style={drawerStyles.accountAreaItem} key={l.walletAddress}>
                      <View style={drawerStyles.accountAreaItemC}>
                        <View
                          style={[drawerStyles.accountAreaItemCL, l.isChecked ? drawerStyles.accountAreaItemCLY : null]}
                        />
                        <View style={drawerStyles.accountAreaItemCArea}>
                          <View style={drawerStyles.accountAreaItemCAreaImage}>
                            <Image
                              source={require('../../assets/images/logo.png')}
                              style={drawerStyles.all}
                            />
                          </View>
                          <View style={drawerStyles.info}>
                            <Text>{l.walletName}</Text>
                            <Text numberOfLines={1} ellipsizeMode="middle">{l.walletAddress}</Text>
                          </View>
                        </View>
                        <View style={drawerStyles.right}>
                          <Icon name="icon-ic_more_vert_px" size={20} color="#A0A5B0" />
                        </View>
                      </View>
                    </View>
                  ))
                  : null
                  }
            </View>

            <View style={drawerStyles.accountArea}>
              <View style={drawerStyles.accountTitle}>
                <View style={drawerStyles.accountTitleL}>
                  <Icon name="icon-eth1" size={20} color="#316080" />
                </View>
                <Text style={[drawerStyles.color_fff, { marginLeft: 8 }]}>ETH</Text>
              </View>
              {
                dataETH.length > 0
                  ? dataETH.map(l => (
                    <View style={drawerStyles.accountAreaItem} key={l.walletAddress}>
                      <View style={drawerStyles.accountAreaItemC}>
                        <View style={[drawerStyles.accountAreaItemCL, l.isChecked ? drawerStyles.accountAreaItemCLY : null]} />
                        <View style={drawerStyles.accountAreaItemCArea}>
                          <View style={drawerStyles.accountAreaItemCAreaImage}>
                            <Image
                              source={require('../../assets/images/logo.png')}
                              style={drawerStyles.all}
                            />
                          </View>
                          <View style={drawerStyles.info}>
                            <Text>{l.walletName}</Text>
                            <Text numberOfLines={1} ellipsizeMode="middle">{l.walletAddress}</Text>
                          </View>
                        </View>
                        <View style={drawerStyles.right}>
                          <Icon name="icon-ic_more_vert_px" size={20} color="#A0A5B0" />
                        </View>
                      </View>
                    </View>
                  ))
                  : null
                  }
            </View>
          </Container>
)}
        onClose={() => this.closeDrawer()}
      >
        <Asset />
      </Drawer>
    );
  }
}
