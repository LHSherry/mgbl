import react,{useState,createContext,useContext} from "react"
import Title from "@/components/Title/index"
import {Form,Select,Input,Button,Table,Modal,DatePicker ,Tag,Space,Switch, } from "antd"
import { ExclamationCircleOutlined ,SearchOutlined,FormOutlined } from '@ant-design/icons';
import styleglobal  from "../../global.less"
const {TextArea } =Input
import styles from "./index.less"
import { connect } from 'dva';


const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

const Userslist = ({listuser,dispatch})=>{
    const {
        loading,
        pationage,
        dataSource,
        searchfrom,
        orgIds
    } = listuser
    const [form] = Form.useForm()
    const SearchContext = createContext()
    const [regsitershow,setresgitershow] =useState(false)
    function onChange(checked,id) {
            dispatch({
                type:"listuser/changeuserstate",
                payload:{
                    userId:id,
                    ischeck:checked
                },
                callback:initvalue
            })
      }
      function confirm(checked,event) {
        let arry = event.currentTarget.id.split("&")
        if(checked){
            Modal.confirm({
                title: '解封用户',
                icon: <ExclamationCircleOutlined />,
                content: `确认要启用${arry[1]}?`,
                okText: '确认',
                cancelText: '取消',
                onOk:()=>{onChange(checked,arry[0])}
              });
        }else{
            Modal.confirm({
                title: '禁封用户',
                icon: <ExclamationCircleOutlined />,
                content: `确认要禁用${arry[1]}?`,
                okText: '确认',
                cancelText: '取消',
                onOk:()=>{onChange(checked,arry[0])}
              });
        }
      }
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '用户ID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
          },
        {
          title: '职位',
          dataIndex: 'station',
          key: 'station',
        },
        {
            title: '状态',
            dataIndex: 'valid',
            key: 'valid',
            render:value=>{
                if(value){
                    return(
                        <Tag color="#55acee">
                        已启用
                    </Tag>
                    )
                }else{
                    return(
                        <Tag color="#cd201f">
                        已禁用
                    </Tag>
                    )                
                }
            }
          },
          {
            title: '操作',
            dataIndex: 'contorl',
            key: 'contorl',
            render:(value,record)=>{
                // if(record.valid){
                //     return(
                //         <Button type="primary" danger style={{fontSize:10}} size="small" shape="round">禁用用户</Button>
                //         )
                // }else{
                //     return(
                //         <Button type="primary"danger style={{fontSize:10}} size="small" shape="round" >解封用户</Button>
                //         )                
                // }
                return(
                     <Switch checkedChildren="禁用" unCheckedChildren="解封" checked={record.valid} onClick={confirm} id={record.id+"&"+record.name}/>
                )
            }
          },
      ];
    function changpage(index){
        dispatch({
            type:"listuser/initlist",
            payload:{
                page:index
            }
        })       
    }

    function submit0(value){
        dispatch({
            type:"listuser/changeloading",
            payload:true
        })
        dispatch({
            type:"listuser/initlist",
            payload:{
                search:value,
                page:1
            }
        })
        setTimeout(function(){
            dispatch({
                type:"listuser/changeloading",
                payload:false
            })
        },500)
    }
    function initvalue(){
        dispatch({type:"listuser/changeloading",payload:true})
        dispatch({type:"listuser/initlist"})
        setTimeout(function(){
            dispatch({type:"listuser/changeloading",payload:false})
        },100)  
    }
    function submit(value){
        value.birthDay  &&  (value.birthDay =  value.birthDay.format('YYYY-MM-DD'))
         dispatch({
             type:"listuser/regesiterusers",
             payload:value,
             callback:()=>{
                 form.resetFields()
                 setresgitershow(false)
            }
         })
         initvalue()
     }
     function exit(){
         setresgitershow(false)
         initvalue()
     }
     function adduser(){
        dispatch({
            type:"listuser/getorg",
            payload:'',
        }) 
        setresgitershow(true)
     }
     const Search = ()=>{
        let {searchfrom,submit0,adduser} =useContext(SearchContext)
      return(
          <div className={styles.Form}>
          <Form
          layout="inline"
          initialValues={searchfrom}
          onFinish={submit0}>
              <Form.Item label="查询条件" name="condition">
                  <Input placeholder="请输入用户id或姓名"></Input>
              </Form.Item>                
              <Form.Item label="机构" name="orgId">
                  <Select style={{width:200}} placeholder="请输入选择机构">
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
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} >查询</Button>
                  <Button type="primary" style={{marginLeft:20,}} onClick={adduser} className={styleglobal.buttonColorGreen} icon={<FormOutlined/>} >注册用户</Button>
              </Form.Item>
          </Form>
          </div>
      )
  }
    return(
        <>
            <Title/>
            <SearchContext.Provider value={{searchfrom,submit0,adduser}}>
                  <Search />
            </SearchContext.Provider>
            <Table
            style={{marginTop:10}}
             dataSource={dataSource} 
             columns={columns} 
             loading ={loading}
             rowKey={(record,index)=>index}
             pagination={{current:pationage.current,pageSize:pationage.pageSize,total:pationage.total,onChange:changpage}}/>
           <Modal
            style={{padding:50}}
            width={700}
            title='注册用户'
            centered ={true}
            visible={regsitershow}
            onCancel={exit}
            footer={null}>
            <Form style={{width:500}} form={form} {...layout} onFinish={submit} >
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
                                 orgIds && orgIds.map((item,index)=>{
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
            </Modal>
        </>
    )
}
export default connect(({listuser,loading})=>({
	listuser,
	loading:loading.models['listuser']
  }))(Userslist)