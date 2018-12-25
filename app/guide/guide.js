import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { I18n } from '../../language/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  LogoOrWel: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 20,
    color: '#1E64B4',
    textAlign: 'center',
    margin: 20,
    letterSpacing: 1,
  },
  fun: {
    borderColor: 'red',
    padding: 20,
  },
  funItem: {
    marginTop: 20,
  },
  funRadius: {
    borderRadius: 50,
    marginTop: 20,
    padding: 15,
  },
  funImport: {
    backgroundColor: '#09C497',
  },
  funCreate: {
    backgroundColor: '#0071BC',
  },
  funText: {
    color: '#fff',
    textAlign: 'center',
  },
});

class Guide extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.LogoOrWel}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
          <Text style={styles.welcome}>{I18n.t('guide.welcome')}</Text>
        </View>
        <View style={styles.fun}>
          <View style={[styles.funItem, styles.create]}>
            <Text>{I18n.t('guide.createInstructions')}</Text>
            <TouchableHighlight
              underlayColor="#528bf7"
              style={[styles.funRadius, styles.funCreate]}
              onPress={() => this.props.navigation.navigate('CreateWallet')}
            >
              <Text style={styles.funText}>{I18n.t('guide.createWallet')}</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.funItem, styles.import]}>
            <Text>{I18n.t('guide.importInstructions')}</Text>
            <TouchableHighlight
              underlayColor="#35ccbf"
              style={[styles.funRadius, styles.funImport]}
              onPress={() => this.props.navigation.navigate('ImportWallet')}
            >
              <Text style={styles.funText}>{I18n.t('guide.importWallet')}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(Guide);
