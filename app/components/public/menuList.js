import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet, TouchableHighlight, Modal, Alert, Linking,
} from 'react-native';
import Icon from '../../pages/iconSets';

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
				  this.props.onPress() || null;
        }}
        underlayColor="transparent"
        activeOpacity={0.5}
      >
        <View style={styles.myColsConPartRow}>
          {this.props.leftIconName ? (
            <View style={styles.myColsConPartRowLf}>
              <Icon name={this.props.leftIconName} size={20} color="#0071BC" />
            </View>
          ) : null}
          <View style={[styles.myColsConPartRowRi, styles.noSplitLine]}>
            <Text>{this.props.leftName}</Text>
            <View style={styles.myColsConPartRowRi2R}>
              {this.props.rightName ? <Text style={styles.r_text}>{this.props.rightName}</Text> : null}
              <Icon name="icon-right" size={15} color="#000" />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default MenuList;

const styles = StyleSheet.create({
  myColsConPartRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 60,
  },
  myColsConPartRowLf: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myColsConPartRowRi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  myColsConPartRowRi2R: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  r_text: {
    color: '#A0A5B0',
  },
});
