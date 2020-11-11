import requset from "./axios.request"
import {sessionToken} from "../utils/cookies"

function querydata(){
    const dataid = new sessionToken().getdataid()
    return requset({
        method:'get',
        url:`/wx/api/mobile/1.0/wechat/GetSosInfo?dataid=${dataid}`
    })
}
function getoptions(){
    return requset({
        method:'get',
        url:`/wx/api/mobile/1.0/wechat/GetHandleWayRefers`
    })    
}
function postdata(handleWay,remark){
    const dataId = new sessionToken().getdataid()
    console.log(typeof dataId);
    
    return requset({
        method:'post',
        url:`/wx/api/mobile/1.0/wechat/CommitHandleResult`,
        data:{
            dataId,
            handleWay,
            remark
        }
    })       
}
export {
    querydata,
    getoptions,
    postdata
}