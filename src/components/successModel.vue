<template>
        <div class="modal">
                <div class="content">
                    <img src="../assets/success.png"/>
                     <p>认证成功</p>
                </div>
        </div>
</template>

<script>
export default {
    name:'successModel',
    data(){
        return{
            isshow:''
        }
    },
    beforeCreate(){
        this.$bus.on('isSuccess',function(bool){
                console.log(bool);
                
        })
    }
}   
</script>

<style lang="less">
.modal{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(163, 162, 162,0.3);
    z-index: 999;
    .content{
        width: 60%;
        height: 30%;
        background-color: rgb(248, 248, 248);
        position: relative;
        left: 20%;
        top: 30%;
        display: flex;
        opacity: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: darkblue;
        font-size: .48rem;
        border-radius: .32rem;
        box-shadow: .053333rem .053333rem .133333rem rgb(112, 112, 112);
    }
}
</style>