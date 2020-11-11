import axios from "axios"
// const qs = require("querystring")
import {sessionToken} from  "./cookies"
import router from "../router/index"

let request = axios.create({//初始化实例化axios请求
    // headers:{
    //     'content-type': 'multipart/form-data',
    // }
})
request.interceptors.request.use(//aioxs请求拦截
    config =>{
        const token = new sessionToken().getToken()
        if(token){
            config.headers.Authorization = "Bearer " + token
        }else{
            router.replace({path:"/"})
        }        
        return config
    },
    err =>{
        return Promise.reject(err)
    }

)
request.interceptors.response.use(
    response =>{  
        if(response.data.successed){
            return response
        }
    },
    error=>{
        return Promise.reject(error)
    }
)
export default request