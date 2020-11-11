/*
 * @Description: 编辑设备模板
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:13:04
 */
import React from 'react';
import { connect } from 'dva';

import ListForm from '@/components/listForm';

import styles from './index.less';

const Edit = ({
	deviceTplEdit: {
		name_space,
		querySource,
		detail
	},
	dispatch
}) => {
	const onSaveHandler = (values) => {
		dispatch({
			type: `${name_space}/save`,
			payload: {
				...detail,
				...values,
			}
		})
	};

	const data = [
		'名称',
		detail.name,
		'设备类型',
		{ type: 'select', key: 'types', value: detail.types, option: querySource.types },
		'设备数据类型',
		{ type: 'select', key: 'dataTypes', mode: 'multiple', value: detail.dataTypes, option: querySource.dataTypes },
		'设备型号',
		detail.model,
		'厂家名称',
		{ type: 'textarea', key: 'manufacturer', value: detail.manufacturer },
		'厂家地址',
		{ type: 'textarea', key: 'address', value: detail.address },
		'厂家联系方式',
		{ type: 'textarea', key: 'phone', value: detail.phone },
		'保质日期（月）',
		{ type: 'inputNumber', key: 'serviceLife', min: 1, value: detail.serviceLife },
		'医疗器械注册证号',
		{ type: 'textarea', key: 'certifiCFDA', value: detail.certifiCFDA },
	];

	const listFormProps = {
		data,
		rows: 6,
		btns: [
			{
				type: 'primary',
				htmlType: 'submit',
				name: '保存'
			},
			{
				name: '取消',
				onClick: () => history.go(-1)
			}
		],
		onSubmit: onSaveHandler
	};

	return (
		<div className={styles.container}>
			{detail.id ? <ListForm {...listFormProps} /> : null}
		</div>
	);
};

export default connect(({ deviceTplEdit, loading }) => ({
	deviceTplEdit,
	loading: loading.models['deviceTplEdit']
}))(Edit);
