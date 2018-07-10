import React, { Component } from 'react';
import {
    Text,View,
    Image,StyleSheet,
    TouchableHighlight
} from 'react-native';

import { withNavigation } from 'react-navigation'

export default class SignUpNode extends Component {
    render() {
        return (
            <View>
                <Text>
                    节点
                </Text>
            </View>
        );
    }
}

export default withNavigation(SignUpNode)

const styles = StyleSheet.create({
    
})