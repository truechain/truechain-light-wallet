import axios from 'axios'
axios.defaults.baseURL = 'http://39.105.125.189:7001';
const headers = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo'
}

let NodeRankUrl = '/nodeRank';
let MemberStatusUrl = '/getMemberStatus';
let teamRankUrl = '/teamRank';

//获取eth交易记录
let getTransactionRecord = (walletAddress, contractaddress) => {
    if (host.includes('ropsten')) {
        return axios.get('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + walletAddress + '&sort=desc&apikey=YourApiKeyToken')
    } else {
        return axios.get('http://api.etherscan.io/api?module=account&action=txlist&address=' + walletAddress + '&sort=desc&apikey=YourApiKeyToken')
    }
}

//获取ERC20交易记录
let getERC20TransactionRecord = (walletAddress, contractaddress) => {
    if (host.includes('ropsten')) {
        return axios.get('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=' + contractaddress + '&address=' + walletAddress + '&sort=desc&apikey=YourApiKeyToken')
    } else {
        return axios.get('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=' + contractaddress + '&address=' + walletAddress + '&sort=desc&apikey=YourApiKeyToken')
    }
}

//请求节点排行
let getNodeRank = (option) => {
    return axios.get(NodeRankUrl, {
        headers,
        params: {
            node_type: option.nodeType,
            pageIndex: option.pageIndex,
            pageNumber: 10,
            isScore: true
        }
    })
}

//获取申请状态
let getMemberStatus = () => {
    return axios.get(MemberStatusUrl, { headers })
}

//获取组队排行
let getTeamRank = (option) => {
    return axios.get(teamRankUrl, {
        headers,
        params: {
            node_type: option.nodeType
        }
    })
}

export {
    getNodeRank,
    getMemberStatus,
    getTeamRank,
    getTransactionRecord,
    getERC20TransactionRecord
}

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo