//显示助记词
(function() {
	var Validata = {
		init: function() {
			this.submitForm()
		},
		submitForm: function() {
			mui.plusReady(function() {
				var mask = mui.createMask(function() {
					return false;
				});

				mask.show();
				$('#modal').removeClass('mui-hidden')
				$('#modal').addClass('mui-active');

				$('#showseed').on('tap', function() {
					mask.show();
					$('#modal').removeClass('mui-hidden')
					$('#modal').addClass('mui-active');
				})

				$('.comfirmPsw').on('tap', function() {
					mask._remove();
					$('#showseed').html('请稍后!');
					$('#showseed').addClass('mui-disabled');
					$('#modal').removeClass('mui-active');
					$('#next-btn').html('请稍后!');
					$('#next-btn').addClass('mui-disabled');
					let password = $('.psw').val();
					var serialized_keystore = plus.storage.getItem('keystore2');
					global_keystore = lightwallet.keystore.deserialize(serialized_keystore); //将序列号的keystore转换为对象 
					global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
						if(err) {
							mui.alert('密码验证错误,请重新验证!');
							mui.back();
						} else {
							$('#showseed').addClass('mui-hidden')
							$('#next-btn').removeClass('mui-hidden');
							setTimeout(function() {
								$('#next-btn').html('下一步');
								$('#next-btn').removeClass('mui-disabled');
							}, 10000)

							var orderWord = global_keystore.getSeed(pwDerivedKey);
							console.log(orderWord + 'llllll')
							h('#words').html(orderWord);

							function randomSort() {
								return Math.random() > 0.5 ? -1 : 1;
							}

							let orderWordsAry = orderWord.split(' '),
								string = '';
							orderWordsAry = orderWordsAry.sort(randomSort);

							orderWordsAry.forEach(function(item, index) {
								string += `<span>${item}</span>`;
							})

							document.getElementsByClassName('my-word')[0].innerHTML = string;

							h('#next-btn').tap(function() {
								h('.step-1').addClass('not-view');
								h('.step-2').removeClass('not-view');
							})

							mui('.my-word').on('tap', 'span', function() {
								var oWord = this.innerText;
								var html = '<span>' + oWord + '</span><br/>';
								$('#orderWord').append(oWord + ' ');
								//document.getElementById('orderWord').append(oWord + ' ');
							})

							h('#complete-btn').tap(function() {
								let orderWords = h('#orderWord').html();
								if(orderWords == orderWord + ' ') {
									mui.toast('助记词验证通过,请妥善保存!');
									var all = plus.webview.all();
									console.log(JSON.stringify(all, '这是怎么的'))
									plus.webview.show(plus.webview.getWebviewById('index.html'));
								} else {
									mui.toast('助记词输入错误,请重新输入!');
								}
							})
						}
					});
				})

				$('.close').on('tap', function(e) {
					mask._remove();
					$('#modal').removeClass('mui-active');
				});
			})
		}
	};
	Validata.init();
})()