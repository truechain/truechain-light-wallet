import React, { Component } from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation'
import I18n from '../../language/i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import Asset from './asset/asset'
import Node from './node/node'
import My from './my/my'

const IconUrl = {
    assets: require('../assets/images/common/asset1_3x.png'),
    node: require('../assets/images/common/node1_3x.png'),
    my: require('../assets/images/common/my1_3x.png'),
}

const Tab = TabNavigator(    
    {
        Asset: {
            screen: Asset,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.assets'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.assets}></Image>
                ),
            },
        },
        Node: {
            screen: Node,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.node'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.node}></Image>
                ),
            },
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.my'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.my}></Image>
                ),
            },
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarVisible: false,
        lazy: true
    }
);

export default class Home extends Component {
    render() {
        return (
            <Tab />
        );
    }
}


const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    }
})