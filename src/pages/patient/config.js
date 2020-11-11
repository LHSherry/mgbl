/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-19 19:41:34
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-20 23:41:54
 */
import { Link } from 'umi';

export const Filters = [
	{
		type: 'input',
		name: '姓名',
		key: 'name',
		placeholder: '请输入患者姓名'
	},
	{
		type: 'input',
		name: '身份证',
		key: 'idCard',
		placeholder: '请输入身份证号'
	},
	{
		type: 'select',
		name: '慢病类型',
		key: 'mbType',
		option: [
			{ id: '', name: '全部' },
			{ id: 'gxy', name: '高血压' },
			{ id: 'tnb', name: '糖尿病' },
			{ id: 'lnr', name: '心脏病' }
		],
		initialValue: '',
	},
	{
		type: 'select',
		name: '合约情况',
		key: 'hy',
		option: [
			{ id: 2, name: '已签约已发放' },
			{ id: 0, name: '未签约' },
			{ id: 1, name: '已签约未发放' },
		],
		initialValue: 2,
	},
	{
		type: 'select',
		name: '是否失能',
		key: 'sn',
		option: [
			{ id: '', name: '全部' },
			{ id: 2, name: '失能' },
			{ id: 0, name: '半失能' },
			{ id: 1, name: '非失能' },
		],
		initialValue: '',
	},
];

export const TableColumns = [
	{
		title: '姓名',
		key: 'name',
		render: (text, record) => <Link to={`/patient/detail?id=${record.id}`}>{text}</Link>
	},
	{
		title: '性别',
		key: 'gender'
	},
	{
		title: '地址',
		key: 'address'
	},
	{
		title: '身份证',
		key: 'idNo'
	},
	{
		title: '手机号',
		key: 'mobile'
	},
	{
		title: '合同/签约状态',
		key: 'contractStatus'
	},
];
