const initState = {
	lock_num: 0
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'LOCKACCOUNT':
			return {
				...state,
				lock_num: action.lock_num
			};
		default:
			return state;
	}
}
