/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-20 14:10:44
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-18 17:02:47
 */
import { message } from 'antd';
import { history } from 'umi';

import {
	sendVerifyCode,
	ChangeUserPassword_SMS
} from '@/services/login';
//service
export default {
	namespace: 'findPwd',

	state: {
		name_space: 'findPwd',
	},

	effects: {
		* getVerifyCode({ payload, callback }, { call, put }) {
			const { successed, errMessage, result } = yield call(sendVerifyCode, payload);
			if (!successed){
				return message.error(errMessage);
			} else{
				callback && callback();
				return message.success("发送成功");
			}

			
		},
		* resetpass({ payload, callback }, { call, put }) {
			let sublist ={
				mobile:'',
				newPwd:'',
				smsCode:''
			}
			for (var i in payload){
				for(var j in sublist){
					if(i==j){
						sublist[j]=payload[i]
					}
				}
			}
			const { successed, errMessage, result } = yield call(ChangeUserPassword_SMS, sublist);
			if (successed){
				message.success("重置密码成功，跳转至登录页面")
				history.push('/user/login')
			} else{
				return message.error(errMessage)
			}

		},
	},

	reducers: {
		changeState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};
