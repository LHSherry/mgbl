/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-18 21:29:39
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-23 16:22:48
 */
import React from 'react';
import { Link } from 'umi';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './index.less';

const PwdForm = ({
	onSubmit,
}) => {
	return (
		<Form onFinish={onSubmit} className={styles.pwdForm}>
			<Form.Item name="alias" rules={[{ required: true, message: '请输入账号或手机号!', whitespace: true }]}>
				<Input
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
					placeholder="请输入用户名"
					style={{ height: 38 }}
				/>
			</Form.Item>
			<Form.Item className={styles.pwdFormItem}  name="pwd" rules={[{ required: true, message: '请输入密码！', whitespace: true }]}>
				<Input.Password
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
					type="password"
					placeholder="请输入密码"
					style={{ height: 38 }}
				/>
			</Form.Item>
			<Form.Item >
				<Button type="primary" htmlType="submit" shape="round" className={styles.Button}>登录</Button>
			</Form.Item>
			<div className={styles.findPwd}><Link to="/user/findPwd">找回密码？</Link></div>
		</Form>
	);
};

export default PwdForm;
