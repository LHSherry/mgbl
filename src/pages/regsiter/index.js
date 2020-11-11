import {Form,Input,Select,Button,DatePicker} from "antd"
const { TextArea } = Input;
import react from "react"
import { connect } from 'dva';
import Title from "@/components/Title/index"
import sytles from "./index.less"
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
 const Uers= (props)=>{
    
   function submit(value){
       value.birthDay  &&  (value.birthDay =  value.birthDay.format('YYYY-MM-DD'))
       props.dispatch({
            type:"regsiteruser/regesiterusers",
            payload:value
        })   
        props.formRef.current.resetFields(); 
    }
    return(
        <>

        <Title/>
        <div className={sytles.container} >
            <Form style={{width:500}} ref={props.formRef} {...layout} onFinish={submit}  initialValues={props.props.list} >
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
                   <Form.Item  name="gender" label="性别" rules={[{required:true}]} initialValue="男">
                       <Select >
                           <Select.Option value="男">
                               男
                           </Select.Option>
                           <Select.Option value="女">
                               女
                           </Select.Option>
                       </Select>
                   </Form.Item>
                   <Form.Item  name="isadmin" label="是否成为机构管理员" rules={[{required:true}]} initialValue="0" >
                       <Select >
                           <Select.Option value="1">
                               是
                           </Select.Option>
                           <Select.Option value="0">
                               否
                           </Select.Option>
                       </Select>
                   </Form.Item>
                   <Form.Item  name="orgId" label="机构" rules={[{required:true}]}>
                       <Select>
                           {
                            //    console.log(props.props.list.orgIds)
                               props.props.list.orgIds &&props.props.list.orgIds.map((item,index)=>{
                                   return(
                                        <Select.Option key={index+1} value={item.id} >
                                        {item.name}
                                        </Select.Option>
                                   )
                               })
                           }
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
                   <Form.Item name="sumit" wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
                   <Button htmlType="submit" type="primary" block>提交</Button>
                   </Form.Item>
            </Form>
        </div>
        </>
    )
}
class UserListre extends react.Component{
    formRef = react.createRef();
        constructor(props){
            super(props)
        }
        componentWillMount(){
            this.props.dispatch({
                type:"regsiteruser/getorg"
            })
        }
        render(){
            return(
                <>
                {
                    JSON.stringify(this.props.regsiteruser.list)!=="{}" &&<Uers props={this.props.regsiteruser} dispatch={this.props.dispatch} formRef={this.formRef}></Uers>
                }
                </>
            )
        }
}
export default connect(({regsiteruser,loading})=>({
	regsiteruser,
	loading:loading.models['regsiteruser']
  }))(UserListre)