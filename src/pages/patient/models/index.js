
import pathToRegexp from 'path-to-regexp';
import {GetDisabledTypeRefer,GetNcdTypeRefer,ImportPatientFromExcel} from "@/services/patient"
//service
export default {
	namespace: 'patient',

	state: {
		name_space: 'patient',
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		},
		selectedList: [],
		showadd:false
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/patient').exec(pathname)) {
					dispatch({ type: 'queryList' ,payload:""});
				}
			});
		},
	},

	effects: {
		// 登录
		* queryList({ payload = {} }, { call, put }) {
			let query  ={
				name: payload.name || null,
				idNo: payload.idNo || null,
				mobile: null,
				ageMax: null,
				ageMin: null,
				gender: null,
				ncdType: payload.mbType || null,
				disabledType: payload.disabledType || null,
				pageSize: 5,
				pageIndex: 1
			  }
			if(payload){
				var response = yield call(ImportPatientFromExcel,query)
			}else{
				var response = yield call(ImportPatientFromExcel,query)
			}
				
			var list =response.result.datas;
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
		*changeshow({ payload = {} }, { call, put }){
				yield put({
					type:'setshow',
					payload
				})
		}
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
		setshow(state, { payload }) {
			state.showadd=payload
			return {
				...state,
			};
		},
	},
};
