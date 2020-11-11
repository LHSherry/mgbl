import react,{} from "react"
import {Form,Modal,Select,Input,Button,Steps} from "antd"
const {Step} = Steps

const CreateStep =  ()=>{
    return(
        <Steps>
            <Step title="第一步"/>
            <Step title="第二步"/>
        </Steps>
    )
}
const SingleStep1 =  ()=>{
    return(
        <Form>
            <Form.Item name="设备模板">
                <Select>

                </Select>
            </Form.Item>
            <Form.Item name="生产批号">
                <Input></Input>
            </Form.Item>
        </Form>
    )
}
const SingleStep2 =  ()=>{
    return(
        <Form>
            <Form.Item>

            </Form.Item>
        </Form>
    )
}
const LostStep1 =  ()=>{
    return(
        <Form>
            <Form.Item>

            </Form.Item>
        </Form>
    )
}
const LostStep2 =  ()=>{
    return(
        <Form>
            <Form.Item>

            </Form.Item>
        </Form>
    )
}
const StepFrom = ()=>{
    return(
        <Modal>
            <CreateStep/>
        </Modal>
    )
}
class StepDevice extends react.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <StepFrom />
        )
    }
}
export default StepDevice
