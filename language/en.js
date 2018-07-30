export default {
	guide: {
		welcome: 'Welcome To True',
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
			changeToChinese: '简体中文',
			changeToEnglish: 'English'
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
			privateKeyWarning: 'Safety Warning: Private keys are exposed to risks when exporting without encryption. It is strongly suggested to use mnemonic and keystore for backup.',
			copyPrivaateKey: 'Copy PrivaateKey',
			copyKeystore: 'Copy keystore',
			keystore_save: 'Save offline',
			keystore_save_item: 'Please copy and paste keystore files to a safe place offline for saving. Please do not save the files in the mail box, notebook, cloud storage or other online chatting tools, it’s very risky.',
			keystore_network: 'Do not use Internet for transmission',
			keystore_network_item: 'Do not use online tools to transmit keystore files. Once the files were acquired by hackers, irreversible loss may happen to your assets. It is suggested to transmit files offline using QR code.',
			keystore_pwdsave: 'Password Safe Saving',
			keystore_pwdsave_item: 'If online saving is needed, it is suggested to use password saving software with higher level of security to keep the files',
			keystore_scanning: 'Only for Direct Scanning',
			keystore_scanning_item: 'It is forbidden to save, take screenshots or take pictures of the following QR code. The QR code should be used for direct scanning in a safe environment to import wallet. ',
			keystore_surround: 'Using in a Safe Environment',
			keystore_surround_item: 'Please make sure to use the QR code when there are no people or camera around you. Once the QR code is acquired by other people, irreversible loss may happen to your assets. '
		},
		currency:{
			transfer:'transfer',
			recentTradeRecord:'recentTradeRecord',
			receipt:'receipt',
			receiptAddr:'receiptAddr',
			transferCount:'transferCount',
			transferRemarks:'Remarks',
			transferFee:'transferFee',
			transferSpeedSlow:'Slow',
			transferSpeedFast:'Fast',
			nextStep:'next'
		}
	},
	node: {
		signUp: 'Sign Up',
		vote: 'Vote',
		fullNode: {
			fullNode_title: 'Full node'
		},
		fullNodeRank: 'Full node ranking',
		standNode: {
			standNode_title: 'Standard node'
		},
		standNodeRank: 'Standard node ranking',
		signUp_item: {
			fullNode: '全节点 (POW+PBFT节点)',
			fullNode_info:
				'全节点即POW+PBFT节点，也被称为MasterNode：全节点在未进入PBFT Committee委员会的情况下，会自动执行POW节点任务，全节点需要具备相应的算力要求。个人竞选需要不少于5万TRUE，并执行锁仓；组队竞选需要不少于10万TRUE，并执行锁仓。',
			standNode: '标准节点 (POW节点)',
			standNode_info: '标准节点即POW节点,主网测试期结束后将无节点数量限制,仅执行POW节点任务。个人竞选需要2千TRUE,并执行锁仓;组队竞选需要3千TRUE,并执行锁仓。'
		},
		personSignUp: {
			personSignUp_Info: 'Personal information',
			personSignUp_title: 'Personal registration'
		},
		teamInfo: {
			teamInfo_Info: 'Team information',
			teamList: 'Team list',
			createTeam: 'Establish team'
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
		copySuccess: 'Successful copy',
		copyFailed: 'Replication failed',
		wrongPwd: 'Password error, please retype',
		score: 'Score',
		tickets: 'Votes',
		signSuccess: 'Successful registration',
		joinTeam: 'joinTeam'
	}
};
