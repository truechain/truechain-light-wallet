import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    ScrollView,
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

    render(){
        return(
            <View style={styles.helperPage}>
                <Text>帮助中心</Text>
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
    headerRightText:{
        color:"rgb(0,118,255)",
        fontSize:15,
        textAlignVertical:"center",
        paddingRight:15
    }
});