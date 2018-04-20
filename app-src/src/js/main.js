var web3 = new Web3();
var global_keystore;

function setWeb3Provider(keystore) {
	var web3Provider = new HookedWeb3Provider({
		//host: "https://rinkeby.infura.io/",
		/*host: "https://ropsten.infura.io/",*/
		host: "http://localhost:8545",
		transaction_signer: keystore
	});
	web3.setProvider(web3Provider);
}

function newAddresses(password, callback) {
	/*if(password == '') {
		password = prompt('Enter password to retrieve addresses', 'Password');
	}*/
	var numAddr = 1; //生成数量
	global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
		global_keystore.generateNewAddress(pwDerivedKey, numAddr);
		var addresses = global_keystore.getAddresses();
		callback(addresses, global_keystore)
		//getBalances();
	})
}

function getBalances() {
	var addresses = global_keystore.getAddresses();
	document.getElementById('addr').innerHTML = 'Retrieving addresses...'
	async.map(addresses, web3.eth.getBalance, function(err, balances) {
		async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {
			document.getElementById('addr').innerHTML = ''
			for(var i = 0; i < addresses.length; ++i) {
				document.getElementById('addr').innerHTML += '<div>' + addresses[i] + ' (Bal: ' + (balances[i] / 1.0e18) + ' ETH, Nonce: ' + nonces[i] + ')' + '</div>'
			}
		})
	})
}
/*
function setSeed() {
	var password = prompt('Enter Password to encrypt your seed', 'Password');
	lightwallet.keystore.createVault({
		password: password,
		seedPhrase: document.getElementById('seed').value,
		//random salt 
		hdPathString: "m/44'/60'/0'/0"
	}, function(err, ks) {
		global_keystore = ks
		document.getElementById('seed').value = ''

		newAddresses(password);
		setWeb3Provider(global_keystore);
		getBalances();
	})
}
*/
function newWallet(password, callback) {
	var randomSeed = lightwallet.keystore.generateRandomSeed();
	lightwallet.keystore.createVault({
		password: password,
		seedPhrase: randomSeed,
		//random salt 
		hdPathString: "m/44'/60'/0'/0"
	}, function(err, ks) {
		global_keystore = ks
		newAddresses(password, callback);
		//setWeb3Provider(global_keystore);
		//getBalances();
	})
}

function showSeed() {
	var password = prompt('Enter password to show your seed. Do not let anyone else see your seed.', 'Password');
	global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
		var seed = global_keystore.getSeed(pwDerivedKey);
		alert('Your seed is: "' + seed + '". Please write it down.');
	});
}

function sendEth(fromAddr, toAddr, valueEth) {
	let p = [],
		ks = null;
	for(let i = 0; i <= parseInt(window.localStorage.walletNum); i++) {
		let a = JSON.parse(window.localStorage[i]);
		p[i] = a;
	}

	for(let j = 0; j < p.length; j++) {
		ks = JSON.parse(p[j].keyStore);
	}

	setWeb3Provider(ks)

	var value = parseFloat(valueEth) * 1.0e18
	var gasPrice = 18000000000
	var gas = 50000
	web3.eth.sendTransaction({
		from: fromAddr,
		to: toAddr,
		value: value,
		gasPrice: gasPrice,
		gas: gas
	}, function(err, txhash) {
		console.log('error: ' + err)
		console.log('txhash: ' + txhash)
	})
}




function functionCall() {
	var fromAddr = document.getElementById('functionCaller').value
	var contractAddr = document.getElementById('contractAddr').value
	var abi = JSON.parse(document.getElementById('contractAbi').value)
	var contract = web3.eth.contract(abi).at(contractAddr)
	var functionName = document.getElementById('functionName').value
	var args = JSON.parse('[' + document.getElementById('functionArgs').value + ']')
	var valueEth = document.getElementById('sendValueAmount').value
	var value = parseFloat(valueEth) * 1.0e18
	var gasPrice = 50000000000
	var gas = 4541592
	args.push({
		from: fromAddr,
		value: value,
		gasPrice: gasPrice,
		gas: gas
	})
	var callback = function(err, txhash) {
		console.log('error: ' + err)
		console.log('txhash: ' + txhash)
	}
	args.push(callback)
	contract[functionName].apply(this, args)
}