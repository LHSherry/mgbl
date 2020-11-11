/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-17 12:23:40
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-18 16:59:10
 */
import React from 'react';
import { connect } from 'dva';

import { Form } from 'antd';

import styles from './index.less';

const ResetPwd = ({

}) => {

	return (
		<Form>

		</Form>
	);
};

export default connect(({ resetPwd, loading }) => ({
	resetPwd,
	loading: loading.models['resetPwd']
}))(ResetPwd);
