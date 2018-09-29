let actions = {
	lockAccount(option) {
		return function(dispatch, getState) {
			dispatch({
				type: 'LOCKACCOUNT',
				lock_num: option.lock_num
			});
		};
	}
};

export default actions;
