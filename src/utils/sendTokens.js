const iterface = require('./iterface');
function sendTokens(fromAddr, toAddr, value, password, keystore, contractAddress, callabck, gas = "150000", gasPrice = "18000000000") {
    let host = 'https:ropsten.infura.io/';
    var web3 = new Web3(new Web3.providers.HttpProvider(host));
    let contract = new web3.eth.Contract(iterface);
    contract.options.address = contractAddress;
    // try {
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
            console.log(error, txhash);
            // if (txhash) {
            //     callabck();
            //     mui.openWindow({
            //         url: 'dealsuccessful.html',
            //         extras: {
            //             fromAddress: fromAddr,
            //             toAddress: toAddr,
            //             price: value
            //         }
            //     });
            // } else {
            //     mui.alert('交易失败');
            //     callabck()
            // }
        })
    // } catch (error) {
    //     let addReg = /Error: Provided address is invalid,| the capitalization checksum test failed, |or its an indrect IBAN address which can't be converted./
    //     if (error == 'Error: Key derivation failed - possibly wrong password') {
    //         mui.alert('密码错误,请重新输入!');
    //         callabck();
    //     } else if (addReg.test(error)) {
    //         callabck()
    //         mui.alert('无效地址,请重新输入!')
    //     }
    //     console.log('error: ' + error);
    // }
}