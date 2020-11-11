
//service
export default {
	namespace: 'verificationCode',

	state: {
		name_space: 'verificationCode',
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
