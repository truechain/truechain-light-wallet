var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    console.log(web3.eth.accounts[0]);
    var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether');
    console.log(balance);
	
    res.write('<h2>');
    res.write('当前主账户帐号为：');
    res.write('</h1>');
    res.write('<p>');
    res.write(web3.eth.accounts[0].toString());
    res.write('</p>');
    res.write('<h2>');
    res.write('以太币余额为：');
    res.write('</h1>');
    res.write('<p>');
    res.write(balance.toString());
    res.write('</p>');
    res.end();
	
}).listen(8000); //监听8000端口
console.log('Server is running');