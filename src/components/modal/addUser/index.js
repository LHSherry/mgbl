
import React, { useEffect } from 'react';

import { Modal, Input, Select, Form } from 'antd';

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

const ModalForm = ({
	name = 'userForm',
	visible,
	onSubmit,
	onCancel,
	data
}) => {
	const [form] = Form.useForm();
	useEffect(() => {
		if (visible && form) {
			form.resetFields();
		}
	}, [visible])

	const onOk = () => {
		if (onSubmit) {
			form.validateFields().then(values => onSubmit(values));
		} else {
			form.submit();
		}
	};

	return (
		<Modal
			title={data ? '修改' : '添加员工'}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
		>
			<Form {...formItemLayout} form={form} initialValues={data} name={name}>
				<Form.Item name="name" label="姓名" rules={[{ required: true, }]}>
					<Input />
				</Form.Item>
				<Form.Item name="mobile" label="电话">
					<Input />
				</Form.Item>
				<Form.Item name="zhiwei" label="职位">
					<Select>
						<Select.Option value={1}>家庭医生</Select.Option>
						<Select.Option value={2}>急救医生</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalForm;
