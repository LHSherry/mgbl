/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-18 17:02:25
 */

//service
export default {
	namespace: 'resetPwd',

	state: {
		name_space: 'resetPwd',
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
