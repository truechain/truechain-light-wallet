import * as types from '../actionTypes'

let actions={
    walletInfo(walletName, walletAddress, keystoreV3, mneKeystore) {
        return function (dispatch, getState) {
            dispatch({
                type: 'WALLETINFO',
                walletName: walletName,
                walletAddress: walletAddress,
                keystoreV3: keystoreV3,
                mneKeystore: mneKeystore
            })
        }
    }
}

export default actions