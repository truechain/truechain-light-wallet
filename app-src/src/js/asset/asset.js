mui.plusReady(function() {
	! function() {
		h('.my-wallet').html(plus.storage.getItem('walletName'))
		h('.walletAddress').html('0x' + plus.storage.getItem('walletAddress'))
	}();

	h('.my-head').tap(function() {
		openInfo('view/asset/userinfo.html');
	});

	h('.er-code-img').tap(function() {
		openInfo('view/asset/receipt.html');
	});

	h('.new-add-btn').tap(function() {
		openInfo('view/asset/newcurrency.html');
	});



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
})