//let orderWord = plus.storage.getItem('seed');

//显示助记词
! function showSeed() {

	mui.prompt('', 'Password', '请输入密码', ['取消', '保存'], function(e) {
		let password = e.value;
		var serialized_keystore = plus.storage.getItem('keystore');
		global_keystore = lightwallet.keystore.deserialize(serialized_keystore); //将序列号的keystore转换为对象 

		global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
			if(err) {
				mui.alert('密码验证错误,请重新验证!');
				mui.back();
			} else {
				mui.toast('请稍等!')
				var orderWord = global_keystore.getSeed(pwDerivedKey);
				h('#words').html(orderWord)

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
					document.getElementById('orderWord').append(oWord + ' ');
				})

				h('#complete-btn').tap(function() {
					let orderWords = h('#orderWord').html();
					if(orderWords == orderWord + ' ') {
						mui.toast('助记词验证通过,请妥善保存!');
						plus.webview.show(plus.webview.create('userinfo.html'));
						//失效.....
						//plus.webview.show(plus.webview.getWebviewById('asset'));
					} else {
						mui.toast('助记词输入错误,请重新输入!')
					}
				})
			}
		});

	}, 'div');
}()