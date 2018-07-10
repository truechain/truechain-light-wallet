function sendEth(fromAddress, toAddress, amount, password, keystore, gas, gasPrice, callback) {
    let account = web3.eth.accounts.decrypt(keystore, password),
        value = web3.utils.toWei(amount, 'ether');
    web3.eth.accounts.wallet.add(account);
    web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: value,
        gasPrice: gasPrice,
        gas: gas
    }, function (error, txhash) {
        callback(error, txhash)
    });
};


export default sendEth;