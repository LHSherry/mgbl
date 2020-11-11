import { Modal,Form,Button,Input,Select,DatePicker} from "antd"
import react from "react"
const {TextArea} =Input
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 5,span: 14  },
  }
const Froms = ({detialshow,dispatch,detilalist,removeMarks})=>{
    function submit(value){
        dispatch({
            type:"helpMap/subifo",
            payload:value,
            callback:removeMarks
        })
    }
    function close(){
        dispatch({
            type:"helpMap/changeshow",
            payload:false
        })
        dispatch({
            type:"helpMap/reslist",
        })
    }
    return(
        <Modal
         visible={detialshow}
         title="处理"
         onCancel={close}
         footer={null}
         >
                <Form {...layout} onFinish={submit} initialValues={detilalist}>
                    <Form.Item label="姓名" name="name">
                        <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="性别" name="gender">
                    <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                    <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="手机号" name="mobile">
                      <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="地址" name="place">
                      <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="时间" name="time">
                    <Input disabled></Input>
                    </Form.Item>
                    <Form.Item label="处理方式" name="handleWay"  rules={[{ required: true}]}>
                        <Select mode="multiple"placeholder="请选择处理方式">
                             {
                                 detilalist.referTypes.map((item,index)=>{
                                     return(
                                         <Select.Option value={item.value} key={index}>
                                             {item.name}
                                         </Select.Option>
                                     )
                                 })
                             }
                         </Select>
                    </Form.Item>
                    <Form.Item label="备注" name="remark"  rules={[{ required: false }]} >
                        <TextArea/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                            <Button htmlType="submit" block type="primary">提交</Button>
                    </Form.Item>                    
                </Form>
        </Modal>
    )
}
class Detialparent extends react.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // console.log(this.props)
    }
    render(){
        return(
            <Froms 
            detialshow={this.props.detialshow}
             dispatch={this.props.dispatch} 
              detilalist={this.props.detilalist}
              removeMarks={this.props.removeMarks}/>
        )
    }
}
export default Detialparent