/*
 * @Description: 合同列表 model
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 09:55:22
 */
import pathToRegexp from 'path-to-regexp';
import   {GetTemplates,
		 QueryTemplates,
		 CreateNewONCDContract,
		 CommitEditContractBaseInfo,
		 CommitEditContractServiceSubjects,
		 CommitEditContractDeviceSubjects,
		 CommitEditContractOver,
		 CancelTemplateEdit,
		 GetImportPatientTemplate,
		 PrepareBatchSignContract,
		 BatchSignCommitBaseInfo,
		 EditContractTemplate,
		 CancelBatchSignContract,
		 DeleteTemplate,
		 GetOrganDepts,
		 CloseBatchProvide,
		 BatchProvide,
		 PreperyBatchProvide} from "@/services/contract"
import {message} from "antd"
//service
export default {
	namespace: 'contract',

	state: {
		name_space: 'contract',
		list: [],
		pagination: {
			current: 1,
			pageSize: 5,
			total: 0,
		},
		searchFrom:{
			contratcType:true,
			name:""
		},
		step1:{},
		step2:{},
		step3:{},
		step4:{},
		contorstep:{
			current:0,
			step1State:'process',
			step2State:"wait",
			step3State:"wait",
			step4State:"wait"
		},
		showstep:false,
		loading:false,
		signcontract:false,
		sign:{},
		signstep:{
			tempid:"",
			current:0,
			signstep1State:'process',
			signstep2State:"wait",
			signstep3State:"wait",				
		},
		DeviceList:'',
		takesid:""
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/contract').exec(pathname)) {
					dispatch({ type: 'changeloading' });
					setTimeout(function(){
						dispatch({ type: 'queryList' });
					},500)
				}
			});
		},
	},

	effects: {
		* queryList({ payload = {} }, {select,call, put }) {
				const searchFrom = yield select(state=>state.contract.searchFrom)
				const data ={
					name:"",
					onlySelf:true,
					pageSize:5,
					pageIndex:1
				}
				const reposne = yield call(QueryTemplates,data)
				if(reposne.successed==true){
						console.log(reposne);
						yield put({
							type:'changeState',
							payload:reposne.result
						})
				}
		},
		*page({ payload = {} }, {select,call, put }){
			const searchFrom = yield select(state=>state.contract.searchFrom)
			const pagination = yield select(state=>state.contract.pagination)
			pagination.current = payload
			const data ={
				name:searchFrom.name,
				onlySelf:searchFrom.contratcType,
				pageSize:5,
				pageIndex:payload
			}
			const reposne = yield call(QueryTemplates,data)
			if(reposne.successed==true){
					console.log(reposne,111);
					yield put({
						type:'changeState',
						payload:reposne.result
					})
					yield put({
						type:"setloading",
						payload:false
					})
			}
		},
		*queryEditList({ payload = {} }, {select,call, put }){
			const searchFrom = yield select(state=>state.contract.searchFrom)
			const pagination = yield select(state=>state.contract.pagination)
			const data ={
				name:searchFrom.namee,
				onlySelf:searchFrom.contratcType,
				pageSize:5,
				pageIndex:pagination.current
			}
			const reposne = yield call(QueryTemplates,data)
			if(reposne.successed==true){
					yield put({
						type:'changeState',
						payload:reposne.result
					})
					yield put({
						type:"setloading",
						payload:false
					})
			}
		},
		* searchList({ payload = {} }, {select,call, put }) {
			const searchFrom = yield select(state=>state.contract.searchFrom)
			searchFrom.name = payload.name
			searchFrom.contratcType = payload.contratcType
			const data ={
				name:payload.name,
				onlySelf:payload.contratcType,
				pageSize:5,
				pageIndex:1
			}
			const reposne = yield call(QueryTemplates,data)
			if(reposne.successed==true){
					yield put({
						type:'changeState',
						payload:reposne.result
					})
					yield put({
						type:"setloading",
						payload:false
					})
			}
	},
	*Editstep1({ payload = {} }, {select,call, put }){
		const reponse = yield call(EditContractTemplate,payload)
		if(reponse.successed==true){
			yield put({
				type:'setstep1data',
				payload:reponse.result
			})
		}else{
			message.error(reponse.errMessage)
		}
	},
	*step1({ payload = {} }, {select,call, put }){
		const reponse = yield call(CreateNewONCDContract)
		if(reponse.successed==true){
			yield put({
				type:'setstep1data',
				payload:reponse.result
			})
		}else{
			message.error(reponse.errMessage)
		}
	},
	*step2({ payload = {} }, {select,call, put }){
		const step1= yield select(state=>state.contract.step1)
		payload.id=step1.data.id
		payload.organId=step1.data.organId
		const reponse = yield call(CommitEditContractBaseInfo,payload)
		if(reponse.successed==true){
			step1.data.name = payload.name
			step1.data.memo = payload.memo
			step1.data.contractType =payload.contractType
			step1.data.datePeriod =payload.datePeriod
			step1.data.periodLen=payload.periodLen
			step1.data.isShare=payload.isShare
			yield put({
				type:'setstep1data',
				payload:step1
			})			
			let data={
				step1State:"finish",
				step2State:"process",
				step3State:"wait",
				step4State:"wait"
			  }
			yield put({
				type:'setcurrent',
				payload:1
			})
			yield put({
				type:'setcurrentState',
				payload:data
			})
			let checkedList = []
			reponse.result.map((item,index)=>{
				if(item.checked){
					checkedList.push(item.srvId)
				}
			})
			let result = {
				data:reponse.result,
				checkedList
			}
			yield put({
				type:'setstep2data',
				payload:result
			})
		}else{
			message.error(reponse.errMessage)
		}
	},
	*step3({ payload = {} }, {select,call, put }){
		const step2= yield select(state=>state.contract.step2)

		for(var i=0;i<step2.data.length;i++){
			for(var j=0;j<step2.checkedList.length;j++){
				if(step2.data[i].srvId==step2.checkedList[j]){
					console.log(111);
					step2.data[i].checked=true
				}
			}
		}

		const reponse = yield call(CommitEditContractServiceSubjects,step2.data)
		if(reponse.successed==true){
			let checkedList = []
			reponse.result.deviceSubjects.map((item,index)=>{
				if(item.checked){
					checkedList.push(item.deviceModelId)
				}
			})
			let list ={
				checkedList,
				data:reponse.result
			}
			yield put({
				type:"setstep3data",
				payload:list
			})
			
			let data={
				step1State:"finish",
				step2State:"finish",
				step3State:"process",
				step4State:"wait"
			  }
			yield put({
				type:'setcurrent',
				payload:2
			})
			yield put({
				type:'setcurrentState',
				payload:data
			})
		}else{
			message.error(reponse.errMessage)
		}
	},
	*step4({ payload = {} }, {select,call, put }){
		const step3= yield select(state=>state.contract.step3)
		for(var i =0;i<step3.data.deviceSubjects.length;i++){
			for(var j =0;j<step3.checkedList.length;j++){
				if(step3.data.deviceSubjects[i].deviceModelId=step3.checkedList[j]){
					step3.data.deviceSubjects[i].checked=true
				}
			}
		}
		const reponse = yield call(CommitEditContractDeviceSubjects,step3.data.deviceSubjects)
		if(reponse.successed==true){
			const reponse1 = yield call(CommitEditContractOver,reponse.result)
			if(reponse1.successed==true){
				message.success("提交成功")
				yield put({
					type:"reststeplist"
				})
				yield put({
					type:'setcurrent',
					payload:3
				})
				let data={
					step1State:"finish",
					step2State:"finish",
					step3State:"finish",
					step4State:"finish"
				  }
				yield put({
					type:'setcurrentState',
					payload:data
				})
				yield put({
					type:'setstep4data',
					payload:data
				})
			}else{
				message.error("提交失败"+reponse1.errMessage)
			}
			// yield put({
			// 	type:'setstep1data',
			// 	payload:""
			// })
		}else{
			message.error(reponse.errMessage)
		}
	},
	*stpechecktype({ payload = {} }, {select,call, put }){
		const step3= yield select(state=>state.contract.step3)
		if(payload.deliverType !== ""){
				for(var i = 0;i<step3.data.deviceSubjects.length;i++){
					if(step3.data.deviceSubjects[i].deviceModelId==payload.deviceModelId){
						step3.data.deviceSubjects[i].deliverType=payload.deliverType
					}
				}
		}else if(payload.leaseTermPeriod !== ""){
			for(var i = 0;i<step3.data.deviceSubjects.length;i++){
				if(step3.data.deviceSubjects[i].deviceModelId==payload.deviceModelId){
					step3.data.deviceSubjects[i].leaseTermPeriod=payload.leaseTermPeriod
				
				}
			}			
		}
		// yield put({
		// 	  type:"setstpechecktype",
		// 	  payload:step3
		// })
	},
	*download({ payload = {} }, {select,call, put }){
		const reponse = yield call(GetImportPatientTemplate)	

		console.log(reponse);
	},
	*BatchDevice({ payload = {} }, {select,call, put }){
		const reponse = yield call(	BatchProvide,payload)	
		if(reponse.successed==true){
			message.success("发放成功,如需继续,请再次扫描设备")
			yield put({
				type:"setsendlist",
				payload:reponse.result
			})
		}else{
			message.error("发放失败,"+reponse.errMessage+",请重试")
			return
		}
	},
	*subinfo({ payload = {} }, {select,call, put }){
		let list ={}
		const sing = yield select(state=>state.contract.signstep)
		list.organId=payload.organId
		list.deptId=payload.deptId
		list.templateId = sing.tempid
		const reponse = yield call(BatchSignCommitBaseInfo,list)
		if(reponse.successed==true){
			message.success("提交成功")
			let data={
				current:1,
				step1State:"finish",
				step2State:"process",
				step3State:"wait"
			}
			yield put({
				type:"setsigntepstate",
				payload:data
			})
		}
	},
	*changeloading({ payload = {} }, {select,call, put }){
			yield put({
				type:"setloading",
				payload:payload
			})
	},
	*closedevicesend({ payload = {} }, {select,call, put }){
		const reponse = yield call(CloseBatchProvide)
		reponse.successed && message.success("成功取消批量发放")
		!reponse.successed && message.error("取消批量发放失败"+reponse.errMessage)
	},
	*changeshowstep({ payload = {} }, {select,call, put }){
		yield put({
			type:"setshowstep",
			payload:payload
		})
	},
	*changesignshow({ payload = {} }, {select,call, put }){
		if(payload){
			const reponse = yield call(PrepareBatchSignContract)
			 if(reponse.successed==true){
				yield put({
					type:"setsignshow",
					payload:payload
				})
				yield put({
					type:"setsigndata",
					payload:reponse.result
				})
			}else{
				message.error(errMessage)
			}
		}else{
			yield put({
				type:"setsignshow",
				payload:payload
			})
		}

	},
	*signextteps({ payload = {} }, {select,call, put }){
		const reponse = yield call(BatchSignContract_CommitBaseInfo)
	},
	*sendstep({ payload = {} }, {select,call, put }){
		const takesid = yield select(state=>state.contract.takesid)
		const reponse = yield call(PreperyBatchProvide,takesid)
		if(reponse.successed){
			let data={
				current:2,
				step1State:"finish",
				step2State:"finish",
				step3State:"process"
			}
			yield put({
				type:"setsigntepstate",
				payload:data
			})
			yield put({
				type:"setsendlist",
				payload:reponse.result
			})
		}
	},
	*changecurrenttepState({ payload = {} }, {select,call, put }){
		yield put({
			type:"setcurrentState",
			payload:payload
		})
	},
	*changecurrent({ payload = {} }, {select,call, put }){
		yield put({
			type:"setcurrent",
			payload:payload
		})
	},
	*changecheckstep2({ payload = {} }, {select,call, put }){//设置选择step2
		const step2= yield select(state=>state.contract.step2)
		for(var i=0;i<step2.data.length;i++){
			for(var j=0;j<step2.checkedList.length;j++){
				if(step2.data[i].srvId==step2.checkedList[j]){
					step2.data[i].checked=true
				}else{
					step2.data[i].checked=false
				}
			}
		}
		yield put({
			type:"setcheckstep2",
			payload:payload
		})
	},
	*changecheckstep3({ payload = {} }, {select,call, put }){//设置选择step3
		const step3= yield select(state=>state.contract.step3)
		for(var i=0;i<step3.data.deviceSubjects.length;i++){
			for(var j=0;j<step3.checkedList.length;j++){
				if(step3.data.deviceSubjects[i].srvId==step3.checkedList[j]){
					step3.data.deviceSubjects[i].checked=true
				}else{
					step3.data.deviceSubjects[i].checked=false
				}
			}
		}		
		yield put({
			type:"setcheckstep3",
			payload:payload
		})
	},
	*changetempid({ payload = {} }, {select,call, put }){//设置选择step3
		yield put({
			type:"settempid",
			payload:payload
		})
	},
	*deletcontract({ payload = {} }, {select,call, put }){//删除
			const reponse = yield call(DeleteTemplate,payload)
			if(reponse.successed==true){
				message.success("删除成功")
				const searchFrom = yield select(state=>state.contract.searchFrom)
				const pagination = yield select(state=>state.contract.pagination)
				const data ={
					name:searchFrom.name,
					onlySelf:searchFrom.contratcType,
					pageSize:5,
					pageIndex:pagination.current
				}
				const reposne1 = yield call(QueryTemplates,data)
				if(reposne1.successed==true){
						yield put({
							type:'changeState',
							payload:reposne1.result
						})
						yield put({
							type:"setloading",
							payload:false
						})
				}
			}else{
				message.error("删除失败"+reponse.errMessage)
			}
	},
	*getdpit({ payload = {} }, {select,call, put }){
		const reponse = yield call(GetOrganDepts,payload)
		const sign = yield select(state=>state.contract.sign)
		sign.info.organId = payload
		if(reponse.successed==true){
			yield put({
				type:"setdepts",
				payload:reponse.result
			})
		}else{
			message.error(reponse.errMessage)
		}

	},
	*restStep({ payload = {} }, {select,call, put }){//清空
		const reponse = yield call(CancelTemplateEdit)
		yield put({
			type:"reststeplist",
		})
	  },
	  *restsign({ payload = {} ,callback}, {select,call, put }){//清空
		const takesid = yield select(state=>state.contract.takesid)
		let reponse
		if(takesid){
			reponse = yield call(CloseBatchProvide)
		}else{
			reponse = yield call(CancelBatchSignContract)
		}
		if(reponse.successed==true){
			message.info("已经成为你取消")
		}else{
			message.error(reponse.errMessage)
		}
		yield put({
			type:"restsigndata",
		})
	  },
		*settken({ payload = {},callback}, {select,call, put }){
			yield put({
				type:"settokendata",
				payload
			})	
			callback()
		}
		// *changepage({ payload = {} }, {select,call, put }){
		// 	const pagination = yield select(state=>state.contract.pagination)
		// 	pagination.current = pagination.current + 1
		// }
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
		setloading(state, { payload }){
			state.loading = payload
			return {
				...state
			};
		},
		changeState(state, { payload }) {
			state.list = payload.datas
			state.pagination.total = payload.totalCount
			return {
				...state
			};
		},
		setshowstep(state, { payload }){
			state.showstep = payload
			return{
				...state
			}
		},
		setsignshow(state, { payload }){
			state.signcontract = payload
			return{
				...state
			}
		},
		setstep1data(state, { payload }){
			state.step1 = payload
			return{
				...state
			}
		},
		setstep2data(state, { payload }){
			state.step2 = payload
			return{
				...state
			}
		},
		setstep3data(state, { payload }){
			state.step3 = payload
			return{
				...state
			}
		},
		setstep4data(state, { payload }){
			state.step4 = payload
			return{
				...state
			}
		},
		setsigndata(state, { payload }){
			state.sign = payload
			return{
				...state
			}
		},
		setsigntepstate(state, { payload }){
			state.signstep.current=payload.current
			state.signstep.signstep1State = payload.step1State
			state.signstep.signstep2State = payload.step2State
			state.signstep.signstep3State = payload.step3State
			return{
				...state
			}
		},
		setsendlist(state, { payload }){
			state.DeviceList=payload
			return{
				...state
			}
		},
		setdepts(state, { payload }){
			state.sign.depts=payload
			state.sign.info.deptId=payload[0].organId
			return{
				...state
			}			
		},
		setcurrentState(state, { payload }){
			payload.step1State  && (state.contorstep.step1State = payload.step1State)	
			payload.step2State  && (state.contorstep.step2State = payload.step2State)	
			payload.step3State  && (state.contorstep.step3State = payload.step3State)	
			payload.step4State  && (state.contorstep.step4State = payload.step4State)	
			return{
				...state
			}
		},
		setcurrent(state, { payload }){
			state.contorstep.current = payload
			return{
				...state
			}
		},
		setcheckstep2(state, { payload }){
			state.step2.checkedList = payload
			return{
				...state
			}		
		},
		setcheckstep3(state, { payload }){
			state.step3.checkedList = payload
			return{
				...state
			}	
		},
		setstpechecktype(state, { payload }){
			state.step3 = payload
			return{
				...state
			}
		},
		settempid(state, { payload }){
			state.signstep.tempid = payload
			return{
				...state
			}
		},
		settokendata(state, { payload }){
			state.takesid = payload
			return{
				...state
			}
		},
		reststeplist(state, { payload }){
			state.step1={}
			state.step2={}
			state.step3={}
			state.step4={}
			return{
				...state
			}		
		},
		restsigndata(state, { payload }){
			state.sign = {}
			state.signstep={
				tempid:"",
				current:0,
				signstep1State:'process',
				signstep2State:"wait",
				signstep3State:"wait",			
			}
			state.DeviceList={}
			state.takesid = ""
			return{
				...state
			}	
		}
	},

};
