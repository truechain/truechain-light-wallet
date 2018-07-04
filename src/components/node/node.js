import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { getNodeRank } from '../../api/index'

const screen = Dimensions.get('window');

class NodeItem extends Component {
    render() {
        const iconUrl = [require('../../assets/images/node/sort_1.png'), require('../../assets/images/node/sort_2.png'), require('../../assets/images/node/sort_3.png')];
        return (
            <View style={styles.nodeItem}>
                {
                    this.props.index <= 2 ?
                        <Image
                            style={styles.iconSort}
                            source={iconUrl[this.props.index]}
                        /> :
                        <View style={styles.iconSort}>
                            <Text>
                                {this.props.index + 1}
                            </Text>
                        </View>
                }
                <View style={styles.nickName}>
                    <Text>
                        {this.props.item.nickname}
                    </Text>
                    {
                        this.props.item.type === 1 ?
                            <Image
                                style={styles.iconPersonal}
                                source={require('../../assets/images/node/geren_3x.png')}
                            /> : null
                    }
                </View>

                {
                    this.props.item.lock_num ?
                        <View style={styles.lockNum}>
                            <Text>
                                {this.props.item.lock_num} true
                    </Text>
                        </View> :
                        <View style={styles.lockNum}>
                            <Text style={styles.node_text}>
                                {this.props.item.score} 分
                    </Text>
                        </View>

                }
                {
                    this.props.item.tickets ?
                        <View style={styles.tickets}>
                            <Text style={styles.node_text}>
                                {this.props.item.tickets} 票
                    </Text>
                        </View> : null
                }
            </View>
        )
    }
}

export default class Node extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            isRefreshing: false,
            standardNodeData: [],
            fullNodeData: []
        })
    }

    componentDidMount() {
        this._getNodeRank()
    }

    _getNodeRank() {
        getNodeRank({
            nodeType: 2,
            pageIndex: 0
        }).then(res => {
            this.setState({
                fullNodeData: res.data.data
            })
        })
        getNodeRank({
            nodeType: 1,
            pageIndex: 0
        }).then(res => {
            console.log(res.data.data);

            this.setState({
                standardNodeData: res.data.data
            })
        })
    }

    _onRefresh() {
        this._getNodeRank()
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
                    <View tabLabel='全节点排行'>
                        <ScrollView
                            style={styles.scrollview}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#ff0000"
                                    title="Loading..."
                                    titleColor="green"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />}>
                            {
                                this.state.fullNodeData.map((item, index) => {
                                    return <NodeItem item={item} index={index} key={index} />
                                })
                            }
                        </ScrollView>
                    </View>

                    <View tabLabel='标准节点排行'>
                        <ScrollView
                            style={styles.scrollview}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#ff0000"
                                    title="Loading..."
                                    titleColor="green"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />}>
                            {
                                this.state.standardNodeData.map((item, index) => {
                                    return <NodeItem item={item} index={index} key={index} />
                                })
                            }
                        </ScrollView>
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
    },
    // scrollview: {
    //     borderWidth: 1,
    //     borderColor: 'red',
    // },
    //排行
    nodeItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between'
    },
    iconSort: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 30
    },
    iconPersonal: {
        width: 20,
        height: 10
    },
    nickName: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width * 0.4
    },
    lockNum: {
        width: screen.width * 0.25
    },
    tickets: {
        width: screen.width * 0.2
    },
    node_text: {
        color: '#528bf7'
    }
})
