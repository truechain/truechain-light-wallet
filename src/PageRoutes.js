import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'
import Transfer from './components/asset/transfer'
import Receipt from './components/asset/receipt'
import Guide from './guide/guide'
import CreateWallet from './components/my/wallet/createWallet'
import ImportWallet from './components/my/wallet/importWallet'
import AboutUs from './components/my/aboutus'
import UserPolicy from './components/my/userpolicy'
import PrivacyPolicy from './components/my/privacypolicy'
import Versions from './components/my/versions'

export default createStackNavigator(
    {
        Guide: {
            screen: Guide,
            navigationOptions: {
                header: null
            }
        },
        Assets: Assets,
        TabBarPage: {
            screen: TabBarPage,
            navigationOptions: {
                header: null
            }
        },
        CurrencyDetail: CurrencyDetail,
        Transfer: Transfer,
        Receipt: Receipt,
        CreateWallet: CreateWallet,
        ImportWallet: ImportWallet,
        AboutUs,
        UserPolicy,
        PrivacyPolicy,
        Versions
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


