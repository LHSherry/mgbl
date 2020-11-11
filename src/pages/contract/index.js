/*
 * @Description: 合同列表页面
 * @Author: zhao
 * @Date: 2020-05-19 19:37:18
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-16 10:00:15
 */
import React from 'react';
import { connect } from 'dva';
import { Button,Table,Tag,Space} from 'antd';
import Title from "@/components/Title/index"
import StepModal from "./stepsModal/index"
import Searchcontract from "./searchcontract/index"
import Signcontrcat from "./sgincontrcat/index"
import {ToolOutlined,CloseOutlined,FileAddOutlined} from "@ant-design/icons"

const Contract = ({
	contract: {
		list,
		pagination,
		searchFrom,
		showstep,
		contorstep,
		step1,
		step2,
		step3,
		step4,
		signcontract,
		sign,
		signstep,
		DeviceList,
		takesid
	},
	dispatch,
	loading
}) => {
	function changpage(index){
		dispatch({
			type:"contract/page",
			payload:index
		})
	}
	function sigin(e){
		dispatch({
			type:"contract/changesignshow",
			payload:true
		})
		dispatch({
			type:"contract/changetempid",
			payload:e.currentTarget.id
		})
	}
	function eidt(e){
		dispatch({
            type:'contract/changeshowstep',
            payload:true
        })
		dispatch({
			type:"contract/Editstep1",
			payload:e.currentTarget.id
		})
	}
	function delet(e){
		dispatch({
			type:"contract/deletcontract",
			payload:e.currentTarget.id
		})		
	}
	const columns = [
		{
		  title: '合同名称',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <a>{text}</a>,
		},
		{
		  title: '合同分类',
		  key: 'categoryName',
		  dataIndex: 'categoryName',
		  render: categoryName => (
 				 <Tag color='green' >
					{categoryName}
				  </Tag>
		  ),
		},
		{
		  title: '合同描述',
		  key: 'description',
		  dataIndex: 'description',
		  render: (text, record) => (
				<a>{text}</a>

		  ),
		},
		{
			title: '操作',
			key: 'contorl',
			dataIndex: 'contorl',
			render: (text, record) => (
				<Space >
				<Button type="primary" size="small" shape="round" style={{fontSize:12}} icon={<ToolOutlined />} id={record.id}onClick={eidt} >编辑</Button>
				<Button type="primary" danger size="small"shape="round" style={{fontSize:12}} icon={<CloseOutlined />} onClick={delet} id={record.id}>删除</Button>
				<Button type="primary"  size="small"shape="round" style={{fontSize:12}} icon={<FileAddOutlined />} id={record.id} onClick={sigin}>签约</Button>
				</Space>
			),
		  },
	  ];
	  

	return (
		<div>
			<Title/>
			<Searchcontract searchFrom={searchFrom} dispatch={dispatch}  />
			<Table columns={columns}
			   dataSource={list}
			   rowKey={record=>record.id}
			   loading ={loading}
			   pagination={{current:pagination.current,pageSize:5,total:pagination.total,onChange:changpage}} ></Table>
				<Signcontrcat signcontract={signcontract}  dispatch={dispatch} sign={sign} signstep={signstep} DeviceList={DeviceList} takesid={takesid}/>
			<StepModal showstep={showstep} dispatch={dispatch} contorstep={contorstep} step1={step1} step2={step2} step3={step3} step4={step4} />
		</div >
	)
};

export default connect(({ contract, loading }) => ({
	contract,
	loading: loading.models['contract'],
}))(Contract);
