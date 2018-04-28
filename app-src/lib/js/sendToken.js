function sendToken(fromAddr, toAddr, valueToken, pwd) {
	console.log(fromAddr, toAddr, valueToken, pwd, '这是')
	console.log('发送代币执行!')
	//var fromAddr = '0x5833fa6053e6e781eafb8695d63d90f6b3571e5e';
	//var toAddr = '0x10592A6daD0055c586bb95474e7056F72462997A';

	//	var valueToken = 2,
	var amount = parseFloat(valueToken) * 1.0e18,
		gasPrice = 21000000000,
		gas = 110000,
		privateKey;

	//合约的interface
	var abi = [{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [{
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [{
			"name": "supply",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_from",
			"type": "address"
		}, {
			"name": "_to",
			"type": "address"
		}, {
			"name": "_value",
			"type": "uint256"
		}],
		"name": "transferFrom",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "_owner",
			"type": "address"
		}],
		"name": "balanceOf",
		"outputs": [{
			"name": "balance",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [{
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_to",
			"type": "address"
		}, {
			"name": "_value",
			"type": "uint256"
		}],
		"name": "transfer",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "_owner",
			"type": "address"
		}, {
			"name": "_spender",
			"type": "address"
		}],
		"name": "allowance",
		"outputs": [{
			"name": "remaining",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	}, {
		"anonymous": false,
		"inputs": [{
			"indexed": true,
			"name": "_from",
			"type": "address"
		}, {
			"indexed": true,
			"name": "_to",
			"type": "address"
		}, {
			"indexed": false,
			"name": "_value",
			"type": "uint256"
		}],
		"name": "Transfer",
		"type": "event"
	}, {
		"anonymous": false,
		"inputs": [{
			"indexed": true,
			"name": "_owner",
			"type": "address"
		}, {
			"indexed": true,
			"name": "_spender",
			"type": "address"
		}, {
			"indexed": false,
			"name": "_value",
			"type": "uint256"
		}],
		"name": "Approval",
		"type": "event"
	}]

	var contractAddr = '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab' // ropsten - HONG   

	///////////////////////////////////////
	var serialized_keystore = plus.storage.getItem('keystore');
	var keystore = lightwallet.keystore.deserialize(serialized_keystore) //将序列号的keystore转换为对象  

	/*var password = '';
	if(password == '') {
		password = prompt('Enter password to retrieve addresses', 'Password');
	}*/

	var password = pwd;

	keystore.keyFromPassword(password, function(err, pwDerivedKey) {
		//console.log(pwDerivedKey) ;
		if(err) {
			console.log(err);
			mui.alert('密码错误,请重新输入!')
		} else {
			var totalAddresses = 1;
			keystore.generateNewAddress(pwDerivedKey, totalAddresses);
			var addresses = keystore.getAddresses();
			var address = addresses[0];
			console.log(address);
			privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
			console.log('privateKey' + privateKey);

			var web3Provider = new HookedWeb3Provider({
				//host: "http://localhost:8545", 				// 私链 
				//host: "https://rinkeby.infura.io/",		// 以太坊测试  
				//host: "https://ropsten.infura.io/", // 以太坊测试 (ropsten) 
				host: "https://mainnet.infura.io/", // 以太坊正式网 
				transaction_signer: {
					hasAddress: function(address, callback) {
						callback(null, true);
					},
					signTransaction: function(tx_params, callback) {
						var rawTx = {
							gasPrice: web3.toHex(tx_params.gasPrice),
							gasLimit: web3.toHex(tx_params.gas),
							value: web3.toHex(tx_params.value),
							from: tx_params.from,
							to: tx_params.to,
							nonce: web3.toHex(tx_params.nonce),
							data: web3.toHex(tx_params.data)
						};
						console.log(JSON.stringify(rawTx), '========')
						console.log('tx_params_data: ' + tx_params.data)

						var tx = new ethereumjs.Tx(rawTx);
						var privateKeye = new ethereumjs.Buffer.Buffer(privateKey, 'hex');

						tx.sign(privateKeye);
						var serializedTx = '0x' + tx.serialize().toString('hex');

						callback(null, serializedTx);
					}
				}
			});

			var web3 = new Web3(web3Provider);

			var MyContract = web3.eth.contract(abi);
			var myContractInstance = MyContract.at(contractAddr);

			toAddr = toAddr.substring(2);
			amount = web3.fromDecimal(amount);
			amount = amount.substring(2);
			amount = PreFixInterge(amount, 32);

			var data = '0x' + 'a9059cbb' + '000000000000000000000000' + toAddr + '00000000000000000000000000000000' + amount;

			console.log(data);

			web3.eth.sendTransaction({
					from: fromAddr,
					to: contractAddr,
					value: '0x00',
					gasPrice: gasPrice,
					gas: gas,
					data: data
				},
				function(err, txhash) {
					if(err) {
						mui.alert('交易失败原因: 无效地址或密码错误或ETH不足,请重试!')
					} else {
						mui.toast('交易成功')
						mui.openWindow('dealsuccessful.html')
					}
					console.log('error: ' + err);
					console.log('txhash: ' + txhash);
				})

			function PreFixInterge(num, n) {
				//num代表传入的数字，n代表要保留的字符的长度  
				return(Array(n).join(0) + num).slice(-n);
			}
		}

	});
}