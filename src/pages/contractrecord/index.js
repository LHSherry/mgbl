import react,{useState}from "react"
import {connect} from "dva"
import {Table,Form,Input,Select,Button,DatePicker,Space,Modal} from "antd"
import Title from "@/components/Title/index"
import styles from "./index.less"
import {SearchOutlined,LogoutOutlined,PlayCircleOutlined} from "@ant-design/icons"
import styleglobal  from "../../global.less"
import SendDevice from "../contract/sendDevice/index" 

const Record=({recordlistcontract,dispatch})=>{
    const [modalshow,setmodal] = useState(false)
    const {list,orglist,searchFrom,DeviceList}=recordlistcontract
    let proplist = {
        DeviceList,
        dispatch,
        subname:"recordlistcontract/BatchDevice"
    }
    const columns = [
        {
            title: '业务编码',
            dataIndex: 'code',
            key: 'code',
          },
        {
          title: '合同名称',
          dataIndex: 'templateName',
          key: 'templateName',
        },
        {
          title: '操作人员',
          dataIndex: 'operator',
          key: 'operator',
        },
        {
          title: '签约时间',
          dataIndex: 'signTime',
          key: 'signTime',
          
        },
        {
            title: '签约数量',
            dataIndex: 'count',
            key: 'count',
            render:(item,record)=><span style={{color:"#3399FF"}}>{item}</span>
          },
        {
            title: '已发放数量',
            dataIndex: 'providedCount',
            key: 'providedCount',
            render:(item,record)=><span style={{color:"#33CC00"}}>{item}</span>
          },
          {
            title: '未发放数量',
            dataIndex: 'remainedCount',
            key: 'remainedCount	',
            render:(item,record)=><span style={{color:"#CC0000"}}>{item}</span>
          },
          {
            title: '操作',
            dataIndex: 'sex',
            key: 'sex',
            render:(item,record)=>{
                return(
                    <Space key={record.id}>
                    <Button icon={<LogoutOutlined />} shape="round" style={{fontSize:10,color:"#fff"}} className={styleglobal.buttonColorGreen}>
                     <a href ={`/api/1.0/device/CreateBatchDeviceReport?taskId=${record.id}`} style={{color:"#fff"}}>导出批量发放结果</a>
                        </Button>
                    <Button icon={<PlayCircleOutlined />}  shape="round" style={{fontSize:10,color:"#fff"}} className={styleglobal.buttonColorGeekblue} onClick={comesend} id={record.id}>继续批量发放</Button>
                    </Space>
                )
            }
          },
      ];
      function  comesend(e){
          dispatch({
              type:"recordlistcontract/setDevicelist",
              payload:e.currentTarget.id,
              callback:setmodal
          })
      }
      function exit(){
          setmodal(false)
      }
    function changpage(index){
        dispatch({
            type:"recordlistcontract/changepage",
            payload:index
        })
        dispatch({
            type:"recordlistcontract/queryList",
        })    
    }
    function submit(value){
        dispatch({
            type:"recordlistcontract/changesearch",
            payload:value,
        })         
        dispatch({
            type:"recordlistcontract/queryList",
        })           
    }
    return(
        <>
        <Title/>
        <div className={styles.search}>
            <Form
            layout="inline"
            onFinish={submit}>
                <Form.Item label="合同模板名称" name="templateName">
                    <Input/>
                </Form.Item>
                <Form.Item label="机构ID"  name="orgId">
                    <Select style={{width:200}} placeholder="请选择机构">
                        {
                         orglist.length > 0 && orglist.map((item,index)=>{
                                return(
                                    <Select.Option key={index} value={item.organId}>
                                    {item.organName}
                                </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="开始时间" name="startTime">
                   <DatePicker/>
                </Form.Item>
                <Form.Item label="结束时间" name="endTime">
                   <DatePicker/>
                </Form.Item>
                <Form.Item >
                   <Button icon={<SearchOutlined />} type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        </div>
        <Table dataSource={list.datas} 
        columns={columns} 
        rowKey={record=>record.id}
        pagination={{current:searchFrom.pageIndex,pageSize:searchFrom.pageSize,total:list.totalCount,onChange:changpage}}/>;
        <Modal 
        visible={modalshow}
        title="继续发放设备"
        footer={null}
        onCancel={exit}
        destroyOnClose={true}>
            {DeviceList &&  <SendDevice {...proplist}/>}
        </Modal>
        </>
    )
}
export default connect(({ recordlistcontract, loading }) => ({
	recordlistcontract,
	loading: loading.models['recordlistcontract'],
}))(Record);