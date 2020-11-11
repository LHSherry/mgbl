import {Form,Select,Input,Button} from "antd"
import {DownloadOutlined,SearchOutlined,DiffOutlined} from "@ant-design/icons"
import styleglobal  from "../../../global.less"
import react,{useRef}from "react"
import styles from "./index.less"
 const FROM = ({props,formRef})=>{
    function submit(value){
        props.dispatch({
            type:'contract/changeloading',
            payload:true
        })
        setTimeout(function(){
            props.dispatch({
                type:'contract/searchList',
                payload:value
            })
        },500)
    }
    // function download(){
    //     props.dispatch({
    //             type:'contract/download'
    //         })
    // }
    function showstep(){
        props.dispatch({
            type:'contract/step1',
        })        
        props.dispatch({
            type:'contract/changeshowstep',
            payload:true
        })
    }
    return(
        <div className={styles.container}>
        <Form  layout="inline" style={{marginBottom:50}}  onFinish={submit} initialValues={props.searchFrom} ref={formRef}>
            <Form.Item name="contratcType" label="查看类型" >
                    <Select style={{width:200}}>
                        <Select.Option value={true}>
                            只查看本机构的合同
                        </Select.Option>
                        <Select.Option value={false}>
                            查看所有的合同
                        </Select.Option>
                    </Select>
            </Form.Item>
            <Form.Item name="name"  label="搜索合同">
                    <Input placeholder="请输入合同名称" style={{width:200}}></Input>
            </Form.Item>
            <Form.Item >
                    <Button htmlType="submit" type="primary" icon={<SearchOutlined/>}>查询</Button>
            </Form.Item>
            <Form.Item >
                    <Button  type="primary" onClick={showstep} icon={<DiffOutlined />}>新建合同模板</Button>
            </Form.Item>
            <Form.Item >
            <Button  type="primary"icon={<DownloadOutlined />} className={styleglobal.buttonColorGreen}>
            <a href="/api/1.0/patient/GetImportPatientTemplate" style={{color:"white"}} >下载签约模板</a>
            </Button>
            </Form.Item>
        </Form>
        </div>
    )
}
class Searchcontract extends react.Component{
    formRef = React.createRef();
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    render(){
        return(
            <FROM props={this.props} formRef={this.formRef}/>
        )
    }
}
export default Searchcontract