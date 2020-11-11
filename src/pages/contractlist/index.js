import react from "react"
import Title from "@/components/Title/index"
import {Form,Select,Input,Button,Table,DatePicker} from "antd"
import {SearchOutlined,} from '@ant-design/icons';
import styles from "./index.less"
import { connect } from 'dva';
import styleglobal  from "../../global.less"
  const columns = [
    {
        title: '业务编码',
        dataIndex: 'code',
        key: 'code',
      },
    {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '甲方',
      dataIndex: 'firstPart',
      key: 'firstPart',
    },
    {
        title: '乙方',
        dataIndex: 'secondPart',
        key: 'secondPart',
      },
    {
      title: '签约时间',
      dataIndex: 'signTime',
      key: 'signTime',
    },
    {
        title: '执行部门',
        dataIndex: 'executor',
        key: 'executor',
      },
  ];
const Userslist = ({listcontract,dispatch})=>{
    const {
        loading,
        pationage,
        dataSource,
        searchfrom
    } = listcontract
    function changpage(index){
        dispatch({
            type:"listcontract/initlist",
            payload:{
                page:index
            }
        })       
    }
    function submit(value){
        dispatch({
            type:"listcontract/changeloading",
            payload:true
        })
        dispatch({
            type:"listcontract/initlist",
            payload:{
                search:value,
                page:1
            }
        })
        setTimeout(function(){
            dispatch({
                type:"listcontract/changeloading",
                payload:false
            })
        },500)
    }
    const Search = ()=>{
        return(
            <div className={styles.Form}>
            <Form
            layout="inline"
            initialValues={searchfrom}
            onFinish={submit}>
                <Form.Item label="患者" name="patient">
                    <Input placeholder="请输入"></Input>
                </Form.Item>  
                <Form.Item label="执行部门" name="executor">
                    <Input placeholder="请输入名"></Input>
                </Form.Item> 
                <Form.Item label="时间" name="signDate">
                    <DatePicker placeholder="请选择"></DatePicker>
                </Form.Item>               
                <Form.Item label="机构" name="orgId">
                    <Select style={{width:150}} placeholder="请输入选择机构">
                        {
                            searchfrom.orglist.map((item,index)=>{
                                return(
                                    <Select.Option value={item.organId} key={index}>
                                        {item.organName}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>查询</Button>
                </Form.Item>
            </Form>
            </div>
        )
    }
    return(
        <>
            <Title/>
            <Search/>
            <Table
            style={{marginTop:10}}
             dataSource={dataSource} 
             columns={columns} 
             loading ={loading}
             rowKey={(record,index)=>index}
             pagination={{current:pationage.current,pageSize:pationage.pageSize,total:pationage.total,onChange:changpage}}/>
        </>
    )
}
export default connect(({listcontract,loading})=>({
	listcontract,
	loading:loading.models['listcontract']
  }))(Userslist)
