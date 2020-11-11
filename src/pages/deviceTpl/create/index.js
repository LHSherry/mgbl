/*
 * @Description: 设备模型创建
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:13:14
 */
import React from 'react';

import { connect } from 'dva';

import Form from '@/components/form';

import styles from './index.less';

const Create = ({
	deviceTplCreate: {
		name_space,
		querySource
	},
	loading,
	dispatch,
}) => {
	const onSubmit = (values) => {
		dispatch({
			type: `${name_space}/save`,
			payload: {
				...values,
				shared: true, // 是否可共享
				organId: querySource.organId,
				id: querySource.id
			}
		})
	};

	const forms = [
		{
			type: 'input',
			name: '设备名称',
			key: 'name',
			placeholder: '请输入设备名称',
			rules: [{ required: true, message: '请输入设备名称', whitespace: true }]
		},
		{
			type: 'select',
			name: '设备类型',
			key: 'types',
			placeholder: '请选择设备类型',
			rules: [{ required: true, message: '请选择设备类型' }],
			option: querySource.types,
		},
		{
			type: 'select',
			name: '设备数据类型',
			key: 'dataTypes',
			placeholder: '请选择设备数据类型',
			rules: [{ required: true, message: '请选择设备数据类型' }],
			option: querySource.dataTypes,
			mode: 'multiple'
		},
		{
			type: 'input',
			name: '设备型号',
			key: 'model',
			rules: [{ required: true, message: '请输入设备型号' }],
			placeholder: '请输入设备型号，如：厂家的设备型号（HB12345）',
		},
		{
			type: 'input',
			name: '厂家名称',
			key: 'manufacturer',
			placeholder: '请输入厂家名称',
		},
		{
			type: 'input',
			name: '厂家地址',
			key: 'address',
			placeholder: '请输入厂家地址',
		},
		{
			type: 'input',
			name: '厂家联系方式',
			key: 'phone',
			placeholder: '请输入厂家联系方式',
		},
		{
			type: 'inputNumber',
			name: '保质日期(月)',
			key: 'serviceLife',
			placeholder: '请输入保质日期',
			min: 1,
		},
		{
			type: 'input',
			name: '医疗器械注册证号',
			key: 'certifiCFDA',
			placeholder: '请输入医疗器械注册证号',
		}
	];

	const btns = [
		{
			label: '保存设备模板',
			htmlType: 'submit',
			type: 'primary',
			loading,
		}
	];

	const formProps = {
		forms,
		onSubmit,
		btns
	};

	return (
		<div className={styles.container}>
			<Form {...formProps} />
		</div>
	);
};

export default connect(({ deviceTplCreate, loading }) => ({
	deviceTplCreate,
	loading: loading.models['deviceTplCreate']
}))(Create);
