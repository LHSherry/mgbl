// class sessionToken{//设置临时token使用
//     constructor(key,value){//key值的是参数名，value是参数值，express是过期时间99999永久不过期。
//         this.key = key || null
//         this.value = value || null
//         // this.express = express
//     }
//     // setcookiesTime(){//设置为99999为永不过期,设置为-1立即过期
//     //     var exp = new Date()
//     //     exp.setTime(exp.getTime()+this.express*60*24*60*1000)
//     //     return exp
//     // }
//     setSession(key,value){//为添加cookies方法，
//         // sessionStorage.clear()
//         sessionStorage.setItem(this.key || key,this.value || value)
//         // var time = this.setcookiesTime()
//         // var code = this.key
//         // var codeValue = this.value
//         // document.cookie = `${code}=${codeValue};expires=${time.toUTCString()}`
//     }
//     getSession(key){
//         return sessionStorage.getItem(this.key || key)
//     }
//     removeSession(key){
//         sessionStorage.removeItem(this.key || key)
//     }

// }
// class localToken{//设置永久token使用
//     constructor(key,value){//key值的是参数名，value是参数值，express是过期时间99999永久不过期。
//         this.key = key || null
//         this.value = value || null
//         // this.express = express
//     }
//     // setcookiesTime(){//设置为99999为永不过期,设置为-1立即过期
//     //     var exp = new Date()
//     //     exp.setTime(exp.getTime()+this.express*60*24*60*1000)
//     //     return exp
//     // }
//     setlocal(key,value){//为添加cookies方法，
//         sessionStorage.clear()
//         localStorage.setItem(this.key || key,this.value || value)
//         // var time = this.setcookiesTime()
//         // var code = this.key
//         // var codeValue = this.value
//         // document.cookie = `${code}=${codeValue};expires=${time.toUTCString()}`
//     }
//     getlocal(key){
//         return localStorage.getItem(this.key || key)
//     }
//     removelocal(key){
//         localStorage.removeItem(this.key || key)
//     }

// }
class sessionToken {
    constructor(key,value,expires){
        this.key = key || null
        this.value = value || null 
        this.expires = expires || null
    }

    setToken(key,value,expires){
        var exp = new Date()
        exp.setTime(exp.getTime()+ (this.express || expires) *60*24*60*1000)  //设置token过期时间
        var onceToken = this.key ||key
        var token = this.value ||value
        document.cookie = `${onceToken}=${token};expires=${exp.toUTCString()}`               
    }
    setonceToken(key,value){
        // var exp = new Date()
        // exp.setTime(exp.getTime()+ (this.express || expires) *60*24*60*1000)  //设置token过期时间
        var onceToken = this.key ||key
        var token = this.value ||value
        document.cookie = `${onceToken}=${token};}`               
    }
    setdataid(key,value){
        document.cookie = `${key}=${value}`
    }
    getToken(){
        var  token = document.cookie//读取本地cookie
         var    arr = token.split(";")                           
             if( arr.length > 1 && arr){//如果有两个
                let newarr = arr.filter(item=>item.indexOf("Token") !== -1)        
                if(newarr.length > 1){
                    let lastarr = newarr.filter(item=>item.indexOf("onceToken") === -1)
                    lastarr = lastarr[0].split("=")
                    return  lastarr[1]
                }else{
                    newarr = newarr[0].split("=")
                    return newarr[1]    
                }
             }else{//如果有一个cookie
                    token = token.split("=")                                     
                    if(token[0] === "Token"){//用户换手机之后cookie只存在Token
                        return token[1]
                    }else{//正常下一个onceToken
                        return false
                    }
             }
    }
    getdataid(){
        var strings = document.cookie
        var query = strings.split(";")
        query = query.filter(item=>item.indexOf("dataid")!==-1)
        query = query[0].split("=")
        return query[1]
    }

}

export {
    sessionToken
} 