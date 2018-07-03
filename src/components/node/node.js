import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { getNodeRank } from '../../api/index'

const screen = Dimensions.get('window');

export default class Node extends Component {
    componentDidMount() {
        getNodeRank('1').then(res => {
            console.log(res);//标准节点排行
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.header_title, styles.color_white]}>
                        节点
                        </Text>
                    <View style={styles.header_item}>
                        <View style={styles.fun}>
                            <Image source={require('../../assets/images/node/baoming_2x.png')} style={styles.fun_icon} />
                            <Text style={styles.color_white}>
                                报名参选
                        </Text>
                        </View>
                        <View style={styles.fun}>
                            <Image source={require('../../assets/images/node/toupiao_2x.png')} style={styles.fun_icon} />
                            <Text style={styles.color_white}>
                                投票
                        </Text>
                        </View>
                    </View>
                </View>

                <ScrollableTabView
                    style={{ backgroundColor: '#fff' }}
                    tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
                    tabBarActiveTextColor='#007aff'
                    tabBarInactiveTextColor='#000'
                    renderTabBar={() => <DefaultTabBar />}
                >

                    <View tabLabel='标准节点排行'>

                    </View>

                    <View tabLabel='全节点排行'>

                    </View>



                </ScrollableTabView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    color_white: {
        color: '#fff'
    },
    container: {
        borderWidth: 1,
        borderColor: 'red',
        flex: 1
    },
    header: {
        padding: 8,
        height: screen.height * 0.25,
        backgroundColor: '#528bf7',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    header_title: {
        fontSize: 18
    },
    header_item: {
        flexDirection: 'row',
        width: screen.width,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    fun: {
        width: screen.width * 0.35,
        height: 80,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    fun_icon: {
        width: 35,
        height: 28
    }
})
