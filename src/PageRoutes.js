import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'
import Transfer from './components/asset/transfer'
import Receipt from './components/asset/receipt'

export default createStackNavigator(
    {
        Assets: Assets,
        TabBarPage: {
            screen: TabBarPage,
            navigationOptions: {
                header: null
            }
        },
        CurrencyDetail: CurrencyDetail,
        Transfer: Transfer,
        Receipt: Receipt
    },
    {
        initialRouteName: 'TabBarPage',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000'
        }
    }
)


