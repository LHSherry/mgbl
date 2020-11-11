/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-19 19:41:34
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-19 21:57:49
 */

export const Filters = [
	{
		type: 'input',
		name: '姓名',
		key: 'name',
		placeholder: '请输入患者姓名'
	},
	{
		type: 'input',
		name: '手机号',
		key: 'phoneNumber',
		placeholder: '请输入手机号'
	},
	{
		type: 'input',
		name: '身份证',
		key: 'idCard',
		placeholder: '请输入身份证号'
	},
	{
		type: 'select',
		name: '处理状态',
		key: 'status',
		option: [
			{ id: '', name: '全部' },
			{ id: 1, name: '已处理' },
			{ id: 2, name: '未处理' },
			{ id: 3, name: '处理中' },
		],
		initialValue: '',
	},
	{
		type: 'rangePicker',
		name: '呼救时间',
		key: 'timer',
	}
];

export const TableColumns = [
	{
		title: '姓名',
		key: 'name'
	},
	{
		title: '性别',
		key: 'sex'
	},
	{
		title: '年龄',
		key: 'age'
	},
	{
		title: '手机号',
		key: 'phone'
	},
	{
		title: '呼救位置',
		key: 'address'
	},
	{
		title: '呼救时间',
		key: 'date'
	},
	{
		title: '处理状态',
		key: 'status'
	},
	{
		title: '急救医生',
		key: 'doctor'
	}
];
