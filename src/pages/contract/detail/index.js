/*
 * @Description: 合同详情
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 09:57:07
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';

import List from '@/components/list';

import styles from './index.less';

const Detail = ({
	patientDetail: {
		detail
	}
}) => {
	
	const contractData = [
		'合同名称', detail.name,
	]

	const serviceData = [
		'服务内容', '多参报告',
		'服务频率', '一月一次',
		'服务内容', '多参报告',
		'服务频率', '一月一次',
		'服务内容', '多参报告',
		'服务频率', '一月一次',
	]

	const deviceData = [
		'设备型号', '111111'
	]

	const orgData = [
		'服务机构', '选湖区拉伸大',
		'服务医生', '张医生（13800138000）',
	];

	return (
		<div className={styles.container}>
			<div className={styles.title}>合同信息</div>
			<List data={contractData} rows={2} />
			<div className={styles.title}>服务选择</div>
			<List data={serviceData} rows={4} />
			<div className={styles.title}>设备型号</div>
			<List data={deviceData} rows={2} />
			<div className={styles.title}>服务机构</div>
			<List data={orgData} rows={4} />
		</div>
	);
};

export default connect(({ patientDetail, loading }) => ({
	patientDetail,
	loading: loading.models['patientDetail']
}))(Detail);
