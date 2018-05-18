function sendTokens(fromAddr, toAddr, value, password, keystore, contractAddress, mask, gas = "150000", gasPrice = "18000000000") {

	let host = plus.storage.getItem('web3Host');
	let trueContractAddr, ttrContractAddr;
	let reg = /https:\/\/ropsten.infura.io/;
	if(!host) {
		host = 'https://mainnet.infura.io/';
	}
	var web3 = new Web3(new Web3.providers.HttpProvider(host));
	const iterface = [{
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
			"name": "supply",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
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
		"name": "votingInfo",
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
		"inputs": [{
			"name": "",
			"type": "address"
		}],
		"name": "balances",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
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
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "_owner",
			"type": "address"
		}],
		"name": "ticketsOf",
		"outputs": [{
			"name": "tickets",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "founder",
		"outputs": [{
			"name": "",
			"type": "address"
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
		"name": "vote",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
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
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "newFounder",
			"type": "address"
		}],
		"name": "changeFounder",
		"outputs": [],
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
		"constant": true,
		"inputs": [],
		"name": "voteEndTime",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "",
			"type": "address"
		}],
		"name": "totalVotes",
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
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_tos",
			"type": "address[]"
		}, {
			"name": "_values",
			"type": "uint256[]"
		}],
		"name": "distributeMultiple",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_to",
			"type": "address"
		}],
		"name": "voteAll",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": false,
		"inputs": [{
			"name": "_endTime",
			"type": "uint256"
		}],
		"name": "setEndTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [{
			"name": "",
			"type": "address"
		}],
		"name": "frozen",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"stateMutability": "view",
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
		"stateMutability": "view",
		"type": "function"
	}, {
		"constant": true,
		"inputs": [],
		"name": "distributed",
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
			"name": "_to",
			"type": "address"
		}, {
			"name": "_amount",
			"type": "uint256"
		}],
		"name": "distribute",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, {
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"name": "Vote",
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
	}];

	let contract = new web3.eth.Contract(iterface);
	contract.options.address = contractAddress;

	try {
		const account = web3.eth.accounts.decrypt(keystore, password);
		web3.eth.accounts.wallet.add(account);
		contract.methods.transfer(toAddr, value).send({
			from: fromAddr,
			gas: gas,
			gasPrice: gasPrice
		}).then(res => {
			console.log(JSON.stringify(res));
			if(res) {
				mask._remove();
				mui.openWindow({
					url: 'dealsuccessful.html',
					extras: {
						fromAddress: fromAddr,
						toAddress: toAddr,
						price: web3.utils.fromWei(value.toString(), 'ether')
					}
				});
			}
		}).catch(function(error) {
			mui.alert('交易失败!');
			mask._remove();
			console.log(JSON.stringify(error))
		})
	} catch(error) {
		console.log(JSON.stringify(error))
		mui.alert('交易失败!');
		mask._remove();
	}
}