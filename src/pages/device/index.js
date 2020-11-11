/*
 * @Description: 设备实例列表
 * @Author: zhao
 * @Date: 2020-05-19 19:37:18
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:02:23
 */
import React, { useState,useRef} from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import Title from "@/components/Title/index"
import { Button, Modal ,Form,Input,Table,List,Typography,Space, Row, Col, } from 'antd';
import { getField } from '@/utils';
// import Filter from '@/components/filter';
import  MBTable from '@/components/table';
import SelectModal from '@/components/modal/selectModule';
import FormModal from '@/components/modal/form';
import styles from './index.less';
import ENUM from '@/const';
import {SearchOutlined,RedoOutlined,LoginOutlined,LogoutOutlined,RollbackOutlined,FullscreenExitOutlined,CloseOutlined } from '@ant-design/icons';
import { Filters, TableColumns } from './config';
import styleglobal  from "../../global.less"
const layout = {
	// labelCol: { span: 0},
	// wrapperCol: { span: 10 },
  };

// 弹出窗类型枚举
const ModalType = {
	ALLOT: 'allot',
	PATIENT: 'patient',
	GIVEBACK: 'giveback',
	SCRAP: 'scrap'
}
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
	changesenshow,
	setModal,
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
				<Button type="primary" style={{ marginRight: 12 ,marginLeft:10}} onClick={() => history.push('/device/import')} icon={<LoginOutlined/>} className={styleglobal.buttonColorVolcano}>入库</Button>
				<Button type="primary" style={{ marginRight: 12 }} onClick={changesenshow} icon={<LogoutOutlined/>} className={styleglobal.buttonColorCyan}>发放</Button>
				<Button type="primary" style={{ marginRight: 12 }} onClick={() => setModal({ visible: true, type: ModalType.GIVEBACK })} icon={<RollbackOutlined/>} className={styleglobal.buttonColorGreen}>归还</Button>
				<Button type="primary" style={{ marginRight: 12 }} onClick={() => setModal({ visible: true, type: ModalType.SCRAP })} icon={<FullscreenExitOutlined/>} className={styleglobal.buttonColorSunset}>报废</Button>
				<Button type="danger" onClick={clearAll} disabled={disabled} icon={<CloseOutlined/>}>删除</Button>
				</Space>
			</Row>
		</Form>
	);
};

const Device = ({
	device: {
		name_space,
		queryParams,
		querySource,
		selectedList,
		list,
		pagination,
		plans,
		sendvlue,
		sendshow
	},
	dispatch,
	loading
}) => {
	const selectedRowKeys = selectedList.map(row => row.id)
	const [modal, setModal] = useState({ visible: false, type: '' })
	const [inputquery, setinputquery] = useState("")
	const inputfocus = useRef()
	// 查询列表
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


	// 发放弹出框确认事件
	const onSelectHandler = (values) => {
		if (values) {
			const id = values[0].id;
			onGrant(id);
		}
	}

	// 弹出框确认事件
	const onFormModalSubmit = (values) => {
		if (ModalType.GIVEBACK === modal.type) {
			onGiveBack(values);
		} else if (ModalType.SCRAP === modal.type) {
			onScrap(values);
		}
	}

	// 发放
	const onGrant = (patientId) => {
		dispatch({
			type: `${name_space}/provideDevice`,
			payload: {
				patientId,
				sn: selectedList[0].model
			},
			callback: () => setModal({ visible: false })
		})
	}

	// 归还
	const onGiveBack = (values) => {
		dispatch({
			type: `${name_space}/reclaimDevice`,
			payload: values,
			callback: () => setModal({ visible: false })
		})
	}

	// 报废
	const onScrap = (values) => {
		dispatch({
			type: `${name_space}/reclaimDevice`,
			payload: [values.sn],
			callback: () => setModal({ visible: false })
		})
	}

	// 查询下拉框条件赋值
	const filters = Filters.map(obj => {
		switch (obj.key) {
			case 'deviceTypes':
				return {
					...obj,
					option: querySource.deviceTypes
				}
			case 'status':
				return {
					...obj,
					option: querySource.status
				}
			default:
				return obj
		}
	})

	// 查询组件参数
	const filterProps = {
		forms: filters,
		loading,
		onSubmit: onFilterHandler,
		changesenshow,
		setModal,
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
	function send(e){
		dispatch({
			type:`${name_space}/send`,
			payload:e.currentTarget.value
		})
}
  const columns = [
	{
	  title: '计划名称',
	  dataIndex: 'name',
	  key: 'name',
	   render:(item)=><a>{item}</a>
	},
	{
	  title: '设备型号',
	  dataIndex: 'deviceModelName',
	  key: 'deviceModelName',
	  render:(item)=><a>{item}</a>
	},
	{
	  title: '创建日期',
	  dataIndex: 'createTime',
	  key: 'createTime',
	  render:(item)=><a>{item}</a>
	},
  ];
	const data = [];
	function querypalns(e){


		dispatch({
			type:`${name_space}/queruyplans`,
			payload:e.currentTarget.value,
			onfocus:inputfocus.current.focus
		})
	}
	function changevalue(e){
			dispatch({
				type:`${name_space}/senvalueschange`,
				payload:e.currentTarget.value
			})
	}
	function exitend(){
		showsend(false)
		dispatch({
			type:`${name_space}/resetlist`,
		})
		dispatch({
			type:`${name_space}/queryList`,
		})		
	}
	function changesenshow(){
		showsend(true)
	}	
	function showsend(bool){
		dispatch({
			type:`${name_space}/showsend`,
			payload:bool
		})
	}
	const renderSelectModal = () => {
		if (modal.visible) {
			if ([ModalType.PATIENT].includes(modal.type)) {
				// return <Modelsend  />
			} else {
				const formModalProps = {
					title: ModalType.GIVEBACK ? '归还设备' : '报废设备',
					data: [{ type: 'input', name: '设备编号', key: 'sn', rules: [{ required: true, message: '请输入设备编号' }] }],
					onOk: onFormModalSubmit,
					onCancel: () => setModal({ visible: false }),
				}
				return <FormModal {...formModalProps} />
			}
		} else {
			return null
		}
	}
	const disabled = selectedRowKeys.length ? false : true;
	return (
		<div>
			<Title/>
			<Filter {...filterProps} />
			<MBTable {...tableProps} />
			<Modal 
			    width={700}
				 visible={sendshow}
				 onCancel={exitend}
				 destroyOnClose={true}
				 title="设备发放"
				 footer={null}>
							<Space>
							<Input placeholder="请输入查询条件姓名或者身份证号码" onPressEnter={querypalns} ></Input>
							<Input placeholder="请输入或者扫描设备" onPressEnter={send} ref={inputfocus}></Input>
							</Space>
								<List
								style={{marginTop:20}}
								size="large"
								header={<div>查询结果</div>}
								footer={null}
								bordered
								dataSource={plans}
								renderItem={item => (
								<List.Item >
									<Space>
								       <span>姓名:&nbsp;&nbsp;{item.patientName}</span>
										<span>性别:&nbsp;&nbsp;{item.gender}</span>
										<span>身份证号码:&nbsp;&nbsp;{item.idNo}</span>
									</Space>
								</List.Item>
								)}
								/>
					 <Table
					  style={{marginTop:20}}
					  columns={columns}
					  rowKey={record=>record.planId}
					  pagination={false}
					  dataSource={plans.length>0?plans[0].plans:[]}>
					 </Table>
		     </Modal>
			{renderSelectModal()}
		</div>
	);
};
class Devices extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<Device {...this.props} />
		)
	}
}
export default connect(({ device, loading }) => ({
	device,
	loading: loading.models['device'],
}))(Devices);
