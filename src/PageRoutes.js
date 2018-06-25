import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'

export default createStackNavigator(
    {
        Assets:Assets,
        TabBarPage:TabBarPage,
        CurrencyDetail:CurrencyDetail
    },
    {
        initialRouteName: 'Assets',
        navigationOptions: {
            header:null,
            headerStyle: {
                backgroundColor: '#f00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
)



