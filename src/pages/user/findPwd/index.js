/*
 * @Description:
 * @Author: zhao
 * @Date: 2020-05-17 12:12:14
 * @LastEditors: zhao
 * @LastEditTime: 2020-05-22 22:28:52
 */

import React, { useState, } from 'react';
import { connect } from 'dva';
import { Link ,history} from 'umi';

import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ModalPicCode from '@/components/modal/verificationCode';

import ImageFind from '@/assets/images/backL.png';
import styles from './index.less';

const FindPassword = ({
	findPwd,
	dispatch,
	loading,
}) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [count, setCount] = useState(0);
	const [form] = Form.useForm()
	const onVerifyCode = () => {
		form.validateFields(['mobile']).then(values => {
			dispatch({
				type:"findPwd/getVerifyCode",
				payload:values,
				callback:() => {
					startRun(60);
				}
			})
		})
	}

	const startRun = (timer) => {
		const val = timer - 1;
		setCount(val);
		if (val > 0) {
			setTimeout(() => {
				startRun(val);
			}, 1000);
		}
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
  function sbumit(values){
	dispatch({
		type:"findPwd/resetpass",
		payload:values,
	})
  }
	const onModalOk = () => {
		console.log('onModalOk');
		setModalVisible(false);
		startRun(60);
	};

	const modalProps = {
		onOk: onModalOk,
		onCancel: () => setModalVisible(false)
	};
	const back = ()=>{
		history.go(-1)
	}
	return (
		<div className={styles.container}>
			{/* <img className={styles.loginImage} src={ImageFind} alt="" /> */}
			<div className={styles.loginContainer}>
				{/* <div className={styles.loginTitle}><i className={styles.icon} />慢病管理系统 4.0.0</div> */}
				<div>
					<img  src={ImageFind} alt="" style={{width:35,height:35,cursor:"Pointer"}} onClick={back}/>
					<div className={styles.loginTab}>
						<div className={styles.formTitle}>
							找回密码
						</div>
					</div>

					<Form  className={styles.mobileForm} form={form} onFinish={sbumit}>
						<Form.Item name="mobile" rules={[{ required: true, message: '请输入账号或手机号!' }]}>
							<Input
								prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
								placeholder="请输入手机号"
								style={{ height: 38 }}
							/>
						</Form.Item>
						<div className={styles.codeDiv}>
							<Form.Item className={styles.codeFormItem} name="smsCode" rules={[{ required: true,message: '请输入验证码!', max:6}]}>
								<Input
									placeholder="请输入验证码"
									style={{ height: 38,width:'100%',verticalAlign:"middle" }}
								/>
							</Form.Item>
							{
								count > 0
									?
									<Button className={styles.right} style={{ height: 38,verticalAlign:"middle" ,marginLeft:"5.5%",textAlign:"center"}}>{count}</Button>
									:
									<Button className={styles.right} onClick={onVerifyCode} style={{ height: 38,verticalAlign:"middle" ,marginLeft:"5.5%",textAlign:"center"}}>获取验证码</Button>
							}
						</div>
						<Form.Item name="newPwd"rules={[{ required: true, min:6,max:8,validator: validatePass}]} >
							<Input.Password 
								prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
								placeholder="请输入密码"
								style={{ height: 38 }}>
							</Input.Password>
						</Form.Item>
						<Form.Item name="newPwd1" rules={[{ required: true, min:6,max:8,validator: validatePass}]}>
							<Input.Password 
								prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
								placeholder="请输再次输入密码"
								style={{ height: 38 }}>
							</Input.Password>
						</Form.Item>
						<Form.Item >
							<Button type="primary" htmlType="submit" shape="round">重新设置密码</Button>
						</Form.Item>


					</Form>
					<div className={styles.tip}>我们将以短信形式下发到您的手机上，请注意查收</div>
				</div>
			</div>
			
		</div>
	);
};

export default connect(({ findPwd, loading }) => ({
	findPwd,
	loading: loading.models['findPwd']
}))(FindPassword);
