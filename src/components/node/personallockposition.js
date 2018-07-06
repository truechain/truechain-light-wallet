import React, { Component } from 'react';
import {
    Text,View,
    Image,StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import LockPosition from '../public/lockpositon'

import { withNavigation } from 'react-navigation'

export class PersonalLockPosition extends Component {

    static navigationOptions = {
        headerTitle:"锁仓" 
    }

    pressBtn(){
        console.log("下一步")
        DeviceEventEmitter.emit('showModal', 'themsg');
    }

    render() {
        return (
           <LockPosition 
           bottomBtnText="下一步" 
           line1TextHoloder="2000True"
           pressBtn={ this.pressBtn }        
           />
        );
    }
}

export default withNavigation(PersonalLockPosition)

const styles = StyleSheet.create({
    
})