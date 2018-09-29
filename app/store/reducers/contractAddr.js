const initState = {
    TRUEContractAddr: '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab',
    TTRContractAddr: '0xf2bb016e8c9c8975654dcd62f318323a8a79d48e'
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'CONTRACTADDR':
            return {
                ...state,
                TRUEContractAddr: action.TRUEContractAddr,
                TTRContractAddr: action.TTRContractAddr
            }
        default:
            return state
    }
}