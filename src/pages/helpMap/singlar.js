import * as signalR from"@microsoft/signalr"
import {message} from "antd"
class singlar{
    constructor(addmark,removeMarks,biegnaddMarks,autio,autio1,dispatch,clearmap){
        this.connection =new signalR.HubConnectionBuilder()//跨域问题，待解决
                        .withUrl("/hubs/sos", {
                        skipNegotiation: true,
                        transport: signalR.HttpTransportType.WebSockets
                        })
                        .build()
        this.addmark = addmark
        this.removeMarks=removeMarks
        this.biegnaddMarks=biegnaddMarks
        this.dispatch=dispatch
        this.autio=autio
        this.autio1=autio1
        this.clearmap=clearmap
    }
   async start() {
        try {
          message.loading("连接中······")
         await this.connection.start().then(()=>{
             setTimeout(function(){
                message.success("连接成功")
             },1000)
                console.log("success")
            });
             console.log("connectioned")
              const addmarks = this.addmark
              const removeMarks = this.removeMarks
              const  biegnaddMarks = this.biegnaddMarks
              const autio = this.autio 
              const autio1 = this.autio1 
              const dispatch = this.dispatch
              const clearmap = this.clearmap
                this.connection.on("ReceiveMessage", function (Handed,planId) {
                    var msg = "服务器推送消息: 患者Id:" + planId + "是否处理"+Handed;
                    console.log(msg)
                    if(Handed==false){
                        setTimeout(() =>autio.play(), 1000)
                        // addmarks(patientId)
                        dispatch({
                            type:"helpMap/queryList",
                            planId:planId,
                            callback:biegnaddMarks
                        }) 
                    }else if(Handed==true){
                        message.success("已处理！")
                        setTimeout(() =>autio1.play(), 1000)
                        dispatch({
                            type:"helpMap/queryList",
                            callback:biegnaddMarks
                        })                 
                    }
                    // var li = document.createElement("li");
                    // li.textContent = msg;
                    // document.getElementById("messagesList").appendChild(li);
                })
        } catch (err) {
            console.log(err)
            message.error(err)
        }
    }
    close(){
        this.connection.stop()
    }

}
export default singlar