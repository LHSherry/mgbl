/*
 * @Description: 设备实例详情
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:03:46
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { history } from 'umi';

import classNames from 'classnames/bind';

import List from '@/components/list';

import { getListDataByTab } from './config';

import styles from './index.less';

const cx = classNames.bind(styles);
const Detail = ({
	deviceDetail: {
		name_space,
		detail,
		modelTpl,
		querySource
	},
	dispatch,
	loading,
}) => {
	const [tabId, setTabId] = useState(1);

	const onTabChange = (tab) => {
		setTabId(tab);
	};

	const onSaveHandler = (values) => {
		dispatch({
			type: `${name_space}/save`,
			payload: {
				...detail,
				...values,
			}
		})
	}

	const data = getListDataByTab({ tab: tabId, detail, model: modelTpl });
	const listFormProps = {
		data,
		btns: [
			{
				name: '取消',
				onClick: () => history.goBack()
			}
		],
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabList}>
				<div className={cx({ active: tabId === 1 })} onClick={() => onTabChange(1)}>基本信息</div>
				<div className={cx({ active: tabId === 2 })} onClick={() => onTabChange(2)}>采购信息</div>
				<div className={cx({ active: tabId === 3 })} onClick={() => onTabChange(3)}>使用信息</div>
			</div>

			<List {...listFormProps} />
		</div>
	);
};

export default connect(({ deviceDetail, loading }) => ({
	deviceDetail,
	loading: loading.models['deviceDetail']
}))(Detail);
