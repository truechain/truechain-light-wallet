import axios from 'axios';
import { serverUrl } from '../utils/config';
axios.defaults.baseURL = serverUrl;

const NodeRankUrl = '/nodeRank';
const MemberStatusUrl = '/getMemberStatus';
const teamRankUrl = '/teamRank';
const trueCoinUrl = '/getTrueCoin';
const createTeamUrl = '/createTeam';
const writeUserInfoUrl = '/writeUserInfo';
const teamInfoUrl = '/teamInfo';
const teamMemberUrl = '/getTeamMember';
const joinTeamRequestUrl = '/joinTeamRequest';
const getMemberListUrl = '/getMemberList';
const isJoinTeamUrl = '/isJoinTeam';
const getTeamAddressUrl = '/getTeamAddress';
const initStatusUrl = '/initStatus';
const searchTeamUrl = '/searchTeam';
const isSetReferrerUrl = '/isSetReferrer';
const setReferrerUrl = '/setReferrer';
const getInvitationRecordUrl = 'invitationRecord';

const getToken = () => {
	return storage.load({
		key: 'token'
	});
};

//请求节点排行
const getNodeRank = async (option) => {
	let res = await getToken();
	return axios.get(NodeRankUrl, {
		headers: {
			token: res.token
		},
		params: {
			node_type: option.nodeType,
			pageIndex: option.pageIndex,
			pageNumber: option.pageNumber ? option.pageNumber : 10,
			isScore: true
		}
	});
};

//获取申请状态
const getMemberStatus = async () => {
	let res = await getToken();
	return axios.get(MemberStatusUrl, {
		headers: {
			token: res.token
		}
	});
};

//获取组队排行
const getTeamRank = async (option) => {
	let res = await getToken();
	return axios.get(teamRankUrl, {
		headers: {
			token: res.token
		},
		params: {
			node_type: option.nodeType
		}
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

// const writeUserInfo = async (option) => {
// 	let res = await getToken();
// 	return axios.get(writeUserInfoUrl, {
// 		headers: {
// 			token: res.token
// 		},
// 		params: {
// 			nickname: option.nickName,
// 			reason: option.reason
// 		}
// 	});
// };

//请求加入组队
const writeUserInfo = async (option) => {
	let res = await getToken();
	return axios.get(writeUserInfoUrl, {
		headers: {
			token: res.token
		},
		params: {
			team_address: option.teamAddress,
			nickname: option.nickName,
			reason: option.reason
		}
	});
};

//创建报名信息
const createTeam = async (option) => {
	let res = await getToken();
	return axios.get(createTeamUrl, {
		headers: {
			token: res.token
		},
		params: {
			nickname: option.nickname,
			declaration: option.declaration,
			node_type: option.nodeType,
			type: option.type
		}
	});
};

//获取组队信息
const getTeamInfo = async (option) => {
	let res = await getToken();
	return axios.get(teamInfoUrl, {
		headers: {
			token: res.token
		},
		params: {
			type: option.type,
			address: option.address
		}
	});
};

//获取组队成员

const getTeamMember = async (option) => {
	let res = await getToken();
	return axios.get(teamMemberUrl, {
		headers: {
			token: res.token
		},
		params: {
			team_address: option.teamAddress
		}
	});
};

//请求加入组队
const joinTeamRequest = async (option) => {
	let res = await getToken();
	return axios.get(joinTeamRequestUrl, {
		headers: {
			token: res.token
		},
		params: {
			team_address: option.teamAddress,
			node_type: option.nodeType
		}
	});
};

//获取申请队伍信息
const getMemberList = async (option) => {
	let res = await getToken();
	return axios.get(getMemberListUrl, {
		headers: {
			token: res.token
		},
		params: {
			team_address: option.teamAddress
		}
	});
};

//是否同意加入组队
const isJoinTeam = async (option) => {
	let res = await getToken();
	return axios.get(isJoinTeamUrl, {
		headers: {
			token: res.token
		},
		params: {
			status: option.status,
			user_address: option.userAddress
		}
	});
};

//获取队长地址
const getTeamAddress = async (option) => {
	let res = await getToken();
	return axios.get(getTeamAddressUrl, {
		headers: {
			token: res.token
		}
	});
};

//被拒绝时的初始状态

const initStatus = async (option) => {
	let res = await getToken();
	return axios.get(initStatusUrl, {
		headers: {
			token: res.token
		}
	});
};

//搜索组队
const searchTeam = async (option) => {
	let res = await getToken();
	return axios.get(searchTeamUrl, {
		headers: {
			token: res.token
		},
		params: {
			node_type: option.nodeType,
			search_value: option.searchValue
		}
	});
};

//是否设置推荐人
const isSetReferrer = async (option) => {
	let res = await getToken();
	return axios.get(isSetReferrerUrl, {
		headers: {
			token: res.token
		},
		params: {
			mobile: option.mobile
		}
	});
};

//填写推荐人
const setReferrer = async (option) => {
	let res = await getToken();
	return axios.get(setReferrerUrl, {
		headers: {
			token: res.token
		},
		params: {
			mobile: option.mobile,
			referrer_code: option.referrer_code
		}
	});
};

const getInvitationRecord = async (option) => {
	let res = await getToken();
	return axios.get(getInvitationRecordUrl, {
		headers: {
			token: res.token
		},
		params: {
			mobile: option.mobile
		}
	});
};

export {
	createTeam,
	getTrueCoin,
	getNodeRank,
	getTeamRank,
	getTeamInfo,
	writeUserInfo,
	getTeamMember,
	getMemberStatus,
	joinTeamRequest,
	getMemberList,
	isJoinTeam,
	getTeamAddress,
	initStatus,
	searchTeam,
	isSetReferrer,
	setReferrer,
	getInvitationRecord
};
