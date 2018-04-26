'use strict';

(function() {
	//	let fromAddress = plus.storage.getItem('walletAddress');
	//	h('.fromAddress').html(fromAddress);

	var web3 = new Web3();

	var Validata = {
		init: function init() {
			this.submitForm();
		},
		submitForm: function submitForm() {
			var that = this;
			$('#next').on('tap', function() {
				let toAd = h('.toAddressItem').val(),
					num = h('.amountItem').val();
				if(!toAd) {
					mui.alert('收款地址不能为空!')
				} else if(!num) {
					mui.alert('转账金额不能为空')
				} else {
					h('.toAddress').html(h('.toAddressItem').val());
					h('.amount').html(h('.amountItem').val() + ' ETH');
					//$('#currencyPwd').removeClass('mui-active');
					that.isShowMask(true);
					$('#modal').addClass('mui-active');
					$('#currencyPwd').addClass('mui-hidden');

					$('#confirm').on('tap', function() {
						$('#currencyPwd').removeClass('mui-hidden');
						$('#modal').removeClass('mui-active');
						$('#currencyPwd').addClass('mui-active');
						/*进行转账验证密码及后续处理*/
					});

					$('#comfirmPsw').on('tap', function() {
						function setWeb3Provider(keystore) {
							var web3Provider = new HookedWeb3Provider({
								//host: "http://localhost:8545", // 私链 
								//host: "https://rinkeby.infura.io/",		// 以太坊测试  
								host: "https://ropsten.infura.io/", // 以太坊测试 (ropsten)
								transaction_signer: keystore
							});
							web3.setProvider(web3Provider);
						}

						function sendEth() {
							var serialized_keystore = plus.storage.getItem('keystore');
							var keystore = lightwallet.keystore.deserialize(serialized_keystore); //将序列号的keystore转换为对象 
							setWeb3Provider(keystore);
							var fromAddr = fromAddress;
							var toAddr = h('.toAddressItem').val();
							var valueEth = h('.amountItem').val();
							var value = parseFloat(valueEth) * 1.0e18;
							var gasPrice = 18000000000;
							var gas = 50000;
							web3.eth.sendTransaction({
									from: fromAddr,
									to: toAddr,
									value: value,
									gasPrice: gasPrice,
									gas: gas
								},
								function(err, txhash) {
									console.log('error: ' + err)
									console.log('txhash: ' + txhash)
								})
						};

						sendEth();
					})
				}
			});

			//关闭按钮
			$('.close').on('tap', function(e) {
				//e.preventDefault();
				that.isShowMask(false);
				$('#modal').removeClass('mui-active');
				$('#currencyPwd').removeClass('mui-active');
			});
		},
		isShowMask: function isShowMask(turn) {
			console.log(turn, '999999999')
			var mask = mui.createMask(function() {
				return false
			});

			if(turn) {
				console.log('111')
				mask.show();
			} else {
				console.log('222')
				mask._remove();
			}

			/*	var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				var flag = false;
				var mask = mui.createMask(callback);

				function callback() {
					return flag;
				};

				if(!show) {
					flag = true;
					mask.close();
					return;
				} else {
					flag = false;
					mask.show();
				}*/
		}
	};

	Validata.init();
})();

//	//二维码按钮
//	h('.ercode-icon').tap(function(){
//		openInfo('../my/wallet/ercode.html')
//	});
//	
//	function Obtain(id, callback) {
//		let ele = document.getElementById(id),
//			elec = document.getElementsByClassName(id)[0];
//		if(ele) {
//			ele.addEventListener('tap', callback)
//		} else {
//			elec.addEventListener('tap', callback)
//		}
//	}
//
//	Obtain('next', function() {
//		h('#currencyPwd').addClass('mui-active');
//		Obtain('comfirmPsw', function() {
//			h('#currencyPwd').removeClass('mui-active');
//			h('#modal').addClass('mui-active');
//			
//		})
//
//		var mask = mui.createMask(function() {
//			return false
//		});
//		mask.show();
//
//		h('.close').tap(function(){
//			mask._remove();
//		})
//
//	})

//showMask(){
//	var mask = mui.createMask(function() {
//			return false
//	});
//	mask.show();
//}gul