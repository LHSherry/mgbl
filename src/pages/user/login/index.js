/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-27 16:54:13
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-24 20:43:20
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import classNames from 'classnames/bind';

import LoginImg from '@/assets/images/img_login.png';
import PwdForm from './pwdForm';
import MobileForm from './mobileForm';
import styles from './index.less';

const cx = classNames.bind(styles);

const Login = ({
	login: {
		name_space,
	},
	dispatch,
}) => {
	const [loginType, setLoginType] = useState(0);
	const onPwdLogin = (values) => {
		dispatch({
			type: `${name_space}/loginByPwd`,
			payload: values
		});
	};

	const onMobileLogin = (values) => {		
		dispatch({
			type: `${name_space}/loginBySM`,
			payload: values
		});
	};

	const getVerifyCode = (payload, callback) => {
		dispatch({
			type: `${name_space}/getVerifyCode`,
			payload,
			callback
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.loginContainers}>
				<div className={styles.left}>

				</div>
				<div className={styles.right}>
							<div className={styles.loginTitle}>
							<div><span>慢病管理平台</span></div>
						</div>
					<div className={styles.loginTab}>
						<div
							className={cx('formTitle', { active: 0 === loginType })}
							onClick={() => setLoginType(0)}
						>
							<span>密码登录</span>
						</div>
						<div
							className={cx('formTitle', { active: 1 === loginType })}
							onClick={() => setLoginType(1)}
						>
							<span>验证码登录</span>
						</div>
					</div>

					{
						loginType === 0 ?
							<PwdForm onSubmit={onPwdLogin} />
							:
							<MobileForm onSubmit={onMobileLogin} getVerifyCode={getVerifyCode} />
					}

				</div>
			</div>
		</div>
	);
};

export default connect(({ login, loading }) => ({
	login,
	loading: loading.models['login']
}))(Login);
