

import React, { useState } from 'react';
import { connect } from 'dva';

import { Modal, Form, Input, Button } from 'antd';


import styles from './index.less';

const VerificationCode = ({
	onOk,
	onCancel,
	verificationCode: {
		name_space
	},
	dispatch,
	loading,
}) => {
	const [tail, setTail] = useState(Date.now())


	const onSubmitHandler = (values) => {
		console.log('onSubmitHandler');
		onOk();
		return;

		dispatch({
			type: `${name_space}/check`,
			payload: values,
			callback: onOk
		});
	};

	const modalProps = {
		title: '图片验证码',
		visible: true,
		onCancel: onCancel,
		footer: null,
		width: 280,
	};
	const verifiyCodeApi = `/api/1.0/authority/GetVerifyImgCode?tail=${tail}`

	return (
		<Modal {...modalProps}>
			<Form className={styles.form} onFinish={onSubmitHandler}>
				<div className={styles.imgDiv}>
					<img src={verifiyCodeApi} alt="图片验证码" />
					<a onClick={() => setTail(Date.now())}>看不清换一个</a>
				</div>
				<Form.Item name="code" rules={[{ required: true, message: '请输入图片验证码', whitespace: true }]}>
					<Input maxLength={6} placeholder="请输入图片验证码" />
				</Form.Item>
				<div className={styles.btnDiv}><Button type="primary" htmlType="submit" loading={loading}>确认</Button></div>
			</Form>
		</Modal>
	);
};

export default connect(({ verificationCode, loading }) => ({
	verificationCode,
	loading: loading.models['verificationCode'],
}))(VerificationCode);
