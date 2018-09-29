let actions = {
    contractAddr(option) {
        return function (dispatch, getState) {
            dispatch({
                type: 'CONTRACTADDR',
                TRUEContractAddr: option.trueContractAddr,
                TTRContractAddr: option.ttrContractAddr
            })
        }
    }
}

export default actions