function getUserInfo() {
	h('.walletName').html(plus.storage.getItem('walletName'))
	h('.walletAddress').html(plus.storage.getItem('walletAddress'))
}

getUserInfo();

//修改钱包名称
h('.wallet-cell').tap(function() {
	showMask();
	h('.amend-wallet').removeClass('not-view');
});

//遮罩层方法
var flag = false;
var mask = mui.createMask(callback);

function callback() {
	return flag;
}

function showMask() {
	flag = false;
	mask.show(); //显示遮罩 
}

//取消修改钱包名称
h('.cancel').tap(function() {
	flag = true;
	console.log(mask);
	mask.close();
	console.log(mask);
	h('.amend-wallet').addClass('not-view');
})
//保存钱包名称
h('.save').tap(function() {
	flag = true;
	mask.close();
	h('.amend-wallet').addClass('not-view');
	let newWalletName = h('#newWalletName').val();
	if(newWalletName) {
		plus.storage.setItem('walletName', newWalletName);
		getUserInfo();
		mui.alert("修改钱包名称成功");
	} else {
		mui.alert('请输入新的钱包名称');
	}
})

//导出私钥
h('.exportkey-cell').tap(function() {
	mui.prompt('', 'Password', '请输入密码', ['取消', '保存'], function(e) {
		let password = e.value;
		let seed = plus.storage.getItem('seed');
		if(e.index == 1) {
			mui.toast('密码正确')
			/*ks.keyFromPassword(password, function(err, pwDerivedKey) {
				mui.toast('密码正确!')
				//密码验证后的导出私钥处理
		}) */

			//			setTimeout(function() {
			showMask();
			h('.export-key').removeClass('not-view');
			//			}, 1000)
		} else {
			return;
		}
	}, 'div');
})
//取消导出私钥
h('.close-export-key').tap(function() {
	flag = true;
	copyFlag = false;
	console.log('mask');
	console.log(mask);
	mask.close();
	console.log(mask);
	h('.export-key').addClass('not-view');
})
//复制私钥
var copyFlag = false;
h('#copy-btn').tap(function() {
	copyFlag = true;
	myCopy();
	if(copyFlag) {
		h('#copy-btn').css({
			'background': '#CCC',
			'color': '#666'
		});
		h('#copy-btn').html('复制成功');
	}
})
//复制方法
function myCopy() {
	var keyCode = h('.key-code').html();
	var clipboard = new ClipboardJS('#copy-btn', {
		text: function() {
			return keyCode;
		}
	});

	clipboard.on('success', function(e) {
		console.log(e);
	});

	clipboard.on('error', function(e) {
		console.log(e);
	});
}

//导出助记词

h('.setting-cell').tap(function() {
	mui.openWindow('exportmw.html', 'exportmw')
})





/*
 
 * 
 *foss resem   naeeow  comfort  second   bless   shu  edu  pool   ladder    route bund 
 * */