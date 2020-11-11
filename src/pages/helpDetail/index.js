/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-20 21:49:02
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-20 23:13:47
 */
import React, { useState } from 'react';
import { connect } from 'dva';

import { Button } from 'antd';

import List from '@/components/list';
import Feedback from '@/components/modal/feedback';

import styles from './index.less';

const HelpDetail = ({
	helpDetail,
	loading
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const { detail } = helpDetail;

	const onFeelbackHandler = (msg) => {
		console.log('onFeelbackHandler:', msg);
		setModalVisible(false);
	};

	const modalProps = {
		onOk: onFeelbackHandler,
		onCancel: () => setModalVisible(false)
	};

	const data1 = [
		'姓名', '张三',
		'性别', '女',
		'出生日期', '1937-09-08',
		'年龄', '88',
		'手机号', '13800138000',
		'身份证号码', '110101101010101010',
		'家庭住址', 'XXXXXXXXXXXXXXXXXXXXXXX'
	];

	const data2 = [
		'处理状态', '未处理',
		'呼救位置', '北京市丰台区XX路',
		'呼救时间', 'yyyy-MM-dd HH:mm:ss',
		'急救医生', '张三（13800138000）'
	];

	const data3 = [
		'处理人', '--',
		'处理时间', '--',
		'处理方式', '--',
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>呼救人信息</div>
				{detail.status === '未处理' ? <Button type="primary" onClick={() => setModalVisible(true)}>立即处理</Button> : null}
			</div>
			<List data={data1} />

			<div className={styles.header}>
				<div className={styles.title}>呼救过程信息</div>
			</div>
			<List data={data2} />

			<div className={styles.header}>
				<div className={styles.title}>呼救完成信息</div>
			</div>
			<List data={data3} />

			{modalVisible ? <Feedback {...modalProps} /> : null}
		</div>
	);
};

export default connect(({ helpDetail, loading }) => ({
	helpDetail,
	loading: loading.models['helpDetail'],
}))(HelpDetail);
