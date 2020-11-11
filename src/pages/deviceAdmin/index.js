/*
 * @Description: 管理员 设备实例导入
 * @Author: zhao
 * @Date: 2020-05-20 23:43:20
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:07:13
 */
import React from 'react';
import { connect } from 'dva';

import { Form, Row, Col, Upload, Button } from 'antd';
import { getField } from '@/utils';
import Const from '@/const';

import styles from './index.less';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
const DeviceAdminImport = ({
	deviceAdminImport: {
		name_space,
	},
	dispatch,
	loading
}) => {
	const [form] = Form.useForm();

	// 批量设备导入
	const onSubmitBatch = (values) => {
		const payload = {
			...values,
			file: values.file[0].originFileObj,
			deviceModelId: values.deviceModelId && values.deviceModelId.length ? values.deviceModelId[0].id : undefined,
		}
		dispatch({
			type: `${name_space}/importBatch`,
			payload,
			callback: () => {
				// 提交成功后重置表单
				form.resetFields();
			}
		})
	}

	// 上传文件处理
	const normFile = e => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList.slice(-1);
	};

	return (
		<div className={styles.container}>
			<Form className={styles.container} {...layout} form={form} onFinish={onSubmitBatch}>
				<Row gutter={24}>
					<Col {...layout.labelCol}><div className={styles.title}>1.设备模板</div></Col>
				</Row>
				<Form.Item name="deviceModelId" label="选择设备模板" rules={[{ required: true, message: '请选择设备模板' }]}>
					{getField({ type: 'selectModal', title: '选择设备模板', moduleType: Const.ModuleEnum.DEVICETPL, placeholder: '请选择设备模板' })}
				</Form.Item>
				<Row gutter={24}>
					<Col {...layout.labelCol}><div className={styles.title}>2.上传设备列表</div></Col>
				</Row>
				<Form.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} label="上传文件" rules={[{ required: true, message: '请上传文件' }]}>
					<Upload accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
						<Button>上传设备列表文件</Button>
					</Upload>
				</Form.Item>
				<Row gutter={24}>
					<Col {...layout.labelCol}></Col>
					<Col {...layout.wrapperCol}><div>设备入库，需上传excel模板，如没有请下载<a href="/api/1.0/device/GetImportDeviceInstanceTemplate" target="_blank">点击下载</a></div></Col>
				</Row>

				<div className={styles.bnList}>
					<Button type="primary" htmlType="submit" loading={loading}>确认入库</Button>
				</div>
			</Form>
		</div>
	);
};

export default connect(({ deviceAdminImport, loading }) => ({
	deviceAdminImport,
	loading: loading.models['deviceAdminImport']
}))(DeviceAdminImport);
