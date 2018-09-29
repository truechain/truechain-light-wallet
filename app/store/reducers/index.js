import { combineReducers } from 'redux';
import walletInfo from './walletInfo';
import contractAddr from './contractAddr';
import lockAccount from './lockAccount';
const reducers = combineReducers({
	walletInfo,
	contractAddr,
	lockAccount
});

export default reducers;
