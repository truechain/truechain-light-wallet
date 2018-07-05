import React, { Component } from 'react';
import {    
    View,
    TextInput,Button,Text,
    StyleSheet
} from 'react-native';
/**
 * 这是抽象出来的个人报名界面组件
 * 使用时传入相应属性的数据
 * 示例:
 * <PersonalInfoInput 
        line1TextHoloder="昵称" 
        line2TextHoloder="竞选宣言" 
        inputPageBtnText="下一步" 
        pressBtn={this.pressBtn}        
    />
 */

class PersonalInfoInput extends Component {   

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.inputPage}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxTitle}>个人信息</Text>
                    <TextInput placeholder={this.props.line1TextHoloder}></TextInput>
                    <TextInput placeholder={this.props.line2TextHoloder}></TextInput>
                </View>
                <Button 
                title={this.props.inputPageBtnText} 
                onPress={this.props.pressBtn()}
                />
            </View>
        );
    }
}
export default PersonalInfoInput;

const styles = StyleSheet.create({
    inputPage:{
        flex:1,
        paddingLeft: 15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:30
    },
    infoBox:{
        backgroundColor:"white",
        marginBottom:30,
        borderRadius:10
    },
    infoBoxTitle:{
        fontSize:15,
        color:"#222"   
    }
})