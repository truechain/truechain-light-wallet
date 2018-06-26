import { createStackNavigator } from 'react-navigation';
import TabBarPage from './HomeTabRoutes'
import Assets from './components/asset/asset'
import CurrencyDetail from './components/asset/currencyDetail'

export default createStackNavigator(
    {
        Assets: {
            screen: Assets,            
        },
        TabBarPage: {
            screen: TabBarPage,
            navigationOptions: {
                header: null
            }
        },
        CurrencyDetail: {
            screen: CurrencyDetail                      
        }
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


