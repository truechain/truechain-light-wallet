function addToken(contractAddr, callback) {
	let symbol, contract, name, decimals, balances;
	mui.plusReady(function() {
		let fromAddr = plus.storage.getItem('walletAddress');
		let trueContractAddr, ttrContractAddr;
		let host = plus.storage.getItem('web3Host');
		let reg = /https:\/\/ropsten.infura.io/;
		if(!host) {
			host = 'https://mainnet.infura.io/';
			trueContractAddr = "0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab";
			ttrContractAddr = "0xf2bb016e8c9c8975654dcd62f318323a8a79d48e";
		} else if(reg.test(host)) {
			trueContractAddr = "0x2792d677B7Ba6B7072bd2293F64BC0C1CDe23ac1";
			ttrContractAddr = "0x635AfeB8739f908A37b3d312cB4958CB2033F456";
		} else {
			trueContractAddr = "0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab";
			ttrContractAddr = "0xf2bb016e8c9c8975654dcd62f318323a8a79d48e";
		}

		var web3 = new Web3(new Web3.providers.HttpProvider(host));

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

		var myContract = new web3.eth.Contract(abi, contractAddr);

		myContract.methods.balanceOf(fromAddr).call().then(function(res) {
			balances = show(web3.utils.fromWei(res, 'ether'));

			callback(balances);
		}).catch(function(res) {
			console.log(res)
		});

		function show(num) {
			num += '';
			num = num.replace(/[^0-9|\.]/g, '');
			if(/^0+/) {
				num = num.replace(/^0+/, '');
			};
			if(!/\./.test(num)) {
				num += '.00000';
			};
			if(/^\./.test(num)) {
				num = '0' + num;
			};
			num += '00000';
			num = num.match(/\d+\.\d{5}/)[0];
			return num
		};
	})
}