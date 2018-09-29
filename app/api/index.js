import axios from 'axios';
import { serverUrl } from '../utils/config';
axios.defaults.baseURL = serverUrl;

const getcodeUrl = '/smsCaptcha';
const loginUrl = '/login';
const checkVersionUrl = '/checkVersion';

//获取eth交易记录
const getTransactionRecord = (walletAddress, contractaddress) => {
	if (host.includes('ropsten')) {
		return axios.get(
			'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' +
				walletAddress +
				'&sort=desc&apikey=YourApiKeyToken'
		);
	} else {
		return axios.get(
			'http://api.etherscan.io/api?module=account&action=txlist&address=' +
				walletAddress +
				'&sort=desc&apikey=YourApiKeyToken'
		);
	}
};

//获取ERC20交易记录
const getERC20TransactionRecord = (walletAddress, contractaddress) => {
	if (host.includes('ropsten')) {
		return axios.get(
			'https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=' +
				contractaddress +
				'&address=' +
				walletAddress +
				'&sort=desc&apikey=YourApiKeyToken'
		);
	} else {
		return axios.get(
			'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' +
				contractaddress +
				'&address=' +
				walletAddress +
				'&sort=desc&apikey=YourApiKeyToken'
		);
	}
};

//获取手机验证码
const getCode = (option) => {
	return axios.get(getcodeUrl, {
		params: {
			mobile: option.mobile,
			captcha: option.captcha,
			countryCode: option.countryCode,
			smsType: option.smsType
		}
	});
};

//登录
const login = (option) => {
	return axios.get(loginUrl, {
		params: {
			mobile: option.mobile,
			code: option.code,
			address: option.address
		}
	});
};

//获取版本信息
const checkVersion = () => {
	return axios.get(checkVersionUrl);
};

export { login, getCode, getTransactionRecord, getERC20TransactionRecord, checkVersion };
