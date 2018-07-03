import axios from 'axios'
axios.defaults.baseURL = 'http://45.40.243.125:7001';
let NodeRankUrl = '/nodeRank';
//请求节点排行
let getNodeRank = (nodeType) => {
    return axios.get(NodeRankUrl, {
        headers: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo'
        },
        params: {
            node_type: nodeType
        }
    })
}

let getCaptcha = () => {
    return axios.get('http://45.40.243.125:7001/')
}

export {
    getNodeRank,
    getCaptcha
}





// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo