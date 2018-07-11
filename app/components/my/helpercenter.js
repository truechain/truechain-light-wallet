import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';

import { withNavigation } from 'react-navigation'

export class HelperCenter extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRightPress:this.goToContactUs
        })
    }

    goToContactUs = () => {
        this.props.navigation.navigate('ContactUs');
    }

    static navigationOptions = ({ navigation}) =>({
        headerTitle:"帮助中心",
        headerRight:(
            <TouchableHighlight underlayColor={"#ddd"} activeOpacity={0.5} 
            onPress={navigation.state.params?navigation.state.params.headerRightPress:null}
            > 
            <Text style={ { 
                color:"rgb(0,118,255)",
                fontSize:15,
                textAlignVertical:"center",
                paddingRight:15
            } }>
            联系我们
            </Text>
            </TouchableHighlight>
        )
    })

    _keyExtractor = (item, index) => item;

    render(){
        return(
            <View style={styles.helperPage}>
                <FlatList 
                data={[ 
                    "什么是助记词？",
                    "什么是keystore？",
                    "什么是私钥？",
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

export default withNavigation(HelperCenter)

const styles = StyleSheet.create({
    helperPage:{
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