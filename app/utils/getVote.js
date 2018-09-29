export default (getVote = (option, callback) => {
	let contract = new web3.eth.Contract(option.iterface);
	contract.options.address = option.ttrContractAddr;

	contract.methods.ticketsOf(option.fromAddr).call().then(function(num) {
		let num1 = web3.utils.fromWei(num, 'ether');
		callback(num1);
	});
});
