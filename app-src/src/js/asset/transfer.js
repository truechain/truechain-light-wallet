(function() {

	var Validata = {

		init() {
			this.submitForm();
		},
		submitForm() {
			var that = this;
			$('#next').on('tap', function() {
				that.isShowMask();
				console.log('111')
				$('#currencyPwd').addClass('mui-active');
			});
			$('.comfirmPsw').on('tap', function() {
				console.log('111')
				$('#currencyPwd').removeClass('mui-active');
				$('#modal').addClass('mui-active');
			});
			//关闭按钮
			$('.close').on('tap', function(e) {
				//				e.preventDefault();
				console.log('ooo');
				that.isShowMask(false);
				$('#currencyPwd').removeClass('mui-active');

			});
		},
		isShowMask(show = true) {
			console.log("test11")
			var flag = false;
			var mask = mui.createMask(callback);

			function callback() {
				return flag;
			};
			if(!show) {
				console.log("test22");
				flag = true;
				console.log(flag);
				console.log(mask);
				mask.close();
				console.log(mask);
				return;
			} else {
				flag = false;
				console.log(mask);
				mask.show();
				console.log(mask);
			}
		}
	}

	Validata.init();
})();
