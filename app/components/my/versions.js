import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';

import { withNavigation } from 'react-navigation'

const versionData = [
    {id:1, key: 'a', version:"1.01", con:["优化了APP性能","新增联系人"] }, 
    {id:2, key: 'b', version:"1.02", con:["优化了AP能","联系人"] },
    {id:2, key: 'c', version:"1.03", con:["优化了AP能","联系人"] }
];

export class Versions extends Component {

    _keyExtractor = (item, index) => item;

    static navigationOptions = {
        headerTitle:"版本日志",
    }

    render(){
        return(
            <View style={styles.versionsPage}>
            <ScrollView>               
            <FlatList
                data={versionData}
                renderItem={ ({item}) =>( 
                    <View style={styles.version}>
                        <Text style={styles.versionTitle}>{item.version}</Text>
                        <FlatList 
                            data={item.con} 
                            keyExtractor={this._keyExtractor} 
                            renderItem={ ({item}) =>(
                                <View style={styles.versionDescrCon}>
                                    <Text style={styles.versionDescr}>* {item}</Text>
                                </View>
                            ) }
                        />
                    </View>
                )}
            />            
            </ScrollView>
            </View>
        )
    }
}

export default withNavigation(Versions)

const styles = StyleSheet.create({
    versionsPage:{
        flex:1,
        backgroundColor:"white",
        paddingLeft:15
    },
    version:{
        borderBottomWidth:1,
        borderColor:"#eee",
        backgroundColor:"white",
        paddingBottom:15     
    },
    versionTitle:{
        fontSize:28,
        lineHeight:40
    },
    versionDescrCon:{},
    versionDescr:{
        height:30,
        lineHeight:30,
        fontSize:15
    },
});