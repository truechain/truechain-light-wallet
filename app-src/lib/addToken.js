// 根据当前帐户地址 和 合约地址，查询代表名称、余额
function addToken(contractAddr, callback) {
	let symbol, contract, name, decimals, balances;
	mui.plusReady(function() {
		var web3 = new Web3();

		let host = plus.storage.getItem('web3Host');
		let trueContractAddr, ttrContractAddr;
		let trueContractAddr, ttrContractAddr;
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

		function setWeb3Provider(keystore) {
			var web3Provider = new HookedWeb3Provider({
				//host: "http://localhost:8545", // 私链 
				//host: "https://rinkeby.infura.io/",		// 以太坊测试  
				//host: "https://ropsten.infura.io/", // 以太坊测试 (ropsten)
				host: host, // 以太坊正式
				transaction_signer: keystore
			});
			web3.setProvider(web3Provider);
		}

		var fromAddr = '0x' + plus.storage.getItem('walletAddress');
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

		contract = web3.eth.contract(abi).at(contractAddr);

		let keyStore = plus.storage.getItem('keystore');
		setWeb3Provider(keyStore);
		//		if(contract.symbol() && contract.symbol()) {
		//			symbol = contract.symbol();
		//			name = contract.symbol();
		//			return;
		//		}

		//decimals = contract.decimals(); //小数点位数

		balances = show(Number(contract.balanceOf(fromAddr) / 1.0e18)); //查地址的余额	

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

		/*balances = Number(balances) / 1000000000000000000;*/
		setTimeout(function() {
			callback(balances);
		}, 1000)
	})
	//var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'

	//var contraccontractAddrtAddr = '0x11769e3b12d34da9a33c1d3f08e8851a2a0528b5' // erc20 合约地址
	//contractAddr = '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab'; // TRUE  erc20 合约地址
}