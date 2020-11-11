
import React from 'react';

import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const FeedBack = ({
	onOk,
	onCancel,
}) => {
	const [form] = Form.useForm();

	const onsubmit = () => {
		form.validateFields().then(values => {
			onOk(values.msg);
		})
	};

	const modalProps = {
		title: '处理意见',
		onOk: onsubmit,
		onCancel: onCancel,
		visible: true
	};
	return (
		<Modal {...modalProps}>
			<Form form={form}>
				<Form.Item name="msg" rules={[{ required: true, message: '请输入处理意见', whitespace: true }]}>
					<TextArea rows={4} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FeedBack;
