import React, { Component } from 'react';
import {
    Text,View,
    Image,StyleSheet,
    TouchableHighlight
} from 'react-native';

import LockPosition from '../public/lockpositon'

import { withNavigation } from 'react-navigation'

export class PersonalLockPosition extends Component {

    static navigationOptions = {
        headerTitle:"锁仓" 
    }

    pressBtn(){
        console.log("下一步")
    }

    render() {
        return (
           <LockPosition 
           bottomBtnText="下一步" 
           pressBtn={ this.pressBtn }        
           />
        );
    }
}

export default withNavigation(PersonalLockPosition)

const styles = StyleSheet.create({
    
})