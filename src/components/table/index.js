
import React from 'react';

import { Table } from 'antd';

import styles from './index.less';

const MBTable = ({
	data,
	columns,
	bordered = true,
	pagination,
	size = 'middle',
	control,
	...props
}) => {
	const tableColumns = columns.map(obj => ({ align: 'center', ...obj, dataIndex: obj.key }));
	if (control) {
		tableColumns.push({
			title: '操作',
			key: 'operation',
			render: (_, record) => (
				<div className={styles.operationList}>
					{
						control.map(obj => {
							const isShow = obj.show ? obj.show(record) : true;
							return isShow ? <span key={obj.key} onClick={() => obj.onClick(record)}>{obj.name}</span> : null;
						})
					}
				</div>
			)
		});
	}

	const tableProps = {
		dataSource: data,
		columns: tableColumns,
		bordered,
		pagination: pagination ? {
			...pagination,
			showSizeChanger: true,
			showQuickJumper: true,
			showTotal: total => `共${total}条`,
		} : false,
		size,
		...props,
		rowKey: 'id',
	};

	return (
		<div className={styles.container}>
			<Table {...tableProps} />
		</div>
	);
};

export default MBTable;
