import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'
import Transfer from './components/asset/transfer'
import Receipt from './components/asset/receipt'
import Guide from './guide/guide'
import CreateWallet from './components/my/wallet/createWallet'
import ImportWallet from './components/my/wallet/importWallet'
import WalletInfo from './components/asset/walletInfo'

export default createStackNavigator(
    {
        Guide: {
            screen: Guide,
            navigationOptions: {
                header: null
            }
        },
        Assets: {
            screen: Assets,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
        TabBarPage: {
            screen: TabBarPage,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
        CurrencyDetail: CurrencyDetail,
        Transfer: Transfer,
        Receipt: Receipt,
        CreateWallet: CreateWallet,
        ImportWallet: ImportWallet,
        WalletInfo: WalletInfo,
    },
    {
        initialRouteName: 'Guide',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000'
        }
    }
)


