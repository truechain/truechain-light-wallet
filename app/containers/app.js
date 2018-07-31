import React from 'react';
import { I18n } from '../../language/i18n'; // 多国语言支持
import { StyleSheet, Text, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation'; // 页面切换 路由导航组件
import { host } from '../utils/config';

//TabBar 底部栏位页面
import Splash from '../pages/Splash'; // app开屏画面
import Assets from '../components/asset/asset'; // 底部：资产
import Node_item from '../components/node/node'; //底部：节点
import My_item from '../components/my/my'; //底部： 我的

//Router
import Guide from '../guide/guide'; //没有本地存储的钱包时进入的引导页：引导用户去选择创建钱包或导入钱包
import CurrencyDetail from '../components/asset/currencyDetail'; //  资产 -> 币种详情页
import Transfer from '../components/asset/transfer'; // 资产 -> 币种详情 -> 转账页
import Receipt from '../components/asset/receipt'; // 资产 -> 币种详情 -> 收款页
import CreateWallet from '../components/my/wallet/createWallet'; // 创建钱包：新建1个本地钱包 
import ImportWallet from '../components/my/wallet/importWallet';  // 导入钱包
import WalletInfo from '../components/asset/walletInfo'; // 我的 -> 钱包管理（账户信息页）
import ExportMnemonic from '../components/asset/exportMnemonic';
import ExportKeystore from '../components/asset/exportKeystore';
import AboutUs from '../components/my/aboutus';
import UserPolicy from '../components/my/userpolicy';
import Versions from '../components/my/versions';
import SysSet from '../components/my/sysset';
import HelperCenter from '../components/my/helpercenter';
import ContactUs from '../components/my/contactus';
import Login from '../components/my/login';
import SignUp from '../components/node/signUp'; // 节点 -> 报名参选
import SignUpNode from '../components/node/signUpNode';
import SignUpInput from '../components/public/signUpInput';
import Lockpositon from '../components/public/lockpositon';
import CreateTeam from '../components/node/createTeam';
import TeamInfo from '../components/node/teamInfo';
import FillInfo from '../components/node/fillInfo';
import LockAccount from '../components/my/lockAccount';
import LogOut from '../components/my/logOut';
import SignUpSuccess from '../components/public/signUpSuccess';
import MyTeam from '../components/node/myTeam';
import PersonnelManagement from '../components/node/personnelManagement';
import SetGesturePassword from '../components/my/setgesturepassword';
import VoteNode from '../components/node/vote/voteNode';
import VoteList from '../components/node/vote/voteList';
import VoteInfo from '../components/node/vote/voteInfo'; //节点 -> 组件节点的投票详情页
import SysLanguage from '../components/my/sysLanguage';
import TransactionRecord from '../components/my/transactionRecord';
import KnowledgePoint from '../components/my/knowledgePoint';

//rely
import Storage from 'react-native-storage';
import Icon from '../pages/iconSets';

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true
});
window.storage = storage;

storage
	.load({
		key: 'token'
	})
	.then((res) => {
		store.dispatch({
			type: 'TOKEN',
			token: res.token
		});
	})
	.catch((e) => {
		console.log(e);
	});

storage
	.load({
		key: 'localLanguage'
	})
	.then((res) => {
		I18n.locale = res.localLanguage;
	})
	.catch((e) => {
		console.log(e, '首次获取系统语言');
	});

const Web3 = require('web3');
window.host = host;

if (host.includes('ropsten')) {
	store.dispatch({
		type: 'CONTRACTADDR',
		TRUEContractAddr: '0x2792d677B7Ba6B7072bd2293F64BC0C1CDe23ac1',
		TTRContractAddr: '0x635AfeB8739f908A37b3d312cB4958CB2033F456'
	});
} else {
	store.dispatch({
		type: 'CONTRACTADDR',
		TRUEContractAddr: '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab',
		TTRContractAddr: '0xf2bb016e8c9c8975654dcd62f318323a8a79d48e'
	});
}

const web3 = new Web3(new Web3.providers.HttpProvider(host));
window.web3 = web3;

const IconUrl = {
	assets: require('../assets/images/common/asset1_3x.png'),
	node: require('../assets/images/common/node1_3x.png'),
	my: require('../assets/images/common/my1_3x.png')
};

const Node = createStackNavigator({
	Node: {
		screen: Node_item,
		navigationOptions: () => ({
			title: I18n.t('tab.node'),
			headerBackTitle: null,
			headerStyle: {
				backgroundColor: '#528bf7',
				borderBottomWidth: 0
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 18
			},
			headerTintColor: '#000',
			borderWidth: 0
		})
	}
});

const My = createStackNavigator({
	My: {
		screen: My_item,
		navigationOptions: () => ({
			title: I18n.t('tab.my'),
			headerBackTitle: null,
			headerStyle: {
				backgroundColor: '#528bf7',
				borderBottomWidth: 0
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 18
			},
			headerTintColor: '#000'
		})
	}
});

const TabBarPage = createBottomTabNavigator(
	{
		Assets: {
			screen: Assets,
			navigationOptions: {
				tabBarLabel: ({ tintColor, focused }) => (
					<Text style={{ color: tintColor, fontSize: 12 }}>{I18n.t('tab.assets')}</Text>
				),
				tabBarIcon: ({ focused, tintColor }) => <Icon name="icon-zichan" size={30} color={tintColor} />
			}
		},
		Node: {
			screen: Node,
			navigationOptions: {
				tabBarLabel: ({ tintColor, focused }) => (
					<Text style={{ color: tintColor, fontSize: 12 }}>{I18n.t('tab.node')}</Text>
				),
				tabBarIcon: ({ focused, tintColor }) => (
					<Icon name="icon-xiajiantouxialakuang-" size={20} color={tintColor} />
				),
				tabBarOnPress: ({ navigation, defaultHandler }) => {
					storage
						.load({
							key: 'token'
						})
						.then((res) => {
							navigation.navigate('Node');
						})
						.catch((e) => {
							navigation.navigate('Login');
						});
				}
			}
		},
		My: {
			screen: My,
			navigationOptions: {
				tabBarLabel: ({ tintColor, focused }) => (
					<Text style={{ color: tintColor, fontSize: 12 }}>{I18n.t('tab.my')}</Text>
				),
				tabBarIcon: ({ focused, tintColor }) => <Icon name="icon-geren" size={30} color={tintColor} />
			}
		}
	},
	{
		lazy: true,
		animationEnabled: true,
		backBehavior: true,
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
				headerTitle: () => <Text>{I18n.t('assets.currency.receipt')}</Text>
			}
		},
		CreateWallet: CreateWallet,
		ImportWallet: ImportWallet,
		WalletInfo: {
			screen: WalletInfo,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('assets.walletInfo.title')}</Text>
			}
		},
		ExportMnemonic: {
			screen: ExportMnemonic,
			navigationOptions: {
				headerTitle: I18n.t('assets.walletInfo.exportMnemonic')
			}
		},
		ExportKeystore: {
			screen: ExportKeystore,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('assets.walletInfo.exportKeystore')}</Text>
			}
		},
		AboutUs: {
			screen: AboutUs,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.aboutUs._title')}</Text>
			}
		},
		UserPolicy: {
			screen: UserPolicy,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.aboutUs.useAgreement')}</Text>
			}
		},
		Versions,
		HelperCenter: {
			screen: HelperCenter,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.helpCenter._title')}</Text>
			}
		},
		ContactUs,
		SysSet: {
			screen: SysSet,
			navigationOptions: {
				headerTitle: () => <Text> {I18n.t('my.sysSetting._title')}</Text>
			}
		},
		Login: {
			screen: Login
		},
		SignUp: {
			screen: SignUp,
			navigationOptions: {
				headerTitle: I18n.t('node.signUp')
			}
		},
		SignUpNode,
		SignUpInput,
		Lockpositon: {
			screen: Lockpositon
		},
		CreateTeam: {
			screen: CreateTeam,
			navigationOptions: {
				headerTitle: '创建组队'
			}
		},
		TeamInfo: {
			screen: TeamInfo
		},
		FillInfo: {
			screen: FillInfo
		},
		LockAccount: {
			screen: LockAccount,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.lockAccount._title')}</Text>
			}
		},
		LogOut: {
			screen: LogOut,
			navigationOptions: {
				headerTitle: () => <Text> {I18n.t('my.home.lockAccount._title1')}</Text>
			}
		},
		SignUpSuccess,
		MyTeam,
		PersonnelManagement,
		SetGesturePassword,
		VoteNode,
		VoteList,
		VoteInfo,
		SysLanguage: {
			screen: SysLanguage,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.sysSetting.language.multi_language')} </Text>
			}
		},
		TransactionRecord: {
			screen: TransactionRecord,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.transactionRecord')} </Text>
			}
		},
		KnowledgePoint
	},
	{
		// initialRouteName: 'Guide',
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

export default App;
