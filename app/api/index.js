import axios from 'axios';
import { serverUrl, token } from '../utils/config';
axios.defaults.baseURL = serverUrl;

const headers = {
	token
};

const NodeRankUrl = '/nodeRank';
const MemberStatusUrl = '/getMemberStatus';
const teamRankUrl = '/teamRank';
const trueCoinUrl = '/getTrueCoin';
const createTeamUrl = '/createTeam';
const writeUserInfoUrl = '/writeUserInfo';
const teamInfoUrl = '/teamInfo';
const teamMemberUrl = '/getTeamMember';
const joinTeamRequestUrl = '/joinTeamRequest';
const getcodeUrl = '/smsCaptcha';
const loginUrl = '/login';

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

//请求节点排行
const getNodeRank = (option) => {
	return axios.get(NodeRankUrl, {
		headers,
		params: {
			node_type: option.nodeType,
			pageIndex: option.pageIndex,
			pageNumber: 10,
			isScore: true
		}
	});
};

//获取申请状态
const getMemberStatus = () => {
	return axios.get(MemberStatusUrl, { headers });
};

//获取组队排行
const getTeamRank = (option) => {
	return axios.get(teamRankUrl, {
		headers,
		params: {
			node_type: option.nodeType
		}
	});
};

//获取锁仓数量
const getTrueCoin = () => {
	return axios.get(trueCoinUrl, { headers });
};

const writeUserInfo = (option) => {
	return axios.get(writeUserInfoUrl, {
		headers,
		params: {
			nickname: option.nickName
		}
	});
};

//创建报名信息
const createTeam = (option) => {
	return axios.get(createTeamUrl, {
		headers,
		params: {
			nickname: option.nickname,
			declaration: option.declaration,
			node_type: option.nodeType,
			type: option.type
		}
	});
};

//获取组队信息
const getTeamInfo = (option) => {
	return axios.get(teamInfoUrl, {
		headers,
		params: {
			type: option.type,
			address: option.address
		}
	});
};

//获取组队成员

const getTeamMember = (option) => {
	return axios.get(teamMemberUrl, {
		headers,
		params: {
			team_address: option.teamAddress
		}
	});
};

//请求加入组队
const joinTeamRequest = (option) => {
	return axios.get(joinTeamRequestUrl, {
		headers,
		params: {
			address: option.teamAddress,
			node_type: option.nodeType
		}
	});
};

//获取手机验证码
const getCode = (option) => {
	return axios.get(getcodeUrl, {
		params: {
			mobile: option.mobile,
			captcha: option.captcha
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

export {
	login,
	getCode,
	createTeam,
	getTrueCoin,
	getNodeRank,
	getTeamRank,
	getTeamInfo,
	writeUserInfo,
	getTeamMember,
	getMemberStatus,
	joinTeamRequest,
	getTransactionRecord,
	getERC20TransactionRecord
};