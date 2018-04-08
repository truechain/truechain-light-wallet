const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

//引用web3模块
var Web3 = require('web3')
//创建web3实例
var web3 = new Web3()
//创建http连接到区块链
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => { 
  let account = web3.eth.accounts[0]
//获取帐号的余额，使用的固定web3的api，参考相关文档
  let balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),'ether')  
  await ctx.render('index', {
    account,balance 
  })
})

app.listen(3000)