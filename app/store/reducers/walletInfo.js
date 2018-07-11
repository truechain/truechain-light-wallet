const initState = {
    true_banlance: 0,
    ttr_banlance: 0,
    wallet_address: null,
    lock_num: 0
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'WALLETINFO':
            return {
                ...state,
                eth_banlance: action.eth_banlance,
                true_banlance: action.true_banlance,
                ttr_banlance: action.ttr_banlance,
                wallet_address: action.wallet_address,
                lock_num: action.lock_num
            };
        default:
            return state
    }
}
