import react,{useState,useRef,useEffect} from "react"
import {Modal,Form,Input,InputNumber,Select,Button,message,DatePicker } from "antd"
import moment from "moment"
const { TextArea } = Input;
import styles from "./index.less"
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const User = (props)=>{
    const [data,setdata]=useState(props.props.list)
    useEffect(()=>{
          setdata(props.props.list)
        },[props.props.list])
   function handleOk(){
       props.formRef.current.submit()
        // this.props.setbool(false)
      }
      function  handleCancel(){
        props.props.dispatch({
                type:"orgManage/resetorg",
            })
            props.props.setbool(false)
      }
      function  onSubmit(vlaue){
        // vlaue.birthDay  &&  (vlaue.birthDay =  vlaue.birthDay.format('YYYY-MM-DD'))
        data.id && props.props.dispatch({
            type:"orgManage/saveorgeidt",
            payload:vlaue
        })
        data.id || props.props.dispatch({
            type:"orgManage/savesuser",
            payload:vlaue
        })
        props.props.setbool(false)
      }
    return(
        <>
       { <Modal
          getContainer={false}
           width={500}
           visible={props.props.isshow}
           destroyOnClose={false}
           title="新增"
           onOk={handleOk}
           onCancel={ handleCancel}
           >
               <Form  ref={props.formRef} layout="horizontal" {...layout} initialValues={data} onFinish={onSubmit}>
                   <Form.Item name="userId" label="用户登录名" rules={[{required:true}]}>
                       <Input>
                       </Input>
                   </Form.Item>
                    <Form.Item name="name" label="用户姓名" rules={[{required:true}]}>
                       <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item  name="birthDay" label="出生日期">
                       <DatePicker  format="YYYY-MM-DD" />
                   </Form.Item>
                   <Form.Item  name="gender" label="性别" rules={[{required:true}]}>
                       <Select>
                           <Select.Option value="男">
                               男
                           </Select.Option>
                           <Select.Option value="女">
                               女
                           </Select.Option>
                       </Select>
                   </Form.Item>
                   <Form.Item name="address" label="住址">
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="email" label="电子邮箱">
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="officeTel" label="工作电话">
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="mobile" label="移动电话" rules={[{required:true}]}>
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="homeTel" label="家庭电话">
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="homeAddress" label="家庭住址">
                    <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="idCardNo" label="身份证号" rules={[{required:true}]}>
                     <Input>
                       </Input>
                   </Form.Item>
                   <Form.Item name="mark" label="备注">
                   <TextArea/>
                   </Form.Item>
               </Form>
           </Modal>
       }
       </>)
}

class Newuser extends react.Component{
    formRef = React.createRef();
    constructor(props){
        super(props)
        // this.state ={
        //     show:this.props.isshow
        // }

    }
    componentDidMount(){
        
    }

    render(){
        return(    
            <>{
                (JSON.stringify(this.props.list) !== "{}") &&  <User props={this.props} formRef={this.formRef}></User>
            }

            </>
        )

    }
}

export default Newuser