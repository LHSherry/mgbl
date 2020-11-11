/*
 * @Description: 管理员 批量导入
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:07:53
 */
import { message } from 'antd';
import {
	importBatchDeviceAdminReady,
	importBatchDeviceAdminUpload
} from '@/services/device';

//service
export default {
	namespace: 'deviceAdminImport',

	state: {
		name_space: 'deviceAdminImport',
	},

	effects: {
		* importBatch({ payload = {}, callback }, { call, put }) {
			const { successed, errMessage, result } = yield call(importBatchDeviceAdminReady, payload);
			if (!successed) return message.error(errMessage);

			yield put({ type: 'importBatchDeviceUpload', payload: payload, callback });
		},

		* importBatchDeviceUpload({ payload, callback }, { call, put }) {
			const { successed, errMessage, result } = yield call(importBatchDeviceAdminUpload, { file: payload.file });
			if (!successed) return message.error(errMessage);

			message.success('批量导入成功！')

			callback && callback();
		}
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
