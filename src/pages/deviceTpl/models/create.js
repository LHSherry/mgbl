/*
 * @Description: 创建设备模板
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:10:19
 */
import pathToRegexp from 'path-to-regexp';

import { history } from 'umi';
import { message } from 'antd';

import {
	createDeviceTpl,
	saveDeviceTpl,
} from '@/services/device'

//service
export default {
	namespace: 'deviceTplCreate',

	state: {
		name_space: 'deviceTplCreate',
		querySource: {}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/deviceTpl/create').exec(pathname)) {
					dispatch({ type: 'clear' });

					dispatch({ type: 'createDeviceTpl' });
				}
			});
		},
	},

	effects: {
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

			message.success('创建成功！');
			history.goBack();
		}
	},

	reducers: {
		clear(state) {
			return {
				...state,
				querySource: {}
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
