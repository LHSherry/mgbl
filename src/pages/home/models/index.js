//service
import pathToRegexp from 'path-to-regexp';
import {getAgeList,cricle,cricle1,cricle2,parentPrecent,alarm,pie} from "./pictureData"
import {GetAlarmInfo,
	GetPatientInfo,
	GetDeviceProvideInfo,
	GetPatientInfo_Age,
	GetPatientNewInfo,
	GetAlarmNewInfo,
	GetPatientChartInfo,
	GetAlarmChartInfo} from "@/services/home"
export default {
	namespace: 'homeAarray',

	state: {
        name_space: 'homeAarray',
		AlarmInfo:[],
		PatientInfo:[],
		DeviceProvideInfo:[],
		ageList:null,
		cricleList:null,
		cricleList1:null,
		cricleList2:null,
		parentList:null,
		alarmList:null,
		devcieList:null
	},
	effects: {
        *getlist({payload},{ call, put }){
			const reponse1 = yield call(GetAlarmInfo,payload)//报警信息
			const reponse2 = yield call(GetPatientInfo,payload)//患者信息
			const reponse3 = yield call(GetDeviceProvideInfo,payload)//设备信息
			const reponse4 = yield call(GetPatientInfo_Age,payload)//年龄统计
			const reponse5 = yield call(GetPatientChartInfo,payload)//近6个月患者新增趋势
			const reponse6 = yield call(GetAlarmChartInfo,payload)//近6个月报警新增趋势
			if(reponse1.successed==true){
				yield put({
					type:"changeAlarmInfo",
					payload:reponse1.result
				})
			}
			if(reponse2.successed==true){
				yield put({
					type:"changePatientInfo",
					payload:reponse2.result
				})				
			}
			if(reponse3.successed==true){
				let List =  pie(reponse3.result)
				yield put({
					type:"changedevcieList",
					payload:List
				})	
				yield put({
					type:"changeDeviceProvideInfo",
					payload:reponse3.result
				})			
			}
			if(reponse4.successed==true){
				let List =  getAgeList(reponse4.result)
				yield put({
					type:"changeageList",
					payload:List
				})			
			}
			if(reponse5.successed==true){
				let List =  parentPrecent(reponse5.result)
				yield put({
					type:"changeparentList",
					payload:List
				})			
			}
			if(reponse6.successed==true){
				let List = yield alarm(reponse6.result)
				yield put({
					type:"changealarmList",
					payload:List
				})			
			}
			let circleData = cricle(reponse2.result.patientSignRate)
			let circleData1 = cricle1(reponse1.result.timelyRate,)
			let circleData2 = cricle2(reponse3.result.provideRate)
			yield put({
				type:"changecricleList",
				payload:{
					circleData,
					circleData1,
					circleData2
				}
			})
        }
	},
	reducers: {
        changeAlarmInfo(state,{payload}){
			state.AlarmInfo = payload
			return {
				...state
			}
		},
        changePatientInfo(state,{payload}){
			state.PatientInfo = payload
			return {
				...state
			}
		},
		changeDeviceProvideInfo(state,{payload}){
			state.DeviceProvideInfo = payload
			return {
				...state
			}
		},
		changedevcieList(state,{payload}){
			state.devcieList = payload
			return {
				...state
			}
		},
		changeageList(state,{payload}){
			state.ageList = payload
			return {
				...state
			}
		},
		changecricleList(state,{payload}){
			state.cricleList = payload.circleData
			state.cricleList1 = payload.circleData1
			state.cricleList2 = payload.circleData2
			return {
				...state
			}
		},
		changeparentList(state,{payload}){
			state.parentList = payload
			return {
				...state
			}
		},
		changealarmList(state,{payload}){
			state.alarmList = payload
			return {
				...state
			}
		},
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/').exec(pathname)) {
					dispatch({ type: 'getlist' ,payload:""});
				}
			});
		},
	},
};
