/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-18 21:29:39
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-23 16:27:20
 */
import React, { useState } from 'react';
import { Link } from 'umi';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './index.less';

const PwdForm = ({
	getVerifyCode,
	onSubmit,
}) => {
	const [form] = Form.useForm();
	const [count, setCount] = useState(0);

	const onVerifyCode = () => {
		form.validateFields(['mobile']).then(values => {
			getVerifyCode(values, () => {
				startRun(60);
			})
		})
	}

	const startRun = (timer) => {
		const val = timer - 1;
		setCount(val);
		if (val > 0) {
			setTimeout(() => {
				startRun(val);
			}, 1000);
		}
	};

	return (
		<Form onFinish={onSubmit} className={styles.mobileForm} form={form}>
			<Form.Item name="mobile" rules={[{ required: true, message: '请输入账号或手机号!', whitespace: true }]}>
				<Input
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
					placeholder="请输入用户名"
					style={{ height: 38 }}
				/>
			</Form.Item>
			<div className={styles.codeDiv}>
				<Form.Item className={styles.codeFormItem} name="smVerifyCode"  rules={[{ required: true, message: '请输入验证码', whitespace: true }]}>
					<Input
						prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
						placeholder="请输入验证码"
						style={{ height: 38,width:'100%',verticalAlign:"middle"  }}
					/>
				</Form.Item>
				{
					count > 0
						?
						<Button className={styles.right}  style={{ height: 38,textAlign:"center",marginLeft:"1.5%" }}>等待{count}秒</Button>
						:
						<Button className={styles.right} onClick={onVerifyCode}  style={{ height: 38,textAlign:"center",verticalAlign:"middle",marginLeft:"1.5%" }}>获取验证码</Button>
			     	}
			</div>
			<Form.Item name="btn">
				<Button type="primary" htmlType="submit" shape="round" >登录</Button>
			</Form.Item>
			<div className={styles.findPwd}><Link to="/user/findPwd">找回密码？</Link></div>
		</Form>
	);
};

export default PwdForm;
