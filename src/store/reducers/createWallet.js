import * as types from '../actionTypes'
const initState = {
    walletName: '新钱包',
    walletAddress: null,
    keystoreV3: null
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'WALLETINFO':
            return {
                ...state,
                walletName: action.walletName,
                walletAddress: action.walletAddress,
                keystoreV3: action.keystoreV3,
                mneKeystore: action.mneKeystore
            };
        default:
            return state
    }
}