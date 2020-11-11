import react,{useState} from "react"
import {Modal,Steps,Button,Space} from "antd"
import Fromcontract from "../fromcontract/index"
import styles from "./index.less"
const { Step } = Steps;

   const CreateModal =  ({showstep,dispatch,contorstep,step1,step2,step3,step4,fromRef})=>{
    
    function cancelModal(){
      dispatch({
        type:"contract/changeshowstep",
        payload:false
      })
      dispatch({
        type:"contract/restStep",
      })
      changecurrent(0)
      changecurrentState("process","wait","wait","wait")
    }
    function changecurrent(index){
          dispatch({
            type:"contract/changecurrent",
            payload:index
          })
    }
    function changecurrentState(index1,index2,index3,index4){
      let data={
        step1State:index1,
        step2State:index2,
        step3State:index3,
        step4State:index4
      }
      dispatch({
        type:"contract/changecurrenttepState",
        payload:data
      })
    }
    function onChange(current){
        switch(current){
            case 0 :
              // changecurrent(0) 
              // changecurrentState("process","wait","wait","wait")
                 return
           case 1 :
            // changecurrent(1) 
            // changecurrentState("finish","process","wait","wait")
                return
          case 2 :
            // changecurrent(2)
            // changecurrentState("finish","finish","process","wait") 
                return
          case 3:
            // changecurrent(3) 
            // changecurrentState("finish","finish","finish","finish") 
                return
        }
        
    }
    function next(){
        switch(contorstep.current+1){
            case 1 :
              
              fromRef.current.submit()
    
              // changecurrentState("finish","process","wait","wait") 
                 return
           case 2 :
            dispatch({
              type:"contract/step3",
              // payload:data
            })
            // changecurrent(2) 
            // changecurrentState("finish","finish","process","wait") 
                return
           case 3 :
            dispatch({
              type:"contract/step4",
              // payload:data
            })
            return
        }
    }
    function updwon(){
        switch(contorstep.current-1){
            case 0 :
                 changecurrent(0)
                 changecurrentState("process","wait","wait","wait")  
                 return
           case 1 :
                changecurrent(1) 
                changecurrentState("finish","process","wait","wait") 
                return            
        }
    }
    function Createstep (){
        return(
            <>
        <Steps
          type="navigation"
          size="small"
          current={contorstep.current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step
            title="第一步"
            status={contorstep.step1State}
          />
          <Step
            title="第二步"
            status={contorstep.step2State}
          />
          <Step
            title="第三步"
            status={contorstep.step3State}
          />
          <Step
            title="第四步"
            status={contorstep.step4State}
          />
        </Steps>
            </>
        )
    }
    return(
        <Modal 
        visible={showstep}
        destroyOnClose={true}
        width={1000}
        onCancel={cancelModal}
        footer={null,
             <Space>
             <Button onClick={updwon} type="primary" disabled={contorstep.current==3?true:false}>后退</Button>
             <Button onClick={next} type="primary" disabled={contorstep.current==3?true:false}>下一步</Button>
             </Space>
         }
        >
            <Createstep contorstep={contorstep}/>
            <Fromcontract 
            contorstep={contorstep} 
            step1={step1} 
            step2={step2} 
            step3={step3} 
            step4={step4}
            dispatch={dispatch}
            fromRef={fromRef}/>
        </Modal>
    )
}
class StepModal extends react.Component{
  fromRef = react.createRef()
    constructor(props){
      super(props)
    }
    componentDidUpdate(){

    }
    render(){
      return(
        <CreateModal 
        showstep={this.props.showstep}
        contorstep={this.props.contorstep}
         dispatch={this.props.dispatch} 
         step1={this.props.step1} 
         step2={this.props.step2} 
         step3={this.props.step3} 
         step4={this.props.step4} 
         fromRef={this.fromRef}/>
      )
    }
}
export default StepModal