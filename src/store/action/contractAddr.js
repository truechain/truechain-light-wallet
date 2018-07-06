let actions = {
    contractAddr(option) {
        return function (dispatch, getState) {
            dispatch({
                type: 'CONTRACTADDR',
                trueContractAddr: option.trueContractAddr,
                ttrContractAddr: option.ttrContractAddr
            })
        }
    }
}

export default actions