//页面跳转
(function(){
	var Wallet = {
		init(){
			//页面跳转
			this.turnUrl(".e-setup","setup.html","setup");
			this.turnUrl(".e-import","importwallet.html","importwallet");
		},
		turnUrl(elements,url,id){
			$(elements).on('tap',function(){
				openInfo(url,id);
			});
		}
	}
	Wallet.init();
})();
