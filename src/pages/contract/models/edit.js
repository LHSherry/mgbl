/*
 * @Description: 合同编辑model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 09:55:41
 */
import pathToRegexp from 'path-to-regexp';

//service
// export default {
// 	namespace: 'contractEdit',

// 	state: {
// 		name_space: 'contractEdit',
// 		detail: {}
// 	},

// 	subscriptions: {
// 		setup({ dispatch, history }) {
// 			return history.listen(({ pathname, query }) => {
// 				if (pathToRegexp('/contract/create').exec(pathname) || pathToRegexp('/contract/edit').exec(pathname)) {
// 					// dispatch({ type: 'clear' });
// 				}
// 			});
// 		},
// 	},

// 	effects: {
// 	},

// 	reducers: {
// 		clear(state) {
// 			return {
// 				...state,
// 				detail: {}
// 			};
// 		},
// 		changeState(state, { payload }) {
// 			return {
// 				...state,
// 				...payload,
// 			};
// 		},
// 	},
// };
