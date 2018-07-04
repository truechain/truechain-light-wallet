import React, { Component } from 'react';
import {    
    View,
    TextInput,Button,Text,Slider,
    StyleSheet
} from 'react-native';

class LockPosition extends Component {   
    
    render() {
        return (
            <View style={styles.inputPage}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxTitle}>锁仓地址</Text>
                    <TextInput placeholder={this.props.line1TextHoloder}></TextInput>
                    <Text style={styles.infoBoxTitle}>矿工费用</Text>
                    <Slider
                    maximumValue={100} 
                    step={1}
                    />
                </View>
                <Button 
                title={this.props.inputPageBtnText} 
                onPress={this.props.pressBtn()}
                />
            </View>
        );
    }
}
export default LockPosition;

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