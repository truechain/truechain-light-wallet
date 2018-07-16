function sendTokens(iterface, fromAddr, toAddr, value, password, keystore, contractAddress, gas, gasPrice, callabck) {
    let contract = new web3.eth.Contract(iterface);
    contract.options.address = contractAddress;
    const account = web3.eth.accounts.decrypt(keystore, password);
    web3.eth.accounts.wallet.add(account);
    let value_wei = web3.utils.toWei(value, 'ether'),
        data = contract.methods.transfer(toAddr, value_wei).encodeABI();
    web3.eth.sendTransaction({
        from: fromAddr,
        to: contractAddress,
        value: '0x00',
        gasPrice: gasPrice,
        gas: gas,
        data: data
    },
        function (error, txhash) {
            callabck(error, txhash)
        })
}

export default sendTokens;