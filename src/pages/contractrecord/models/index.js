import pathToRegexp from 'path-to-regexp';
import {QueryBatchSignTask,BatchProvide,PreperyBatchProvide} from "@/services/contract"
import {GetOrganRefer} from "@/services/org"
import {history} from "umi"
import {message} from "antd"
import moment from "moment"
export default {
    namespace:'recordlistcontract',
    state:{
        list:[],
        orglist:[],
        searchFrom:{
            orgId:null,
            templateName:null,
            startTime:null,
            endTime:null,
            pageSize:5,
            pageIndex:1
        },
       DeviceList:""
    },
    reducers:{
        setorg(state,{payload}){
            state.orglist= payload
            return{
                ...state
            }
        },
        setlist(state,{payload}){
            state.list= payload
            return{
                ...state
            }
        },
        setpage(state,{payload}){
            state.searchFrom.pageIndex= payload
            return{
                ...state
            }
        },
        setsearch(state,{payload}){
            state.searchFrom.pageIndex= 1   
            state.searchFrom.orgId= payload.orgId
            state.searchFrom.templateName= payload.templateName
            state.searchFrom.startTime= payload.startTime
            state.searchFrom.endTime= payload.endTime
            return{
                ...state
            }
        },
        setDeviceDATA(state,{payload}){
            state.DeviceList = payload
            return{
                ...state
            }
        }
    },
    effects:{
        *queryList({payload={}},{select,call,put}){
            const searchFrom = yield select(state=>state.recordlistcontract.searchFrom)
            if(searchFrom.startTime){
                searchFrom.startTime =  moment(searchFrom.startTime).format("YYYY-MM-DD")
            }
            if(searchFrom.endTime){
                searchFrom.endTime =  moment(searchFrom.endTime).format("YYYY-MM-DD")
            }
            const response = yield call(QueryBatchSignTask,searchFrom)
            if(response.successed==true){
                const orgs =response.result
                yield put({
                    type:'setlist',
                    payload:orgs
                })
            }
        },
        *queryOrgList({payload={}},{call,put}){
            const response = yield call(GetOrganRefer)
            if(response.successed==true){
                const orgs =response.result
                yield put({
                    type:'setorg',
                    payload:orgs
                })
            }
        },
        *BatchDevice({ payload = {},callback }, {select,call, put }){
            const reponse = yield call(	BatchProvide,payload)	
            if(reponse.successed==true){
                message.success("发放成功,如需继续,请再次扫描设备")
                yield put({
                    type:"setDeviceDATA",
                    payload:reponse.result
                })
            }else{
                message.error("发放失败,"+reponse.errMessage+",请重试")
                return
            }
        },
        *setDevicelist({payload={},callback},{call,put}){
            const reponse = yield call(PreperyBatchProvide,payload)
            if(reponse.successed==true){
                yield put({
                    type:"setDeviceDATA",
                    payload:reponse.result
                })
                callback(true)
            }else{
                message.error(reponse.errMessage)
            }
        },
        *changepage({payload={}},{call,put}){
                yield put({
                    type:'setpage',
                    payload:payload
                })
        },
        *changesearch({payload={}},{call,put}){
            yield put({
                type:'setsearch',
                payload:payload
            })            
        }
    },
    subscriptions:{
        start({dispatch,history}){
                return history.listen(({pathname,query})=>{
                    if(pathToRegexp("/contractrecord").exec(pathname)){
                        dispatch({type:"queryOrgList"})
                        dispatch({type:"queryList"})
                    }
                })
        }
    }
}