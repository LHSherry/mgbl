/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-18 15:25:30
 */

//service
import {GetUnHandleSosInfos,GetSosHandleWayRefer,CommitSosHandleResult} from "@/services/helpMap"
import {message} from "antd"
export default {
	namespace: 'helpMap',

	state: {
		name_space: 'helpMap',
		list: [],
		marklist:[],
		parent:[],
		detialshow:false,
		detilalist:{}
	},

	effects: {
		// 登录
		* queryList({ payload = {}, callback }, { select,call, put }) {
			const response = yield call(GetUnHandleSosInfos)
			if(response.successed==true){
				console.log(response)
				let {result}=response
				let lists =[]
				if(payload){
					for(var i =0;i<result.length;i++){
						let list ={}
						list.planId = result[i].planId
						list.position = [result[i].lng,result[i].lat]
						lists.push(list)
					}	
					for(var i =0;i<lists.length;i++){
							if(lists[i].planId==payload){
								let list = lists[i]
								lists.splice(i,1)
								lists.unshift(list)
							}
					}					
				}else{
					for(var i =0;i<result.length;i++){
						let list ={}
						list.planId = result[i].planId
						list.position = [result[i].lng,result[i].lat]
						lists.push(list)
					}						
				}
				yield put({
					type:"initparent",
					payload:result
				})

				callback && callback(lists)
			}
		},
		*detailparent({ payload = {}, callback }, { select,call, put }) {
			const parent = yield select(state=>state.helpMap.parent)
			const reponse = yield call(GetSosHandleWayRefer)
			const marklist = yield select(state=>state.helpMap.marklist)
			let list ={}
			for(var i =0 ;i<parent.length;i++){
				if(parent[i].planId==payload){
					list = parent[i]
				}
			}
			list.referTypes = reponse.result
			yield put({
				type: 'changeshowdetail',
				payload:true
			});
			yield put({
				type: 'changedetaillist',
				payload:list
			});
		},
		*changeshow({ payload = {}, callback }, { call, put }) {
			yield put({
				type: 'changeshowdetail',
				payload:payload
			});
		},
		*subifo({ payload = {}, callback }, { select,call, put }) {
			const detilalist = yield select(state=>state.helpMap.detilalist)
			let list ={}
			list.planId = String(detilalist.planId) 
			list.handleWay = payload.handleWay
			list.remark = payload.remark
			const reponse = yield call(CommitSosHandleResult,list)
			if(reponse.successed==true){
				message.success("提交成功")
				callback(detilalist.planId)
				yield put({
					type:"changedetaillist",
					payload:{}
				})
				yield put({
					type: 'changeshowdetail',
					payload:false
				})
			}else{
				message.error(reponse.errMessage)
			}
		},
		* queryparent({ payload = {}, callback }, { call, put }) {
			const response = yield call(GetUnHandleSosInfos)
			if(response.successed==true){
				let {result} = response
				let newlist ={}
				for(var i =0;i<result.length;i++){
					if(result[i].planId==payload){
						newlist = result[i]
					}
				}
				let list = {}
				list.position=[newlist.lng,newlist.lat]
				list.planId = newlist.planId
				callback(list)
				yield put({
					type: 'addparent',
					payload:newlist
				})
			}
		},
		* reslist({ payload = {}, callback }, {select,call, put }){
			yield put({
				type:"changedetaillist",
				payload:{}
			})
		},
		* removequeryparent({ payload = {}, callback }, {select,call, put }) {
			const parent = yield select(state=>state.helpMap.parent)
			for(var i=0;i<parent.length;i++){
				if(parent[i].planId==payload){
					parent.splice(i,1)
				}
			}
			// yield put({
			// 	type: 'removeparent',
			// 	payload:list
			// });
		},
		* addmark({ payload = {}, callback }, { call, put }) {
			yield put({
				type: 'setmarkdata',
				payload:payload
			});
		},
		* addlostmark({ payload = {}, callback }, {select,call, put }) {
			const marklist = yield select(state=>state.helpMap.marklist)
			for(var i=0;i<payload.length;i++){
				marklist.push(payload[i])
			}
		},
		* addlostparent({ payload = {}, callback }, { call, put }) {
			const parent = yield select(state=>state.helpMap.parent)
			for(var i=0;i<payload.length;i++){
				parent.push(payload[i])
			}
		},
		* removemark({ payload = {}, callback }, { select,call, put }) {
			const marklist = yield select(state=>state.helpMap.marklist)
			for(var i=0;i<marklist.length;i++){
				if(marklist[i].planId==payload){
					marklist.splice(i,1)
				}
			}
			// yield put({
			// 	type: 'removemarkdata',
			// 	payload:payload
			// });
		},
	},

	reducers: {
		initparent(state, { payload }) {
			state.parent = payload
			return {
				...state,
			};
		},
		setmarkdata(state, { payload }) {
			state.marklist.push(payload)
			return {
				...state
			};
		},
		removemarkdata(state, { payload }) {
			state.marklist.push(payload)
			return {
				...state
			};
		},
		addparent(state, { payload }){
			state.parent.push(payload)
			return{
				...state
			}
		},
		removeparent(state, { payload }){
			state.parent.push(payload)
			return{
				...state
			}
		},
		changeshowdetail(state, { payload }){
			state.detialshow = payload
			return{
				...state
			}
		},
		changedetaillist(state, { payload }){
			state.detilalist = payload
			return{
				...state
			}
		}
	},
};
