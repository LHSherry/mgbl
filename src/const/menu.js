

import { getUser, isAdmin } from '@/utils';

function getmenulist(){
	const user = getUser();
	return [
		{
			icon: '',
			title: '呼救信息',
			children: [
				{
					title: '紧急呼救展示',
					path: '/helpMap',
				},
				// {
				// 	title: '呼救管理',
				// 	path: '/helpList',
				// }
			]
		},
		{
			icon: '',
			title: '患者管理',
			children: [
				{
					title: '患者列表',
					path: '/patient',
				},
			]
		},
		{
			icon: '',
			title: '设备管理',
			children: [
				// isAdmin(user || {}) ? {
				// 	title: '管理员设备入库',
				// 	path: '/deviceAdmin',
				// } : null,
				{
					title: '设备列表',
					path: '/device',
				},
				{
					title: '设备型号管理',
					path: '/deviceTpl',
				}
			]
		},
		{
			icon: '',
			title: '合同管理',
			children: [
				{
					title: '合同模板',
					path: '/contract',
				},
				{
					title: '合同列表',
					path: '/contractlist',
				},
				{
					title: '合同签约记录',
					path: '/contractrecord',
				},
			]
		},
		// {
		// 	icon: '',
		// 	title: '消息中心',
		// 	children: [
		// 		{
		// 			title: '消息管理',
		// 			path: '/message',
		// 		},
		// 	]
		// },
		isAdmin(user || {}) ?
			{
				icon: '',
				title: '组织机构管理',
				children: [
					{
						title: '机构列表',
						path: '/org',
					},
					// {
					// 	title: '注册用户',
					// 	path: '/regsiter',
					// },
					{
						title: '用户列表',
						path: '/userslist',
					},
					{
						title: '个人中心',
						path: '/person',
					}
				]
			}
			:
			{
				icon: '',
				title: '工作人员管理',
				children: [
					{
						title: '工作人员列表',
						path: '/org/user',
					}
				]
			}
	];
}
export default getmenulist
