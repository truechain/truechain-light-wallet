const initState = {
    true_banlance: '--',
    ttr_banlance: '--',
    wallet_address: null,
    lock_num: '--'
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'WALLETINFO':
            return {
                ...state,
                true_banlance: action.true_banlance,
                ttr_banlance: action.ttr_banlance,
                wallet_address: action.wallet_address,
                lock_num: action.lock_num
            };
        default:
            return state
    }
}
