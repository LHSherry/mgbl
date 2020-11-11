
import React from 'react';

import { Form, Row, Col, Button } from 'antd';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';

import { getField } from '@/utils';

import styles from './index.less';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

const Filter = ({
	forms,
	onSubmit,
	loading,
}) => {
	const [form] = Form.useForm();

	const handReset = () => {
		form.resetFields();
	};

	const renderFormItem = () => {
		return forms.map((item, index) => {
			const { rules = [], value, name, key, ...props } = item;
			return (
				<Col span={8} key={index}>
					<Form.Item label={name} name={key} rules={rules} initialValue={value}>
						{
							getField(props)
						}
					</Form.Item>
				</Col>
			);
		});
	};

	return (
		<Form className={styles.container} {...formItemLayout} form={form} onFinish={onSubmit}>
			<Row gutter={24}>{renderFormItem()}</Row>
			<Row gutter={24}>
				<Button type="primary" htmlType="submit" className={styles.bnSearch} loading={loading} icon={<SearchOutlined />}>查询</Button>
				<Button icon={<RedoOutlined />} onClick={handReset}>重置</Button>
			</Row>
		</Form>
	);
};

export default Filter;
