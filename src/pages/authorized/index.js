/*
 * @Description: 页面权限处理，未登录/没权限 跳转到登录页面
 * @Author: zhao
 * @Date: 2020-04-27 17:04:40
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-19 09:22:48
 */
import React from 'react';
import { Redirect } from 'umi';

import { getUser, isAdmin } from '@/utils';

const Authorized = ({ children }) => {
	const admin = children.props.route.admin;
	const user = getUser();
	const isPass = user && (admin ? isAdmin(user) : true)
	return isPass ? children : <Redirect to="/user/login" />;
};

export default Authorized;
