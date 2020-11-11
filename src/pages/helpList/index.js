/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-19 19:37:18
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-21 11:46:16
 */
import React, { useState } from 'react';
import { connect } from 'dva';

import Filter from '@/components/filter';
import Table from '@/components/table';
import Feedback from '@/components/modal/feedback';

import { Filters, TableColumns } from './config';
import { history } from 'umi';

const HelpList = ({
	helpList: {
		name_space,
		list,
		pagination
	},
	dispatch,
	loading
}) => {
	const [params, setParams] = useState({});
	const [modalData, setModalData] = useState(null);

	const changeHandler = ({ current, pageSize }) => {
		const newParams = {
			...params,
			current,
			pageSize
		};
		dispatch({
			type: `${name_space}/queryList`,
			payload: newParams
		});

		setParams(newParams);
	};

	const onFilterHandler = (values) => {
		console.log('onFilterHandler:', values);
		const newParams = {
			...params,
			...values,
		};
		dispatch({
			type: `${name_space}/queryList`,
			payload: newParams
		});

		setParams(newParams);
	};

	const onFeelbackHandler = (msg) => {
		console.log('onFeelbackHandler:', msg);
		setModalData(null);
	};

	const filterProps = {
		forms: Filters,
		loading,
		onSubmit: onFilterHandler,
	};

	const tableProps = {
		data: list,
		columns: TableColumns,
		pagination,
		control: [
			{
				key: 'view',
				name: '查看',
				onClick: (record) => history.push({ pathname: '/helpList/detail', query: { id: record.id } })
			},
			{
				key: 'doit',
				name: '立即处理',
				show: (record) => record.status === '未处理',
				onClick: (record) => setModalData(record)
			}
		],
		loading,
		onChange: changeHandler,
	};


	const modalProps = {
		onOk: onFeelbackHandler,
		onCancel: () => setModalData(null)
	};

	return (
		<div>
			<Filter {...filterProps} />
			<Table {...tableProps} />

			{modalData ? <Feedback {...modalProps} /> : null}
		</div >
	);
};

export default connect(({ helpList, loading }) => ({
	helpList,
	loading: loading.models['helpList'],
}))(HelpList);
