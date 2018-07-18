import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';
import PasswordGesture from 'react-native-gesture-password';
export class GesturePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            status: 'normal'
        };
    }

    static navigationOptions = {
        headerTitle:"解锁手势"
    }

    onEnd(password) { //手势解锁动作停止，手指离开屏幕时
        console.log(password);
        if (password == '123') {
            this.setState({
                status: 'right',
                message: '解锁成功，即将进入'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: '密码错误，请重试'
            });
        }
    }

    onStart() {  //手指开始在屏幕上滑动，开始记录手势密码
        this.setState({
            status: 'normal',
            message: ''
        });
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

export default withNavigation(GesturePassword)

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:"white",
        paddingLeft:15
    }
});