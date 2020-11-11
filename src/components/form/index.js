

import React from 'react';
import { Form, Button } from 'antd';

import { getField } from '@/utils';

import styles from './index.less';

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
};

const CustomForm = ({
	initialValues,
	forms = [],
	btns = [],
	onSubmit,
	layouts = {},
	...props
}) => {
	return (
		<div className={styles.container}>
			<Form {...formItemLayout} {...layouts} onFinish={onSubmit} initialValues={initialValues} {...props}>
				{
					forms.map((item, index) => {
						if (!item) return null
						const { rules = [], name, key, ...props } = item;
						return (
							<Form.Item key={index} name={key} label={name} rules={rules}>
								{
									getField(props)
								}
							</Form.Item>
						);
					})
				}
				{
					btns.length ?
						<Form.Item className={styles.bnList}>
							{
								btns.map((bn, index) => <Button key={index} {...bn}>{bn.label}</Button>)
							}
						</Form.Item>
						: null
				}
			</Form>
		</div >
	);
};

export default CustomForm;
