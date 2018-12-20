import axios from 'axios';
import { serverUrl } from '../utils/config';
axios.defaults.baseURL = serverUrl;

const trueCoinUrl = '/getTrueCoin';

const getToken = () => {
	return storage.load({
		key: 'token'
	});
};

//获取锁仓数量
const getTrueCoin = async () => {
	let res = await getToken();
	return axios.get(trueCoinUrl, {
		headers: {
			token: res.token
		}
	});
};


export { getTrueCoin }
