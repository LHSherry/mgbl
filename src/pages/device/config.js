/*
 * @Description: 设备实例配置文件
 * @Author: zhao
 * @Date: 2020-05-19 19:41:34
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:02:43
 */
import { Link } from 'umi';

import ENUM from '@/const';

export const Filters = [
	{
		type: 'input',
		name: '设备编号',
		key: 'sn',
		placeholder: '请输入设备编号'
	},
	{
		type: 'input',
		name: '名称',
		key: 'name',
		placeholder: '请输入名称'
	},
	{
		type: 'input',
		name: '设备型号',
		key: 'model',
		placeholder: '请输入设备型号',
	},
	{
		type: 'select',
		name: '状态',
		key: 'status',
		hasAll: true,
		value: [],
	},
	{
		type: 'select',
		name: '设备类型',
		key: 'deviceTypes',
		hasAll: true,
		value: [],
	},
	{
		type: 'input',
		name: '厂家名称',
		key: 'manufacturer',
	},
	{
		type: 'antSelect',
		name: '是否分配',
		key: 'assigned',
		hasAll: true,
		value: null,
		option: ENUM.AssignedOption,
	},
];

export const TableColumns = [
	{
		title: '设备编号',
		key: 'sn',
		render: (text, record) => <Link to={`/device/detail?id=${record.id}`}>{text}</Link>
	},
	{
		title: '设备型号',
		key: 'model',
	},
	{
		title: '名称',
		key: 'modelName'
	},
	{
		title: '当前使用者',
		key: 'patientName',
		render: (text, record) => text || '-'
	},
	{
		title: '设备所属合同链接',
		key: 'contractName',
		render: (text, record) => <Link to={`/contract/detail?id=${record.contractId}`}>{text}</Link>
	},
	{
		title: '状态',
		key: 'status'
	},
];
