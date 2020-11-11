
import { message } from 'antd';

import {
	getDeviceTplQuerySource,
	getDeviceTplList,
} from '@/services/device'

import { queryOrgList } from '@/services/org';

//service
export default {
	namespace: 'selectModule',

	state: {
		name_space: 'selectModule',
		querySource: {},
		queryParams: {},
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		}
	},

	effects: {
		// 获取设备模板
		* getDeviceTpl({ payload }, { call, put }) {
			yield put({ type: 'queryDeviceTplSource' });
			yield put({ type: 'queryDeviceTplList', payload });
		},

		* queryDeviceTplSource({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceTplQuerySource);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					querySource: result
				}
			})
		},

		* queryDeviceTplList({ payload = {} }, { call, put }) {
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

		// 获取设备
		* getDevice({ payload = {} }, { call, put }) {
			payload = {
				pageIndex: 1,
				pageSize: 10,
				deviceTypes: [],
				status: [],
				depts: [],
				...payload
			}
			const { successed, errMessage, result } = yield call({}, payload);
			if (!successed) message.error(errMessage);

			const { datas = [], totalCount } = result;
			yield put({
				type: 'changeState',
				payload: {
					list: datas,
					pagination: {
						current: Number(payload.pageIndex),
						pageSize: Number(payload.pageSize),
						total: totalCount,
					}
				}
			});
		},

		// 获取组织机构
		* getOrg({ payload = {} }, { call, put }) {
			payload = {
				pageIndex: 1,
				pageSize: 10,
				...payload
			}

			const { successed, errMessage, result } = yield call(queryOrgList, payload);
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
				}
			}
		},
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};
