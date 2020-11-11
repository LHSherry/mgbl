
import React from 'react';

import { Form, Button } from 'antd';

import { getField } from '@/utils';

import styles from './index.less';

const List = ({
	data = [],
	rows = 8,
	onSubmit,
	btns = []
}) => {
	const count = Math.ceil(data.length / rows);
	const rowArr = new Array(count).fill(1);
	const itemArr = new Array(rows).fill(1);

	const renderFormItem = ({ key, rules = [], value, ...props }) => {
		return (
			<Form.Item name={key} rules={rules} initialValue={value}>
				{getField(props)}
			</Form.Item>
		);
	};

	return (
		<div>

			<Form onFinish={onSubmit}>
				<div className={styles.table}>
					{
						rowArr.map((_, index) => (
							<div key={index} className={styles.tableRow}>
								{
									itemArr.map((_, j) => {
										const item = data[index * rows + j];
										return <div key={j} className={styles.content}>
											{
												item instanceof Object
													?
													renderFormItem(item)
													: item
											}
										</div>;
									})
								}
							</div>
						))
					}
				</div>

				<div className={styles.btnList}>
					{
						btns.map((bn, index) => <Button key={index} {...bn}>{bn.name}</Button>)
					}
				</div>

			</Form>
		</div>
	);
};

export default List;
