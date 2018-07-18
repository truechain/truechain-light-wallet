// export default {
// 	guide: {
// 		welcome: 'Welcome True',
// 		importWallet: 'Import Wallet',
// 		createWallet: 'Create Wallet',
// 		importInstructions:
// 			'Export the mnemonics of your old  wallet, click "Import Wallet", and enter the exported mnemonics; back up the mnemonics immediately after importing the wallet.',
// 		createInstructions:
// 			'If you do not have a wallet, click "Create Wallet". Keep your password in mind when you create your wallet. Back up your mnemonic immediately after creating your wallet.'
// 	},
// 	wallet: {
// 		mnemonic: 'Mnemonic',
// 		mnemonicPlaceholder: 'Mnemonic words, separated by spaces',
// 		officialWallet: 'Official wallet',
// 		privateKey: 'Private key'
// 	},
// 	tab: {
// 		assets: 'Assets',
// 		node: 'Node',
// 		my: 'My'
// 	},
// 	my: {
// 		language: {
// 			changeToChinese: 'changeToChinese',
// 			changeToEnglish: 'changeToEnglish'
// 		}
// 	}
// };

export default {
	guide: {
		welcome: 'Welcome True',
		importWallet: 'Import Wallet',
		createWallet: 'Create Wallet',
		importInstructions:
			'Export the mnemonics of your old  wallet, click "Import Wallet", and enter the exported mnemonics; back up the mnemonics immediately after importing the wallet.',
		createInstructions:
			'If you do not have a wallet, click "Create Wallet". Keep your password in mind when you create your wallet. Back up your mnemonic immediately after creating your wallet.'
	},
	wallet: {
		mnemonic: 'Mnemonic',
		mnemonicPlaceholder: 'Mnemonic words, separated by spaces',
		officialWallet: 'Official wallet',
		privateKey: 'Private key',
		path: 'path',
		enterPwd: 'Enter your password',
		confirmPwd: 'confirm your password'
	},
	tab: {
		assets: 'Assets',
		node: 'Node',
		my: 'My'
	},
	my: {
		language: {
			changeToChinese: 'changeToChinese',
			changeToEnglish: 'changeToEnglish'
		}
	},
	assets: {
		totalAssets: 'totalAssets',
		walletInfo: {
			title: 'Account Infomation',
			walletName: 'Wallet Name',
			exportPrivateKey: 'Export PrivateKey',
			exportKeystore: 'Export Keystore',
			exportMnemonic: 'Export Mnemonic',
			deleteWallet: 'Delete Wallet',
			keystoreFile: 'keystore文件',
			qrcode: 'QR code',
			privateKeyWarning: '安全警告:私钥未经加密，导出存在风险，建议使用助记词和keystore进行备份',
			copyPrivaateKey: 'Copy PrivaateKey',
			copyKeystore: 'Copy keystore',
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
		}
	},
	node: {
		signUp: '报名参选',
		vote: 'Vote',
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
		verifyPwd: 'verify your password',
		inputPwd: 'Enter your password',
		define: 'OK',
		cancel: 'cancel',
		copySuccess: '复制成功',
		copyFailed: '复制失败',
		wrongPwd: '密码错误,请重新输入',
		score: 'score',
		tickets: 'tickets',
		signSuccess: '报名成功',
		joinTeam: 'joinTeam'
	}
};
