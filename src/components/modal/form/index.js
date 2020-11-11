
import React from 'react';

import { Modal, Form } from 'antd';

import { getField } from '@/utils';

const FormModal = ({
	title,
	okText = '确定',
	data,
	onOk,
	onCancel,
}) => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		form.validateFields().then(values => onOk && onOk(values));
	}

	const renderFormItem = () => {
		return data.map(obj => {
			const { key, name, rules = [], value, ...props } = obj;

			return (
				<Form.Item key={key} label={name} name={key} rules={rules} initialValue={value}>
					{getField(props)}
				</Form.Item>
			)
		})
	}

	const modalProps = {
		title,
		visible: true,
		okText,
		onOk: onSubmit,
		onCancel
	}

	return (
		<Modal {...modalProps}>
			<Form form={form}>
				{renderFormItem()}
			</Form>
		</Modal>
	)
}

export default FormModal
