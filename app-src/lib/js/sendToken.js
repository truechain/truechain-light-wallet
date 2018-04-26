// 转账代币
// 输入参数 转出帐户地址，转出代币数量，转出代币的简称（symbol）
// 调用成功，返回 tx

function sendToken() {
	console.log('发送代币执行');
	var web3 = new Web3();

	function setWeb3Provider(keystore) {
		var web3Provider = new HookedWeb3Provider({
			//host: "http://localhost:8545", // 私链 
			//host: "https://rinkeby.infura.io/",		// 以太坊测试  
			//host: "https://ropsten.infura.io/", // 以太坊测试 (ropsten)
			host: "https://mainnet.infura.io/", // 以太坊测正式
			transaction_signer: keystore
		});
		web3.setProvider(web3Provider);
	}

	var serialized_keystore = plus.storage.getItem('keystore');
	var keystore = lightwallet.keystore.deserialize(serialized_keystore); //将序列号的keystore转换为对象 
	setWeb3Provider(keystore)
	var fromAddr = '0x5833fA6053e6E781EaFb8695d63D90f6B3571e5e';
	var to = '0xc2892D1E69e4A337fEd0adA162B2eBC7dd3444a9';
	//var valueToken = document.getElementById('valueAmount').value
	var valueToken = 1;
	var value = parseFloat(valueToken) * 1.0e18
	var contractAddr = '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab' // erc20 合约地址

	var abi = [{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [{
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_spender",
			"type": "address"
		}, {
			"name": "_value",
			"type": "uint256"
		}],
		"name": "approve",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
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
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [{
			"name": "",
			"type": "uint8"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_value",
			"type": "uint256"
		}],
		"name": "burn",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "",
			"type": "address"
		}],
		"name": "balanceOf",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_from",
			"type": "address"
		}, {
			"name": "_value",
			"type": "uint256"
		}],
		"name": "burnFrom",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"stateMutability": "view",
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
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_spender",
			"type": "address"
		}, {
			"name": "_value",
			"type": "uint256"
		}, {
			"name": "_extraData",
			"type": "bytes"
		}],
		"name": "approveAndCall",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "",
			"type": "address"
		}, {
			"name": "",
			"type": "address"
		}],
		"name": "allowance",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"inputs": [{
			"name": "initialSupply",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}, {
		"anonymous": false,
		"inputs": [{
			"indexed": true,
			"name": "from",
			"type": "address"
		}, {
			"indexed": true,
			"name": "to",
			"type": "address"
		}, {
			"indexed": false,
			"name": "value",
			"type": "uint256"
		}],
		"name": "Transfer",
		"type": "event"
	}, {
		"anonymous": false,
		"inputs": [{
			"indexed": true,
			"name": "from",
			"type": "address"
		}, {
			"indexed": false,
			"name": "value",
			"type": "uint256"
		}],
		"name": "Burn",
		"type": "event"
	}]
	var token = web3.eth.contract(abi).at(contractAddr);

	var args = [to, value]; //转账参数，给 to地址转 value个代币

	var gasPrice = 21000000000;
	var gas = 300000;
	args.push({
		from: fromAddr,
		value: '0x00',
		gasPrice: gasPrice,
		gas: gas
	})

	var callback = function(err, txhash) {
		console.log('error: ' + err)
		console.log('txhash: ' + txhash)
	}
	args.push(callback)

	token.transfer.apply(this, args)
}