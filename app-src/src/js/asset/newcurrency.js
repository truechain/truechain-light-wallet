"use strict";

//搜索功能
document.getElementById("search").addEventListener("keypress", function(event) {
	if(event.keyCode == "13") {
		event.preventDefault(); // 阻止默认事件---阻止页面刷新
		document.activeElement.blur(); //收起虚拟键盘
		let conAddr = event.target.value;

		addToken(conAddr, function() {
			let string = `
						<li class="mui-table-view-cell">
						<div class="currencyInfo">
									<div>
										<img class="currencyImg" src="../../src/images/Artboard2.jpg" />
									</div>
								<div class="spacing">
									<span>${symbol}</span>
									<p>TRUE TOKEN</p>
								</div>
						</div>
						<div id='mySwitch' class="mui-switch mui-switch-blue mui-switch-mini mui-switch-active">
						<div class="mui-switch-handle"></div>
					</div>
					</li>
	`;
			$('#currency').append(string);
			mui('.mui-switch').each(function() {
				mui(this).switch();
			});
			document.getElementById("mySwitch").addEventListener("toggle", function(event) {
				if(event.detail.isActive) {
					plus.storage.setItem('alreadyAdded', conAddr)
					console.log("你启动了开关");
				} else {
					plus.storage.removeItem('alreadyAdded')
					console.log("你关闭了开关");
				}
			})
		})

		//toSearch(); //TODO 完成搜索事件
		return
	}
});