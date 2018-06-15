import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.LogoOrWel}>
          <Image style={styles.logo} source={require('./assets/images/logo.png')}></Image>
          <Text style={styles.welcome}>欢迎来到True</Text>
        </View>

        <View style={styles.fun}>
          <View style={[styles.funItem, styles.import]}>
            <Text>
              在已有钱包中导出助记词，点击“导入钱包”，输入导出的助记词；导入钱包后请立即备份助记词。
          </Text>
            <TouchableHighlight style={[styles.funRadius, styles.funImport]}>
              <Text style={styles.funText}>
                导入钱包
          </Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.funItem, styles.create]}>
            <Text>
              没有钱包，请点击“创建钱包”，创建钱包时，请牢记您的密码；创建钱包后轻立即备份助记词。
          </Text>
            <TouchableHighlight style={[styles.funRadius, styles.funCreate]}>
              <Text style={styles.funText}>
                创建钱包
          </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  LogoOrWel: {
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    letterSpacing: 1
  },
  fun: {
    borderColor: 'red',
    padding: 20
  },
  funItem: {
    marginTop: 20
  },
  funRadius: {
    borderRadius: 50,
    marginTop: 20,
    padding: 15,
  },
  funImport: {
    backgroundColor: '#35ccbf',
  },
  funCreate: {
    backgroundColor: '#528bf7',
  },
  funText: {
    color: '#fff',
    textAlign: 'center',
  }
});
