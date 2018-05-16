(function() {

	var Validate = {
		node_type: null,
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
				that.node_type = self.node_type;
				that.type = self.type;

				if(that.node_type == 1 && that.type == 1) {
					$('.lockingNum').val(2000);
				} else if(that.node_type == 2 && that.type == 1) {
					$('.lockingNum').val(3000);
				} else if(that.type == 2) {
					$('.lockingNum').val(2000);
				};

				/*下一步*/
				$('#next').on('tap', function() {
					that.amount = $('.lockingNum').val();
					mask.show();
					//$('#modal').addClass('mui-active');

					if(that.node_type == 1 && that.type == 1) {
						if(that.amount < 2000) {
							mui.alert('个人报名标准节点最小锁仓数量为2000true');
							mask._remove();
							return;
						} else {
							$('#modal').addClass('mui-active');
						}
					} else if(that.node_type == 2 && that.type == 1) {
						if(that.amount < 3000) {
							mui.alert('个人报名标准节点最小锁仓数量为3000true');
							mask._remove();
							return;
						} else {
							$('#modal').addClass('mui-active');
						}
					}
				});

				/*确认*/
				$('.comfirm').on('tap', function() {
					$('#modal').removeClass('mui-active');
					h('.signUpsucc').removeClass('not-view');

					/*进行转账交易  成功之后 显示状态信息*/
					/*
					 进行转账
					 * 
					 * 
					 * 
					 * */
					$('.title').html('完成!');
					$('.succ').html('发送锁仓交易成功!');

					/****************************************/

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