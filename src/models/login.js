

import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

import { history } from 'umi';
import MenuList from '@/const/menu';
//service
import {
	login_SM,
	login_PD,
	sendVerifyCode,
	loginOut
} from '@/services/login';

export default {
	namespace: 'login',

	state: {
		name_space: 'login',
		user: null,
	},

	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathToRegexp('/login').exec(pathname)) { }
			});
		},
	},

	effects: {
		* loginByPwd({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(login_PD, payload);
			if (!successed) return message.error(errMessage);

			sessionStorage.setItem('user', JSON.stringify(result));

			yield put({
				type: 'changeState',
				payload: { user: result }
			});

			history.push('/')
		},

		* loginBySM({ payload = {} }, { call, put }) {
			const { successed, errMessage, result } = yield call(login_SM, payload);
			if (!successed) return message.error(errMessage);

			sessionStorage.setItem('user', JSON.stringify(result));

			yield put({
				type: 'changeState',
				payload: { user: result }
			});
			history.push('/')
		},

		* getVerifyCode({ payload, callback }, { call, put }) {
			const { successed, errMessage, result } = yield call(sendVerifyCode, payload);
			if (!successed){
				return message.error(errMessage)
			}else{
				callback && callback();
				return message.success("发送成功")
			}


		},

		* loginOut({ payload }, { call, put }) {
			const { successed, errMessage, result } = yield call(loginOut, payload);
			if (!successed) return message.error(errMessage);

			sessionStorage.removeItem("user")

			// window.location.href = "http://192.168.101.103:8001/#/user/login"
			history.push('/user/login');
		}
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
