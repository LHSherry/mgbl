/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-21 11:50:39
 */
import pathToRegexp from 'path-to-regexp';

//service
export default {
	namespace: 'helpList',

	state: {
		name_space: 'helpList',
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		},
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/helpList').exec(pathname)) {
					dispatch({ type: 'clear' });
					dispatch({ type: 'queryList' });
				}
			});
		},
	},

	effects: {
		* queryList({ payload = {} }, { call, put }) {
			const list = [
				{
					id: 1, name: '张三', sex: '女', age: '20', phone: '13800138000', address: '北京市丰台区XX路', date: 'yyyy-MM-dd HH:mm:ss', status: '未处理', doctor: '李四(13800138000)'
				},
				{
					id: 2, name: '张三', sex: '女', age: '20', phone: '13800138000', address: '北京市丰台区XX路', date: 'yyyy-MM-dd HH:mm:ss', status: '已处理', doctor: '李四(13800138000)'
				},
				{
					id: 3, name: '张三', sex: '女', age: '20', phone: '13800138000', address: '北京市丰台区XX路', date: 'yyyy-MM-dd HH:mm:ss', status: '未处理', doctor: '李四(13800138000)'
				},
				{
					id: 4, name: '张三', sex: '女', age: '20', phone: '13800138000', address: '北京市丰台区XX路', date: 'yyyy-MM-dd HH:mm:ss', status: '未处理', doctor: '李四(13800138000)'
				}
			];

			yield put({
				type: 'changeState',
				payload: {
					list,
					pagination: {
						current: 1,
						pageSize: 10,
						total: list.length,
					}
				}
			});
		},
	},

	reducers: {
		clear(state) {
			return {
				...state,
				list: [],
				pagination: {
					current: 1,
					pageSize: 10,
					total: 0,
				},
			};
		},
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};
