(function() {

	var Validate = {
		personalName: null,
		personalDeclaration: null,
		type: null,
		amount: null,
		fromAddress: null,
		toAddress: '0x08C62C32226CE2D9148A80F71A03dDB73B673792',
		amountFlag: false,
		pwd: null,
		init: function init() {
			this.submitForm();
		},
		submitForm: function submitForm() {
			var that = this,
				mask = mui.createMask(function() {
					return false;
				});
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				that.type = self.type;
				that.personalName = self.personalName;
				that.personalDeclaration = self.personalDeclaration;

				/*下一步*/
				$('#next').on('tap', function() {
					mask.show();
					$('#modal').addClass('mui-active')
				});

				/*确认*/
				$('.comfirm').on('tap', function() {
					//mask._remove();
					that.amount = $('.lockingNum').val();
					$('#modal').removeClass('mui-active');
					switch(that.type) {
						case 1.1:
							{
								if(that.amount < 2000) {
									mui.alert('个人报名标准节点最小锁仓数量为2000true');
									mask._remove();
									return;
								} else {
									mask.show();
									h('.signUpsucc').removeClass('not-view');
								}
								$('.title').html('报名成功!');
								$('.succ').html('恭喜你,个人报名标准节点成功!');
								break;
							}
						case 1.2:
							{
								/*进行转账操作*/
								mask.show();
								h('.signUpsucc').removeClass('not-view');
								$('.title').html('报名成功!');
								$('.succ').html('恭喜你,创建标准节点组队成功!');
								break;
							}
						case 2.1:
							{
								if(that.amount < 50000) {
									mui.alert('个人报名全节点最小锁仓数量为50000true');
									mask._remove();
									return
								} else {
									mask.show();
									h('.signUpsucc').removeClass('not-view');
								}
								$('.title').html('报名成功!');
								$('.succ').html('恭喜你,个人报名全节点成功!');
								break;
							}
						case 2.2:
							{
								/*进行转账操作*/
								mask.show();
								h('.signUpsucc').removeClass('not-view');
								$('.title').html('报名成功!');
								$('.succ').html('恭喜你,创建全节点组队成功!');
								break;
							}
					};
					/*返回*/
					$('#back-btn').on('tap', function() {
						mask._remove();
						h('.signUpsucc').addClass('not-view');
						plus.webview.show(plus.webview.getWebviewById('index.html'));
					})
				});

				/*取消*/
				$('.cancel').on('tap', function() {
					mask._remove();
					$('#modal').removeClass('mui-active');
				});

			})
		}
	};
	Validate.init();
})();