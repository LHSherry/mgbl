
import {Modal,Button,Input,Select,Upload,message,Steps,Form} from "antd"
import react,{useState,useEffect} from "react"
import {UploadOutlined,ExclamationCircleOutlined} from "@ant-design/icons"
import SendDevice from "../sendDevice/index"
const { Step } = Steps;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

 const SignModal= ({dispatch,signcontract,formRef1,sign,signstep,DeviceList,takesid})=>{
  let send = {
    DeviceList,
    dispatch,
    subname:"contract/BatchDevice",
  }

   function close(){
      dispatch({
        type:"contract/changesignshow",
        payload:false
      })
      dispatch({
        type:"contract/restsign",
      }) 
  }
  function choseNext(){
    dispatch({
      type:'contract/sendstep',
    })
  }
  function nextstep(){
    formRef1.current.submit()
  }
  function submit(value){
    dispatch({
      type:'contract/subinfo',
      payload:value
    })
  }

  function selectdepts(value){
    dispatch({
      type:'contract/getdpit',
      payload:value
    })
  }


    const prop={
        action:"/api/1.0/contract/BatchSignUploadPatients",
        accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        withCredentials:true,
        onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log("正在上传");
            }
            if (info.file.status === 'done') {
                if(info.file.response.successed==true){
                  dispatch({
                    type:'contract/settken',
                    payload:info.file.response.result,
                    callback:confirm
                  })
                  
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
    function confirm() {
      Modal.confirm({
        title: '是否进入批量发放？',
        icon: <ExclamationCircleOutlined />,
        content: '签约成功！是否进入下一步批量发放操作？如果选择是,讲进行下一步。如果选择否，则直接退出！',
        okText: '是',
        onCancel:close,
        cancelText: '否',
        onOk:choseNext
      });
    }
    function Uploads (){
      return(
        <Upload {...prop} >
        <Button style={{marginTop:30,marginLeft:150}}>
          <UploadOutlined /> 上传签约文件(excel)
        </Button>
      </Upload>
      )
    }
    function FirstStep({sign}){
      return(
        <Form style={{marginTop:30}}  {...layout} ref={formRef1} initialValues={sign.info} onFinish={submit}> 
            <Form.Item label="机构" name="organId">
                <Select disabled={!sign.canSelectOrgan} onChange={selectdepts}>
                        {
                        sign.organs&&  sign.organs.map((item,index)=>{
                            return(
                              <Select.Option value={item.organId} key={index}>
                                {item.organName}
                              </Select.Option>
                            )
                          }) 
                        }
                </Select>
            </Form.Item>
            <Form.Item label="部门" name="deptId">
                <Select>
                        {
                       sign.depts &&   sign.depts.map((item,index)=>{
                            return(
                              <Select.Option value={item.organId} key={index}>
                                {item.organName}
                              </Select.Option>
                            )
                          }) 
                        }                  
                </Select>
            </Form.Item>
        </Form>
      )
    }
    function SecondStep(){
      return(
        <Uploads/>
      )
    }
    function FROM ({sign,signstep}){
      return(
        <>
        {
         signstep.current == 0 && JSON.stringify(sign) !=="{}" && <FirstStep sign={sign} />
        }
        {
         signstep.current == 1 && JSON.stringify(sign) !=="{}" &&  <SecondStep/>
        } 
        {
         signstep.current == 2 && JSON.stringify(sign) !=="{}" &&  <SendDevice {...send} />
        } 
        </>

      )
    }
    return(
        <Modal
          visible={signcontract}
          getContainer={false}
          title="签约/批量发放"
          onCancel={close}
          footer={null,
          <Button type="primary" onClick={nextstep} disabled={signstep.current==1 ||signstep.current==2?true:false}>下一步</Button>}>
          <Steps size="small" current={signstep.current}>
            <Step title="第一步" status={signstep.signstep1State} />
            <Step title="第二步" status={signstep.signstep2State} />
            <Step title="第三步" status={signstep.signstep3State} />
          </Steps>
            <FROM  sign={sign} signstep={signstep}/>
        </Modal>
    )
}
class Sign extends react.Component{
    formRef1 = react.createRef()
    constructor(props){
      super(props)
    }
    render(){
      return(
        <SignModal 
        dispatch={this.props.dispatch}
         signcontract={this.props.signcontract}
          formRef1={this.formRef1}
          sign={this.props.sign}
          signstep={this.props.signstep}
          DeviceList={this.props.DeviceList} 
          takesid={this.props.takesid}/>
      )
    }
}
export default Sign