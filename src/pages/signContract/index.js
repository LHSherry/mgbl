/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-22 23:41:11
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-23 10:35:40
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import Empty from '@/components/emptyContract';

import styles from './index.less';

const SignContract = ({
	signContract
}) => {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.patientContainer}>
					<div className={styles.title}>患者信息</div>
					<p>姓名：<div>张三 男 83岁</div></p>
					<p>慢病类型：<div>高血压</div></p>
					<p>身份证号：<div>11010111111111111</div></p>
					<p>地址：<div>XXXXXXXXXXXXXXXXXXXXXXXXX</div></p>
					<p>失能：<div>非失能</div></p>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.searchDiv}>
					<span>选择合同</span>
					<div className={styles.input}>
						<div></div>
						<div>查询</div>
					</div>
					<div className={styles.bnClear}>清除</div>
					<div className={styles.bnAdd}>创建合同</div>
				</div>
				<div className={styles.mainContent}>
					<Empty />
				</div>
				<div className={styles.searchDiv}>
					<span>绑定设备</span>
					<div className={styles.input}>
						<div></div>
						<div>查询</div>
					</div>
					<div className={styles.bnClear}>清除</div>
				</div>

				<div className={styles.btnContainer}><Button type="primary">确认签约</Button></div>
			</div>
		</div>
	);
};

export default connect(({ signContract, loading }) => ({
	signContract,
	loading: loading.models['signContract']
}))(SignContract);
