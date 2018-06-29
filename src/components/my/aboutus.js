import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    TouchableHighlight
} from 'react-native';

import { withNavigation } from 'react-navigation'

export class AboutUs extends Component {

    static navigationOptions = {
        headerTitle:"关于我们",
    }

    render(){
        return(
            <View style={styles.aboutusPage}>
                <View style={styles.topCon}>
                    <Image 
                    resizeMode={Image.resizeMode.stretch} 
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo} 
                    />
                    <View>
                        <Text style={styles.version}>当前版本：1.0</Text>
                    </View>
                    <View>
                        <Text style={[styles.txtCen,styles.descr]}>
                        True是一款移动端轻钱包APP,它旨在为普通用户提供一款安全放心，简单好用，功能强大的数字资产钱包应用。
                        </Text>
                    </View>
                </View>
                <View style={styles.rowsCon}>
                    <TouchableHighlight 
                    underlayColor={"#ddd"} activeOpacity={0.5} 
                    onPress={ ()=>this.props.navigation.navigate('UserPolicy') }
                    >                
                        <View style={styles.row}>
                            <View style={styles.rowLf}>
                                <Text style={styles.rowLfText}>使用协议</Text>
                            </View>
                            <View style={styles.rowRi}>
                                <Image 
                                resizeMode={Image.resizeMode.stretch} 
                                source={require('../../assets/images/common/arr2ri.png')}
                                style={styles.iconArr2R} 
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                    underlayColor={"#ddd"} activeOpacity={0.5} 
                    onPress={ ()=>this.props.navigation.navigate('UserPolicy') }
                    >
                        <View style={styles.row}>
                            <View style={styles.rowLf}>
                                <Text style={styles.rowLfText}>隐私条款</Text>
                            </View>
                            <View style={styles.rowRi}>
                                <Image 
                                resizeMode={Image.resizeMode.stretch} 
                                source={require('../../assets/images/common/arr2ri.png')}
                                style={styles.iconArr2R} 
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                    underlayColor={"#ddd"} activeOpacity={0.5} 
                    onPress={ ()=>this.props.navigation.navigate('Versions') }
                    >
                    <View style={styles.row}>
                        <View style={styles.rowLf}>
                            <Text style={styles.rowLfText}>版本日志</Text>
                        </View>
                        <View style={styles.rowRi}>
                            <Image 
                            resizeMode={Image.resizeMode.stretch} 
                            source={require('../../assets/images/common/arr2ri.png')}
                            style={styles.iconArr2R} 
                            />
                        </View>
                    </View>
                    </TouchableHighlight>
                    <View style={styles.row}>
                        <View style={styles.rowLf}>
                            <Text style={styles.rowLfText}>检测新版</Text>
                        </View>
                        <View style={styles.rowRi}>
                            <Image 
                            resizeMode={Image.resizeMode.stretch} 
                            source={require('../../assets/images/common/arr2ri.png')}
                            style={styles.iconArr2R} 
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(AboutUs)

const styles = StyleSheet.create({
    aboutusPage:{
        flex:1,
        backgroundColor:"white"
    },
    topCon:{
        alignItems:"center",
        borderColor:"#eee",
        borderBottomWidth:1,
        maxHeight:250
    },
    logo:{
        width:90,
        height:90,
        borderRadius:10,
        marginTop:50
    },
    version:{
        marginTop:10,
        marginBottom:10,
        fontSize:12,
        color:"#ccc"
    },
    txtCen:{
        textAlign:"center",
        flex:1
    },
    descr:{
        fontSize:12,
        lineHeight:24,
        color:"#555",
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:50
    },
    iconArr2R:{
        width:8,
        height:14
    },
    rowsCon:{
        paddingLeft:15,
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"#eee",
        paddingRight:15,
        height:55
    },
    rowLfText:{
        fontSize:15,
        color:"#222"
    }
});