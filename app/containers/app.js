import React from 'react';
import { I18n } from '../../language/i18n'; // 多国语言支持
import { StyleSheet, Text, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation'; // 页面切换 路由导航组件
import { nodeHost, trueHost } from '../utils/config';

//TabBar 底部栏位页面
import Splash from '../pages/Splash'; // app开屏画面
import Assets from '../components/asset/asset'; // 底部：资产
import My_item from '../components/my/my'; //底部： 我的
import Activity from '../components/activity/activity'; //活动

//Router
import Guide from '../guide/guide'; //没有本地存储的钱包时进入的引导页：引导用户去选择创建钱包或导入钱包
import CurrencyDetail from '../components/asset/currencyDetail'; //  资产 -> 币种详情页
import Transfer from '../components/asset/transfer'; // 资产 -> 币种详情 -> 转账页
import Receipt from '../components/asset/receipt'; // 资产 -> 币种详情 -> 收款页
import CreateWallet from '../components/my/wallet/createWallet'; // 创建钱包：新建1个本地钱包
import ImportWallet from '../components/my/wallet/importWallet'; // 导入钱包
import WalletInfo from '../components/asset/walletInfo'; // 我的 -> 钱包管理（账户信息页）
import ExportMnemonic from '../components/asset/exportMnemonic'; //导出助记词
import ExportKeystore from '../components/asset/exportKeystore'; //导出keystore
import AboutUs from '../components/my/aboutus';
import UserPolicy from '../components/my/userpolicy';
import Versions from '../components/my/versions';
import SysSet from '../components/my/sysset';
import HelperCenter from '../components/my/helpercenter';
import FollowUs from '../components/my/followus';
import Login from '../components/my/login';
import Lockpositon from '../components/public/lockpositon';
import LockAccount from '../components/my/lockAccount';
import LogOut from '../components/my/logOut';
import SetGesturePassword from '../components/my/setgesturepassword';
import SysLanguage from '../components/my/sysLanguage';
import TransactionRecord from '../components/my/transactionRecord';
import KnowledgePoint from '../components/my/knowledgePoint';
import WebSetting from '../components/my/webSetting';
import QRscanner from '../components/public/QRscanner';
import Inviting from '../components/my/inviting'; //邀请好友
import InvitationRecord from '../components/my/invitationRecord'; //邀请记录
import Referrer from '../components/my/referrer'; //推荐人

//rely
import Storage from 'react-native-storage';
import Icon from '../pages/iconSets';

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true
});
global.storage = storage;

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
// const WebTrue = require('webtrue');

function check(host) {
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
	global.host = host;
	const web3 = new Web3(new Web3.providers.HttpProvider(host));
	// const webtrue = new WebTrue.modules.ETrue(trueHost);

	global.web3 = web3;
	// global.webtrue = webtrue;
}

storage
	.load({
		key: 'webHost'
	})
	.then(({ webHost }) => {
		check(webHost);
	})
	.catch((e) => {
		check(nodeHost);
	});

// const Node = createStackNavigator({
// 	Node: {
// 		screen: Node_item,
// 		navigationOptions: () => ({
// 			title: I18n.t('tab.node'),
// 			headerBackTitle: null,
// 			headerStyle: {
// 				backgroundColor: '#528bf7',
// 				borderBottomWidth: 0
// 			},
// 			headerTitleStyle: {
// 				color: '#fff',
// 				fontSize: 18
// 			},
// 			headerTintColor: '#000',
// 			borderWidth: 0
// 		})
// 	}
// });

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
					<Text style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}>{I18n.t('tab.assets')}</Text>
				),
				tabBarIcon: ({ focused, tintColor }) => <Icon name="icon-zichan" size={30} color={tintColor} />
			}
		},
		Activity: {
			screen: Activity,
			navigationOptions: {
				tabBarLabel: ({ tintColor, focused }) => (
					<Text style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}>
						{I18n.t('activity._title')}
					</Text>
				),
				tabBarIcon: ({ focused, tintColor }) => <Icon name="icon-huodong" size={30} color={tintColor} />,
				tabBarOnPress: ({ navigation, defaultHandler }) => {
					storage
						.load({
							key: 'token'
						})
						.then((res) => {
							navigation.navigate('Activity');
						})
						.catch((e) => {
							navigation.navigate('Login');
						});
				}
			}
		},
		// Node: {
		// 	screen: Node,
		// 	navigationOptions: {
		// 		tabBarLabel: ({ tintColor, focused }) => (
		// 			<Text style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}>{I18n.t('tab.node')}</Text>
		// 		),
		// 		tabBarIcon: ({ focused, tintColor }) => (
		// 			<Icon name="icon-xiajiantouxialakuang-" size={20} color={tintColor} />
		// 		),
		// 		tabBarOnPress: ({ navigation, defaultHandler }) => {
		// 			storage
		// 				.load({
		// 					key: 'token'
		// 				})
		// 				.then((res) => {
		// 					navigation.navigate('Node');
		// 				})
		// 				.catch((e) => {
		// 					navigation.navigate('Login');
		// 				});
		// 		}
		// 	}
		// },
		My: {
			screen: My,
			navigationOptions: {
				tabBarLabel: ({ tintColor, focused }) => (
					<Text style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}>{I18n.t('tab.my')}</Text>
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
		CreateWallet: {
			screen: CreateWallet,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('wallet.creatWallet')}</Text>
			}
		},
		ImportWallet: {
			screen: ImportWallet,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('guide.importWallet')}</Text>
			}
		},
		WalletInfo: {
			screen: WalletInfo,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('assets.walletInfo.title')}</Text>
			}
		},
		ExportMnemonic: {
			screen: ExportMnemonic,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('assets.walletInfo.exportMnemonic')}</Text>
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
		Versions: {
			screen: Versions,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.Versions._title')}</Text>
			}
		},
		HelperCenter: {
			screen: HelperCenter,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.helpCenter._title')}</Text>
			}
		},
		FollowUs: {
			screen: FollowUs,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.followUs._title')}</Text>
			}
		},
		SysSet: {
			screen: SysSet,
			navigationOptions: {
				headerTitle: () => <Text> {I18n.t('my.sysSetting._title')}</Text>
			}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.lockAccount.loginIn')}</Text>
			}
		},
		Lockpositon: {
			screen: Lockpositon,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('public.lockedWarehouse')}</Text>
			}
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
		SetGesturePassword,
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
		KnowledgePoint,
		WebSetting: {
			screen: WebSetting,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.webHost')} </Text>
			}
		},
		QRscanner: {
			screen: QRscanner,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('public.scan')}</Text>
			}
		},
		Inviting: {
			screen: Inviting,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.inviteFriends._title')}</Text>
			}
		},
		InvitationRecord: {
			screen: InvitationRecord,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.invitationRecord._title')}</Text>
			}
		},
		Referrer: {
			screen: Referrer,
			navigationOptions: {
				headerTitle: () => <Text>{I18n.t('my.home.inviteFriends.enterInvitationCode')}</Text>
			}
		}
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
