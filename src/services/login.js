
import Axios from '@/utils/axios';

export const sendVerifyCode = async ({ mobile }) => {
	return Axios('/api/1.0/authority/SendSmVerifyCode', {
		mobile
	})
}

export const login_SM = async ({ mobile, smVerifyCode }) => {
	return Axios('/api/1.0/authority/UserLogin_SM', {
		mobile,
		smVerifyCode
	})
}

export const login_PD = async ({ alias, pwd }) => {
	return Axios('/api/1.0/authority/UserLogin', {
		alias,
		pwd
	})
}

export const loginOut = async () => {
	return Axios('/api/1.0/authority/UserLogoff')
}
export const ChangeUserPassword = async ({oldPwd,newPwd}) => {
	return Axios('/api/1.0/authority/ChangeUserPassword',{oldPwd,newPwd},"GET")
}
export const ChangeUserPassword_SMS = async ({mobile,newPwd,smsCode}) => {
	return Axios('/api/1.0/authority/ChangeUserPassword_SMS',{mobile,newPwd,smsCode},"GET")
}
