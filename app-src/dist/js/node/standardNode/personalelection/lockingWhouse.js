(function() {

	var Validate = {
		minAmount: 2000,
		fromAddress: null,
		toAddress: null,
		amountFlag: false,
		pwd: null,
		init: function init() {
			this.submitForm();
		},
		submitForm: function submitForm() {
			var that = this,
				flag = false,
				mask = mui.createMask(function() {
					return flag;
				});
			/*下一步*/
			$('#next').on('tap', function() {
				flag = false;
				mask.show();
				$('#modal').addClass('mui-active')
			});

			/*取消*/
			$('.cancel').on('tap', function() {
				flag = true;
				mask.close();
				$('#modal').removeClass('mui-active');
			});

			/*确认*/
			$('.comfirm').on('tap', function() {
				$('#modal').removeClass('mui-active')
				h('.signUpsucc').removeClass('not-view');
				var self = plus.webview.currentWebview();
				if(self.type == 0) {
					$('.title').html('报名成功!')
					$('.succ').html('恭喜你,个人报名成功!')
				} else if(self.type == 1) {
					$('.title').html('加入组队成功!')
					$('.succ').html('恭喜你,加入组队成功!')
				} else {
					$('.title').html('报名成功!')
					$('.succ').html('恭喜您创建组队成功!')
				}
				/*that.pwd = $('.psw').val();
				alert('锁仓操作' + that.pwd)*/
			});

			/*返回*/
			$('#back-btn').on('tap', function() {
				flag = true;
				mask.close();
				h('.signUpsucc').addClass('not-view');
				plus.webview.show(plus.webview.getWebviewById('index.html'));
			})
		}
	};
	Validate.init();
})();