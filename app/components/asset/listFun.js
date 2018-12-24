import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight,
} from 'react-native';
import Icon from '../../pages/iconSets';


const styles = StyleSheet.create({
  fun: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e0df',
  },
  fun_text: {
    color: '#000',
  },
});

const ListFun = props => (
  <TouchableHighlight underlayColor="transparent" onPress={props.onPress}>
    <View style={styles.fun}>
      <Text style={styles.fun_text}>{props.fun_name}</Text>
      <Icon name="icon-right" size={15} color="#000" />
    </View>
  </TouchableHighlight>
);

export default ListFun;
