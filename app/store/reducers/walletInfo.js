const initState = {
	eth_banlance: 0,
	true_banlance: 0,
	ttr_banlance: 0,
	wallet_address: null
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'WALLETINFO':
			return {
				...state,
				eth_banlance: action.eth_banlance,
				true_banlance: action.true_banlance,
				ttr_banlance: action.ttr_banlance,
				wallet_address: action.wallet_address
			};
		default:
			return state;
	}
}
