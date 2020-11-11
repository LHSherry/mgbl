
import React,{useState,useRef} from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { ConfigProvider, Menu ,Button} from 'antd';

import { MailOutlined,AimOutlined,UserSwitchOutlined ,DesktopOutlined,FolderOpenOutlined,ApartmentOutlined,BarsOutlined} from '@ant-design/icons';


import Header from './header';

import getmenulist from '@/const/menu';

import styles from './index.less';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
  } from '@ant-design/icons';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import eventEmitter from "@/utils/event"
moment.locale('zh-cn');

const { SubMenu } = Menu;
window.onresize = function(){

}
function BasicLayout({
	dispatch,
	children
}) {

	const onLoginOut = () => {
		dispatch({ type: 'login/loginOut' })
	}
	const [collapsed,setCollapsed] = useState(false)
	const [menuwidth,setwidth] = useState(256)
	const [MenuList] = useState(getmenulist())
	const main = useRef(null)
	const menu=useRef()
	  	const putCollapsed = ()=>{
			setCollapsed(!collapsed)
			!collapsed ? setwidth(80):setwidth(256)
			let width ;

			if(menuwidth==80){
				width = 302
			}else{
				width = 420
			}
			eventEmitter.emit("setEchart",width);
		  }
		  
	return (
		<ConfigProvider locale={zhCN}>
			<div className={styles.app}>
				<div className={styles.header}>
					<Header loginOut={onLoginOut} />
				</div>
				<div className={styles.main} ref={main}>
				<div className={styles.left} style={{width:menuwidth}}>
						<Menu
							mode="inline"
							theme="dark"
							inlineIndent = "30"							
							inlineCollapsed={collapsed}
							ref={menu}
						>
							{
								MenuList.map((obj, index) => (
									<SubMenu
										key={index}
										title={obj.title}
										icon = {(()=>{										
											switch(index){
												case 0 :
													return <AimOutlined />
												case 1 :
													return <UserSwitchOutlined />	
												case 2 :
													return <DesktopOutlined />
												case 3 :
													return <FolderOpenOutlined />
												case 4 :
													return  <ApartmentOutlined />
													default:
														return <BarsOutlined />
											}
										})()}
									>
										{
											(obj.children || []).filter(child => child).map((child, j) => <Menu.Item key={`${index}_${j}`}><Link to={child.path}>{child.title}</Link></Menu.Item>)
										}

									</SubMenu>
								))
							}
				<Button type="primary" onClick={putCollapsed} style={{position:"absolute",bottom:0,width:75}} >
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
						</Button>
						</Menu>
				</div>
					<div className={styles.screen}>
						{children}
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
}

export default connect(({ login }) => ({
	login
}))(BasicLayout);
