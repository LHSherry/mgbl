/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-21 21:50:11
 */
import pathToRegexp from 'path-to-regexp';

//service
export default {
	namespace: 'patientCreate',

	state: {
		name_space: 'patientCreate',
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/patient/create').exec(pathname)) {
					dispatch({ type: 'clear' });
				}
			});
		},
	},

	effects: {
		* queryDetail({ payload = {} }, { call, put }) {
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
			const detail = list.find(obj => obj.id === payload.id);
			yield put({
				type: 'changeState',
				payload: {
					detail
				}
			});
		},
	},

	reducers: {
		clear(state) {
			return {
				...state,
				detail: {}
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
