/*
 * @Description: 设备实例导入model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:03:05
 */
import { history } from 'umi';
import { message } from 'antd';
import moment from "moment"
import {
	importSignDevice,
	importBatchDeviceReady,
	importBatchDeviceUpload,
	GetDivceModelRefer,
	GetOrganDepts,
	GetOrganDeptsss
} from '@/services/device';
import pathToRegexp from 'path-to-regexp';
//service
export default {
	namespace: 'deviceImport',

	state: {
		name_space: 'deviceImport',
		data:{
			org:[],
			tempid:[],
			dept:[],
			list:{
				deptId:'',
			}
		}

	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/device/import').exec(pathname)) {
					dispatch({ type: 'query' });
				}
			});
		},
	},

	effects: {
		*query({ payload = {} }, { call, put }){
			const reponse = yield call(GetDivceModelRefer)
			const reponse1 = yield call(GetOrganDepts)
			if(reponse.successed==true&&reponse1.successed==true){
				yield put({
					type:"changetempid",
					payload:{
						org:reponse1.result,
						temp:reponse.result
					}
				})
			}else{
				message.error(reponse.errMessage,reponse1.errMessage)
			}
		},
		*querdept({ payload = {} }, { select,call, put }){
			const reponse = yield call(GetOrganDeptsss,payload)
			if(reponse.successed==true){
				yield put({
					type:"changedept",
					payload:reponse.result
				})
			}
		},
		* importSingle({ payload = {} }, { call, put }) {
			payload.inDate = moment(Date.now()).format("YYYY-MM-DD")
			payload.deviceModelId=""
			const { successed, errMessage, result } = yield call(importSignDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('导入成功！')
			history.goBack();
		},
		* importBatch({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(importBatchDeviceReady, payload);
			if (!successed) return message.error(errMessage)
			
			yield put({ type: 'importBatchDeviceUpload', payload: payload });
		},

		* importBatchDeviceUpload({ payload }, { call, put }) {
			const { successed, errMessage, result } = yield call(importBatchDeviceUpload, { file: payload.file });
			if (!successed) return message.error(errMessage);

			message.success('批量导入成功！')
			history.goBack();
		}
	},

	reducers: {
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
		changetempid(state, { payload }){
			state.data.tempid  = payload.temp
			state.data.org = payload.org
			return{
				...state
			}
		},
		changedept(state, { payload }){
			state.data.dept  = payload
			state.data.list.deptId=payload[0].organId
			return{
				...state
			}
		}
	},
};
