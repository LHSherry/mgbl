/*
 * @Description: 设备批量入库
 * @Author: zhao
 * @Date: 2020-05-23 19:23:06
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-03 21:49:02
 */
import React,{useState} from 'react';

import { Form, Button, Row, Col, Upload,Select,Input,message,Modal} from 'antd';

import { getField } from '@/utils';
import Const from '@/const';

import styles from './index.less';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
const layout1 = {
	labelCol: { span: 8 },
	wrapperCol: { span: 24 },
};
const ImportBatch = ({
	onSubmit,
	loading,
	data,
	getlost,
	getdept,
}) => {
	const [form]=Form.useForm()
	const [fileList, updateFileList] = useState([]);
	const [modal,setmodal]=useState(false)
	const normFile = e => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList.slice(-1);
	};
	async function submit(values){
		const result= getlost(values)
		if(result){
			setmodal(true)
		}
	}
	function closemodal(){
		setmodal(false)
	}
    const prop={
        action:"/api/1.0/device/ImportDeviceInstances",
        accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		withCredentials:true,
        onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log("正在上传");
            }
            if (info.file.status === 'done') {
                if(info.file.response.successed==true){
					message.success(`${info.file.name} 上传成功`)
                }else{
					message.error(`${info.file.name} 失败${info.file.response.errMessage}`)
					// updateFileList(info.fileList.filter(file => !!file.status));
				}
				
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },  
          progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 5,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
		  },  
    }
	return (
		<>
		<Form className={styles.container} {...layout} onFinish={onSubmit} onFinish={submit} form={form}>
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
			<Form.Item style={{marginLeft:500}} >
				<Button type="primary" htmlType="submit">下一步</Button>
			</Form.Item>
		</Form>
			<Modal
			visible={modal}
			onCancel={closemodal}
			destroyOnClose={true}
			title="上传"
			footer={null}>
			<Row gutter={24}>
				<Col {...layout1.labelCol}></Col>
				<Col {...layout1.wrapperCol}>
					<Upload {...prop}  >
					<Button>上传设备列表文件</Button>
				</Upload >
				<div>请先上传数据,然后设备入库，需上传excel模板，如没有请下载<a href="/api/1.0/device/GetImportDeviceInstanceTemplate" target="_blank">点击下载</a></div>
				</Col>
			</Row>
			</Modal>
		</>
	)
}

export default ImportBatch
