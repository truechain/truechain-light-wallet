import React from 'react'
import I18n from '../../language/i18n';
import {
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//TabBar
import Splash from '../pages/Splash'
import Assets from '../components/asset/asset'
import Node from '../components/node/node'
import My from '../components/my/my'

//Router
import Guide from '../guide/guide'
import CurrencyDetail from '../components/asset/currencyDetail'
import Transfer from '../components/asset/transfer'
import Receipt from '../components/asset/receipt'
import CreateWallet from '../components/my/wallet/createWallet'
import ImportWallet from '../components/my/wallet/importWallet'
import WalletInfo from '../components/asset/walletInfo'
import ExportMnemonic from '../components/asset/exportMnemonic'
import ExportKeystore from '../components/asset/exportKeystore'
import AboutUs from '../components/my/aboutus'
import UserPolicy from '../components/my/userpolicy'
import PrivacyPolicy from '../components/my/privacypolicy'
import Versions from '../components/my/versions'
import SysSet from '../components/my/sysset'
import HelperCenter from '../components/my/helpercenter'
import ContactUs from '../components/my/contactus'
import Login from '../components/my/login'
import SignUp from '../components/node/signUp'
import SignUpNode from '../components/node/signUpNode'
import SignUpInput from '../components/public/signUpInput'
import Lockpositon from '../components/public/lockpositon'
import CreateTeam from '../components/node/createTeam'




//rely
import Storage from 'react-native-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
});
window.storage = storage;

const Web3 = require('web3');
let host = 'https://mainnet.infura.io/';
window.host = host;
const web3 = new Web3(new Web3.providers.HttpProvider(host));
window.web3 = web3;

const IconUrl = {
    assets: require('../assets/images/common/asset1_3x.png'),
    node: require('../assets/images/common/node1_3x.png'),
    my: require('../assets/images/common/my1_3x.png'),
};

const TabBarPage = createBottomTabNavigator(
    {
        Assets: {
            screen: Assets,
            navigationOptions: {
                tabBarLabel: I18n.t('tab.assets'),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={styles.icon} source={IconUrl.assets} />
                ),
            }
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
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);


const App = createStackNavigator(
    {
        Splash: { screen: Splash },
        Home: {
            screen: TabBarPage,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
        Guide: {
            screen: Guide,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
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
        SignUpNode,
        SignUpInput,
        Lockpositon,
        CreateTeam: {
            screen: CreateTeam,
            navigationOptions: {
                headerTitle: '创建组队'
            }
        },
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTitleStyle: {
                color: '#000',
                fontSize: 18
            },
            headerTintColor: '#000'
        }
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    }
});

export default App