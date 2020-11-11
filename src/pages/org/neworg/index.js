import react,{useState,useRef,useEffect} from "react"
import {Modal,Form,Input,InputNumber,Select,Button,message} from "antd"
import SerMapModel from "@/components/searchMapModel/index"
const { TextArea } = Input;
import styles from "./index.less"
const Org = (props)=>{
      const [forms] = Form.useForm()
      const formlist = useRef()
      const forominstace = useRef()
      const select = useRef()
      const select2 = useRef()
      const select3 = useRef()
      const select4 = useRef()
      const select5 = useRef()
      const select6 = useRef()
      const [data,setdata]=useState(props.props.list)
      const [mapshow,setmapShow]=useState(false)
      function changemap(location){
            // data.longitude = location[0]
            // data.latitude = location[1]
            // data.place = location[2]
            // setdata(data)
            // forms.resetFields()
            forms.setFieldsValue({
                  "longitude":location[0],
                  "latitude":location[1],
                  "place":location[2]
            })
      }
      useEffect(()=>{
            setdata(props.props.list)
          },[props.props.list])
      function onSubmit(values){
            if(values){
                  if(props.props.list.stations){//保存职位
                        props.props.dispatch({
                              type:"orgManage/savestation",
                              payload:values
                        })
                  }else{
                        props.props.dispatch({
                              type:"orgManage/saveorg",
                              payload:values
                        })
                  }
            }
      }
    function  handleCancel(){
      props.props.setbool(false)
      props.props.dispatch({
            type:"orgManage/resetorg",
      })
    }
    function handleOk(){
      formlist.current.click()
    }
    function getnextarea2(){
        if(select.current.props.value){
            props.props.dispatch({
                        type:"orgManage/getnextarea2",
                        payload:select.current.props.value
                  })
        }else{
            message.error("请选择区域")
        }
    }
    function getnextarea3(){
      if(select2.current.props.value){
                props.props.dispatch({
                      type:"orgManage/getnextarea3",
                      payload:select2.current.props.value
                })
      }else{
          message.error("请选择省")
      }
  }
  function getnextarea4(){
      if(select3.current.props.value){
            props.props.dispatch({
                      type:"orgManage/getnextarea4",
                      payload:select3.current.props.value
                })
      }else{
          message.error("请选择市")
      }
  }
  function getnextarea5(){
      if(select4.current.props.value){
            props.props.dispatch({
                      type:"orgManage/getnextarea5",
                      payload:select4.current.props.value
                })
      }else{
          message.error("请选择县")
      }
  }
  function getnextarea6(){
      if(select5.current.props.value){
            props.props.dispatch({
                      type:"orgManage/getnextarea6",
                      payload:select5.current.props.value
                })
      }else{
          message.error("请选择乡镇")
      }
  }
    return(
      <>
      {
       (JSON.stringify(props.props.list ) !== "{}") && <Modal
           getContainer={false}
            width={1000}
            visible={props.props.isshow}
            destroyOnClose={false}
            title="新增"
            onOk={handleOk}
            onCancel={handleCancel}
            >
               <Form  className={styles.Form} form={forms}  onFinish={onSubmit} initialValues={data} ref={forominstace}>
                   <Form.Item label="名称" name="name" rules={[{ required: true }]} >
                         <Input className={styles.fromitems} ></Input>      
                   </Form.Item>
                   <Form.Item label="全称" name="fullname" rules={[{ required: false }]}  >
                         <Input className={styles.fromitems} disabled></Input>      
                   </Form.Item>
                   {
                   props.props.list.code && <Form.Item label="编码" name="code" rules={[{ required: false }]}>
                   <Input className={styles.fromitems} disabled></Input>      
                   </Form.Item>
                   }
                   <Form.Item label="层级" name="level"  rules={[{ required: true }]} >
                         <Input className={styles.fromitems} disabled ></Input>      
                   </Form.Item>
                   {
                  props.props.list.station &&  <Form.Item label="机构类型" name="b" rules={[{ required: true }]} >
                   <Select style={{width:200}}>
                        {
                          props.props.list.organTypes && props.props.list.organTypes.map((item,index)=>{
                                    return (<Select.Option values={item.id} key={index} >{item.name}</Select.Option>)
                              })
                        }     
                  </Select>   
                 </Form.Item>
                   }

                   <Form.Item label="序号" name="index" rules={[{ required: true }]} style={{paddingTop:10}}>
                         <InputNumber className={styles.fromitems} min={1} max={props.props.list.maxIndex}></InputNumber>      
                   </Form.Item>
                   <Form.Item label="描述" name="description" rules={[{ required: false }]} style={{marginLeft:10}}>
                         <TextArea className={styles.fromitems} />    
                   </Form.Item>
                   {
                        !props.props.list.parentId  &&   <Form.Item label="经纬度" >
                        <Input.Group compact>
                       <Form.Item  name="longitude"   rules={[{ required: false }]} >
                                <Input className={styles.fromitems} style={{width:120}} ></Input>      
                          </Form.Item>
                          <Form.Item  name="latitude"  rules={[{ required: false }]} >
                                <Input className={styles.fromitems} style={{width:120}}  ></Input>      
                          </Form.Item>
                        <Button type="primary" onClick={()=>setmapShow(true)}>获取经纬度</Button>
               </Input.Group>
             </Form.Item>
                   }
                   {
                  !props.props.list.parentId  && <Form.Item label="位置" name="place"  style={{marginLeft:10}}  rules={[{ required: false }]} >
                  <Input className={styles.fromitems}  ></Input>      
                 </Form.Item>
                   }                   
                   <Form.Item style={{display:"none"}}>
                         <Button htmlType="submit" ref={formlist} >提交</Button>   
                   </Form.Item>
                { !props.props.list.parentId  && <div className={styles.areas}>
                   <Form.Item label="区域" name="areas1" rules={[{ required: true }]}> 
                        <Select  ref={select} style={{ width: 120 }} placeholder="请选择区域">
                              {
                             props.props.list.areas_L1 && props.props.list.areas_L1.map((item,index)=>{
                              return (<Select.Option values={item.id} key={index} >{item.name}</Select.Option>)
                              })
                              }
                        </Select>                           
                   </Form.Item>
                   <Form.Item  name="areas2" rules={[{ required: false }]} className={styles.aresitems}>
                          <Select onFocus={getnextarea2} ref={select2} style={{ width: 120 }}  placeholder="请选择省份">
                            {
                              props.props.list.areas_L2 && props.props.list.areas_L2.map((item,index)=>{
                              return (<Select.Option values={item.id} key={item.id} >{item.name}</Select.Option>)
                              })
                              }
                          </Select>    
                   </Form.Item>
                   <Form.Item  name="areas3" rules={[{ required: false }]} className={styles.aresitems}>
                          <Select ref={select3} onFocus={getnextarea3}  style={{ width: 120 }}  placeholder="请选择市级">
                          {
                              props.props.list.areas_L3 && props.props.list.areas_L3.map((item,index)=>{
                              return (<Select.Option values={item.id} key={item.id} >{item.name}</Select.Option>)
                              })
                              }
                          </Select>    
                   </Form.Item>
                   <Form.Item  name="areas4" rules={[{ required: false }]} className={styles.aresitems}>
                          <Select  onFocus={getnextarea4} ref={select4}  style={{ width: 120 }} placeholder="请选择县级">
                          {
                              props.props.list.areas_L4 && props.props.list.areas_L4.map((item,index)=>{
                              return (<Select.Option values={item.id} key={item.id} >{item.name}</Select.Option>)
                              })
                              }
                          </Select>    
                   </Form.Item>
                   <Form.Item  name="areas5" rules={[{ required: false }]} className={styles.aresitems}>
                          <Select  onFocus={getnextarea5} ref={select5} style={{ width: 120 }} placeholder="请选择乡级">
                          {
                              props.props.list.areas_L5 && props.props.list.areas_L5.map((item,index)=>{
                              return (<Select.Option values={item.id} key={item.id} >{item.name}</Select.Option>)
                              })
                              }
                          </Select>    
                   </Form.Item>
                   <Form.Item  name="areas6" rules={[{ required: false }]} className={styles.aresitems}>
                          <Select  onFocus={getnextarea6} ref={select6} style={{ width: 120 }}  placeholder="请选择街道">
                          {
                              props.props.list.areas_L6 && props.props.list.areas_L6.map((item,index)=>{
                              return (<Select.Option values={item.id} key={item.id} >{item.name}</Select.Option>)
                              })
                              }
                          </Select>    
                   </Form.Item>
                   </div> }
               </Form>
               {
                     mapshow&& <SerMapModel show={mapshow} select={changemap} setmapShow={setmapShow}/>
               }
           </Modal>
      }
      </>
    )
}
class Neworg extends react.Component{
      constructor(props){
            super(props)
      }
      render(){
            return(
                  (JSON.stringify(this.props.list) !== "{}") && <Org props={this.props}/>
            )
      }
}
export default Neworg