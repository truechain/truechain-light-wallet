mui.plusReady(function() {
	! function() {
		h('.my-wallet').html(plus.storage.getItem('walletName'))
		h('.walletAddress').html(plus.storage.getItem('walletAddress'))
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

	//h('.backup-mask').removeClass('mui-hidden')

	//let po = plus.storage.getItem('alreadyAdded');
	//if(po) {
	//addToken(po, function() {
	//	let string = `
	//	<div class="asset-content-list">
	//				<a href="javascript:openInfo('view/asset/currencydetail.html',{'currencyName':'${symbol}','currencyPrice':'${balances}'})">
	//					<div class="list-left"></div>
	//					<div class="list-middle">
	//						<div class="title top">${symbol}</div>
	//						<div class="price bottom"><span>0.00</span>CNY</div>
	//					</div>
	//					<div class="list-right">
	//						<div class="top">${balances}</div>
	//						<div class="price bottom"><span>0.00</span>CNY</div>
	//					</div>
	//				</a>
	//			</div>`;
	//	$('#assetContent').append(string);
	//})
	//};

	//立即备份提示
	//if(!!plus.storage.getItem('backupFlag')) {
	//	h('.backup-mask').addClass('mui-hidden')
	//}

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