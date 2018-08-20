日本語

export default {
	guide: {
		welcome: 'Trueへようこそ',
		importWallet: 'ウォレットインポート',
		createWallet: '新規ウォレット',
		importInstructions: '既存のウォレットからニーモニックをアウトポートして、「ウォレットインポート」をクリックして、アウトポートされたニーモニックを入力する。ウォレットのインポート後、速やかにニーモニックをバックアップしてください。',
		createInstructions: 'ウォレットがない場合、「新規ウォレット」をクリックしてください。ウォレットを新規作成するとき、パスワードを覚えてください。ウォレットの新規作成後、速やかにニーモニックをバックアップしてください。'
	},
	wallet: {
		mnemonic: 'ニーモニック',
		mnemonicPlaceholder: 'ニーモニック,スペースで分ける',
		officialWallet: '公式ウォレット',
		privateKey: 'プライベートキー',
		path: 'パス',
		enterPwd: 'パスワードを入力してください',
		confirmPwd: 'パスワードを確認してください',
		creatWallet: '新規ウォレット',
		createWalletTip: 'ウォレットの名称を入力してください',
		pwdSuggest: 'パスワードを8桁キャラクター以上に設定することをお勧めします',
		pwdIsWrong: '2回のパスワードが一致していません',
		agreeTerm: 'サービス及びプライバシー利用規約に同意します',
		createWalletTipOfPwd: 'パスワードはプライベートキーの暗号化のためであり、強さが非常に重要です！',
		createWalletTipOfNoStore: 'Trueウォレットはパスワードを保存せず、かつ取り戻せることもできないことにご注意ください！',
		iAgreeTerm: '内容を細かく読んだうえ、同意します',
		term: 'サービス及びプライバシー利用規約',
		mnemonicTip: 'ニーモニックの最初と最後にスペースがあってはいけないので、再入力してください',
		mnemonicIsWrong: 'ニーモニックが間違っているので、再入力してください',
		mnemonicIsNull: 'ニーモニックは空白ではいけません',
		privateKeyIsNull: 'プライベートキーは空白ではいけません',
		privateKeyIsWrong: 'プライベートキーが間違っているので、再入力してください',
		keystoreIsNull: 'keystore情報を入力してください',
		wrongByKeystoreOrPwd: 'インポートウォレットが失敗しました。keystoreまたはパスワードが正しいかどうかをご確認ください',
		copyKeystoreTip: 'エテリアム公式ウォレットkeystoreファイル内容を入力ボックスにコピー、ペーストします。'
	},
	tab: {
		assets: '資産',
		node: 'ノード',
		my: '私の'
	},
	my: {
		home: {
			walletManagement: 'ウォレット管理',
			transactionRecord: '取引記録',
			lockAccount: {
				_title: 'ロック位置アカウント',
				_address: 'ロック位置アドレス',
				minerFee: '鉱夫費用',
				_title1: 'アカウント管理',
				loginIn: '登録',
				quantity: 'ロック位置数量',
				country_region: '国家/地域',
				prompt: '未登録の携帯番号が自動的にアカウント番号を作成する',
				accountNumber: 'アカウント番号',
				logOut: 'アカウント番号ログアウト'
			},
			systemSetting: 'システム設定',
			Versions: {
				_title: 'バージョンログ'
			},
			helpCenter: {
				_title: 'ヘルプセンター',
				mnemonic: 'ニーモニックとは',
				keystore: 'keystoreとは',
				privateKey: 'プライベートキーとは'
			},
			aboutUs: {
				_title: '私たちについて',
				currentVersion: 'カレントバージョン',
				introduction: 'Trueは、移動端末SVPのAPPであり、一般ユーザーに安全安心、簡単で手軽的に使用でき、機能豊富な数字資産ウォレットアプリケーションを目指している。',
				useAgreement: 'ユーザープロトコル',
				privacyPolicy: 'プライバシーポリシー',
				versionLog: 'バージョンログ',
				checkVersion: '新バージョンチェック'
			}
		},
		sysSetting: {
			_title: 'システム設定',
			language: {
				_title: '言語設定',
				multi_language: '多言語',
				changeToChinese: '中国語簡体',
				changeToEnglish: 'English'
			}
		},
		version: {
			_newVersion: 'True発見',
			_version: 'バージョン',
			upgradeNow: '今すぐアップグレード',
			noEscalation: 'アップグレードしない',
			noUpdate: '現在がすでに最新バージョンであり、更新の必要がありません'
		},
		webHost: 'Web3 設定'
	},
	assets: {
		totalAssets: 'アカウント総資産',
		walletInfo: {
			title: 'アカウント情報',
			walletName: 'ウォレット名称',
			enterWalletName: 'ウォレットの名称を入力してください',
			exportPrivateKey: 'プライベートキーアウトポート',
			exportKeystore: 'keystoreアウトポート',
			exportMnemonic: 'ニーモニックアウトポート',
			deleteWallet: 'ウォレット削除',
			keystoreFile: 'keystoreファイル',
			qrcode: 'QRコード',
			privateKeyWarning: '安全に関する警告:プライベートキーが暗号化されていないため、アウトポートにはリスクがあるので、ニーモニック及びkeystoreを使ってバックアップすることをお勧めします',
			copyPrivaateKey: 'プライベートキー複写',
			copyKeystore: 'keystore複写',
			keystore_save: 'オフライン保存',
			keystore_save_item: 'keystoreファイルを安全、オフラインの場所に複写、貼り付けて保存していください。メールボックス、メモ帳、ネットディスク、チャットツールなどに保存しないでください。非常に危険です',
			keystore_network: 'ネットワーク伝送を使用しないでください',
			keystore_network_item: 'ネットワークツールで keystore ファイルを伝送しないでください。万が一ハッカーに取得されると、挽回できない資産損失になりますので、オフライン方式でQRコードで伝送することをお勧めします。',
			keystore_pwdsave: 'パスワードセーフティボックスで保存します',
			keystore_pwdsave_item: 'オンライン保存が必要な場合、セキュリティレベルがより高い1Passwordなどのパスワード保管ソフトウェアでkeystoreを保存してください。',
			keystore_scanning: '直接スキャンのみ',
			keystore_scanning_item: 'QRコードの保存、スクリーンショット及び写真が禁止されています。ユーザーが安全な環境で直接スキャンしてウォレットを容易くインポートするためです。',
			keystore_surround: '安全な環境で使用します',
			keystore_surround_item: '周りに人がいなくて、カメラもない環境で使用していください。QRコードが一旦他人に取得されると、挽回できない資産損失になります。'
		},
		mnemonic: {
			backUpMnemonic: 'ニーモニックをバックアップしてください',
			mnemonicSuccess: 'ニーモニックが正しいです。ニーモニックをよく保管してください！',
			mnemonicError: 'ニーモニックが間違っているので、再入力してください',
			copyYourMnemonic: 'ニーモニックを転写してください',
			confirmMnemonic: 'ウォレットニーモニックを確認してください',
			mnemonicWring: 'ニーモニックはウォレットの回復またはウォレットパスワードの再設定に使用されるため、紙に正確に転写して、あなたしか知らない安全な場所に保管してください。',
			confirmMnemonicWring: 'バックアップしたニーモニックが正確であることを確認するために、ニーモニックを順番にクリックしてください。'
		},
		currency: {
			transfer: '送金',
			orderInformation: 'オーダー情報',
			recentTradeRecord: '最近の取引記録',
			receipt: '受け取り',
			receiptAddr: '受け取り人ウォレットアドレス',
			transferCount: '送金金額',
			transferRemarks: '備考',
			transferFee: '鉱夫費用',
			transferSpeedSlow: '遅い',
			transferSpeedFast: '速い',
			nextStep: '次へ',
			copyReceiptAddr: '送金先複写'
		},
		transfer: {
			checkAddress: 'アドレスが無効であり、詳しくチェックしてください！',
			transferInAddress: '送金先アドレス',
			transferOutAddress: '送金元アドレス'
		}
	},
	node: {
		signUp: '参加応募',
		vote: '投票',
		voteInfo: {
			_baseInfo: '基本情報',
			_available: '有効票数：',
			enterNumber_votes: '投票数量入力',
			confirmVote: '投票確認',
			voteFail: '投票に失敗しました。暫くしてから再試行してください！',
			voteSuccess: '投票がパッキングされ、取引が完成しました',
			voteApplyed: '投票取引リリース',
			voteApplyedSuccess: '投票取引パッキングに成功しました'
		},
		fullNode: {
			fullNode_title: '全ノード'
		},
		fullNodeRank: '全ノードランキング',
		standNode: {
			standNode_title: 'スタンダードノード'
		},
		standNodeRank: 'スタンダードノードランキング',
		signUp_item: {
			fullNode: '全ノード (POW+PBFTノード)',
			fullNode_info:
				'全ノード、すなわちPOW+PBFTノードは、MasterNode：とも呼ばれる。全ノードがPBFT Committee委員会に入っていない場合、POWノード任務を自動的に実行できる。全ノードは相応な計算力を備える必要がある。個人キャンペーンには5万以上のTRUEが必要であり、かつロック位置を実行する必要がある。チームキャンペーンには10万以上のTRUEが必要であり、かつロック位置を実行する必要がある。',
			standNode: 'スタンダードノード (POWノード)',
			standNode_info: 'スタンダードノードはPOWノードである。メインネットテスト時期が終了した後、ノード数量制限がなくなり、POWノード任務のみを実行する。個人キャンペーンには2千のTRUEが必要であり、かつロック位置を実行する必要があり、チームキャンペーンには3千のTRUEが必要であり、かつロック位置を実行する必要がある。'
		},
		personSignUp: {
			personSignUp_Info: '個人情報',
			personSignUp_title: '個人応募'
		},
		teamInfo: {
			teamInfo_Info: 'チーム情報',
			teamList: 'チームリスト',
			createTeam: 'チーム作成'
		},
		fillInfo: {
			_title: '情報記入',
			nickName: 'ニックネーム',
			teamNickname: 'チームニックネーム',
			declaration: 'キャンペーン宣言',
			contactInformation: '連絡方法',
			reason: '申請理由',
			_success: '申請提出に成功しました',
			_success_info: '申請提出に成功しました。キャプテンが処理するのをお待ちください！'
		},
		InsufficientQualification: {
			qu_1: 'スタンダードノードへの個人応募には、2千TRUE以上が必要である',
			qu_2: '全ノードへの個人応募には、5万TRUE以上が必要である',
			qu_3: 'チーム作成には1TRUE以上が必要である'
		},
		application: {
			_success: '申請が許可されました。次の操作に進んでください',
			_fail: '申請に失敗しました。キャプテンが申請を却下しました'
		},
		myTeam: '私のチーム',
		personnelManagement: 'メンバー管理',
		futureMember: '加入希望メンバー管理'
	},
	public: {
		second: '秒',
		next: '次へ',
		back: 'バック',
		save: '保存',
		payDetail: '支払い明細',
		enterPassword: 'パスワード入力',
		transferOutPrompt: '優先ノード投票の間、転出機能はしばらく使えません!',
		lockedWarehouse: 'ロック位置',
		lockedWarehouseAddr: 'ロック位置アドレス',
		transferIn: '転入',
		transferOut: '転出',
		verifyPwd: 'パスワード認証',
		inputPwd: 'パスワード入力',
		PwdIsNull: 'パスワードを入力してください',
		define: '確定',
		cancel: 'キャンセル',
		copySuccess: '複写成功',
		copyFailed: '複写失敗',
		wrongPwd: 'パスワードが間違っています。再入力してください',
		transactionSuccess: 'リリース取引に成功しました！',
		transactionFailed: 'リリース取引に失敗しました。暫くしてから再試行してください！',
		score: '分',
		tickets: '票',
		signSuccess: '応募成功',
		signSuccess_info: '応募成功おめでとうございます',
		joinTeam: 'チーム加入',
		enterMobile: '携帯番号を入力してください',
		enterCaptcha: '写真確認コードを入力してください',
		enterMobileCode: '携帯確認コードを入力してください',
		getMobileCode: '確認コード取得',
		captchaError: '図形確認コードが間違っています。再確認してください!',
		hasBind: 'この携帯番号には、アドレスがバインディングされています',
		verificationCodeError: '携帯確認コードが間違っています',
		enter_the_legal_mobile_number: '適法な携帯番号を入力してください',
		walletName: 'ウォレット名称',
		electoralManifesto: 'キャンペーン宣言',
		nickName: 'ニックネーム',
		personaNickName: '個人ニックネーム',
		personalSign: '個人情報',
		scan: 'スキャン',
		refuse: '拒絶',
		agree: '同意',
		mnemonic:
			'ニーモニックはクリアテキストプライベートキーのもう一つの表現形態である。最初はBIP39提案により提出され、ユーザーが複雑なプライベートキー (64桁のハッシュ値)を記憶することを手伝うことを目的としている。ニーモニックは一般的に12、15、18、21個の単語により構成される。これらの単語は一つの固定単語シソーラスからであり、その生成順番も一定のアルゴリズムによるものであるため、ユーザーは 12個の単語を任意に入力すれば、一つのアドレスを生成することを心配する必要はない。ニーモニックと Keystoreはプライベートキーの別の表現形態として使用できるが、Keystore とは違い、 ニーモニックは暗号化されていないプライベートキーであるため、安全性に非常に欠けている。誰かがあなたのニーモニックを取得すると、あなたの資産を簡単に奪い取ることができる。そのため、ユーザーがニーモニックをバックアップした後、以下の3点に注意が必要である。1、できる限り物理媒体でバックすること。例えば、ペンで紙に転写する。スクリーンキャプチャまたは写真でネットワークにつながる設備に保存してはいけない。ハッカーに盗まれるおそれがある。2、バックアップしたニーモニックが正しいかどうかを何回も検証する。万が一、一つや二つの単語を間違えると、正しいニーモニックを取り戻すには大きな困難をもたらしてしまう。 3、バックアップしたニーモニックが盗まれたり、紛失したりしないように、きちんと保管すること。',
		mnemonic_ps: 'PS: ユーザーはバックアップしたニーモニックを用いて、トゥルーチェーンウォレットをインポートすることができる。新しいパスワードで新しいKeystoreを生成させることにより、ウォレットパスワードを変更することができる。',
		keystore:
			'Keystore ファイルは、エテリアムウォレットがプライベートキーを保存するための一種のファイルフォーマット(JSON)である。ユーザーのカスタマパスワードで暗号化させ、ある程度の保護役割を果たしている。保護強度はユーザーがこのウォレットを暗号化させるパスワードの強さによるものである。例えば、123456のようなパスワードは極めて不安全である。Keystoreの使用時には以下の2点について注意が必要である。 1、常用されず、複雑なパスワードで Keystoreファイルを暗号化させる; 2、暗号化されたKeystore のパスワードを必ず覚えること。一旦パスワードを忘れると、Keystoreの使用権をなくし、かつトゥルーチェーンウォレットはパスワードを取り戻すことができない。このため、Keystore及びパスワードをきちんと保管すること。 以下は keystoreのスタイルである { "version": 3, "id": "b7467fcb-3c8b-41be-bccf-73d43a08c1b7", "address": "540f18196da5a533fa36577a81de55f0a2f4e751", "Crypto": { "ciphertext": "78ed11b8b6bf29b00f52b42b8542df0e4a6ac078e626af7edcf885c3b68154a4", "cipherparams": { "iv": "4516579601d96695fe30ace985a9066f" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "6276cfda7d40872352c801db5871e5a3368a8d0994cea39ed936760db78d1cdc", "n": 1024, "r": 8, "p": 1 }, "mac": "d889a5dc609c3f312a41394cc47640676d2612501a6f8c837ed55598158336db" } }。',
		keystore_ps: ' PS: Keystore のパスワードが唯一で変更不可能である。ウォレットパスワードを変更するには、ニーモニックまたはクリアテキストプライベートキーでウォレットを新たにインポートし、かつ新パスワードで暗号化させ、新たなKeystoreを生成させる。',
		privateKey:
			'ウォレットの資金へのコントロールは、対応のプライベートキーへの所有権及び制御権によって決められるとよく言われている。ブロックチェーン取引において、 プライベートキーが通貨支払いに必要なサインを生成させて、資金の所有権を証明するためのものである。プライベートキーは終始機密に保管すべきである。一旦第三者に漏れると、このプライベートキーに保護された資産も相手に譲ることになってしまう。 Keystoreとは違うものである。Keystoreは暗号化されたプライベートキーファイルである。パスワードの強さが十分あれば、ハッカーがKeystoreを手に入れたとしても、解読する難しさもかなりある。プライベートキーは実質的にネットワークに保存されず、ユーザーが生成してファイルまたは簡単なデータベースに保存されているものであり、ウォレットと呼ばれている。ユーザーウォレットに保存されたプライベートキーが完全に独立し、ユーザーのウォレットソフトウェアにより生成され、管理される。ブロックチェーンまたはネットワーク接続を必要としない。ユーザーのウォレットアドレスは、プライベートキーが楕円曲線暗号により公式キーを生成させ、さらに 0xから始まる 42桁のアドレスを生成させる。プライベートキーのスタイルは、64桁16小数のハッシュ文字列である。例えば、 56f759ece75f0ab1b783893cbe390288978d4d 4ff24dd233245b4285fcc31cf6である。',
		privateKey_ps: 'PS: ユーザーはクリアテキストプライベートキーでトゥルーチェーンをインポートすることができ、新たなパスワードで新たな Keystoreを生成させる(古いKeystoreを削除することを忘れないで)ことにより、ウォレットパスワードを変更する。'
	}
};
