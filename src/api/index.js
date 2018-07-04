import axios from 'axios'
axios.defaults.baseURL = 'http://39.105.125.189:7001';
let NodeRankUrl = '/nodeRank';
//请求节点排行
let getNodeRank = (option) => {
    return axios.get(NodeRankUrl, {
        headers: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo'
        },
        params: {
            node_type: option.nodeType,
            pageIndex: option.pageIndex,
            pageNumber: 10,
            isScore: true
        }
    })
}

export {
    getNodeRank
}





// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHhmYTJmMGI2ZGJlMzVjMzFmYzIzODZkNGViODlkNGJjNjk1ZmQ1ODIyIiwibW9iaWxlIjoiMTUxMDE2NjEzODAifQ.fkmPeVC617sKGKlhqxkCouxJmQNeffemRFlyj8hOHjo