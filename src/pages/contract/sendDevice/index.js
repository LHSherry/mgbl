
import react ,{useRef,useEffect}from "react"
import {Input,Space,Button,Table,Mentions} from "antd"
import {ArrowDownOutlined} from "@ant-design/icons"
import styleglobal  from "../../../global.less"
import styles from "./index.less"
const { Option } = Mentions;
const columns = [
    {
      title: '型号名称',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    {
      title: '厂家型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '待发放总数',
      dataIndex: 'total',
      key: 'total',
      render:item=>(<span style={{color:"#3399FF"}}>{item}</span>)
    },
    {
        title: '已发放',
        dataIndex: 'provided',
        key: 'provided',
        render:item=>(<span style={{color:"#33CC00"}}>{item}</span>)
      },
      {
        title: '剩余',
        dataIndex: 'remained',
        key: 'remained',
        render:item=>(<span style={{color:"#CC0000"}}>{item}</span>)
      },
  ];
export default ({DeviceList,dispatch,subname}) =>{
    const {provideInfos,taskId} = DeviceList
    const input = useRef()
    function sendDevice(e){
        dispatch({
            type:subname,
            payload:e.currentTarget.value
        })
    }
    function SendInput(){
      return(
        <div className={styles.sendinput}>
        <div >设备sn:</div>
         <Input size="middle" onPressEnter={sendDevice} placeholder="请扫描设备" autoFocus={true} style={{width:200}} ></Input>
        </div>
      )
    }
    return(
      <>
      <Space style={{marginTop:20,}}>
          <SendInput/>
          <Button  className={styleglobal.buttonColorGreen}  icon={<ArrowDownOutlined style={{color:"#fff"}}/>}>
          <a href ={`/api/1.0/device/CreateBatchDeviceReport?taskId=${taskId}`} style={{color:"#fff"}}>导出批量发放结果</a>
          </Button>
      </Space>
      <Table style={{marginTop:10}}  dataSource={provideInfos} rowKey={record=>record.id} columns={columns} pagination={false} />
      </>
    )
  }