/*
 * @Description: 设备单个入库
 * @Author: zhao
 * @Date: 2020-05-23 14:44:32
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-01 21:17:35
 */
import React from 'react';

import { Form, Button, Row, Col,Select,Input} from 'antd';

import { getField } from '@/utils';

import Const from '@/const';

import styles from './index.less';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};

const ImportSingle = ({
	onSubmit,
	loading,
	data,
	getdept
}) => {

	return (
		<Form className={styles.container} {...layout} onFinish={onSubmit} initialValues={data.list}>
			<Form.Item name="modelId" label="选择设备型号" rules={[{ required: true, message: '请选择设备型号' }]}>
			<Select placeholder="请设备型号">
					{
					data.tempid.length > 0 && data.tempid.map((item,index)=>{
						return(
							<Select.Option value={item.deviceModelId} key={index}>
								{item.deviceModelName}
							</Select.Option>
						)
						})
					}
					</Select>
			</Form.Item>

			<Form.Item name="batchNo" label="生产批号">
				{getField({ type: 'input', placeholder: '请输入生产批号' })}
			</Form.Item>
			<Form.Item name="organId" label="机构" rules={[{ required: true, message: '请选择机构' }]}>
			<Select placeholder="请选择机构" onChange={getdept} >
				{
				data.org.organs &&	data.org.organs.map((item,index)=>{
					return(
						<Select.Option value={item.id} key={index}>
							{item.name}
						</Select.Option>
					)
					})
				}
					</Select>			
			</Form.Item>
			<Form.Item name="deptId" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
			<Select placeholder="请选择部门" >
				{
				data.dept.length >0 &&	data.dept.map((item,index)=>{
					return(
						<Select.Option value={item.organId} key={index}>
							{item.organName}
						</Select.Option>
					)
					})
				}
					</Select>			
			</Form.Item>
			<Form.Item name="validMonths" label="设备有效期" rules={[{ required: true, message: '请输入设备有效期' }]}>
					<Input addonAfter={<span>月</span>}></Input>
			</Form.Item>
			<Form.Item name="snArray" label="设备编号" rules={[{ required: true, message: '请选择设备编号' }]}>
				{getField({ type: 'input', placeholder: '请输入设备编号' })}
			</Form.Item>
			<div className={styles.bnList}>
				<Button type="primary" htmlType="submit" loading={loading}>确认入库</Button>
			</div>
		</Form>
	)
}

export default ImportSingle
