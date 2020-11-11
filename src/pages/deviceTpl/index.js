/*
 * @Description: 设备模型列表页面
 * @Author: zhao
 * @Date: 2020-05-19 19:37:18
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:09:27
 */
import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';

import { Button, Modal,Space, Row, Col,Form  } from 'antd';
import { getField } from '@/utils';
import styles from './index.less';
import {SearchOutlined,RedoOutlined,CloseOutlined,EditOutlined} from '@ant-design/icons';
// import Filter from '@/components/filter';
import Table from '@/components/table';
import styleglobal  from "../../global.less"
import { Filters, TableColumns } from './config';
import Title from "@/components/Title/index"
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
	clearAll,
	disabled
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
					<Form.Item label={name} name={key} rules={rules} initialvalue={value}>
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
				<Space>
				<Button type="primary" htmlType="submit" className={styles.bnSearch} loading={loading} icon={<SearchOutlined />}>查询</Button>
				<Button icon={<RedoOutlined />} onClick={handReset}>重置</Button>
				<Button type="primary" style={{ marginRight: 12 ,marginLeft:10}} onClick={() => history.push('/deviceTpl/create')} className={styleglobal.buttonColorGreen} icon={<EditOutlined />}>创建设备模板</Button>
				<Button type="danger" onClick={clearAll} disabled={disabled} icon={<CloseOutlined />} >删除</Button>
				</Space>
			</Row>
		</Form>
	);
};
const DeviceTpl = ({
	deviceTpl: {
		name_space,
		queryParams,
		querySource,
		list,
		pagination,
		selectedList,
	},
	dispatch,
	loading
}) => {
	const selectedRowKeys = selectedList.map(row => row.id)
	const getListData = (values) => {
		dispatch({
			type: `${name_space}/queryList`,
			payload: {
				...queryParams,
				...values,
			}
		})
	}

	// 翻页调用接口
	const changeHandler = ({ current, pageSize }) => {
		getListData({
			...queryParams,
			pageIndex: current,
			pageSize,
		})
	};

	// 查询调用接口
	const onFilterHandler = (values) => {
		getListData(values)
	};

	// 选中事件
	const onSelect = (_, selectedRows) => {
		dispatch({
			type: `${name_space}/changeState`,
			payload: {
				selectedList: selectedRows
			}
		})
	}

	// 删除选中数据
	const clearAll = () => {
		const names = selectedList.map(obj => obj.name);
		Modal.confirm({
			title: `是否确认删除【${names.join('、')}】`,
			onOk: () => {
				dispatch({
					type: `${name_space}/delDeviceTpl`,
					payload: selectedRowKeys
				})
			}
		})
	};

	// 查询条件 下拉选项赋值
	const filters = Filters.map(obj => {
		switch (obj.key) {
			case 'deviceDataTyps':
				return {
					...obj,
					option: querySource.deviceDataTyps
				}
			default:
				return obj
		}
	})

	// 查询组件参数
	const filterProps = {
		forms: filters,
		onSubmit: onFilterHandler,
		loading,
		clearAll,
		disabled
	};

	// 表格组件参数
	const tableProps = {
		rowSelection: {
			type: 'checkbox',
			selectedRowKeys,
			onChange: onSelect,
		},
		data: list,
		columns: TableColumns,
		pagination,
		onChange: changeHandler,
	};

	const disabled = selectedRowKeys.length ? false : true;
	return (
		<div>
			<Title/>
			<Filter {...filterProps} />
			<Table {...tableProps} />
		</div >
	);
};

export default connect(({ deviceTpl, loading }) => ({
	deviceTpl,
	loading: loading.models['deviceTpl'],
}))(DeviceTpl);
