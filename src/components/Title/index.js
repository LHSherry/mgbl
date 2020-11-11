import sytles from "./index.less"
import {history} from "umi"
import {Breadcrumb} from "antd"
import { HomeOutlined } from '@ant-design/icons';
function Title(){
    return(
        <div className={sytles.Breadcrumb}>
        <Breadcrumb >
        <Breadcrumb.Item href="">
          <HomeOutlined />
          <span>主页</span>
        </Breadcrumb.Item>
        {
        (()=>{
            let router = history.location.pathname
            let routers = router.split("/").filter(function(path){
                return path !== ""
            })
         return routers.map(function(path,index){
                return(
                    <Breadcrumb.Item href={`#/${path}`} key="index">
                        <span>{
                            ((path)=>{
                                switch(path){
                                    case "org":
                                        return "组织机构"
                                    case "regsiter":
                                       return "注册用户"
                                    case "contract":
                                        return "合同模板"
                                    case "person":
                                        return "个人中心"
                                    case "userslist":
                                        return "用户列表"
                                    case "contractlist":
                                        return "合同列表"
                                    case "contractrecord":
                                        return "合同签约记录"
                                    case "device":
                                        return "设备列表"
                                    case "import":
                                        return "设备导入"
                                    case "deviceTpl":
                                        return "设备型号管理"
                                    case "patient":
                                        return "患者列表"
                                    default:
                                        return path
                                }
                            })(path)
                            }</span>
                    </Breadcrumb.Item>       
                )
            })
        })()
        }
      </Breadcrumb>
      </div>
    )
}
export default ()=>{
    return(
        <Title/>
    )
}