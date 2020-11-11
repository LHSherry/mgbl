import react ,{useState,useForm}from "react"
import {Form,Avatar,Button,Input,Upload,Modal } from "antd"
import { UploadOutlined,PlusOutlined ,EditOutlined } from '@ant-design/icons';
import Title from "@/components/Title/index"
import styles from "./index.less"
import { connect } from 'dva';

const tailLayout = {
        wrapperCol: { offset:10, span: 20 },
      };

const Person = ({personManager,dispatch})=>{

        let {list} = personManager
        const [passmodel,setpassmodel]=useState(false)
        const [form] = Form.useForm()
        function getBase64(file) {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = error => reject(error);
                });
              }
              function showpass(){
                 setpassmodel(true)
              }
              function handleCancel(){
                setpassmodel(false)
                form.resetFields()
              }
              function submit(values){
                dispatch({
                        type:'personManager/changepassword',
                        payload:values,
                        callback:handleCancel
                })
              }
              function infosubmit(values){
                dispatch({
                        type:'personManager/changeinfo',
                        payload:values,
                })                      
              }
              function validatePass(rules,value){
                if(value){
                        if(value.length<6 || value.length>8){
                                return Promise.reject("密码必须在6-8位之间");
                          }else{
                                if(form.getFieldValue('newPwd')&&form.getFieldValue('newPwd1')){
                                                if(form.getFieldValue('newPwd')!==form.getFieldValue('newPwd1')){
                                                                return Promise.reject("密码不一致");
                                                           }else{
                                                                return Promise.resolve();     
                                                           }                       
                                }else{
                                        return Promise.resolve(); 
                                }
                                
                          }
                }else{
                        return Promise.reject("密码不能为空");
                }
        
          }
              const uploadButton = (
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">上传</div>
                </div>
              );
        return(
            <>
                <Title/>
                <div className={styles.container}>
                        <div className={styles.borders}>
                        <div className={styles.avatar}>
                        <Avatar size={64}  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597660553743&di=59f8ddaa37cf2e6d57a0b210d2631433&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0"/>
                        <Button className={styles.btn} shape="round" size="small" type="primary" icon={<EditOutlined />}>点击我修改头像</Button>
                        </div>
                        {
                    list.name && <Form initialValues={list} onFinish={infosubmit}>
                        <Form.Item label="姓名">
                         {list.name}       
                        </Form.Item>
                        <Form.Item label="性别" >
                        {list.gender} 
                        </Form.Item> 
                        <Form.Item label="机构" >
                        {list.organName} 
                        </Form.Item>    
                        <Form.Item label="部门" >
                        {list.deptName} 
                        </Form.Item> 
                        <Form.Item label="职位" >
                        {list.stationName}    
                        </Form.Item>
                        <Form.Item label="工号">
                        {list.number}   
                        </Form.Item>
                        <Form.Item label="描述" >
                        {list.mark}  
                        </Form.Item>
                        <Form.Item label="登录名称" name="userId" rules={[{ required: true }]} style={{marginLeft:-10}}>
                           <Input ></Input>
                        </Form.Item>
                        <Form.Item label="登录密码" name="xx">
                        <a onClick={showpass}>修改密码</a>
                        </Form.Item>
                        <Form.Item label="身份证号" name="idCardNo">
                        <Input></Input>        
                        </Form.Item>
                        <Form.Item label="手机号码" name="mobile">
                        <Input></Input>        
                        </Form.Item>
                        <Form.Item label="电子邮箱" name="email">
                        <Input></Input>        
                        </Form.Item>
                        <Form.Item label="家庭地址" name="homeAddress">
                        <Input></Input>        
                        </Form.Item>
                        <Form.Item label="个人签名" >
                           <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture-card"
                           // fileList={fileList}
                           // onPreview={handlePreview}
                           // onChange={handleChange}
                           >
                           {uploadButton}
                           </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >保存</Button> 
                        </Form.Item>
                   </Form>
                        }

                        </div>
                        {/* <Modal
                                // visible={previewVisible}
                                // title={previewTitle}
                                // footer={null}
                                // onCancel={this.handleCancel}
                                >
                                <img alt="example" style={{ width: '100%' }} />
                        </Modal> */}
                        <Modal
                                visible={passmodel}
                                title="修改密码"
                                footer={null}
                                onCancel={handleCancel}
                                >
                                  <Form onFinish={submit} form={form} >
                                        <Form.Item label="输入旧密码" name="oldPwd" rules={[{ required: true ,min:6,max:8,}]}>
                                        <Input.Password  />
                                        </Form.Item>
                                        <Form.Item label="输入新密码" name="newPwd" rules={[{ required: true, validator: validatePass}]}>
                                                 <Input.Password  />                                                                                    
                                        </Form.Item>
                                        <Form.Item label="确认新密码" name="newPwd1" rules={[{ required: true ,validator: validatePass}]}>
                                        <Input.Password  />
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>
                                                <Button type="primary" htmlType="submit">提交</Button>
                                        </Form.Item>
                                 </Form>      
                        </Modal>
                </div>
           </>
        )
}
class  PER extends react.Component{
        constructor(props){
                super(props)
        }
        render(){
                return(
                        <Person {...this.props} />
                )
        }
}
export default connect(({personManager,loading})=>({
	personManager,
	loading:loading.models['personManager']
  }))(PER)