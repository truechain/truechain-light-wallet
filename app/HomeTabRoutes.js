import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import {I18n} from '../language/i18n';
import Asset from './components/asset/asset';
import Node from './components/node/node';
import My from './components/my/my';


const IconUrl = {
    assets: require('./assets/images/common/asset1_3x.png'),
    node: require('./assets/images/common/node1_3x.png'),
    my: require('./assets/images/common/my1_3x.png'),
};

export default createBottomTabNavigator(
    {
        Asset: {
            screen: Asset,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.assets'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.assets} />
                ),
            },
        },
        Node: {
            screen: Node,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.node'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.node} />
                ),
            },
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.my'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.my} />
                ),
            },
        }
    },
    {
        tabBarVisible: false,
        lazy: true
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    }
})