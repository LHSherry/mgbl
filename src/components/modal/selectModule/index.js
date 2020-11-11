

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

import Filter from '@/components/filter';
import Table from '@/components/table';

import ENUM from '@/const';

import { getFilters, TableColumns } from './config';

const SelectModule = ({
	selectModule: {
		name_space,
		querySource,
		queryParams,
		list,
		pagination
	},
	title,
	moduleType,
	multiple,
	value,
	onOk,
	onCancel,
	dispatch,
	okText = '确定',
	loading,
}) => {
	const [selectedRows, setSelectedRows] = useState([]);
	useEffect(() => {
		console.log('SelectModule componentDidMount');
		getTableData();
	}, [])

	useEffect(() => {
		console.log('SelectModule value change init');
		setSelectedRows(value);
	}, [value])

	const getTableData = (values) => {
		let moduleApi;
		switch (moduleType) {
			case ENUM.ModuleEnum.DEVICETPL:
				moduleApi = '/getDeviceTpl'
				break;
			case ENUM.ModuleEnum.DEVICE:
				moduleApi = '/getDevice'
				break;
			case ENUM.ModuleEnum.CONTRACT:
				moduleApi = '/getContract'
				break;
			case ENUM.ModuleEnum.ORG:
				moduleApi = '/getOrg'
				break;
			case ENUM.ModuleEnum.PATIENT:
				moduleApi = '/getPatient'
				break;
			default:
				break;
		}

		if (!moduleApi) return;

		dispatch({
			type: `${name_space}${moduleApi}`,
			payload: {
				...queryParams,
				...values,
			}
		})
	}

	const onSubmit = () => {
		onOk && onOk(selectedRows);
	};

	const onSelect = (_, selectedRows) => {
		setSelectedRows(selectedRows)
	}

	const changeHandler = ({ current, pageSize }) => {
		getTableData({
			pageIndex: current,
			pageSize,
		});
	};

	const onFilterHandler = (values) => {
		getTableData(values);
	};

	const modalPorps = {
		title,
		onOk: onSubmit,
		onCancel,
		width: '80%',
		okText,
		visible: true
	};

	const filterProps = {
		forms: getFilters(moduleType, querySource),
		loading,
		onSubmit: onFilterHandler,
	};

	const tableProps = {
		rowSelection: {
			type: multiple ? 'checkbox' : 'radio',
			onChange: onSelect,
		},
		data: list,
		columns: TableColumns[moduleType],
		pagination,
		onChange: changeHandler,
		loading,
	};

	return (
		<Modal {...modalPorps}>
			<div>
				<Filter {...filterProps} />
				<Table {...tableProps} />
			</div>
		</Modal>
	);
};

export default connect(({ selectModule, loading }) => ({
	selectModule,
	loading: loading.models['selectModule']
}))(SelectModule);
