import react ,{useState,useEffect} from "react"
import {List,Modal,Checkbox,Button,message} from "antd"


const Users = (props)=>{

  const[checkall,setcheckall]=useState(false)
  const[check,setchecked]=useState(false)
  const[data,setdata]=useState(props.props.list)
  function cancel(){
    props.props.dispatch({
        type:'resetorg'
    })
    setdata([])
    props.props.setbool(false)
}
useEffect(()=>{
  setdata(props.props.list)
},[props.props.list])
function setcheckAll(){

    // if(!check && checkall==true){
    //   setcheckAll(false)
    // }
    if(!check && !checkall){
      setchecked(!check)
      let dataarr =  data.map((item,index)=>{
          item.checked = !item.checked
          return item
      })
      setdata(dataarr)
    }else{
      setchecked(!check)
      setcheckall(!checkall)  
       
      let dataarr =  data.map((item,index)=>{
        item.checked = !item.checked
        return item
      })
     setdata(dataarr)
    }

}
function setcheck(e){

let dataarr =  data.map((item,index)=>{
    if(item.id==e.target.id){
      item.checked = !item.checked
      return item
    }else{
      return item
    }
  })
  const ischeck = data.some((item,index)=>{
        return item.checked
      })
      if(ischeck){
        setcheckall(true)
      }else{
        setcheckall(false)
      }
  setdata(dataarr)
}
function adduser(){
  const ischeck = data.some((item,index)=>{
    return item.checked
  })
  if(ischeck){
   var newarr =data.filter((item,index)=>{
      return item.checked == true
    })
    props.props.dispatch({
        type:"orgManage/addtoStaion",
        payload:newarr
    })
  }else{
    message.error("必须选中一个人员才能操作")
    return
  }
    
}
  return(
    <>
            <Modal
                visible={props.props.isshow}
                title="添加用户"   
                cancelText = "删除"   
                destroyOnClose={false}
                footer={[ 
                  
                    ]}
                onCancel={cancel}     
                afterClose={()=>cancel()}  
              >
                    <List
                    itemLayout="horizontal"
                    dataSource={data}
                    header={<Checkbox indeterminate={checkall} checked={check} onChange={setcheckAll}>全选<Button type="primary" style={{marginLeft:320}} onClick={adduser}>添加</Button></Checkbox>}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta                 
                        title={<Checkbox checked={item.checked} onChange={setcheck} id={item.id}>{item.name}</Checkbox>}                 
                        />
                    </List.Item>
                    )}
                />
            </Modal>
    </>
  )
}
class Listuser extends react.Component{
    constructor(props) {
        super(props);
      }


    componentDidMount(){
    
    }
    render(){
        return(
          <>
          {
            (JSON.stringify(this.props.list) !== "{}") &&  <Users  props={this.props}/>
          }
          </>
        )
    }
}
export default Listuser