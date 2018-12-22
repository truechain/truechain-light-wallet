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
    // borderWidth: 1,
    // borderColor: 'green',
  },
  view_app: {
    // borderWidth: 1,
    // borderColor: 'red',
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
    // borderWidth: 1,
    // borderColor: 'green',
    overflow: 'hidden',
  },
  view_listItem: {
    // borderWidth: 1 / 2,
    // borderColor: 'red',
    flexWrap: 'wrap',
    marginLeft: 0,
  },
  view_avatar: {
    // borderWidth: 1 / 2,
    // borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: (screenWidth - 30) / 4,
    height: (screenWidth - 30) / 4,
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
        <View style={[styles.view, styles.view_app]}>
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
      </ScrollView>
    );
  }
}

export default Find;
