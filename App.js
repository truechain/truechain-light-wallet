import I18n from './language/i18n';
import store from './src/store/index';
import Guide from './src/guide/guide';
import { Provider } from 'react-redux';
import My from './src/components/my/my';
import React, { Component } from 'react';
import Storage from 'react-native-storage';
import Node from './src/components/node/node';
import Assets from './src/components/asset/asset';
import Receipt from './src/components/asset/receipt';
import Transfer from './src/components/asset/transfer';
import WalletInfo from './src/components/asset/walletInfo';
import CurrencyDetail from './src/components/asset/currencyDetail';
import CreateWallet from './src/components/my/wallet/createWallet';
import ImportWallet from './src/components/my/wallet/importWallet';
import ExportMnemonic from './src/components/asset/exportMnemonic';
import ExportKeystore from './src/components/asset/exportKeystore';
import AboutUs from './src/components/my/aboutus'
import UserPolicy from './src/components/my/userpolicy'
import PrivacyPolicy from './src/components/my/privacypolicy'
import Versions from './src/components/my/versions'
import HelperCenter from './src/components/my/helpercenter'
import ContactUs from './src/components/my/contactus'
import SysSet from './src/components/my/sysset'
import Login from './src/components/my/login'
<<<<<<< HEAD

import SignUp from './src/components/node/signUp'
import SignUpNode from './src/components/node/signUpNode'

import PersonalApply from './src/components/node/personalapply'
import PersonalLockPosition from './src/components/node/personallockposition'
=======
import SignUp from './src/components/node/signUp'
import SignUpNode from './src/components/node/signUpNode'



import PersonalApply from './src/components/node/personalapply'
>>>>>>> e2445eea70e6b6a504b47b41f65ea7fdee3252f3

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';

const Web3 = require('web3');

const IconUrl = {
    assets: require('./src/assets/images/common/asset1_3x.png'),
    node: require('./src/assets/images/common/node1_3x.png'),
    my: require('./src/assets/images/common/my1_3x.png'),
};

const TabBarPage = createBottomTabNavigator(
    {
        Asset: {
            screen: Assets,
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

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
})
global.storage = storage;

const web3 = new Web3(new Web3.providers.HttpProvider('https:mainnet.infura.io/'));
global.web3 = web3;

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isWallet: false
        }
    }
    async componentWillMount() {
        await storage.load({ key: 'walletInfo' }).then(res => {
            if (res) {
                this.setState({
                    isWallet: true
                })
            }
        })
    }

    render() {
        const Router = createStackNavigator(
            {
                TabBarPage: {
                    screen: TabBarPage,
                    navigationOptions: {
                        header: null,
                        gesturesEnabled: false
                    }
                },
                Guide: {
                    screen: Guide,
                    navigationOptions: {
                        header: null
                    }
                },
                CurrencyDetail: CurrencyDetail,
                Transfer: Transfer,
                Receipt: {
                    screen: Receipt,
                    navigationOptions: {
                        headerTitle: '收款码'
                    }
                },
                CreateWallet: CreateWallet,
                ImportWallet: ImportWallet,
                WalletInfo: {
                    screen: WalletInfo,
                    navigationOptions: {
                        headerTitle: '账户信息'
                    }
                },
                ExportMnemonic: {
                    screen: ExportMnemonic,
                    navigationOptions: {
                        headerTitle: '导出助记词'
                    }
                },
                ExportKeystore: {
                    screen: ExportKeystore,
                    navigationOptions: {
                        headerTitle: '导出Keystore'
                    }
                },
                AboutUs,
                UserPolicy,
                PrivacyPolicy,
                Versions,
                HelperCenter,
                ContactUs,
                SysSet,
                PersonalApply,
                PersonalLockPosition,
                Login: {
                    screen: Login,
                    navigationOptions: {
                        headerTitle: '登录'
                    }
                },
                SignUp: {
                    screen: SignUp,
                    navigationOptions: {
                        headerTitle: '报名参选'
                    }
                },
                SignUpNode
            },
            {
                initialRouteName: this.state.isWallet ? 'TabBarPage' : 'Guide',
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000'
                }
            }
        );
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    }
})