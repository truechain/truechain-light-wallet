function generate_seed(pwd, callback) {
	var new_seed = lightwallet.keystore.generateRandomSeed();
	generate_addresses(new_seed, pwd, callback);
}

var totalAddresses = 1;

function generate_addresses(seed, password, callback, hdPathString = "m/44'/60'/0'/0") {
	if(!lightwallet.keystore.isSeedValid(seed)) {
		mui.alert('请输入正确的助记词')
		return;
	}

	lightwallet.keystore.createVault({
		password: password,
		seedPhrase: seed,
		hdPathString: hdPathString
	}, function(err, ks) {
		ks.keyFromPassword(password, function(err, pwDerivedKey) {
			if(err) {
				console.log(err)
			} else {
				ks.generateNewAddress(pwDerivedKey, totalAddresses);
				addresses = ks.getAddresses();
				callback(addresses, ks)
				if(window.localStorage && addresses) {

				}
			}
		});
	});
}

function send_ether() {
	var seed = document.getElementById("seed").value;

	if(!lightwallet.keystore.isSeedValid(seed)) {
		document.getElementById("info").innerHTML = "Please enter a valid seed";
		return;
	}

	var password = Math.random().toString(),
		ks = window.localStorage.keyStore;

	lightwallet.keystore.createVault({
		password: password,
		seedPhrase: seed
	}, function(err, ks) {
		ks.keyFromPassword(password, function(err, pwDerivedKey) {
			if(err) {
				console.log('Error', err)
			} else {
				ks.generateNewAddress(pwDerivedKey, totalAddresses);

				ks.passwordProvider = function(callback) {
					callback(null, password);
				};

				var provider = new HookedWeb3Provider({
					host: "http://localhost:8545",
					transaction_signer: ks
				});

				var web3 = new Web3(provider);

				var from = document.getElementById("address1").value;
				var to = document.getElementById("address2").value;
				var value = web3.toWei(document.getElementById("ether").value, "ether");

				web3.eth.sendTransaction({
					from: from,
					to: to,
					value: value,
					gas: 21000
				}, function(error, result) {
					if(error) {
						document.getElementById("info").innerHTML = error;
					} else {
						document.getElementById("info").innerHTML = "Txn hash: " + result;
					}
				})
			}
		});
	});
}

function sendEth(from, to, val) {
	let password = '99';
	lightwallet.keystore.createVault({
		password: password
	}, function(err, ks) {
		ks.keyFromPassword(password, function(err, pwDerivedKey) {
			if(err) {
				console.log('Error', err)
			} else {
				ks.generateNewAddress(pwDerivedKey, totalAddresses);

				ks.passwordProvider = function(callback) {
					callback(null, password);
				};

				var provider = new HookedWeb3Provider({
					host: "http://localhost:8545",
					transaction_signer: ks
				});

				var web3 = new Web3(provider);
				var value = web3.toWei(val, "ether");

				web3.eth.sendTransaction({
					from: from,
					to: to,
					value: value,
					gas: 21000
				}, function(error, result) {
					if(error) {
						console.log(error)
					} else {
						console.log(result)
					}
				})
			}
		});
	});
}