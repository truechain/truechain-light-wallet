let actions = {
    walletInfo(option) {
        return function (dispatch, getState) {
            dispatch({
                type: 'WALLETINFO',
                eth_banlance: option.eth_banlance,
                true_banlance: option.true_banlance,
                ttr_banlance: option.ttr_banlance,
                wallet_address: option.wallet_address
            })
        }
    }
}

export default actions