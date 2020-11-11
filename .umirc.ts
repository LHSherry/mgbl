/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-19 14:17:48
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-18 21:10:56
 */
import { defineConfig } from 'umi';

import theme from './src/theme';

export default defineConfig({
	history: { type: 'hash' },
	nodeModulesTransform: {
		type: 'none',
	},
	hash: true,
	theme,
	// 转发到服务器
	proxy: {
		'/api': {
			'target': 'http://39.98.36.45:5100/',
			'changeOrigin': true,
			// 'pathRewrite': { '^/api': '' },
		},
		'/hubs': {
			'target': 'http://39.98.36.45:5100/',
			'changeOrigin': true,
			"ws": true,
			// 'pathRewrite': { '^/api': '' },
		},
	},
	routes: [
		{
			path: '/user',
			component: '@/layouts/userLayout',
			routes: [
				{ path: '/user', redirect: '/user/login'},
				{ path: '/user/login', component: './user/login', title:"登录", },
				{ path: '/user/findPwd', component: './user/findPwd',title:"找回密码" }
			],
		},
		{
			path: '/',
			component: '../layouts',
			routes: [
				/**** 首页 ******/
				{
					path: '/',
					component: './home',
					title:"首页",
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/helpMap',
					component: './helpMap',
					wrappers: ['@/pages/authorized'],
					title:"呼救信息"
				},
				{
					path: '/helpList',
					component: './helpList',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/helpList/detail',
					component: './helpDetail',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/patient',
					component: './patient',
					wrappers: ['@/pages/authorized'],
					title:"患者管理"
				},
				{
					path: '/patient/detail',
					component: './patient/detail',
					wrappers: ['@/pages/authorized'],
					title:"患者详情"
				},
				{
					path: '/patient/create',
					component: './patient/create',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/patient/edit',
					component: './patient/edit',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/deviceAdmin',
					component: './deviceAdmin',
					wrappers: ['@/pages/authorized'],
					admin: true,
				},
				{
					path: '/device',
					component: './device',
					wrappers: ['@/pages/authorized'],
					title:"设备列表"
				},
				{
					path: '/device/detail',
					component: './device/detail',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/device/import',
					component: './device/import',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/deviceTpl',
					component: './deviceTpl',
					wrappers: ['@/pages/authorized'],
					title:"设备型号管理"
				},
				{
					path: '/deviceTpl/create',
					component: './deviceTpl/create',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/deviceTpl/edit',
					component: './deviceTpl/edit',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/contract',
					component: './contract',
					wrappers: ['@/pages/authorized'],
					title:"合同模板"
				},
				{
					path: '/contractlist',
					component: './contractlist',
					wrappers: ['@/pages/authorized'],
					title:"合同列表"
				},
				{
					path: '/contractrecord',
					component: './contractrecord',
					wrappers: ['@/pages/authorized'],
					title:"合同签约记录"
				},
				{
					path: '/contract/detail',
					component: './contract/detail',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/contract/create',
					component: './contract/edit',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/contract/edit',
					component: './contract/edit',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/message',
					component: './message',
					wrappers: ['@/pages/authorized'],
				},
				{
					path: '/org',
					component: './org',
					wrappers: ['@/pages/authorized'],
					title:"组织机构"
				},
				{
					path: '/regsiter',
					component: './regsiter',
					wrappers: ['@/pages/authorized'],
					title:"注册用户"
				},
				{
					path: '/person',
					component: './person',
					wrappers: ['@/pages/authorized'],
					title:"个人中心"
				},
				{
					path: '/userslist',
					component: './userslist',
					wrappers: ['@/pages/authorized'],
					title:"用户列表"
				},
				{
					path: '/signContract',
					component: './signContract',
					wrappers: ['@/pages/authorized'],

				},
				{
					path: '404',
					component: './404',
				}
			],
		},
	]
});
