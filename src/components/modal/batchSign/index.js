
import React from 'react';
import { connect } from 'dva';

import { Modal, Button } from 'antd';

import Empty from '@/components/emptyContract';

import styles from './index.less';

const BatchSign = ({
	batchSign,
	onOk,
	onCancel,
}) => {

	const modalProps = {
		title: '批量签约',
		onOk,
		onCancel,
		footer: [
			<Button type="primary">批量签约</Button>,
			<Button>取消</Button>
		]
	};
	return (
		<Modal {...modalProps}>
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

				<div className={styles.uploadContainer}>
					<Button>上传患者列表</Button>
					<span>批量导入患者，需上传excel模板，如没有请下载</span>
					<a href="">点击下载</a>
				</div>
			</div>
		</Modal>
	);
};

export default connect((batchSign, loading) => ({
	batchSign,
	loading: loading.models['batchSign']
}))(BatchSign);
