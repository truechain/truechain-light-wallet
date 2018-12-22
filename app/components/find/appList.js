import React, { Component } from 'react';
import {
  View, StyleSheet, Alert,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Content, List, ListItem, Left, Thumbnail, Body, Text, Right,
} from 'native-base';
import { screenWidth, screenHeight } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
  },
  listItem: {
    backgroundColor: '#F1F4FA',
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 10,
    padding: 12,
  },
  notBorder: {
    borderColor: 'transparent',
  },
  margin_5: {
    marginTop: 5,
  },
});


class AppList extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.natigation.navigate;
  }

  render() {
    return (
      <Content style={styles.container}>
        <List>
          <ListItem
            avatar
            style={styles.listItem}
            underlayColor="transparent"
            onPress={() => {
              Alert.alert(null, '过一个月');
            }}
          >
            <Left>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
            </Left>
            <Body style={styles.notBorder}>
              <Text>非小号</Text>
              <Text note numberOfLines={2} style={styles.margin_5}>专注于为数字货币用户提供数据分析一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</Text>
            </Body>
          </ListItem>

          <ListItem
            avatar
            style={styles.listItem}
            underlayColor="transparent"
            onPress={() => {
              Alert.alert(null, '过一个月');
            }}
          >
            <Left>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
            </Left>
            <Body style={styles.notBorder}>
              <Text>非小号</Text>
              <Text note numberOfLines={2} style={styles.margin_5}>专注于为数字货币用户提供数据分析一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</Text>
            </Body>
          </ListItem>

          <ListItem
            avatar
            style={styles.listItem}
            underlayColor="transparent"
            onPress={() => {
              Alert.alert(null, '过一个月');
            }}
          >
            <Left>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
            </Left>
            <Body style={styles.notBorder}>
              <Text>非小号</Text>
              <Text note numberOfLines={2} style={styles.margin_5}>专注于为数字货币用户提供数据分析一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</Text>
            </Body>
          </ListItem>

          <ListItem
            avatar
            style={styles.listItem}
            underlayColor="transparent"
            onPress={() => {
              Alert.alert(null, '过一个月');
            }}
          >
            <Left>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
            </Left>
            <Body style={styles.notBorder}>
              <Text>非小号</Text>
              <Text note numberOfLines={2} style={styles.margin_5}>专注于为数字货币用户提供数据分析一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</Text>
            </Body>
          </ListItem>

          <ListItem
            avatar
            style={styles.listItem}
            underlayColor="transparent"
            onPress={() => {
              Alert.alert(null, '过一个月');
            }}
          >
            <Left>
              <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
            </Left>
            <Body style={styles.notBorder}>
              <Text>非小号</Text>
              <Text note numberOfLines={2} style={styles.margin_5}>专注于为数字货币用户提供数据分析一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    );
  }
}

export default withNavigation(AppList);
