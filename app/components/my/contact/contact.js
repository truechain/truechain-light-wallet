import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image,
} from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from '../../../pages/iconSets';
import { screenWidth, screenHeight } from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  no_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  no_image: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  no_text: {
    color: '#7F838D',
    lineHeight: 34,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPresence: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        transparent
        large
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          alert('添加联系人');
        }}
      >
        <Icon name="icon-xinjian" />
      </Button>
    ),
  });

  render() {
    const { isPresence } = this.state;
    return (
      <View style={styles.container}>
        {
       isPresence
         ? <Text>123</Text>
         : (
           <View style={styles.no_container}>
             <Image
               source={require('../../../assets/images/my/no_contact.png')}
               style={styles.no_image}
             />
             <Text style={styles.no_text}>还没有联系人，快添加吧</Text>
           </View>
         )
           }
      </View>
    );
  }
}

export default withNavigation(Contact);
