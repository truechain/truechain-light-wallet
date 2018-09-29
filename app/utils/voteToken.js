export default function voteTokens(option, callback, gas = '150000', gasPrice = '18000000000') {
	let contract = new web3.eth.Contract(option.iterface);
	contract.options.address = option.ttrContractAddr;

	const account = web3.eth.accounts.decrypt(option.keystore, option.password);
	web3.eth.accounts.wallet.add(account);

	value_wei = web3.utils.toWei(option.value, 'ether');
	data = contract.methods.vote(option.toAddr, value_wei).encodeABI();

	web3.eth.sendTransaction(
		{
			from: option.fromAddr,
			to: option.ttrContractAddr,
			value: '0x00',
			gasPrice: gasPrice,
			gas: gas,
			data: data
		},
		(error, txhash) => {
			callback(error, txhash);
		}
	);
}
