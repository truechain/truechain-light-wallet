const Web3 = require('web3')
const axios = require('axios')
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'))
const mysql = require('mysql');
// const UPDATE_CYCLE = 10 * 1000
const UPDATE_CYCLE = 2 * 60 * 1000
const API = 'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab&address=0x08C62C32226CE2D9148A80F71A03dDB73B673792&sort=asc&apikey=YourApiKeyToken'

let lastBlockNumber = 0
let nextBlockNumber = 0

let locked = false

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'truechain-vote'
})

const insetData = 'INSERT INTO etherscan(block_number, time_stamp, `from`, `value`, `true`) VALUES( ?,?,?,?,?)';

function updateBlockInfo () {
  return web3.eth.getBlockNumber()
}

function update () {
  if (locked) {
    return
  }
  locked = true
  return updateBlockInfo().then(res => {
    nextBlockNumber = res
    console.log(`try to get Txs from ${lastBlockNumber} to ${nextBlockNumber}`)
    return axios.get(`${API}&startblock=${lastBlockNumber}&endblock=${nextBlockNumber}`)
  }).then(res => {
    const result = res.data.result
    let tokentxs = result.map(item => {
      return {
        blockNumber: item.blockNumber,
        timeStamp: item.timeStamp,
        from: item.from,
        value: item.value,
        true: web3.utils.fromWei(item.value, 'ether')
      }
    })
    console.log(tokentxs)
    if(tokentxs.length) {
      db.connect();
      for (let i = 0; i < tokentxs.length; i++) {
        const item = tokentxs[i];
        // const sql =`INSERT INTO etherscan(block_number, time_stamp, \`from\`, \`value\`, \`true\`) VALUES( ${item.blockNumber},${item.timeStamp},'${item.from}','${item.value}',${item.true})`;
        db.query(insetData, Object.values(item), (err, data) => {
          if (err) throw err
            console.log('数据插入成功');
        })
      }    
      db.end()
    }
    lastBlockNumber = nextBlockNumber + 1
    locked = false
  })
}

function init () {
  return update()
}

init().then(() => {
  setInterval(update, UPDATE_CYCLE)
})