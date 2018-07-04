import React, { Component } from 'react';
import {    
    View,
    TextInput,Button,Text,
    StyleSheet
} from 'react-native';

class PersonalInfoInput extends Component {   
    
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
        backgroundColor:"white"
    },
    infoBoxTitle:{
        fontSize:15,
        color:"#222"   
    }
})