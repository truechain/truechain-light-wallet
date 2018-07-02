import React, { Component } from 'react';

import {
    Text,View,
    Image,StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';

import { withNavigation } from 'react-navigation'

export class Versions extends Component {

    _keyExtractor = (item, index) => item.id;

    static navigationOptions = {
        headerTitle:"版本日志",
    }

    render(){
        return(
            <ScrollView>
            <View style={styles.versionsPage}>   
            <FlatList 
            data={[{id:"1",ver: "1.01"}, {id:"2",ver: "1.20"}]} 
            keyExtractor={ this._keyExtractor } 
            renderItem={
                ({item}) =>{
                    <View style={styles.version}>
                        <Text style={styles.versionTitle}>{item.ver}</Text>
                    </View>
                }
            }
            />
                <View style={styles.version}>
                    <Text style={styles.versionTitle}>1.01</Text>
                    <View>
                        <Text>* 优化了App性能</Text>
                    </View>
                    <View>
                        <Text>* 新增联系人</Text>
                    </View>
                </View>                 
            </View>
            </ScrollView>
        )
    }
}

export default withNavigation(Versions)

const styles = StyleSheet.create({
    versionsPage:{
        flex:1,
        backgroundColor:"white"
    },
    version:{
        flexDirection:"row",
        paddingLeft:15
    },
    versionTitle:{
        fontSize:28,
        lineHeight:40
    },
    textCon:{
        fontSize:15,
        lineHeight:26
    }
});