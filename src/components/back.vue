<template>
  <div class="con">
      <img src="../assets/back.png" alt="" @click="gob">
  </div>
</template>

<script>
export default {
    name:'back',
    methods:{
        gob(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less">
    .con{
        width: 100%;
        height: 5%;
        background-color: #3091f2;
        justify-content: center;
        display: flex;
        flex-direction: column;
        img{
            height: 70%;
            width: 7%;
        }
    }
</style>