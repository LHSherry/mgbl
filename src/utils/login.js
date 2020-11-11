
import axios from "axios"

//防止用户连续点击登录，带来请求服务器的压力
var timer = null//初始化timer
function debounceLogin (){
   clearTimeout(timer)
   timer = setTimeout(function(){
        //具体操作
        getCode().then(res=>{
            console.log(res);
        })
    },1000)
}
function getcookieToken(token){
    token = token.split("=")[1]
    return token
}
function getCode(){
    const appid = 'wx54fdcc047b880192'
    const url = 'http%3a%2f%2f39.98.36.45%3a8081%2f'
    const urls = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    window.location.href = urls
}
function gettoken(code){
    return axios({
            url:`/wx/api/mobile/1.0/wechat/Login?js_code=${code}`,
            method:'get'
        })
}
function getVerification(userType,mobile){
    const token = getcookieToken(document.cookie)   
    return axios({
        method:"get",
        headers:{
            'Authorization':"Bearer " + token
        },
        url:`/wx/api/mobile/1.0/wechat/SendSmVerifyCode?mobile=${mobile}&userType=${userType}`
    })
}
function bindusers(code){
    const token = getcookieToken(document.cookie) 
    return axios({
        method:"get",
        headers:{
            'Authorization':"Bearer " + token
        },
        url:`/wx/api/mobile/1.0/wechat/CommitSmVerifyCode?verifyCode=${code}`
    })   
    // return request({
    //     method:"get",
    //     url:`/wx/api/mobile/1.0/wechat/CommitSmVerifyCode?verifyCode=${code}`
    // })    
}
export{
    debounceLogin,
    getCode,
    gettoken,
    getcookieToken,
    getVerification,
    bindusers
}