import {Modal,Divider,Input,Form,List,Button} from "antd"
import styles from "./index.less"
import {UpCircleFilled,DownCircleFilled,PlusCircleTwoTone,MinusCircleTwoTone} from "@ant-design/icons"
import React ,{useReducer}from "react"
export default () =>{
    let data= [
        "主治部门",
        "急诊部门",
        "护士部门",
        "后勤部门"
    ]

    // let setdata = (datarr,action)=>{
    //     console.log(2);  
    //         return [...datarr] 
    // }
    function setdata(datarr,action){ 
            return [...action] 
    }
    const [datas,dispatch] = useReducer(setdata,data)
    const upsort = (e)=>{ 
        console.log(1);       
        if(e!==0){
            let item = datas[e]
            datas.splice(e,1)
            datas.splice(e-1,0,item)
            dispatch(datas)
        }   
    }
    const downsort = (e)=>{
      
        if(e<datas.length-1){
            let item = datas[e]
            datas.splice(e,1)
            datas.splice(e+1,0,item)
            dispatch(datas)
        }
    }
    const addarr = (e)=>{
        datas.splice(e+1,0,"")
        dispatch(datas)
    }
    const reudcearr = (e)=>{
        datas.splice(e,1)
        dispatch(datas)       
    }
        return (
            <Modal  className={styles.modal} width={616}>
                <Form>
                    <Form.Item>
                        <span className={styles.star}>*</span>
                        <span className={styles.name}>机构</span>
                        <Divider />
                             <div className={styles.inputitems}>
                                 <label >名称:</label>
                                 <Input value={"华西第一院"}></Input>
                             </div>
                        <Divider />
                    </Form.Item>
                    <Form.Item>
                        <span className={styles.star}>*</span>
                        <span className={styles.name}>机构部门</span>
                        <Divider />
                        <List
                         bordered
                         dataSource ={datas}
                         renderItem={
                             (item,index)=>(
                                 <List.Item>
                                     <Input value={item}></Input>
                                     <div className={styles.sort}>
                                     <UpCircleFilled onClick={()=>upsort(index)}/>
                                     <DownCircleFilled onClick={()=>downsort(index)}/>   
                                     </div>
                                     <MinusCircleTwoTone style={{fontSize:20,marginLeft:20}} onClick={()=>reudcearr(index)}/>
                                     <PlusCircleTwoTone style={{fontSize:20,marginLeft:5}} onClick={()=>addarr(index)}/>
                                 </List.Item>
                             )
                         }
                        >
                        </List>
                    </Form.Item>
                    <Form.Item>
                        <span className={styles.star}>*</span>
                        <span className={styles.name}>职位</span>
                        <Divider />
                             <div className={styles.inputitems}>

                             </div>
                        <Divider />
                    </Form.Item>
                </Form>
            </Modal>
        )
}