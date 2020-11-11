
import React, { useState } from 'react';
import { connect } from 'dva';
import { Link } from 'umi'
import Title from "@/components/Title/index"
import { Button,Upload,Modal,message,Form, Row, Col,Space } from 'antd';
import { RedoOutlined, SearchOutlined,VerticalAlignTopOutlined} from '@ant-design/icons';
import styles from './index.less';
import { getField } from '@/utils';
import Table from '@/components/table';
import Feedback from '@/components/modal/feedback';
import ModalHealthRecord from '@/components/modal/healthRecord';
import ModalContract from '@/components/modal/contract';
import {UploadOutlined} from "@ant-design/icons"
import { Filters, TableColumns } from './config';
import { history } from 'umi';
import styleglobal  from "../../global.less"
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
	showmodalshow
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
				<Button type="primary" style={{ marginRight: 12 ,marginLeft:10}} icon={<VerticalAlignTopOutlined />} onClick={showmodalshow} className={styleglobal.buttonColorGreen}>批量上传患者</Button>
				</Space>
			</Row>
		</Form>
	);
};

const Patient = ({
	patient: {
		list,
		pagination,
		selectedList,
		showadd
	},
	dispatch,
	loading
}) => {
	const selectedRowKeys = selectedList.map(row => row.id)
	const [modalData, setModalData] = useState(null);
	const [modalHealth, setModalHealth] = useState({ visible: false });

	// 查询列表
	const getListData = (values) => {
		dispatch({
			type: `patient/queryList`,
			payload: values
		})
	}

	// 翻页调用接口
	const changeHandler = ({ current, pageSize }) => {
		getListData({
			pageIndex: current,
			pageSize,
		})
	};

	// 查询调用接口
	const onFilterHandler = (values) => {
		getListData(values)
	};

	// 选中
	const onSelect = (_, selectedRows) => {
		dispatch({
			type: `${name_space}/changeState`,
			payload: {
				selectedList: selectedRows
			}
		})
	}


	const onFeelbackHandler = (msg) => {
		console.log('onFeelbackHandler:', msg);
		setModalData(null);
	};

	// 删除选中的
	const clearAll = () => {
		const names = selectedList.map(obj => obj.sn);
		Modal.confirm({
			title: `是否确认删除【${names.join('、')}】`,
			onOk: () => {
				dispatch({
					type: `${name_space}/deleteDevice`,
					payload: selectedRowKeys
				})
			}
		})
	};

	const filterProps = {
		forms: Filters,
		onSubmit: onFilterHandler,
		showmodalshow
	};

	const tableColumns = TableColumns.map(obj => {
		if (obj.key === 'link') {
			obj.render = (text, record) => <a onClick={() => setModalHealth({ visible: true, data: record })}>查看</a>
		} else if (obj.key === 'status') {
			obj.render = (text, record) => record.id > 1 ? <ModalContract data={record}><a>宣化区随访合同</a></ModalContract> : <Link to={`/signContract?id=${record.id}`}>签约</Link>
		}
		return obj
	})
	const tableProps = {
		rowSelection: {
			type: 'checkbox',
			selectedRowKeys,
			onChange: onSelect,
		},
		data: list,
		columns: tableColumns,
		pagination,
		control: [
			{
				key: 'view',
				name: '修改',
				onClick: (record) => history.push({ pathname: '/patient/edit', query: { id: record.id } })
			},
		],
		onChange: changeHandler,
		loading
	};


	const modalProps = {
		onOk: onFeelbackHandler,
		onCancel: () => setModalData(null)
	};

	const modalHealthProps = {
		visible: modalHealth.visible,
		data: modalHealth.data || {},
		onCancel: () => setModalHealth({ visible: false })
	}
    const prop={
        action:"/api/1.0/patient/ImportPatientFromExcel",
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
	function uploadparent(bool){
		dispatch({
			type:"patient/changeshow",
			payload:bool
		})
	}
	function showmodalshow(){
		uploadparent(true)
	}
	function exitupload(){
		uploadparent(false)
		getListData()
	}


	function Uparent(){
		return(
			<Modal
			title="上传患者"
			visible={showadd}
			onCancel={exitupload}
			footer={null}>
			<Upload {...prop} >
			<Button style={{marginTop:30,marginLeft:150}}>
			  <UploadOutlined /> 上传签约文件(excel)
			</Button>
		  </Upload>
		  <a href="/api/1.0/patient/GetImportPatientTemplate" style={{marginLeft:200}}>下载execel</a>
			</Modal>
		)
	}
	return (
		<div>
			<Title/>
			<Filter {...filterProps} />
			<div style={{ marginTop: 12, marginBottom: -12 }}>
			{/* <Button type="primary" style={{ marginRight: 12 }} onClick={() => history.push('/patient/create')}>创建</Button> */}

				{/* <Button type="danger" onClick={clearAll}>删除</Button> */}
			</div>
			<Table {...tableProps} />
			{modalData ? <Feedback {...modalProps} /> : null}
			<ModalHealthRecord {...modalHealthProps} />
			<Uparent/>
		</div >
	);
};

export default connect(({ patient, loading }) => ({
	patient,
	loading: loading.models['patient'],
}))(Patient);
