<template>
    <div class="amap">
            <el-amap vid="amapDemo" :zoom="zoom" :center="center">
            <el-amap-marker v-for="(marker,index) in markers" :position="marker" :key="index"></el-amap-marker>
            <el-amap-info-window  :position="windows.position" :visible="windows.visible" >
                    <div class='content'>
                        <b>{{name}},正在呼救</b>
                        <Button type="info" size="small" @click="gotodetail" v-if="ishandled===false">去处理</Button>
                        <Button type="info" size="small" @click="gotodetail" v-else disabled>去处理</Button>
                    </div>
            </el-amap-info-window>
             </el-amap>
    </div>   
</template>
<script>
   export default {
       name:'maps',
       props:{
          lan:{
              type:Number,
              required:true
          },
          lat:{
              type:Number,
              required:true
          },
          name:{
              type:String,
              required:true              
          },
          ishandled:{
              type:Boolean,
              required:true
          } 
       },
       data(){
           return{
               positiosn:[],
               zoom:14,
               center:[],
               markers:[],
               windows:{
                   position:[],
                   visible:true
               },
           }
       },
       watch:{
           lan:function(n){
               this.positiosn.push(n)
           },
           lat:function(n){
               this.positiosn.push(n)
           }
       },
       mounted(){         
        //    this.markers.push([this.$props.lan,this.$props.lat])      
            this.center = this.positiosn
            this.markers.push(this.positiosn)
            this.windows.position = this.positiosn  
            console.log(this.lan,this.lat);
                 
        //    var self = this
        //     self.markers.push({
        //         position:[self.lan,self.lat],
        //         events:{
        //             click(){
        //                 self.window.visible = true
        //             }
        //         }
        //     })
       },
       updated(){
            // this.center = [this.lan,this.lat]
            // this.markers.push([this.lan,this.lat])
            // this.windows.position = [this.lan,this.lat]   
           console.log(this.lan,this.lat,111111);   
       },
       methods:{
           gotodetail(){
               this.$router.push({path:"/message"})
           }
       }
    }
</script>
<style lang="less">
    .amap{
        width:100%;
        height: 100%;
        el-amap{
        width:100%;
        height: 100%;
        }
        .content{
            vertical-align:middle;
        }
    }
</style>