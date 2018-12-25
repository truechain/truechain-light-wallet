import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
// import Assets from '../components/asset/asset';
import DrawerAssets from '../components/asset/drawerAssets';
import Guide from '../guide/guide';

class Turn extends React.Component {
static navigationOptions = {
  header: null,
};

constructor(props) {
  super(props);
  this.state = {
    isWallet: null,
    have: null,
  };
}

componentDidMount() {
  this.updataLocal();
}

updataLocal() {
  storage
    .load({
      key: 'walletInfo',
    })
    .then((res) => {
      this.setState({
        isWallet: true,
        have: true,
      });
    }).catch((err) => {
      this.setState({
        isWallet: true,
        have: false,
      });
    });
}

render() {
  const { isWallet, have } = this.state;

  if (isWallet) {
    if (have) {
      return <DrawerAssets />;
    }
    return <Guide />;
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <ActivityIndicator />
    </View>
  );
}
}

export default withNavigation(Turn);
