

//service
export default {
	namespace: 'signContract',

	state: {
		name_space: 'signContract',
	},

	effects: {

	},

	reducers: {
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};
