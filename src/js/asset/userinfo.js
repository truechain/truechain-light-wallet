mui.plusReady(function() {

	let host = plus.storage.getItem('web3Host');

	if(!host) {
		host = 'https://mainnet.infura.io/';
	}
	var web3 = new Web3(new Web3.providers.HttpProvider(host));

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
			if(newWalletName.length > 15) {
				mui.alert('名称不能大于15位')
			} else {
				plus.storage.setItem('walletName', newWalletName);
				getUserInfo();
				mui.alert("修改钱包名称成功");
			}
		} else {
			mui.alert('请输入新的钱包名称');
		}
	})

	//导出私钥
	h('.exportkey-cell').tap(function() {
		mui.prompt('', 'Password', '请输入密码', ['取消', '确定'], function(e) {
			if(e.index == 1 && e.value) {
				let password = e.value;
				if(!password) {
					mui.alert('请输入密码!')
				} else {
					mui.toast('请稍等!')
					showMask();
					var serialized_keystore = plus.storage.getItem('keystore2'),
						keystore = lightwallet.keystore.deserialize(serialized_keystore);
					keystore.keyFromPassword(password, function(err, pwDerivedKey) {
						if(err) {
							mui.alert('密码验证错误,请重新输入!');
							mask._remove();
							return;
						} else {
							keystore.generateNewAddress(pwDerivedKey, 1);
							var address = keystore.getAddresses();
							let PrivateKey = keystore.exportPrivateKey(address[0], pwDerivedKey);
							h('.key-code').html('0x' + PrivateKey);
							showMask();
							h('.export-key').removeClass('not-view');
						}
					});
				}
			}
		}, 'div');
		document.querySelector('.mui-popup-input input').type = 'password';
	})
	//取消导出私钥
	h('.close-export-key').tap(function() {
		flag = true;
		copyFlag = false;
		mask.close();
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
		mui.openWindow('exportmw.html', 'exportmw');
	})

	//删除钱包
	h('#delelet-wallet').tap(function() {
		mui.prompt('', 'Password', '请输入密码', ['取消', '确定'], function(e) {
			let password = e.value;
			if(!password) {
				mui.alert('请输入密码!')
			} else {
				mui.toast('请稍等!')
				showMask();
				var serialized_keystore = plus.storage.getItem('keystore2'),
					keystore = lightwallet.keystore.deserialize(serialized_keystore);
				keystore.keyFromPassword(password, function(err, pwDerivedKey) {
					if(err) {
						mui.alert('密码验证错误,请重新输入!');
						mask._remove();
						return;
					} else {
						mask._remove();
						keystore.generateNewAddress(pwDerivedKey, 1);
						plus.storage.clear();
						mui.toast('已删除');
						mui.openWindow('../../guide.html');
					}
				});
			}
		}, 'div');
		document.querySelector('.mui-popup-input input').type = 'password';
	})
})