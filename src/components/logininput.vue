<template>
            <div class="login">
                <i-form class="patients" ref="fromData" v-show="ishow" :model="fromData" :rules="formRules" >
                    <Row>
                             <i-col span="20" offset="2">
                        <Form-item class="login-items"  prop="phone" >
                            <Input  placeholder="请输入患者手机号" class="login-input-items" size="large"  v-model="fromData.phone" />
                        </Form-item>
                            </i-col>  
                    </Row>
                    <Row>
                         <i-col span="24" offset="2">
                        <Form-item class="login-items " prop="coding" inline>
                            <Row>
                                <i-col span="10" offset="0">
                            <Input  placeholder="验证码"  class="login-input-items code-items " size="large"   v-model="fromData.coding"/>
                                 </i-col>  
                                <i-col span="10" offset="1">     
                            <Button class="code-btn"  :loading = loading @click="getcoding"  size="large"> 
                                        <span v-if="!loading">获取验证码</span>
                                        <span v-else style="font-size:10px;">{{countTime}}秒后重新获取</span>
                            </Button>
                             </i-col>  
                            </Row>
                        </Form-item>
                        </i-col>  
                    </Row>
                    <Row>
                        <i-col span="20" offset="2">
                        <Form-item class="btn-item">
                            <Button type="info" class="btn"  :loading="false" long @click="handleSubmit('fromData','customer')"  size="large">绑定登录</Button>
                        </Form-item>
                         </i-col>  
                    </Row> 
                    <Row>
                        <i-col  offset="6">
                        <Form-item class="check-items" inline prop ="check">            
                                <CheckboxGroup v-model="fromData.check" >
                                <Checkbox label="" ref="checkss" >
                                <span>登录即表示同意</span>
                                </Checkbox>
                                <span  @click="showprivacy" style="font-size:12px;color:blue;">《隐私政策》</span> 
                                </CheckboxGroup> 

                        </Form-item>
    
                        </i-col>  
                     </Row>     
                </i-form>
                <!-- <i-form class="doctors " v-show="!ishow" key="b">
                        <Form-item class="login-items" key="b1">
                            <Input  placeholder="请输医生入手机号" class="login-input-items" key="b2"/>
                        </Form-item>
                        <Form-item class="login-items" key="b3">
                            <Input  placeholder="验证码"  class="login-input-items code-items" key="b4"/>
                            <Button class="code-btn" key="b5" :loading = loading1 @click="getcoding1"> 
                                        <span v-if="!loading1">获取验证码</span>
                                        <span v-else>{{countTime1}}秒后重新获取</span>
                            </Button>
                        </Form-item>
                        <Form-item class="btn-item" key="b6">
                            <Button type="info" class="btn" key="b7" :loading="false">绑定登录</Button>
                        </Form-item>
                        <Form-item class="check-items">
                                <Checkbox v-model="single"></Checkbox>
                                <p>登录即表示同意</p>
                                <router-link to="">《隐私政策》</router-link>
                        </Form-item>
                </i-form> -->

        <i-form class="patients" ref="fromdata1"  v-show="!ishow" :model="fromdata1" :rules="formRules1" >
                    <Row>
                             <i-col span="20" offset="2">
                        <Form-item class="login-items"  prop="phone" >
                            <Input  placeholder="请输入医生手机号" class="login-input-items"  size="large"  v-model="fromdata1.phone" />
                        </Form-item>
                            </i-col>  
                    </Row>
                    <Row>
                         <i-col span="24" offset="2">
                        <Form-item class="login-items "  prop="coding" inline>
                            <Row>
                                <i-col span="10" offset="0">
                            <Input  placeholder="验证码"  class="login-input-items code-items "  size="large"  v-model="fromdata1.coding"/>
                                 </i-col>  
                                <i-col span="10" offset="1">     
                            <Button class="code-btn"  :loading = loading1 @click="getcoding1"  size="large"> 
                                        <span v-if="!loading1">获取验证码</span>
                                        <span v-else style="font-size:10px;">{{countTime1}}秒后重新获取</span>
                            </Button>
                             </i-col>  
                            </Row>
                        </Form-item>
                        </i-col>  
                    </Row>
                    <Row>
                        <i-col span="20" offset="2">
                        <Form-item class="btn-item" >
                            <Button type="info" class="btn" :loading="false" long @click="handleSubmit1('fromdata1','user')"  size="large">绑定登录</Button>
                        </Form-item>
                         </i-col>  
                    </Row> 
                    <Row>
                        <i-col  offset="6">
                        <Form-item class="check-items" inline prop ="check"> 
                                <CheckboxGroup v-model="fromdata1.check" >
                                <Checkbox label="" ref="checks">
                                    <span>登录即表示同意</span>                         
                                </Checkbox>
                                    <span  @click="showprivacy" style="font-size:12px;color:blue;">《隐私政策》</span> 
                                </CheckboxGroup>         
 
                        </Form-item>
                        </i-col>  
                     </Row>     
                </i-form> 
            </div>
</template>

<script>
import {getVerification,bindusers} from "../utils/login"
import {sessionToken} from "../utils/cookies"
export default {
    name:'logininput',
    data(){
        return{
            ishow:true,
            single:false,
            loading:false,
            loading1:false,//验证码倒计时特效
            countTime:120,//短信验证码获取倒计时
            countTime1:120,
            fromData:{
                phone:'',
                coding:'',
                check:[]
            },
            fromdata1:{
                phone:'',
                coding:'',
                check:[]
            },
            formRules:{
             phone:[
                 { required: true, message: '请填写手机号码', trigger: 'blur' },
                 { type: 'string', min:11,max:11, message: '请输入正确的手机号码', trigger: 'blur' }
             ],
             coding:[
                 { required: true, message: '请填写验证码', trigger: 'blur' },
                 { type: 'string', min:6,max:6, message: '请输入正确的验证码', trigger: 'blur' }
             ],
           check:[
                { required: true, type: 'array', min: 1, message: '请阅读隐私政策条约' },
                // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' },
                //  { required: true, message: '请阅读隐私政策条约', trigger: 'change' },
             ]          
            },
            formRules1:{
             phone:[
                 { required: true, message: '请填写手机号码', trigger: 'blur' },
                 { type: 'string', min:11,max:11, message: '请输入正确的手机号码', trigger: 'blur' }
             ],
             coding:[
                 { required: true, message: '请填写验证码', trigger: 'blur' },
                 { type: 'string', min:6,max:6, message: '请输入正确的验证码', trigger: 'blur' }
             ],
           check:[
                { required: true, type: 'array',  message: '请阅读隐私政策条约' },
                // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' },
                //  { required: true, message: '请阅读隐私政策条约', trigger: 'change' },

             ]          
            }            
        }
    },
    // watch:{
    //     'fromData.check':{
    //        handler () {
    //            console.log(this.fromData);           
    //        } 
    //     }
    // },
    mounted(){        
            var that = this
            this.$bus.$on('isActive', function (bool) {
                that.ishow = bool
            }) 
            this.$bus.$on('checks', function () {  
                // console.log(that.$refs.checkss.label);
               that.fromData.check.splice(0,1,that.$refs.checks.label)                                    
               that.fromdata1.check.splice(0,1,that.$refs.checkss.label)
            })     
    },
    methods:{
       getcoding() {//获取验证码和控制定时器   
            const userType = 'customer'//患者获取验证码
            const phone = this.fromData.phone
            if(phone.length == 11){
            let current = this.countTime
            this.loading = true
            const _slef = this  
            getVerification(userType,phone).then(res=>{//判断验证码是否发送成功
            res.data.successed  && this.$weui.toast('发送成功', {
                                        duration: 3000,
                                        className: 'custom-classname',
                                        callback: function(){ console.log('close') }
                                    });
            res.data.successed  || this.$weui.topTips(res.data.errMessage, {
                                    duration: 3000,
                                    className: 'custom-classname',
                                    // callback: function(){ console.log('close') }
                                    })
           })
                const timer = setInterval(function(){
                current--;
                _slef.countTime = current
                if(current == 0){
                    _slef.countTime = 120    
                    clearInterval(timer)
                    _slef.loading = false
                }
                },1000)            
            }else{
                return
            }
        },
       getcoding1() {//医生获取验证码和控制定时器 
           const userType = 'user'//
            const phone = this.fromdata1.phone
            if(phone.length == 11){
                let current = this.countTime1
                this.loading1 = true
                const _slef = this  
                getVerification(userType,phone).then(res=>{//判断验证码是否发送成功
            res.data.successed  && this.$weui.toast('发送成功', {
                                        duration: 3000,
                                        className: 'custom-classname',
                                        callback: function(){ console.log('close') }
                                    });
            res.data.successed  || this.$weui.topTips(res.data.errMessage, {
                                    duration: 3000,
                                    className: 'custom-classname',
                                    // callback: function(){ console.log('close') }
                                    })
                        
                })    
                const timer1 = setInterval(function(){
                        current--;
                        _slef.countTime1 = current
                        if(current == 0){
                            _slef.countTime1 = 120  
                            clearInterval(timer1)
                            _slef.loading1 = false
                        }
                    },1000)
            }else{
                return
            }
        },
            handleSubmit(name,userType) { 
                this.$refs[name].validate((valid) => {
                   if(valid){
                    var loading = this.$weui.loading('加载中···', {//加载
                    className: 'custom-classname'
                    });   
                    userType === 'user' && bindusers(this.fromdata1.coding).then(res=>{ 

                        
                        loading.hide(function() {
                        console.log('`loading` has been hidden');
                        });
                        res.data.successed && new sessionToken("Token",res.data.result.token,99999).setToken()
                        res.data.successed && this.$weui.toast('登录成功', {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                callback: function(){ console.log('close') }
                                            });
                        res.data.successed && this.$router.replace({path:"/index"})   
                        res.data.successed || this.$weui.topTips(res.data.errMessage, {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                // callback: function(){ console.log('close') }
                                                })                        

                    })//医生登录绑定
                    userType === 'customer' && bindusers(this.fromData.coding).then(res=>{
                        
                        
                        loading.hide(function() {
                        console.log('`loading` has been hidden');
                        });
                        res.data.successed &&  new sessionToken("Token",res.data.result.token,99999).setToken()
                        res.data.successed && this.$weui.toast('登录成功', {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                callback: function(){ console.log('close') }
                                            }); 
                        res.data.successed && this.$router.replace({path:"/index"})                         
                        res.data.successed || this.$weui.topTips(res.data.errMessage, {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                // callback: function(){ console.log('close') }
                                                })
                    })//患者登录绑定
                   }
                })
            },
            handleSubmit1(name,userType) { 
                    this.$refs[name].validate((valid) => {
                    console.log(userType);
                   if(valid){
                    var loading = this.$weui.loading('加载中···', {//加载
                    className: 'custom-classname'
                    });   
                    userType === 'user' && bindusers(this.fromdata1.coding).then(res=>{ 
                        console.log(1);         
                        loading.hide(function() {
                        console.log('`loading` has been hidden');
                        });
                        res.data.successed && new sessionToken("Token",res.data.result.token,99999).setToken()
                        res.data.successed && this.$weui.toast('登录成功', {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                callback: function(){ console.log('close') }
                                            });
                        res.data.successed && this.$router.replace({path:"/index"})   
                        res.data.successed || this.$weui.topTips(res.data.errMessage, {
                                                duration: 3000,
                                                className: 'custom-classname',
                                                // callback: function(){ console.log('close') }
                                                })                        

                    })//医生登录绑定
                   }
                })
            },
            showprivacy(){
                 this.$bus.$emit('privacy',true)   
            }
    }
}
</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        overflow: hidden;
            // .login-items{
            //     width: 100%;
            //     display: flex;
            //     flex-direction: row;
            //     justify-content: center;
            //     margin-bottom: .266667rem;
            //         .login-input-items{
            //             width: 100%;
            //         }
            //         .code-items{
            //              width: 41%;
            //         }
            //         .code-btn{
            //             width: 39%;
            //             box-shadow: .026667rem .026667rem .026667rem #ddeedd;
            //         }
            // }
            // .btn-item{
            //     width: 100%;
            //     display: flex;
            //     flex-direction: row;
            //     justify-content: center;
            //     margin-top: 5%;         
            //     .btn{
            //         width: 80%;
            //         box-shadow: .08rem .08rem .053333rem #dedede;
            //     }       
            // }
            // .check-items{
            //     width: 100%;
            //     display: flex;
            //     flex-direction: row;
            //     justify-content: center;
            //     align-items: center;   
            //     margin-top: 2%;             
            // }
    }
.con{
    width: 100%;
    overflow-x: hidden;

}
.item-1{
    width:10rem;
    height: 1.333333rem;


}
.item-2{
    width: 10rem;
    height: 1.333333rem;


}

</style>