import React, { Component } from 'react';
import {    
    View,
    TextInput
} from 'react-native';

class textWidget extends Component {   
    render() {
        return (
            <View>
                <TextInput
                    {...this.props}                    
                >
                </TextInput>
            </View>
        );
    }
}
export default textWidget;