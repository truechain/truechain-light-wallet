import * as types from '../actionTypes'

let actions={
    walletInfo(walletName, walletAddress, keystoreV3) {
        return function (dispatch, getState) {
            dispatch({
                type: 'WALLETINFO',
                walletName: walletName,
                walletAddress: walletAddress,
                keystoreV3: keystoreV3
            })
        }
    }
}

export default actions