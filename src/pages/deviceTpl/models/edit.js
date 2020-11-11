/*
 * @Description: 编辑设备模板model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:10:07
 */
import pathToRegexp from 'path-to-regexp';

import { history } from 'umi';
import { message } from 'antd';

import {
	getDeviceTplDetail,
	createDeviceTpl,
	saveDeviceTpl,
} from '@/services/device'

//service
export default {
	namespace: 'deviceTplEdit',

	state: {
		name_space: 'deviceTplEdit',
		querySource: {},
		detail: {}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/deviceTpl/edit').exec(pathname)) {
					dispatch({ type: 'clear' });

					if (query.id) {
						dispatch({ type: 'getDeviceTplDetail', payload: { modelId: query.id } });
						dispatch({ type: 'createDeviceTpl' });
					}
				}
			});
		},
	},

	effects: {
		* getDeviceTplDetail({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceTplDetail, payload);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					detail: {
						...result,
						dataTypes: result.dataTypes.filter(obj => obj.checked),
						types: result.types.filter(obj => obj.checked)
					}
				}
			})
		},


		* createDeviceTpl(_, { call, put }) {
			const { successed, errMessage, result } = yield call(createDeviceTpl);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					querySource: result
				}
			})
		},

		*save({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(saveDeviceTpl, payload);
			if (!successed) return message.error(errMessage);

			message.success('保存成功！');
			history.goBack();
		}

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
