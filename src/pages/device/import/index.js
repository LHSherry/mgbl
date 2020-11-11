/*
 * @Description: 设备实例导入
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:05:01
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import Title from "@/components/Title/index"
import classNames from 'classnames/bind';

// 单个导入
import ImportSingle from '../components/importSingle';
// 批量导入
import ImportBatch from '../components/importBatch';

import styles from './index.less';

const cx = classNames.bind(styles);
const DeviceImport = ({
	deviceImport: {
		name_space,
		data
	},
	dispatch,
	loading
}) => {
	const [tabId, setTabId] = useState(1);

	// 切换tab
	const onTabChange = (tab) => {
		setTabId(tab);
	};

	// 提交单个导入
	const onSubmitSingle = (values) => {
		dispatch({
			type: `${name_space}/importSingle`,
			payload:values
		})
	}

	// 提交批量导入
	const onSubmitBatch = (values) => {
		const payload = {
			...values,
			file: values.file[0].originFileObj,
			deviceModelId: values.deviceModelId && values.deviceModelId.length ? values.deviceModelId[0].id : undefined,
			organId: values.organId && values.organId.length ? values.organId[0].id : undefined,
		}
		dispatch({
			type: `${name_space}/importBatch`,
			payload
		})
	}
	const 	getdept = (value)=>{
		dispatch({
			type: `${name_space}/querdept`,
			payload:value
		})
	}

	const 	getlost = async (value)=>{
		return new Promise((resolve,reject)=>{
	     dispatch({
				type:`device/getlost`,
				payload:value,
				resolve,
				reject
			})
		})
	}
	// 单个导入参数
	const singleProps = {
		onSubmit: onSubmitSingle,
		loading,
		data,
		getdept
	}

	// 批量导入参数
	const batchProps = {
		onSubmit: onSubmitBatch,
		loading,
		data,
		getlost,
		getdept,
	}

	return (
		<>
		<Title/>
		<div className={styles.container}>
			<div className={styles.tabList}>
				<div className={cx({ active: tabId === 1 })} onClick={() => onTabChange(1)}>单体入库</div>
				<div className={cx({ active: tabId === 2 })} onClick={() => onTabChange(2)}>批量入库</div>
			</div>
			{
				tabId === 1 ? <ImportSingle {...singleProps} /> : <ImportBatch {...batchProps} />
			}
		</div>
		</>
	);
};

export default connect(({ deviceImport, loading }) => ({
	deviceImport,
	loading: loading.models['deviceImport']
}))(DeviceImport);
