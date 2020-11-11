/*
 * @Description: 设备模板配置文件
 * @Author: zhao
 * @Date: 2020-05-19 19:41:34
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:09:49
 */
import { Link } from 'umi';

export const Filters = [
	{
		type: 'input',
		name: '名称',
		key: 'name',
		placeholder: '请输入名称'
	},
	{
		type: 'input',
		name: '型号',
		key: 'model',
		placeholder: '请输入型号',
	},
	{
		type: 'select',
		name: '类型',
		key: 'deviceDataTyps',
		hasAll: true,
		value: [],
	}
];

export const TableColumns = [
	{
		title: '名称',
		key: 'name',
		render: (text, record) => <Link to={`/deviceTpl/edit?id=${record.id}`}>{text}</Link>
	},
	{
		title: '类型',
		key: 'functions'
	},
	{
		title: '型号',
		key: 'model',
	},
	{
		title: '厂家名称',
		key: 'manufacturer'
	},
	{
		title: '厂家地址',
		key: 'address'
	},
	{
		title: '联系电话',
		key: 'phone'
	},
	{
		title: '保质/保修期（月）',
		key: 'serviceLife'
	}

];
