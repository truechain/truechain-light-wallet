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
		confirmPwd: '确认您的密码',
		creatWallet: '创建钱包',
		createWalletTip: '请输入钱包名称',
		pwdSuggest: '建议密码不少于8位字符',
		pwdIsWrong: '两次密码不一致',
		agreeTerm: '请同意服务及隐私条款',
		createWalletTipOfPwd: '密码用于加密私钥，强度非常重要！',
		createWalletTipOfNoStore: 'True钱包不会储存密码，也无法帮您找回，请务必牢记！',
		iAgreeTerm: '我已仔细阅读并同意',
		term: '服务及隐私条款',
		mnemonicTip: '助记词首尾不能有空格,请重新输入',
		mnemonicIsWrong: '助记词有误，请重新输入',
		mnemonicIsNull: '助记词不能为空',
		privateKeyIsNull: '私钥不能为空',
		privateKeyIsWrong: '私钥有误，请重新输入',
		keystoreIsNull: '请输入keystore信息',
		wrongByKeystoreOrPwd: '导入钱包失败, 请检查keystore或者密码是否正确',
		copyKeystoreTip: '直接复制粘贴以太坊官方钱包keystore文件内容至输入框。'
	},
	tips: '提示',
	tab: {
		assets: '资产',
		node: '节点',
		my: '我的'
	},
	my: {
		home: {
			walletManagement: '钱包管理',
			transactionRecord: '交易记录',
			lockAccount: {
				_title: '锁仓账户',
				_address: '锁仓地址',
				minerFee: '矿工费用',
				_title1: '账户管理',
				loginIn: '登录',
				country_region: '国家/地区',
				prompt: '未注册过的手机号将自动创建账号',
				accountNumber: '账号',
				logOut: '退出账号'
			},
			systemSetting: '系统设置',
			helpCenter: {
				_title: '帮助中心',
				mnemonic: '什么是助记词',
				keystore: '什么是keystore',
				privateKey: '什么是私钥'
			},
			aboutUs: {
				_title: '关于我们',
				currentVersion: '当前版本',
				introduction: 'True是一款移动端轻钱包APP,它旨在为普通用户提供一款安全放心，简单好用，功能强大的数字资产钱包应用。',
				useAgreement: '用户协议',
				privacyPolicy: '隐私条款',
				versionLog: '版本日志',
				checkVersion: '检测新版'
			}
		},
		sysSetting: {
			_title: '系统设置',
			language: {
				_title: '语言设置',
				multi_language: '多语言',
				changeToChinese: '简体中文',
				changeToEnglish: 'English'
			}
		}
	},
	assets: {
		totalAssets: '账户总资产',
		walletInfo: {
			title: '账户信息',
			walletName: '钱包名称',
			enterWalletName: '输入您的钱包名称',
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
		currency: {
			transfer: '转账',
			recentTradeRecord: '近期交易记录',
			receipt: '收款',
			receiptAddr: '收款人钱包地址',
			transferCount: '转账金额',
			transferRemarks: '备注',
			transferFee: '矿工费用',
			transferSpeedSlow: '慢',
			transferSpeedFast: '快',
			nextStep: '下一步',
			copyReceiptAddr: '复制收款地址'
		}
	},
	node: {
		signUp: '报名参选',
		vote: '投票',
		voteInfo: {
			_baseInfo: '基本信息',
			_available: '可用票数：',
			enterNumber_votes: '输入投票数量',
			confirmVote:'确认投票',
			voteFail:'投票失败，请稍后重试！',
			voteSuccess:'投票打包交易完成',
			voteApplyed:'投票交易发布',
			voteApplyedSuccess:'投票交易打包成功'
		},
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
		fillInfo: {
			_title: '填写信息',
			nickName: '昵称',
			teamNickname: '组队昵称',
			declaration: '竞选宣言',
			contactInformation: '联系方式',
			reason: '申请理由',
			_success: '申请提交成功',
			_success_info: '申请已提交成功，请等待队长处理！'
		},
		InsufficientQualification: {
			qu_1: '个人报名标准节点需要不少于2千TRUE',
			qu_2: '个人报名全节点需要不少于5万TRUE',
			qu_3: '创建组队需要不少于1TRUE'
		},
		application: {
			_success: '申请已通过，请进行下一步操作',
			_fail: '申请失败，队长拒绝了您的申请'
		},
		myTeam: '我的战队',
		personnelManagement: '人员管理',
		futureMember: '待加入人员管理'
	},
	public: {
		second: '秒',
		next: '下一步',
		back: '返回',
		enterPassword: '输入密码',
		transferOutPrompt: '优先节点投票期间暂不提供转出功能!',
		lockedWarehouse: '锁仓',
		lockedWarehouseAddr:'锁仓地址',
		transferIn: '转入',
		transferOut: '转出',
		verifyPwd: '验证密码',
		inputPwd: '输入您的密码',
		PwdIsNull:'请输入密码',
		define: '确定',
		cancel: '取消',
		copySuccess: '复制成功',
		copyFailed: '复制失败',
		wrongPwd: '密码错误,请重新输入',
		transactionFailed: '发布交易失败，请稍后重试！',
		score: '分',
		tickets: '票',
		signSuccess: '报名成功',
		signSuccess_info: '恭喜您报名成功',
		joinTeam: '加入组队',
		enterMobile: '请输入手机号',
		enterCaptcha: '输入图片验证码',
		enterMobileCode: '输入手机验证码',
		getMobileCode: '获取验证码',
		captchaError: '图形验证码错误,请重新验证!',
		hasBind: '该手机号已绑定地址',
		verificationCodeError: '手机验证码错误',
		enter_the_legal_mobile_number: '请输入合法手机号',
		walletName: '钱包名称',
		electoralManifesto: '竞选宣言',
		nickName: '昵称',
		personaNickName: '个人昵称',
		personalSign: '个人信息',
		scan: '扫描',
		refuse: '拒绝',
		agree: '同意',
		mnemonic:
			'助记词是明文私钥的另一种表现形式, 最早是由 BIP39 提案提出, 其目的是为了帮助用户记忆复杂的私钥 (64位的哈希值)。助记词一般由12、15、18、21个单词构成, 这些单词都取自一个固定词库, 其生成顺序也是按照一定算法而来, 所以用户没必要担心随便输入 12 个单词就会生成一个地址。虽然助记词和 Keystore 都可以作为私钥的另一种表现形式, 但与 Keystore 不同的是, 助记词是未经加密的私钥, 没有任何安全性可言, 任何人得到了你的助记词, 可以不费吹灰之力的夺走你的资产。所以在用户在备份助记词之后, 一定要注意三点:1. 尽可能采用物理介质备份, 例如用笔抄在纸上等, 尽可能不要采用截屏或者拍照之后放在联网的设备里, 以防被黑客窃取 2. 多次验证备份的助记词是否正确, 一旦抄错一两个单词, 那么将对后续找回正确的助记词带来巨大的困难; 3. 将备份后的助记词妥善保管, 做好防盗防丢措施。',
		mnemonic_ps: 'PS: 用户可以使用备份的助记词, 重新导入 初链钱包 , 用新的密码生成一个新的 Keystore, 用这种方法来修改钱包密码。',
		keystore:
			'Keystore 文件是以太坊钱包存储私钥的一种文件格式(JSON) 。它使用用户自定义密码加密，以起到一定程度上的保护作用, 而保护的程度取决于用户加密该钱包的密码强度, 如果类似于 123456 这样的密码, 是极为不安全的。 在使用 Keystore 时有两点需要注意: 1. 使用不常用, 并且尽可能复杂的密码加密 Keystore文件; 2. 一定要记住加密 Keystore 的密码, 一旦忘记密码, 那么你就失去了 Keystore 的使用权, 并且初链钱包 无法帮你找回密码, 所以一定要妥善保管好 Keystore 以及密码。 下面是 keystore 的样式: { "version": 3, "id": "b7467fcb-3c8b-41be-bccf-73d43a08c1b7", "address": "540f18196da5a533fa36577a81de55f0a2f4e751", "Crypto": { "ciphertext": "78ed11b8b6bf29b00f52b42b8542df0e4a6ac078e626af7edcf885c3b68154a4", "cipherparams": { "iv": "4516579601d96695fe30ace985a9066f" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "6276cfda7d40872352c801db5871e5a3368a8d0994cea39ed936760db78d1cdc", "n": 1024, "r": 8, "p": 1 }, "mac": "d889a5dc609c3f312a41394cc47640676d2612501a6f8c837ed55598158336db" } }。',
		keystore_ps: ' PS: Keystore 的密码是唯一、不可更改的, 如果想更改钱包密码需要使用助记词或明文私钥重新导入钱包, 并使用新密码加密, 生成新的 Keystore。',
		privateKey:
			'我们常说，你对钱包中资金的控制取决于相应私钥的所有权和控制权。在区块链交易中, 私钥用于生成支付货币所必须的签名，以证明资金的所有权。私钥必须始终保持机密，因为一旦泄露给第三方，相当于该私钥保护下的资产也拱手相让了。它不同于 Keystore，Keystore 是加密过后的私钥文件，只要密码强度足够强，即使黑客得到 Keystore，破解难度也足够大。 私钥实际上并不是存储在网络中，而是由用户生成并存储在一个文件或者简单的数据库中，称为钱包。存储在用户钱包中的私钥完全独立，可由用户的钱包软件生成并管理，无需区块链或者网络连接。用户的钱包地址就是由私钥通过椭圆曲线加密生成公钥，进而生成以 0x 开头的 42 位地址。私钥的样式为 64 位 16 进制的哈希值字符串，例如: 56f759ece75f0ab1b783893cbe390288978d4d 4ff24dd233245b4285fcc31cf6。',
		privateKey_ps: 'PS: 用户可以使用明文私钥导入 初链，用新的密码生成一个新的 Keystore (记得要将旧的 Keystore 删除)，用这种方法来修改钱包密码。'
	}
};
