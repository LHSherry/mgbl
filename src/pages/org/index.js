import { Table, Switch, Space,Tag,Button ,Breadcrumb,message,Dropdown,Menu,Popconfirm} from 'antd';
import { FormOutlined,CloseOutlined,PlusOutlined ,HomeOutlined,UserOutlined,DownOutlined,UserSwitchOutlined} from '@ant-design/icons';
import styles from "./index.less"
import mechanism from "@/assets/images/mechanism.png"
import department from "@/assets/images/department.png"
import position from "@/assets/images/position.png"
import staff from "@/assets/images/staff.png"
import Title from "@/components/Title/index"
import React,{useReducer,useState} from "react"
import  Eidtall from "./editall/index"
import  Neworg from "./neworg/index"
import Listuser  from "./listuer/index"
import Newuser from "./newuser/index"
import { connect } from 'dva';
const Org = (porps) => {

	const [checkList,dispatchs] = useReducer(setlist,[])
	const [expand,setexpand] = useState([])
	function setlist(data,action){
		return [...action]
	}
	function showError(index){
			switch(index){
				case 1 :
					return	message.error("必须选择一个编辑")
				case 2 :
					return	message.error("只能选择一个编辑")
				case 3 :
					return  message.error("必须选择一个机构才能添加部门")
				case 4 :
					return  message.error("必须选择一个部门才能添加职位")
				case 5 :
					return  message.error("必须选择一个职位才能添加员工")
			}

	}
	function changemodal(bool){
		porps.dispatch({
			type:"orgManage/changemodal",
			payload:bool
		})
	}
	function changemodaluser(bool){
		porps.dispatch({
			type:"orgManage/changemodaluser",
			payload:bool
		})
	}
	function changemodalist(bool){
		porps.dispatch({
			type:"orgManage/changemodalist",
			payload:bool
		})
	}
	function setmodal(bool){
		porps.dispatch({
			type:"orgManage/setedit",
			payload:bool
		})
	}
	function eidt(){
		if(checkList.length === 0){
			showError(1)
		}else if(checkList.length > 1){
			showError(2)
		}else{
			porps.dispatch({
				type:'orgManage/getedit',
				payload:checkList[0]
			})
			if(checkList[0].indexOf("d")!==-1){//判断是否是职位编辑
				changemodaluser(true)
			}else{
				setmodal(true)
			}
		}

	}
	function delet(){
		console.log(checkList,122);
		if(checkList.length === 0){
			showError(1)
		}else if(checkList.length > 1){
			showError(2)
		}else{
			porps.dispatch({
				type:"orgManage/deletorg",
				payloads:{
					check:checkList[0],
					methond:setkey,
					expand:expand
				}
			})
		}
	}
	function deltpp(){

	}
	function neworg(e){
		switch(e.key){
			case "0"://机构
			    return (
					((porp)=>{
			           porp.dispatch({
							type:"orgManage/getorgnewlist",
							payload:""
						})
						changemodal(true)
					})(porps)
				)
			case "1"://部门
			    return (
					((porp)=>{
						if(checkList.length === 0){
							showError(1)
						}else if(checkList.length > 1){
							showError(2)
						}else{
							if(checkList[0].search("a") !== -1){
								const check = checkList[0].substring(0,checkList[0].indexOf("a"))
								porp.dispatch({
									type:"orgManage/addDepartment",
									payload:check
								})
								changemodal(true)
							}else{
								showError(3)
							}
						}
					})(porps)
				)
			case "2": //职位
			return (
				((porp)=>{
					console.log(checkList);
					if(checkList.length === 0){
						showError(1)
					}else if(checkList.length > 1){
						showError(2)
					}else{
						if(checkList[0].search("b") !== -1){
							const check = checkList[0].substring(0,checkList[0].indexOf("b"))
							porp.dispatch({
								type:"orgManage/setstation",
								payload:check
							})
							changemodal(true)
						}else{
							showError(4)
						}
					}
				})(porps)
			)
			case "3"://员工
			return (
				((porp)=>{
					if(checkList.length === 0){
						showError(1)
					}else if(checkList.length > 1){
						showError(2)
					}else{
						if(checkList[0].search("c") !== -1){
							const check = checkList[0].substring(0,checkList[0].indexOf("c"))
							porp.dispatch({
								type:"orgManage/setplepoe",
								payload:check
							})
							changemodaluser(true)
						}else{
							showError(5)
						}
					}
				})(porps)
			)
		}

	}
	function addlastuser(e){
		let orgid = e.currentTarget.id.substring(0,e.currentTarget.id.indexOf("c"))
		console.log(orgid,12);
		porps.dispatch({
			type:"orgManage/GetAllFreeUser",
			payload:orgid
		})
	   changemodalist(true)
		// if(checkList.length > 0){
		// 	showError(2)
		// }else if(checkList.length ==0){
		// 	showError(1)
		// }else{
		// 	console.log(checkList);
		// }
	}
	const columns = [
	  {
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		render: (name,record, index) => (
			<>
			  {
				(function(name){
					switch(record.level){
						case 1:
							return (
								<>
								<img src={mechanism} className={styles.img}/>
								{name}
								</>
							)
							case 2:
								return (
									<>
									<img src={department} className={styles.img}/>
									{name}
									</>
								)
								case  3:
									return (
										<>
										<img src={position} className={styles.img}/>
										{name}
										</>
									)
								default:
									return (
										<>
										<img src={staff} className={styles.img}/>
										{name}
										</>
									)
					}
				})(name)
				  }
			</>
		  ),
	  },
	  {
		title: '类型',
		dataIndex: 'org',
		key: 'org',
		render: org => (
			<>
			  {
				(function(org){
					if(org == "机构"){
						return(
							<Tag color="#2db7f5" >
							{org}
						  </Tag>
						)
					}else if(org == "部门"){
						return(
							<Tag color="#f50" >
							{org}
						  </Tag>
						)
					}else if(org == "职位"){
						return(
							<Tag color="#87d068" >
							{org}
						  </Tag>
						)
					}
				})(org)
				  }
			</>
		  ),
	  },
	  {
		title: '层级',
		dataIndex: 'level',
		key: 'level',
		render: level => (
			<>
			  {
				(function(level){
					if(level == 1){
						return(
							<Tag color="blue" >
							一层
						  </Tag>
						)
					}else if(level == 2){
						return(
							<Tag color="volcano" >
							二层
						  </Tag>
						)
					}else if(level == 3){
						return(
							<Tag color="green" >
							三层
						  </Tag>
						)
					}else if(level == 4){
						return(
							<Tag color="cyan" >
							四层
						  </Tag>
						)
					}
				})(level)
				  }
			</>
		  ),
	  },
	  {
		title: '操作',
		dataIndex: 'level',
		key: 'level',
		render: (level,record,index) => (
			<>
			  {
				(function(level){
					if(level ==1){
						return(
							<>
								<Button type="primary" shape="round"  icon={<FormOutlined/>} size="small" style={{fontSize:10,marginRight:10}} onClick={eidt}>编辑</Button>
								<Popconfirm placement="top" title="确定要删除这条信息？" onConfirm={delet} okText="确定" cancelText="取消">
								<Button type="primary" danger shape="round" icon={<CloseOutlined />} size="small" style={{fontSize:10}} >删除</Button>
								</Popconfirm>
								{/* <Button type="primary" shape="round" size="small" style={{fontSize:10,marginLeft:10}}>新增部门</Button> */}
							</>
						)
					}else if(level == 2){
						// return(
						// <Button type="primary" shape="round" size="small" style={{fontSize:10,marginRight:10}}>新增职位</Button>
						// )

					}else if(level == 3){
						return(
						<>
                         <Button type="primary" shape="round"  icon={<UserSwitchOutlined />} size="small" style={{fontSize:10,marginRight:10}} onClick={addlastuser} id={record.id}>添加人员</Button>
						</>
						)
					}else if(level == 4){
						return(
						<>
 								<Popconfirm placement="top" title="确定要删除这条信息？" onConfirm={delet} okText="确定" cancelText="取消">
								<Button type="primary" danger shape="round" icon={<CloseOutlined />} size="small" style={{fontSize:10}} >移除人员</Button>
								</Popconfirm>
						</>
						)
					}
				})(level)
				  }
			</>
		  ),
	  },
	];
	// tables树形结构坑，同时存在tree和select必须同时拥有控制属性初始化
	const rowSelection = {
	  selectedRowKeys:checkList,
	  onChange: (selectedRowKeys, selectedRows) => {
		dispatchs(selectedRowKeys)

	  }
	};
	const upto = (expanded,record)=>{
		if(expanded == true && record.parentid == undefined){
			if(record.children && record.children.length == 0){
		    	porps.dispatch({
				type:"orgManage/getalstList",
				payload: record.id})
			}
			return
		}
		else if(expanded == true && record.parentid){
			if(record.children&&record.children.length == 0){
				porps.dispatch({
					type:"orgManage/getpostion",
					payload: record.id})
			}
		}
	}
	function setkey(expandedRows){
		setexpand(expandedRows)
	}
	function TreeData() {
	  return (
		<>
		  <Space align="center" style={{ marginBottom: 16 }}>
		  </Space>
		  <Table
			columns={columns}
			rowKey={record=>record.id}
			rowSelection={{...rowSelection}}
			onExpandedRowsChange = {setkey}
			expandedRowKeys = {expand}
			onExpand ={upto}
			dataSource={porps.orgManage.parent.parent}
			pagination={ false }
		  />
		</>
	  );
	}
	const menulist =["新增机构","新增部门","新增职位","新增员工"]
	const menu = (
		<Menu  onClick={neworg}>
			{
				menulist.map((item,index)=>{
					return(
					<Menu.Item key={index} >{item}</Menu.Item>
					)
				})
			}
		</Menu>
	  );
	return (
	  <div className={styles.container}>
	  <Title />
	  <div className={styles.Form}>
	  <Dropdown overlay={menu} >
			<Button>
				选择新增类型<DownOutlined />
			</Button>
	  </Dropdown>
	  </div>
	  {/* <Button type="primary"  shape="round" icon={<PlusOutlined />} size="small"  style={{fontSize:12,marginRight:10}} onClick={neworg}>新增</Button> */}
	  {/* <Button type="primary" danger shape="round" icon={<CloseOutlined />} size="small" style={{fontSize:12}}>删除</Button> */}
	  <TreeData className={styles.mian} />
	  <Eidtall isshow={porps.orgManage.modals.eidtlist} setbool={setmodal}  list={porps.orgManage.eidtorg}  dispatch={porps.dispatch}/>
	  <Listuser isshow={ porps.orgManage.modals.listuser} setbool={changemodalist} list={porps.orgManage.listorg}  dispatch={porps.dispatch}/>
	  <Newuser isshow={ porps.orgManage.modals.newuser} setbool={changemodaluser} list={porps.orgManage.newuserorg} dispatch={porps.dispatch}/>
	  {
		 JSON.stringify(porps.orgManage.neworg.eidtorg)!== "{}"
		  &&	  <Neworg isshow={ porps.orgManage.modals.neworgshow} setbool={changemodal} list={porps.orgManage.neworg} dispatch={porps.dispatch}/>
	  }

	  </div>
	);
  }
  class Orgs extends React.Component{
	 constructor(props){
		 super(props)
		 console.log(props);
	 }
	  getlist(){
		this.props.dispatch({type:"orgManage/queryALL"})
     }
	  componentDidMount(){
		this.getlist()
	  }
	  render (){
		  return (
			<Org  dispatch ={this.props.dispatch}orgManage={this.props.orgManage}/>
		  )
	  }
  }
  export default connect(({orgManage,loading})=>({
	orgManage,
	loading:loading.models['orgManage']
  }))(Orgs)
