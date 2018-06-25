import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'

export default createStackNavigator(
    {
        Assets:{
            screen: Assets
        },
        TabBarPage:TabBarPage,
        CurrencyDetail:{
            screen: CurrencyDetail,
            title:'呼呼哈哈'
        }
    },
    {
        initialRouteName: 'TabBarPage',
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