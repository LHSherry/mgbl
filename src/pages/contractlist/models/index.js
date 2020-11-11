import pathToRegexp from 'path-to-regexp';
import {QueryContract} from "@/services/contract"
import {GetOrganRefer} from "@/services/org"
import moment from 'moment';
import {message} from "antd"
export default {
    namespace:'listcontract',
    state:{
        loading:true,
        pationage:{
            current:1,
            pageSize:5,
            total:0
        },
        searchfrom:{
            patient:null,
            executor:null,
            signDate:"",
            orgId:"",
            orglist:[]
        },
        dataSource:[]
    },
    reducers:{
        changedata(state,{payload}){
            state.dataSource = payload.userlist.datas
            state.searchfrom.orglist = payload.search
            state.pationage.total = payload.userlist.totalCount
            return {
                ...state
            }
        },
        changelist(state,{payload}){
            state.dataSource = payload.userlist.datas
            state.searchfrom.patient = payload.search.patient
            state.searchfrom.executor = payload.search.executor
            state.searchfrom.signDate = payload.search.signDate
            state.searchfrom.orgId = payload.search.orgId
            state.pationage.total = payload.userlist.totalCount
            state.pationage.current = 1
            return {
                ...state
            }
        },
        changepagelist(state,{payload}){
            state.dataSource = payload.userlist.datas
            state.pationage.current = payload.userlist.current
            return {
                ...state
            }
        },
        loading(state,{payload}){
            state.loading=payload
            return {
                ...state
            }
        }
    },
    effects:{
        *initlist({payload={}},{select,call,put}){
            let searchfrom = yield select(state=>state.listuser.searchfrom)
              if(payload.page){
                    if(payload.search){//查询
                        if(payload.search.signDate){
                           var  signDate = moment(payload.search.signDate).format("YYYY-MM-DD")
                        }else{
                            var signDate =null
                        }
                        let lists = {
                            executor:payload.search.executor,
                            patient:payload.search.patient,
                            signDate:signDate,
                            organId:payload.search.orgId,
                            pageSize:5,
                            pageIndex:1    
                        }
                        const reponse = yield call(QueryContract,lists)
                        yield put({
                            type:"changelist",
                            payload:{
                                userlist:reponse.result,
                                search:payload.search
                            }
                        })                       
                    }else{//翻页
                        if(searchfrom.signDate){
                          var signDate = moment(searchfrom.signDate).format("YYYY-MM-DD")
                        }else{
                            signDate =null
                        }
                        let lists = {
                            patient:searchfrom.patient,
                            executor:searchfrom.executor,
                            signDate:signDate,
                            organId:searchfrom.orgId,
                            pageSize:5,
                            pageIndex:payload.page  
                        }
                        const reponse = yield call(QueryContract,lists)
                        yield put({
                            type:"changepagelist",
                            payload:{
                                userlist:reponse.result,
                            }
                        })
                    }
              }else{//初始化
                let lists = {
                    organId:"",
                    executor:"",
                    patient: "",
                    signDate:null,
                    pageSize: 5,
                    pageIndex: 1
                }       
                const reponse = yield call(QueryContract,lists)
                const reponse1 = yield call(GetOrganRefer)
                if(reponse.successed==true && reponse1.successed==true){
                    yield put({
                        type:"changedata",
                        payload:{
                             userlist:reponse.result,
                             search:reponse1.result
                        }
                    })
                }

              }
        },
        *changeloading({payload={}},{select,call,put}){
            yield put({
                type:"loading",
                payload
            })
        }
    },
    subscriptions:{
        start({dispatch,history}){
                return history.listen(({pathname,query})=>{
                    if(pathToRegexp("/contractlist").exec(pathname)){
                        dispatch({type:"initlist"})        
                        setTimeout(function(){ 
                            dispatch({type:"changeloading",payload:false}) 
                        },1000)
                    }
                })
        }
    }
}