
import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';

import { Button } from 'antd';

import Filter from '@/components/filter';
import Table from '@/components/table';

import { Filters, TableColumns } from './config';

const MessageManager = ({
	messageManager: {
		list,
		pagination
	},
	dispatch,
	loading
}) => {
	const changeHandler = ({ current, pageSize }) => {
		console.log(current, pageSize);
	};

	const onFilterHandler = (values) => {
		console.log('onFilterHandler:', values);
	};

	const clearAll = () => {

	};

	const filterProps = {
		forms: Filters,
		onSubmit: onFilterHandler,
	};

	const tableProps = {
		data: list,
		columns: TableColumns,
		pagination,
		onChange: changeHandler,
		control: [
			{
				key: 'view',
				name: '查看',
				onClick: (record) => history.push({ pathname: '/helpList/detail', query: { id: record.id } })
			},
			{
				key: 'edit',
				name: '修改',
				show: (record) => true,
				onClick: (record) => null
			},
			{
				key: 'operate',
				name: '执行',
				show: (record) => true,
				onClick: (record) => null
			}
		],
	};

	return (
		<div>
			<Filter {...filterProps} />

			<div style={{ marginTop: 12, marginBottom: -12 }}>
				<Button type="primary" style={{ marginRight: 12 }}>新建</Button>
				<Button type="primary" style={{ marginRight: 12 }}>消息模板</Button>
				<Button type="danger" onClick={clearAll}>删除</Button>
			</div>
			<Table {...tableProps} />
		</div >
	);
};

export default connect(({ messageManager, loading }) => ({
	messageManager,
	loading: loading.models['messageManager'],
}))(MessageManager);
