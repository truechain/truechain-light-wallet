let orderWord = plus.storage.getItem('seed');
h('#words').html(orderWord)

h('#next-btn').tap(function() {
	h('.step-1').addClass('not-view');
	h('.step-2').removeClass('not-view');
})

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

mui('.my-word').on('tap', 'span', function() {
	var orderWord = this.innerText;
	var html = '<span>' + orderWord + '</span><br/>';
	document.getElementById('orderWord').append(orderWord + ' ');
})

h('#complete-btn').tap(function() {
	let orderWords = h('#orderWord').html();
	if(orderWords == orderWord + ' ') {
		mui.toast('助记词验证通过,请妥善保存!')
		plus.webview.show(plus.webview.getWebviewById('index.html'));
	} else {
		mui.toast('助记词输入错误,请重新输入!')
	}
})