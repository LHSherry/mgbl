

//service
export default {
	namespace: 'app',

	state: {
		name_space: 'app',
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
