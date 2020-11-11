/*
 * @Description: 设备实例model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:02:55
 */
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import moment from "moment"
import {
	getDeviceQuerySource,
	getDeviceList,
	deleteDevice,
	reclaimDevice,
	scrapDevice,
	provideDevice,
	QueryProvideDevicePlans,
	importBatchDeviceAdminReady,
	importBatchDeviceReady
} from '@/services/device'

//service
export default {
	namespace: 'device',

	state: {
		name_space: 'device',
		queryParams: {},
		querySource: {
			deviceTypes: [],
			status: [],
		},
		selectedList: [],
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		},
		plans:[],
		sendvlue:"",
		sendshow:false
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/device').exec(pathname)) {
					dispatch({ type: 'clear' });

					dispatch({ type: 'getQuerySource' });
					dispatch({ type: 'queryList' });
				}
			});
		},
	},

	effects: {
		* getQuerySource({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(getDeviceQuerySource);
			if (!successed) return message.error(errMessage);

			yield put({
				type: 'changeState',
				payload: {
					querySource: {
						depts: result.depts,
						deviceTypes: result.deviceTypes,
						status: result.status.map(obj => ({ ...obj, value: obj.value, name: obj.status })),
					}
				}
			})
		},
		*queruyplans({ payload = {} ,onfocus}, { call, put }){
			const reponse = yield call(QueryProvideDevicePlans,payload)
			if(reponse.successed==true){
				if(reponse.result.length>0){
					message.info("查询到数据")
					onfocus()
				}else{
					message.info("没有数据可查询")
				}
				yield put({
					type:'changeplans',
					payload:reponse.result.patient_Plans
				})
			}
		},
		*send({ payload = {} }, {select,call, put }){
			const palns = yield select(state=>state.device.plans)
			let list ={
				patientId:palns[0].patientId,
				sn:payload
			}
			const reponse = yield call(provideDevice,list)
			if(reponse.successed==true){
				if(reponse.result.successed==true){
					message.success("发放成功")
				}else{
					message.error("发放失败"+reponse.result.errMessage)
				}
					yield put({
						type:"queruyplans"
					})
			}
		},
		*showsend({ payload = {} }, {select,call, put }){
			yield put({
				type:'showchangesend',
				payload:payload
			})
		},
		*resetlist({ payload = {} }, {select,call, put }){
			yield put({
				type:'changeplans',
				payload:""
			})
		},
		*senvalueschange({ payload = {} }, {select,call, put }){
			const sendvlue = yield select(state=>state.device.sendvlue)
			let str = sendvlue+payload
			yield put({
				type:"sendvlueexchenge",
				payload:str
			})
			
		},
		*getlost({ payload = {},resolve,reject}, { call, put }){
			payload.inDate = moment(Date.now()).format("YYYY-MM-DD")
			payload.deviceModelId=""
			payload.validMonths=Number(payload.validMonths)
			// console.log(typeof payload.validMonths, payload.validMonths);
			const response = yield call(importBatchDeviceReady,payload)
			if(response.successed==true){
				message.success("第一步成功,请上传execel")
				resolve(true)
			}else{
				reject(false)
				message.error(response.errMessage)
			}
		},
		* queryList({ payload = {} }, { call, put }) {
			payload = {
				pageIndex: 1,
				pageSize: 10,
				deviceTypes: [],
				status: [],
				depts: [],
				...payload
			}

			const { successed, errMessage, result } = yield call(getDeviceList, payload);
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

		* deleteDevice({ payload = {} }, { select, call, put }) {
			const { successed, errMessage, result } = yield call(deleteDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('删除成功')
			const { queryParams } = yield select(({ device }) => device);
			yield put({ type: 'queryList', payload: queryParams })
		},

		// 归还设备
		* reclaimDevice({ payload = {}, callback }, { select, call, put }) {
			const { successed, errMessage, result } = yield call(reclaimDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('操作成功')
			callback && callback()
			const { queryParams } = yield select(({ device }) => device);
			yield put({ type: 'queryList', payload: queryParams })


		},

		// 报废设备
		* scrapDevice({ payload = {}, callback }, { select, call, put }) {
			const { successed, errMessage, result } = yield call(scrapDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('操作成功')
			callback && callback()
			const { queryParams } = yield select(({ device }) => device);
			yield put({ type: 'queryList', payload: queryParams })
		},

		// 发放设备
		* provideDevice({ payload = {}, callback }, { select, call, put }) {
			const { successed, errMessage, result } = yield call(provideDevice, payload);
			if (!successed) return message.error(errMessage);

			message.success('操作成功')
			callback && callback()
			const { queryParams } = yield select(({ device }) => device);
			yield put({ type: 'queryList', payload: queryParams })
		},

	},

	reducers: {
		clear(state) {
			return {
				...state,
				queryParams: {},
				querySource: {
					deviceTypes: [],
					status: [],
				},
				selectedList: [],
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
		changeplans(state, { payload }) {
			state.plans = payload
			return {
				...state,
			};
		},
		sendvlueexchenge(state, { payload }) {
			state.sendvlue = payload
			return {
				...state,
			};
		},
		showchangesend(state, { payload }){
			state.sendshow = payload
			return {
				...state,
			};
		}
	},
};
