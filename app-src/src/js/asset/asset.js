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

//h('.backup-mask').removeClass('mui-hidden')

//关闭弹窗
h('.close').tap(function() {
	h('.backup-mask').addClass("mui-hidden");
});

//立即备份
h('.large-btn').tap(function() {
	mui.openWindow('view/asset/exportmw.html', 'exportmw')
	h('.backup-mask').addClass("mui-hidden");
});