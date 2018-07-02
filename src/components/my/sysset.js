import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';

import { withNavigation } from 'react-navigation'


export class SysSet extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:"系统设置"
    }

    render(){
        return(
            <View style={styles.sysSetPage}>
                <FlatList 
                data={[ 
                    "多语言",
                    "货币单位",
                    "web3设置",
                ]} 
                keyExtractor={this._keyExtractor} 
                renderItem={ ({item}) =>(
                    <View style={styles.row}>
                        <Text style={styles.rowText}>{item}</Text>
                        <Image  
                        resizeMode={Image.resizeMode.stretch} 
                        source={require('../../assets/images/common/arr2ri.png')}
                        style={styles.iconArr2R} 
                        />
                    </View>
                ) }
                />
            </View>
        )
    }
}

export default withNavigation(SysSet)

const styles = StyleSheet.create({
    sysSetPage:{
        flex:1,
        backgroundColor:"white",
        paddingLeft:15
    },
    row:{
        height:60,
        borderBottomWidth:1,
        borderColor:"#eee",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingRight:15
    },
    rowText:{
        fontSize:15,
        lineHeight:50,
        color:"#555"
    },
    iconArr2R:{
        width:8,
        height:14
    }
});