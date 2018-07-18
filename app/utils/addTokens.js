function getBalance(iterface, address, ContractAddr, callback) {
	var myContract = new web3.eth.Contract(iterface, ContractAddr);
	myContract.methods.balanceOf(address).call().then(function(res) {
		let balance = web3.utils.fromWei(res, 'ether');
		callback(balance);
	});
}
export default getBalance;
