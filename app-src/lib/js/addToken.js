var web3 = new Web3();

function setWeb3Provider(keystore) {
	var web3Provider = new HookedWeb3Provider({
		//host: "http://localhost:8545", // 私链 
		//host: "https://rinkeby.infura.io/",		// 以太坊测试  
		//host: "https://ropsten.infura.io/", // 以太坊测试 (ropsten)
		host: "https://mainnet.infura.io/", // 以太坊正式
		transaction_signer: keystore
	});
	web3.setProvider(web3Provider);
}

let symbol, contract, name, decimals, balances;

// 根据当前帐户地址 和 合约地址，查询代表名称、余额
function addToken(contractAddr, callback) {
	//var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'
	var fromAddr = '0x' + plus.storage.getItem('walletAddress');

	//var contraccontractAddrtAddr = '0x11769e3b12d34da9a33c1d3f08e8851a2a0528b5' // erc20 合约地址
	//contractAddr = '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab'; // TRUE  erc20 合约地址

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
	symbol = contract.symbol();
	name = contract.name();
	//decimals = contract.decimals(); //小数点位数
	balances = contract.balanceOf(fromAddr); //查地址的余额	
	balances = Number(balances) / 1000000000000000000;
	callback();
}