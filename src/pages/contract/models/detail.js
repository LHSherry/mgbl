/*
 * @Description: 合同详情model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 09:55:49
 */
import pathToRegexp from 'path-to-regexp';

//service
// export default {
// 	namespace: 'contractDetail',

// 	state: {
// 		name_space: 'contractDetail',
// 		detail: {}
// 	},

// 	subscriptions: {
// 		setup({ dispatch, history }) {
// 			return history.listen(({ pathname, query }) => {
// 				if (pathToRegexp('/contract/detail').exec(pathname)) {
// 					// dispatch({ type: 'clear' });
// 					// dispatch({ type: 'queryDetail' });
// 				}
// 			});
// 		},
// 	},

// 	effects: {
// 		* queryDetail({ payload = {} }, { call, put }) {
// 			const list = [
// 				{
// 					id: 1, code: 'HT001', name: '宣化区随访合同模板', deviceNumber: 'HB888288', content: '多参报告', createTime: 'yyyy-MM-dd HH:mm:ss', createOrgName: '宣化区卫健委', createUserName: '张三'
// 				},
// 				{
// 					id: 2, code: 'HT001', name: '宣化区随访合同模板', deviceNumber: 'HB888288', content: '多参报告', createTime: 'yyyy-MM-dd HH:mm:ss', createOrgName: '宣化区卫健委', createUserName: '张三'
// 				},
// 				{
// 					id: 3, code: 'HT001', name: '宣化区随访合同模板', deviceNumber: 'HB888288', content: '多参报告', createTime: 'yyyy-MM-dd HH:mm:ss', createOrgName: '宣化区卫健委', createUserName: '张三'
// 				},
// 				{
// 					id: 4, code: 'HT001', name: '宣化区随访合同模板', deviceNumber: 'HB888288', content: '多参报告', createTime: 'yyyy-MM-dd HH:mm:ss', createOrgName: '宣化区卫健委', createUserName: '张三'
// 				}
// 			];
// 			yield put({
// 				type: 'changeState',
// 				payload: {
// 					detail: list.find(obj => obj.id === Number(payload.id))
// 				}
// 			});
// 		},
// 	},

// 	reducers: {
// 		clear(state) {
// 			return {
// 				...state,
// 				list: [],
// 				pagination: {
// 					current: 1,
// 					pageSize: 10,
// 					total: 0,
// 				},
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
