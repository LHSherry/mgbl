/*
 * @Description: 设备实例详情
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:03:18
 */
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { history } from 'umi';

import {
	getDeviceDetail,
	getDeviceTplDetail,
	saveDevice
} from '@/services/device';

//service
export default {
	namespace: 'deviceDetail',

	state: {
		name_space: 'deviceDetail',
		detail: {},
		modelTpl: {},
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/device/detail').exec(pathname)) {
					dispatch({ type: 'clear' });
					dispatch({ type: 'queryDetail', payload: { instanceId: query.id } });
				}
			});
		},
	},

	effects: {
		* queryDetail({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceDetail, payload);
			if (!successed) return message.error(errMessage);

			yield put({ type: 'queryModelTplDetail', payload: { modelId: result.modelId } })
			yield put({
				type: 'changeState',
				payload: {
					detail: result
				}
			});
		},

		*queryModelTplDetail({ payload }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceTplDetail, payload);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					modelTpl: result
				}
			});
		},

		* save({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(saveDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('保存成功');
			history.goBack();
		},
	},

	reducers: {
		clear(state) {
			return {
				...state,
				detail: {},
				modelTpl: {},
				querySource: {},
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
