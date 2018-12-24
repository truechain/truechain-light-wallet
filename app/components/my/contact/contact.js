import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image,
} from 'react-native';
import {
  Content, List, ListItem, Left, Thumbnail, Body, Button, Right,
} from 'native-base';
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
    justifyContent: 'center',
  },
  container_cont: {
    // flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
  },
  listItem: {
    marginLeft: 0,
    marginTop: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  notBorder: {
    borderColor: 'transparent',
  },
  margin_5: {
    marginTop: 5,
  },
  arrow_area: {
    marginLeft: 15,
    justifyContent: 'center',
  },
});

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPresence: false,
    };
    this.navigate = this.props.navigation.navigate;
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
          navigation.navigate('EditInfo', {
            type: 0, //  新建联系人
          });
        }}
      >
        <Icon name="icon-xinjian" />
      </Button>
    ),
  });

  componentDidMount() {
    this.setState({
      isPresence: true,
    });
    // storage
    //   .load({
    //     key: 'localContact',
    //   })
    //   .then((res) => {
    //     const data = JSON.parse(res);
    //     console.log(data, '**********');
    //   })
    //   .catch((e) => {
    //     console.log(e, '呼呼呼哈哈哈');
    //   });
  }

  render() {
    const { isPresence } = this.state;
    return (
      <View style={styles.container}>
        {
       isPresence
         ? (
           <Content style={styles.container_cont}>
             <List>
               <ListItem
                 avatar
                 style={styles.listItem}
                 underlayColor="transparent"
                 onPress={() => {
                   alert('过一个月');
                 }}
               >
                 <Left>
                   <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                 </Left>
                 <Body style={styles.notBorder}>
                   <Text>非小号</Text>
                   <Text numberOfLines={2} style={styles.margin_5}>0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e</Text>
                 </Body>
                 <Right style={styles.arrow_area}>
                   <Icon name="icon-right" />
                 </Right>
               </ListItem>

               <ListItem
                 avatar
                 style={styles.listItem}
                 underlayColor="transparent"
                 onPress={() => {
                   this.navigate('EditInfo', {
                     type: '1', // 查看联系人信息
                     name: '非小号-----',
                     address: '0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e',
                   });
                 }}
               >
                 <Left>
                   <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                 </Left>
                 <Body style={styles.notBorder}>
                   <Text>非小号-----</Text>
                   <Text numberOfLines={2} style={styles.margin_5}>0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e</Text>
                 </Body>
                 <Right style={styles.arrow_area}>
                   <Icon name="icon-right" />
                 </Right>
               </ListItem>

               <ListItem
                 avatar
                 style={styles.listItem}
                 underlayColor="transparent"
                 onPress={() => {
                   alert('过一个月');
                 }}
               >
                 <Left>
                   <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                 </Left>
                 <Body style={styles.notBorder}>
                   <Text>非小号</Text>
                   <Text numberOfLines={2} style={styles.margin_5}>0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e</Text>
                 </Body>
                 <Right style={styles.arrow_area}>
                   <Icon name="icon-right" />
                 </Right>
               </ListItem>

               <ListItem
                 avatar
                 style={styles.listItem}
                 underlayColor="transparent"
                 onPress={() => {
                   alert('过一个月');
                 }}
               >
                 <Left>
                   <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                 </Left>
                 <Body style={styles.notBorder}>
                   <Text>非小号</Text>
                   <Text numberOfLines={2} style={styles.margin_5}>0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e</Text>
                 </Body>
                 <Right style={styles.arrow_area}>
                   <Icon name="icon-right" />
                 </Right>
               </ListItem>

               <ListItem
                 avatar
                 style={styles.listItem}
                 underlayColor="transparent"
                 onPress={() => {
                   alert('过一个月');
                 }}
               >
                 <Left>
                   <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                 </Left>
                 <Body style={styles.notBorder}>
                   <Text>非小号</Text>
                   <Text numberOfLines={2} style={styles.margin_5}>0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e</Text>
                 </Body>
                 <Right style={styles.arrow_area}>
                   <Icon name="icon-right" />
                 </Right>
               </ListItem>
             </List>
           </Content>
         )
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
