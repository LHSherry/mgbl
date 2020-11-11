import react,{useState,useEffect}from "react"
import {Form,Input,Button,Select,InputNumber,List,Space,Checkbox,Table,Result} from "antd"
const {TextArea}  = Input
import styles from "./index.less"
export default ({contorstep,step1,step2,step3,step4,fromRef,dispatch})=>{
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 6 },
      };
      function submit(values){
        dispatch({
            type:"contract/step2",
            payload:values
        })
      }
      function finish(){
        dispatch({
            type:"contract/restStep",
        })    
        dispatch({
            type:"contract/changecurrent",
            payload:0
        })      
        dispatch({
            type:"contract/changeshowstep",
            payload:false
        })
        dispatch({
            type:"contract/queryEditList",
            payload:false
        })
      }
      function changedeliverType(value,option){
        dispatch({
            type:"contract/stpechecktype",
            payload:{
               deliverType:value,
                leaseTermPeriod:"",
                deviceModelId:option.key.split("a")[1]
            }
        })           
      }
      function changeleaseTermPeriod(value,option){
        dispatch({
            type:"contract/stpechecktype",
            payload:{
                deliverType:"",
                leaseTermPeriod:value,
                deviceModelId:option.key.split("a")[1]
            }
        })        
      }
      const columns = [
        {
          title: '部门',
          dataIndex: 'deptName',
          key: 'deptName',
          render: text => <a>{text}</a>,
        },
        {
            title: '服务名称',
            dataIndex: 'srvName',
            key: 'srvName',
            render: text => <a>{text}</a>,
          },
          {
            title: '服务周期',
            dataIndex: 'srvProid',
            key: 'srvProid',
            render: text => <a>{text}</a>,
          },
          {
            title: '服务描述',
            dataIndex: 'srvDescription',
            key: 'srvDescription',
            render: text => <a>{text}</a>,
          }
      ];
      const columns1 = [
        {
          title: '部门',
          dataIndex: 'deptName',
          key: 'deptName',
          render: text => <a>{text}</a>,
        },
        {
            title: '系统登记设备型号',
            dataIndex: 'deviceModelName',
            key: 'deviceModelName',
            render: text => <a>{text}</a>,
          },
          {
            title: '厂家型号',
            dataIndex: 'model',
            key: 'model',
            render: text => <a>{text}</a>,
          },
          {
            title: '交付方式-出租/出售',
            dataIndex: 'deliverType',
            key: 'deliverType',
            render: (text,record) =>{
                return(
                    <Space size="middle">
                        <Select defaultValue={text} onChange={changedeliverType} >
                            {
                            step3.data.deliverTypeRefer.map((item,index)=>{
                                return(
                                    <Select.Option value={item.id} key={index+"a"+record.deviceModelId} >
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                            }
                        </Select>                    
                    </Space>
                )
            },
          },
          {
            title: '出租时长',
            dataIndex: 'leaseTermLen',
            key: 'leaseTermLen',
            render: (text,record) =>{
                console.log(record.leaseTermPeriod);
                return(
                    <Space size="middle">
                        <a>{text}</a>
                        <Select defaultValue={record.leaseTermPeriod} onChange={changeleaseTermPeriod} >
                            {
                            step3.data.leaseTermPeriodRefer.map((item,index)=>{
                                return(
                                    <Select.Option value={item.id} key={index+"a"+record.deviceModelId}  >
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                            }
                        </Select>                    
                    </Space>
                )
            },
          }
      ];
   const rowSelection = {
       selectedRowKeys:step2.checkedList,
        onChange: (selectedRowKeys)=>{
               dispatch({
                   type:'contract/changecheckstep2',
                   payload:selectedRowKeys
               })
        },
      }
      const rowSelection1 = {
        selectedRowKeys:step3.checkedList,
        onChange: (selectedRowKeys)=>{
            dispatch({
                type:'contract/changecheckstep3',
                payload:selectedRowKeys
            })  
        },
      }
    function Step1({step1}){
        useEffect(()=>{
            // fromRef.current.setFieldsValue(step1);
        },[step1])
        return(
            <Form  {...layout} style={{marginTop:80}} initialValues={step1.data} ref={fromRef} onFinish={submit}>
                <Form.Item name="name" label="契约模板名" rules={[{required:true}]}> 
                <Input></Input>
                </Form.Item>   
                <Form.Item  name="contractType" label="契约类型" rules={[{required:true}]}>
                    <Select>
                      {
                        step1.refers.contractTypeRefer && step1.refers.contractTypeRefer.map((item,index)=>{
                            return(
                                <Select.Option value={item.value} key={index}>
                                    {item.name}
                                </Select.Option>
                            )
                        })
                      }
                    </Select>
                </Form.Item>
                <Form.Item  name="isShare" label="是否共享" rules={[{required:true}]}>
                    <Select>
                           <Select.Option value={true}>
                            是
                           </Select.Option>
                           <Select.Option value={false}>
                              否 
                           </Select.Option>
                    </Select>
                </Form.Item>
                   <div className={styles.periodLen}  >
                <Form.Item  name="periodLen" label="签约周期" labelCol={{offset:4}} rules={[{required:true}]}>
                <InputNumber min={1} style={{width:70}} />
                </Form.Item>    
                <Form.Item  name="datePeriod" >
                    <Select style={{width:75,marginLeft:20}}>
                            {
                                 step1.refers.datePeroidRefer.map((item,index)=>{
                                    return(
                                        <Select.Option value={item.value} key={index}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })
                            }
                    </Select>
                </Form.Item>  
                    </div>    
                <Form.Item  name="memo" label="备注">
                <TextArea/>
                </Form.Item>                         
            </Form>
        )
    }
    function Step2({step2}){
        return(
            <Form  {...layout} >
                <Table
                 rowSelection={{...rowSelection}}
                 columns={columns}
                 pagination={ false }
                 dataSource={step2.data}
                 rowKey={record=>record.srvId}
                />
            </Form>
        )
    }
    function Step3({step3}){
        return(
            <Form {...layout} >
                <Table
                 rowSelection={{...rowSelection1}}
                 columns={columns1}
                 pagination={ false }
                 dataSource={step3.data.deviceSubjects}
                 rowKey={record=>record.deviceModelId}
                />
            </Form>
        )
    }
    function Step4({step4}){
        return(
            <Result
            status="success"
            title="恭喜你完成创建"
            subTitle="新的模板已经添加,请点击确定前往查看"
            extra={[
              <Button type="primary" key="console" onClick={finish}>
                确定
              </Button>
            ]}
          />
        )
    }
    return(
        <>
        {
            contorstep.current == 0 && JSON.stringify(step1)!=="{}" && <Step1 step1={step1}/>
        }
        {
           contorstep.current == 1 && JSON.stringify(step2)!=="{}" && <Step2 step2={step2}/>
        }
         {
           contorstep.current == 2 && JSON.stringify(step3)!=="{}" && <Step3 step3={step3}/>
        }{
            contorstep.current ==3 && JSON.stringify(step4)!=="{}" && <Step4 step4={step4}/>  
        }       
        </>
    )
}