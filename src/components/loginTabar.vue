<template>
        <div >
                <div class="tabar">
                        <div class="tabar-items" :class=" {'tabar-items-active':isActive} " @click="change($event)"  id="1">
                                患者绑定
                        </div>
                        <div class="tabar-items" :class=" {'tabar-items-active':!isActive} "  @click="change($event)" id="2">
                                医生绑定
                        </div>
                </div>
        </div>
</template>

<script>
export default {
        name:"loginTabar",
        data(){
                return{
                        isActive:true
                }
        },
        methods:{
            change(event){
                //     var map = new Map([
                //             [1,"患者"],
                //             [2,"医生"]
                //     ])
    
              
                if(event.target.id === "1"){
                         this.isActive = true       
                }else if(event.target.id === "2"){
                        this.isActive = false
                }
                this.$bus.$emit('isActive', this.isActive)
            }      
        }
}
</script>

<style lang="less" scoped>
.tabar{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .tabar-items{
                display: inline-block;
                font-size: .4rem;                
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: .533333rem;
                &::after{
                        content: ' ';
                        display: block;
                        width: 100%;
                        height: .053333rem;
                        background: #ffffff;
                }                
        }
        .tabar-items-active{
                display: inline-block;
                display: flex;
                font-size: .453333rem;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: .533333rem;             
                &::after{
                        content: ' ';
                        display: block;
                        width: 100%;
                        height: .08rem;
                        background: #2db7f5;
                }       
        }

}
</style>