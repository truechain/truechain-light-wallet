! function() {
	h('.my-wallet').html(plus.storage.getItem('walletName'))
	h('.walletAddress').html(plus.storage.getItem('walletAddress'))
}()

h('.bg-top').tap(function() {
	openInfo('view/asset/userinfo.html');
});

h('.new-add-btn').tap(function() {
	openInfo('view/asset/newcurrency.html');
})

//获取资产
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));

var addresses = plus.storage.getItem('walletAddress'),
	balance = web3.fromWei(web3.eth.getBalance(addresses), 'ether');
h('.balance').html(balance)
//h('.backup-mask').removeClass('mui-hidden')

//立即备份提示
if(!!plus.storage.getItem('backupFlag')) {
	h('.backup-mask').addClass('mui-hidden')
}

//关闭弹窗
h('.close').tap(function() {
	h('.backup-mask').addClass("mui-hidden");
});

//立即备份
h('.large-btn').tap(function() {
	mui.openWindow('view/asset/exportmw.html', 'exportmw');
	plus.storage.setItem('backupFlag', 'true');
	h('.backup-mask').addClass("mui-hidden");
});