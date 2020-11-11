import pathToRegexp from 'path-to-regexp';
import {QueryUsers,GetOrganRefer,SaveUser,RegisterUserAsOrgAdminstrators,queryOrgList,BlockUser,UnBlockUser} from "@/services/org"
import {message} from "antd"
export default {
    namespace:'listuser',
    state:{
        loading:true,
        pationage:{
            current:1,
            pageSize:10,
            total:0
        },
        searchfrom:{
            condition:"",
            orgId:"",
            orglist:[]
        },
        orgIds:"",
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
            state.searchfrom.condition = payload.search.condition
            state.searchfrom.orgId = payload.search.orgId
            state.pationage.total = payload.userlist.totalCount
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
        },
        changeorg(state,{payload}){
            state.orgIds = payload
            return{
                ...state
            }
        },
    },
    effects:{
        *initlist({payload={}},{select,call,put}){
            let searchfrom = yield select(state=>state.listuser.searchfrom)
              if(payload.page){
                    if(payload.search){//查询
                        let lists = {
                            condition:payload.search.condition,
                            orgId:payload.search.orgId,
                            pageSize:10,
                            pageIndex:1    
                        }
                        const reponse = yield call(QueryUsers,lists)
                        yield put({
                            type:"changelist",
                            payload:{
                                userlist:reponse.result,
                                search:payload.search
                            }
                        })                       
                    }else{//翻页
                        let lists = {
                            condition:searchfrom.condition,
                            orgId:searchfrom.orgId,
                            pageSize:10,
                            pageIndex:payload.page  
                        }
                        const reponse = yield call(QueryUsers,lists)
                        yield put({
                            type:"changepagelist",
                            payload:{
                                userlist:reponse.result,
                            }
                        })
                    }
              }else{//初始化
                let lists = {
                    condition:"",
                    orgId:"",
                    pageSize:10,
                    pageIndex:1    
                }
                const reponse = yield call(QueryUsers,lists)
                const reponse1 = yield call(GetOrganRefer)
                yield put({
                    type:"changedata",
                    payload:{
                         userlist:reponse.result,
                         search:reponse1.result
                    }
                })
              }
        },
        *changeloading({payload={}},{select,call,put}){
            yield put({
                type:"loading",
                payload
            })
        },
        *getorg({payload={},callback},{call,put}){
            const response = yield call(queryOrgList, payload)
            if(response.successed==true){
                const orgs =response.result.organs
                yield put({
                    type:'changeorg',
                    payload:orgs
                })
                callback && callback(true)
            }
        },
        *changeuserstate({payload={},callback},{call,put}){
            if(payload.ischeck){
                var response = yield call(UnBlockUser, payload.userId)
            }else{
                var response = yield call(BlockUser, payload.userId)
            }
            if(response.successed==true){
                if(payload.ischeck){
                    message.success("启用成功")
                }else{
                    message.success("禁用成功")
                }
                callback && callback()
            }else{
                if(payload.ischeck){

                    message.error("启用失败"+response.errMessage)
                    return
                }else{
                    message.error("禁用失败"+response.errMessage)
                    return
                }
            }
        },
        *regesiterusers({payload={},callback},{call,put}){
            if(payload.isadmin=="1"){
                 var reponse =yield call(RegisterUserAsOrgAdminstrators,payload)
            }else if(payload.isadmin=="0"){
                 var reponse =yield call(SaveUser,payload)
               
            }    
            if(reponse.successed==true){
                message.success("注册成功")
                callback()
                // history.push("/regsiter")
                // yield put({
                //     type:'resetorg',
                //     payload:{}
                // })
                // history.pushState()
            }else{
                message.error("注册失败"+reponse.errMessage)
            }

        }
    },
    subscriptions:{
        start({dispatch,history}){
                return history.listen(({pathname,query})=>{
                    if(pathToRegexp("/userslist").exec(pathname)){
                        dispatch({type:"initlist"})
                        setTimeout(function(){
                            dispatch({type:"changeloading",payload:false})
                        },1000)

                    }
                })
        }
    }
}