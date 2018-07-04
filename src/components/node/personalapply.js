import React, { Component } from 'react';
import {
    Text,View,
    Image,StyleSheet,
    TouchableHighlight
} from 'react-native';

import PersonalInfoInput from '../public/personalinfoinput'

import { withNavigation } from 'react-navigation'

export class PersonalApply extends Component {

    static navigationOptions = {
        headerTitle:"个人报名" 
    }

    pressBtn(){
        console.log("下一步")
    }

    render() {
        return (
           <PersonalInfoInput 
           line1TextHoloder="昵称" 
           line2TextHoloder="竞选宣言" 
           inputPageBtnText="下一步" 
           pressBtn={this.pressBtn()}        
           />
        );
    }
}

export default withNavigation(PersonalApply)

const styles = StyleSheet.create({
    
})