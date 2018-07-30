export default {
	guide: {
		welcome: '欢迎来到True',
		importWallet: '导入钱包',
		createWallet: '创建钱包',
		importInstructions: '在已有钱包中导出助记词，点击“导入钱包”，输入导出的助记词；导入钱包后请立即备份助记词。',
		createInstructions: '没有钱包，请点击“创建钱包”，创建钱包时，请牢记您的密码；创建钱包后轻立即备份助记词。'
	},
	wallet: {
		mnemonic: '助记词',
		mnemonicPlaceholder: '助记词,按空格分隔',
		officialWallet: '官方钱包',
		privateKey: '私钥',
		path: '路径',
		enterPwd: '输入您的密码',
		confirmPwd: '确认您的密码'
	},
	tab: {
		assets: '资产',
		node: '节点',
		my: '我的'
	},
	my: {
		language: {
			changeToChinese: '简体中文',
			changeToEnglish: 'English'
		}
	},
	assets: {
		totalAssets: '账户总资产',
		walletInfo: {
			title: '账户信息',
			walletName: '钱包名称',
			exportPrivateKey: '导出私钥',
			exportKeystore: '导出keystore',
			exportMnemonic: '导出助记词',
			deleteWallet: '删除钱包',
			keystoreFile: 'keystore文件',
			qrcode: '二维码',
			privateKeyWarning: '安全警告:私钥未经加密，导出存在风险，建议使用助记词和keystore进行备份',
			copyPrivaateKey: '复制私钥',
			copyKeystore: '复制keystore',
			keystore_save: '离线保存',
			keystore_save_item: '请复制粘贴keystore文件到安全、离线的地方进行保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险',
			keystore_network: '请勿使用网络传输',
			keystore_network_item: '请勿通过网络工具传输 keystore 文件，一但被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输。',
			keystore_pwdsave: '密码保险箱保存',
			keystore_pwdsave_item: '如需在线保存，则建议使用安全等级更高的 1Password 等密码保管软件保存 keystore。',
			keystore_scanning: '仅供直接扫描',
			keystore_scanning_item: '二维码禁止保存、截图以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包。',
			keystore_surround: '在安全的环境下使用',
			keystore_surround_item: '请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取讲造成不可挽回的资产损失。'
		},
		currency:{
			transfer:'转账',
			recentTradeRecord:'近期交易记录',
			receipt:'收款',
			receiptAddr:'收款人钱包地址',
			transferCount:'转账金额',
			transferRemarks:'备注',
			transferFee:'矿工费用',
			transferSpeedSlow:'慢',
			transferSpeedFast:'块',
			nextStep:'下一步',
			copyReceiptAddr:'复制收款地址'
		}
	},
	node: {
		signUp: '报名参选',
		vote: '投票',
		fullNode: {
			fullNode_title: '全节点'
		},
		fullNodeRank: '全节点排行',
		standNode: {
			standNode_title: '标准节点'
		},
		standNodeRank: '标准节点排行',
		signUp_item: {
			fullNode: '全节点 (POW+PBFT节点)',
			fullNode_info:
				'全节点即POW+PBFT节点，也被称为MasterNode：全节点在未进入PBFT Committee委员会的情况下，会自动执行POW节点任务，全节点需要具备相应的算力要求。个人竞选需要不少于5万TRUE，并执行锁仓；组队竞选需要不少于10万TRUE，并执行锁仓。',
			standNode: '标准节点 (POW节点)',
			standNode_info: '标准节点即POW节点,主网测试期结束后将无节点数量限制,仅执行POW节点任务。个人竞选需要2千TRUE,并执行锁仓;组队竞选需要3千TRUE,并执行锁仓。'
		},
		personSignUp: {
			personSignUp_Info: '个人信息',
			personSignUp_title: '个人报名'
		},
		teamInfo: {
			teamInfo_Info: '组队信息',
			teamList: '组队列表',
			createTeam: '建立组队'
		},
		InsufficientQualification: {
			qu_1: '个人报名标准节点需要不少于2千TRUE',
			qu_2: '个人报名全节点需要不少于5万TRUE',
			qu_3: '创建组队需要不少于1TRUE'
		}
	},
	public: {
		verifyPwd: '验证密码',
		inputPwd: '输入您的密码',
		define: '确定',
		cancel: '取消',
		copySuccess: '复制成功',
		copyFailed: '复制失败',
		wrongPwd: '密码错误,请重新输入',
		score: '分',
		tickets: '票',
		signSuccess: '报名成功',
		joinTeam: '加入组队'
	}
};
