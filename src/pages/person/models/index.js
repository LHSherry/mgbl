import pathToRegexp from 'path-to-regexp';
import {GetUser,SaveUserr} from "@/services/org"
import {ChangeUserPassword} from "@/services/login"
import {message} from "antd"
//service
export default {
	namespace: 'personManager',
	state: {
		name_space: 'personManager',
		list: {},
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathToRegexp('/person').exec(pathname)) {
					dispatch({ type: 'queryList' });
				}
			});
		},
	},

	effects: {
		* queryList({ payload = {} }, { call, put }) {
            let cookie = sessionStorage.getItem("user")
                cookie = JSON.parse(cookie)
            const response = yield call(GetUser)
            let list = {
                name:cookie.userName,
                organName:cookie.organName,
                deptName:cookie.deptName,
                stationName:cookie.stationName,
                gender:cookie.gender,
                ...response.result
            }
            yield put({
                type:"setlist",
                payload:list
            })
        },
		* changepassword({ payload = {},callback }, { call, put }) {
            let passlist = {oldPwd:payload.oldPwd
                          ,newPwd:payload.newPwd
                           }
                 const response = yield call(ChangeUserPassword,passlist)    
                 if(response.successed ==true){
                    message.success("修改成功")
                    callback()
                 }else{
                     message.error("修改失败,"+response.errMessage)
                 }      
        }, 
		* changeinfo({ payload = {} }, { select,call, put }) {
              let list = yield select(state=>state.personManager.list)
              list.userId = payload.userId
              list.idCardNo = payload.idCardNo
              list.mobile = payload.mobile
              list.email = payload.email
              list.homeAddress = payload.homeAddress
              let sublist = {
                address: null,
                birthDay: null,
                email: null,
                gender: null,
                homeAddress: null,
                homeTel: null,
                id: null,
                idCardNo: null,
                mark: null,
                mobile: null,
                name: null,
                number: null,
                officeTel: null,
                orgId: null,
                photo: null,
                userId: null,
                userType: null,
                userTypeValue: null,
              }
              for (var i in list){
                  for(var j in sublist){
                      if(i==j){
                          sublist[j]=list[i]
                      }
                  }
              }
                 const response = yield call(SaveUserr,sublist)    
                 if(response.successed ==true){
                    message.success("修改成功")
                 }else{
                     message.error("修改失败,"+response.errMessage)
                 }      
        },        
	},

	reducers: {
        setlist(state,{payload}){
            state.list = payload
            return{
                ...state
            }
        }
	},
};
