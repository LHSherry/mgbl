import react,{useState,useRef,useEffect } from "react"
import {Modal,Form,Input,InputNumber,Select,message,Button} from "antd"
import SerMapModel from "@/components/searchMapModel/index"
const { TextArea } = Input;
import styles from "./index.less"
const Edit= ({props,formRef})=>{

      const select = useRef()
      const select2 = useRef()
      const select3 = useRef()
      const select4 = useRef()
      const select5 = useRef()
      const select6 = useRef()
      const [data,setdata]=useState(props.list)
      const [mapshow,setmapShow]=useState(false)
      function changemap(location){
            formRef.current.setFieldsValue({
                  "longitude":location[0],
                  "latitude":location[1],
                  "place":location[2]
            })
      }
      useEffect(()=>{
            setdata(props.list)
          },[props.list])
    function  handleCancel(){
      props.setbool(false)
      props.dispatch({
            type:"orgManage/resetorg"
      })
    }
    function handleOk(){
      formRef.current.submit()
    }
    function submit(value){
      props.dispatch({
            type:'orgManage/saveorgeidt',
            payload:value
      })
    }
    function getnextarea2(){
      if(select.current.props.value){
         props.dispatch({
                      type:"orgManage/getnextarea2_1",
                      payload:select.current.props.value
                })
      }else{
          message.error("请选择区域")
      }
  }
  function getnextarea3(){
    if(select2.current.props.value){
            props.dispatch({
                    type:"orgManage/getnextarea3_1",
                    payload:select2.current.props.value
              })
    }else{
        message.error("请选择省")
    }
}
function getnextarea4(){
    if(select3.current.props.value){
          props.dispatch({
                    type:"orgManage/getnextarea4_1",
                    payload:select3.current.props.value
              })
    }else{
        message.error("请选择市")
    }
}
function getnextarea5(){
    if(select4.current.props.value){
          props.dispatch({
                    type:"orgManage/getnextarea5_1",
                    payload:select4.current.props.value
              })
    }else{
        message.error("请选择县")
    }
}
function getnextarea6(){
    if(select5.current.props.value){
        props.dispatch({
                    type:"orgManage/getnextarea6_1",
                    payload:select5.current.props.value
              })
    }else{
        message.error("请选择乡镇")
    }
}
    return(
        <Modal
         width={1000}
         visible={props.isshow}
         destroyOnClose={false}
         title="编辑"
         onOk={handleOk}
         onCancel={handleCancel}
         >
            <Form className={styles.Form} initialValues={data} ref={formRef} onFinish={submit}>
                <Form.Item label="名称" name="name" rules={[{ required: true }]} >
                      <Input className={styles.fromitems} ></Input>      
                </Form.Item>
                <Form.Item label="全称" name="fullName" rules={[{ required: false }]} >
                      <Input className={styles.fromitems} disabled></Input>      
                </Form.Item>
                <Form.Item label="编码" name="code" rules={[{ required: true }]} >
                      <Input className={styles.fromitems} disabled></Input>      
                </Form.Item>
                {
                       props.list.parentId == "" &&
                       <Form.Item label="机构类型" name="b" rules={[{ required: true }]} >
                       <Select style={{width:200}} >
                             {
                             props.list.organTypes&& props.list.organTypes.map((item,index)=>{
                                         return(
                                               <Select.Option key={index} value={item.id}>
                                                     {item.name}
                                               </Select.Option>
                                         )
                                   })
                             }
                       </Select>
                  </Form.Item>
                }
                <Form.Item label="层级" name="level" rules={[{ required: true }]}  >
                      <Input className={styles.fromitems} disabled ></Input>      
                </Form.Item>
                <Form.Item label="序号" name="index" rules={[{ required: true }]} >
                      <InputNumber className={styles.fromitems} max={props.list.maxIndex} min={0}></InputNumber>      
                </Form.Item>
                <Form.Item label="描述" name="description" style={{marginLeft:10}} rules={[{ required: false }]} >
                      <TextArea className={styles.fromitems} placeholder="请输入描述......" />    
                </Form.Item>
                {
                        !props.list.parentId  &&   <Form.Item label="经纬度" >
                        <Input.Group compact>
                       <Form.Item  name="longitude"   rules={[{ required: false }]} >
                                <Input className={styles.fromitems} style={{width:100}} ></Input>      
                          </Form.Item>
         
                          <Form.Item  name="latitude"  rules={[{ required: false }]} >
                                <Input className={styles.fromitems} style={{width:100}}  ></Input>      
                          </Form.Item>
                          <Button type="primary" onClick={()=>setmapShow(true)} >获取经纬度</Button>
               </Input.Group>
             </Form.Item>
                   }
              {
                  !props.list.parentId  && <Form.Item label="位置" name="place"  style={{marginLeft:10}} rules={[{ required: false }]} >
                  <Input className={styles.fromitems}  ></Input>      
                 </Form.Item>
                   }
                {
                  props.list.parentId == "" &&
                  <div className={styles.areas}>
                  <Form.Item label="区域" name="areas1" rules={[{ required: true }]} >
                         <Select style={{width:120}} ref={select} placeholder="请选择区域">
                               {
                             props.list.areas_L1 && props.list.areas_L1.map((item,index)=>{
                                       return(
                                            <Select.Option key={index} value={item.id} >
                                            {item.name}
                                      </Select.Option>                                          
                                       )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  <Form.Item  name="areas2" onFocus={getnextarea2}  className={styles.aresitems}>
                         <Select style={{width:120}} ref={select2} placeholder="请选择省份">
                          {
                            props.list.areas_L2 && props.list.areas_L2.map((item,index)=>{
                                return(
                                      <Select.Option key={index} value={item.id} >
                                      {item.name}
                                </Select.Option>                                          
                                 )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  <Form.Item  name="areas3" onFocus={getnextarea3}  className={styles.aresitems}>
                         <Select style={{width:120}} ref={select3} placeholder="请选择市级">
                         {
                           props.list.areas_L3 &&props.list.areas_L3.map((item,index)=>{
                                return(
                                      <Select.Option key={index} value={item.id} >
                                      {item.name}
                                </Select.Option>                                          
                                 )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  <Form.Item  name="areas4" onFocus={getnextarea4}  className={styles.aresitems}>
                         <Select style={{width:120}} ref={select4}  placeholder="请选择县级">
                         {
                       props.list.areas_L4 &&         props.list.areas_L4.map((item,index)=>{
                                return(
                                      <Select.Option key={index} value={item.id} >
                                      {item.name}
                                </Select.Option>                                          
                                 )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  <Form.Item  name="areas5" onFocus={getnextarea5}  className={styles.aresitems}>
                         <Select style={{width:120}} ref={select5} placeholder="请选择乡级">
                         {
                          props.list.areas_L5 &&        props.list.areas_L5.map((item,index)=>{
                                      return(
                                            <Select.Option key={index} value={item.id} >
                                            {item.name}
                                      </Select.Option>                                          
                                       )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  <Form.Item  name="areas6"onFocus={getnextarea6}   className={styles.aresitems}>
                         <Select style={{width:120}} ref={select6} placeholder="请选择街道">
                           {
                          props.list.areas_L6 && props.list.areas_L6.map((item,index)=>{
                                return(
                                      <Select.Option key={index} value={item.id} >
                                      {item.name}
                                </Select.Option>                                          
                                 )
                                })
                               }
                         </Select>    
                  </Form.Item>
                  </div>
                }
            </Form>
            {
                     mapshow&& <SerMapModel show={mapshow} select={changemap} setmapShow={setmapShow}/>
               }
        </Modal>
    )
}
class Eidtall extends react.Component{
      formRef = react.createRef()
      constructor(props){
            super(props)
      }
      componentWillMount(){
      }
      render(){
            return(
                  <>
                  {
                        (JSON.stringify(this.props.list)!=="{}") &&<Edit props={this.props} formRef={this.formRef}></Edit>
                  }
                  </>
            )
      }
}
export default Eidtall