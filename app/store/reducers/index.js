import { combineReducers } from 'redux'
import walletInfo from './walletInfo';
import contractAddr from './contractAddr';
const reducers = combineReducers({
    walletInfo, contractAddr
})

export default reducers