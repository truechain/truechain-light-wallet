import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import {
  List, ListItem, Thumbnail, Card, CardItem, Body,
} from 'native-base';
import { screenWidth, screenHeight } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  view_t: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view_tL: {
    fontSize: 18,
    color: '#203260',
  },
  view_tR: {
    fontSize: 12,
    color: '#7F838D',
  },
  view_content: {
    marginTop: 10,
    flexDirection: 'row',
  },
  view_list: {
    width: screenWidth - 30,
    overflow: 'hidden',
  },
  view_listItem: {
    flexWrap: 'wrap',
    marginLeft: 0,
  },
  view_avatar: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: (screenWidth - 30) / 4,
    height: (screenWidth - 30) / 4,
  },
  card: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  cardItem: {
    marginTop: 10,
    backgroundColor: '#F1F4FA',
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: '#A0A5B0',
  },
});


class Find extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <View style={styles.view_t}>
            <Text style={styles.view_tL}>应用</Text>
            <Text style={styles.view_tR}>更多</Text>
          </View>

          <View style={styles.view_content}>
            <List style={styles.view_list}>
              <ListItem avatar style={styles.view_listItem}>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
                <View style={styles.view_avatar}>
                  <Thumbnail
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />
                  <Text>非小号</Text>
                </View>
              </ListItem>
            </List>
          </View>
          <View />
        </View>

        <View style={styles.view}>
          <View style={styles.view_t}>
            <Text style={styles.view_tL}>新闻</Text>
          </View>

          <List style={styles.view_list}>
            <ListItem avatar>
              <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text numberOfLines={2}>TrueChain主网测试版版第六批映射工作工做作...</Text>
                    <Text style={styles.date}>2018-12-01</Text>
                  </Body>
                </CardItem>

                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text numberOfLines={2}>TrueChain主网测试版版第六批映射工作工做作...</Text>
                    <Text style={styles.date}>2018-12-01</Text>
                  </Body>
                </CardItem>

                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text numberOfLines={2}>TrueChain主网测试版版第六批映射工作工做作...</Text>
                    <Text style={styles.date}>2018-12-01</Text>
                  </Body>
                </CardItem>

                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text numberOfLines={2}>TrueChain主网测试版版第六批映射工作工做作...</Text>
                    <Text style={styles.date}>2018-12-01</Text>
                  </Body>
                </CardItem>
              </Card>
            </ListItem>
          </List>
        </View>
      </ScrollView>
    );
  }
}

export default Find;
