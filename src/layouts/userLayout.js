/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-18 11:28:23
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-15 21:29:47
 */
import React from 'react';

import { ConfigProvider } from 'antd';

import styles from './index.less';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
function UserLayout({ children }) {
	return (
		<ConfigProvider locale={zhCN}>
			<div className={styles.app}>
				{children}
			</div>
		</ConfigProvider>
	);
}

export default UserLayout;
