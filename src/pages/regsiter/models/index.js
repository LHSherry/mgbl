import pathToRegexp from 'path-to-regexp';
import {SaveUser,RegisterUserAsOrgAdminstrators,queryOrgList} from "@/services/org"
import {history} from "umi"
import {message} from "antd"
export default {
    namespace:'regsiteruser',
    state:{
        list:{}
    },
    reducers:{
        changeorg(state,{payload}){
            state.list={}
            state.list.orgIds = payload
            return{
                ...state
            }
        },
        // resetorg(state,{payload}){
        //     state.list = payload
        //     return{
        //         ...state
        //     }
        // }
    },
    effects:{
        *getorg({payload={}},{call,put}){
            const response = yield call(queryOrgList, payload)
            if(response.successed==true){
                const orgs =response.result.organs
                yield put({
                    type:'changeorg',
                    payload:orgs
                })
            }
        },
        *regesiterusers({payload={}},{call,put}){
            if(payload.isadmin=="1"){
                 var reponse =yield call(RegisterUserAsOrgAdminstrators,payload)
            }else if(payload.isadmin=="0"){
                 var reponse =yield call(SaveUser,payload)
               
            }    
            if(reponse.successed==true){
                message.success("注册成功")
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
                return history.listen(({url,query})=>{
                    if(pathToRegexp("/reigter").exec(url)){
                        // dispatch({type:"getorg"})
                    }
                })
        }
    }
}