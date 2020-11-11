/*
 * @Description: 设备模板model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:09:59
 */
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

import {
	getDeviceTplQuerySource,
	getDeviceTplList,
	delDeviceTpl,
} from '@/services/device'

//service
export default {
	namespace: 'deviceTpl',

	state: {
		name_space: 'deviceTpl',
		queryParams: {},
		querySource: {
			deviceTypes: [],
			status: [],
		},
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		},
		selectedList: [],
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/deviceTpl').exec(pathname)) {
					dispatch({ type: 'clear' });

					dispatch({ type: 'getQuerySource' });
					dispatch({ type: 'queryList' });
				}
			});
		},
	},

	effects: {
		* getQuerySource({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceTplQuerySource);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					querySource: result
				}
			})
		},

		* queryList({ payload = {} }, { call, put }) {
			payload = {
				pageIndex: 1,
				pageSize: 10,
				deviceDataTyps: [],
				deviceTypes: [],
				...payload
			}

			const { successed, errMessage, result } = yield call(getDeviceTplList, payload);
			if (!successed) return message.error(errMessage);

			const { datas = [], totalCount } = result;

			yield put({
				type: 'changeState',
				payload: {
					list: datas,
					pagination: {
						current: Number(payload.pageIndex),
						pageSize: Number(payload.pageSize),
						total: totalCount,
					},
					queryParams: payload
				}
			});
		},

		*delDeviceTpl({ payload }, { call, put, select }) {
			const { successed, errMessage, result } = yield call(delDeviceTpl, payload);
			if (!successed) return message.error(errMessage);
			const { queryParams } = yield select(({ deviceTpl }) => deviceTpl)

			message.success('删除成功！')
			yield put({ type: 'changeState', payload: { selectedList: [] } })
			yield put({ type: 'queryList', payload: queryParams })
		}
	},

	reducers: {
		clear(state) {
			return {
				...state,
				querySource: {
					deviceTypes: [],
					status: [],
				},
				list: [],
				pagination: {
					current: 1,
					pageSize: 10,
					total: 0,
				}
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
