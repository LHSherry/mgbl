/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-19 19:41:34
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 09:15:16
 */
import { Link } from 'umi';

export const Filters = [
	{
		type: 'input',
		name: '消息标题',
		key: 'title',
		placeholder: '请输入消息标题'
	},
	{
		type: 'select',
		name: '任务状态',
		key: 'taskStatus',
		option: [
			{ id: '', name: '全部' },
			{ id: '1', name: '未执行' },
			{ id: '2', name: '已执行' },
		],
	},
	{
		type: 'select',
		name: '消息状态',
		key: 'msgStatus',
		option: [
			{ id: '', name: '全部' },
			{ id: '1', name: '未发送' },
			{ id: '2', name: '已发送' },
		],
	},
	{
		type: 'select',
		name: '消息类型',
		key: 'msgType',
		option: [
			{ id: '', name: '全部' },
			{ id: '1', name: '系统信息' },
			{ id: '2', name: '教育信息' },
		],
	},
	{
		type: 'select',
		name: '消息方式',
		key: 'msgMode',
		option: [
			{ id: '', name: '全部' },
			{ id: '1', name: '手机短信' },
			{ id: '2', name: '公众号信息' },
		],
	},
	{
		type: 'select',
		name: '用户类型',
		key: 'userType',
		option: [
			{ id: '', name: '全部' },
			{ id: '1', name: '指定用户' },
			{ id: '2', name: '医护人员' },
			{ id: '3', name: '患者' },
		],
	},
	{
		type: 'rangePicker',
		name: '创建时间',
		key: 'createTime',
	},
	{
		type: 'rangePicker',
		name: '执行时间',
		key: 'operateTime',
	}
];

export const TableColumns = [
	{
		title: '消息标题',
		key: 'title',
	},
	{
		title: '任务状态',
		key: 'taskStatus'
	},
	{
		title: '消息内容',
		key: 'content',
		width: 200,
	},
	{
		title: '消息方式',
		key: 'msgMode'
	},
	{
		title: '消息类型',
		key: 'msgType'
	},
	{
		title: '用户类型',
		key: 'userType'
	},
	{
		title: '机构',
		key: 'orgName'
	},
	{
		title: '创建时间',
		key: 'createTime'
	},
	{
		title: '执行时间',
		key: 'operateTime'
	},
	{
		title: '创建人',
		key: 'createUserName'
	},
	{
		title: '执行人',
		key: 'operateUserName'
	}
];
