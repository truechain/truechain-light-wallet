import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation'

import PasswordGesture from 'react-native-gesture-password'


export class SetGesturePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            status: 'normal',
            userpwd:''
        };
    }

    static navigationOptions = {
        headerTitle:"设置手势密码"
    }


    onEnd(password) {  //手势解锁动作停止，手指离开屏幕时
        console.log(password);
        if ( this.state.userpwd === '' ) {
            // The first password
            this.state.userpwd = password;
            this.setState({
                status: 'normal',
                message: '请重复上次的手势'
            });
        } else {
            // The second password
            if ( password === this.state.userpwd ) {
                this.setState({
                    status: 'right',
                    message: '手势密码设置成功'
                });

                
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  '和上次的手势不同，请重试'
                });
            }
        }
    }

    onStart() {  //手指开始在屏幕上滑动，开始记录手势密码
        if ( this.state.userpwd === '') {
            this.setState({
                message: '请设置手势密码，至少连接4个点'
            });
        } else {
            this.setState({
                message: '请重复上次的手势'
            });
        }
    }

    render(){
        return(
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
            />
        )
    }
}

export default withNavigation(SetGesturePassword)

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:"white",
        paddingLeft:15
    }
});