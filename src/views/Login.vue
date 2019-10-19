<template>
    <div id="login">
        <div class="logo-wrap">
            <img src="../assets/logo.png" alt="" class="logo">
        </div>

        <input type="text" placeholder="账号" v-model="loginInfo.uname">
        <input type="password" placeholder="密码" v-model="loginInfo.upwd">
        <button class="login-btn" @click="doLogin">登录</button>
    </div>
</template>

<script>
import config from "../models/config.js";
import Storage from "../models/storage.js";
import Utils from '../utils/util.js'
import qs from 'qs'
export default {
     name: "login",

    data() {
        return {
            loginInfo: {
                uname: '',
                upwd: ''
            }
        }
    },
    methods: {
        doLogin(){
            console.log(this.loginInfo)
            this.$axios.post(`${config.apiAddr}/user/applogin`,qs.stringify(this.loginInfo))
            .then(res => {
                console.log(res)
                if(res.data.success && res.data.auth){//登录成功
                    Utils.storage.set('userInfo', {
                        username: this.loginInfo.uname,
                        userId: res.data.user_id
                        }
                    )
                    this.$router.push({path: '/home'})
                }else{
                    this.showToast(1000, '账号或密码错误')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        showToast(time, msg){
            const toast = this.$createToast({
                time,
                txt: msg,
                type: 'txt',
                zIndex: 2000
            })
            toast.show()
        },
        

    }
};
</script>

<style lang="scss" scoped>
#login{
    text-align: center;
    .logo-wrap{
        margin-top: 10rem;
        text-align: center;
        width: 100%;
        .logo{
            width: 5rem;
            height: 5rem;
        }
    }
    input[type=text], input[type=password]{
        width: 80%;
        height: 1.5rem;
        border: 0px;
        border-bottom: 1px solid #cdcdcd;
        margin: 1rem auto;
        border-radius: 3rem;
        padding: .5rem;
    }
    .login-btn{
        width: 70%;
        height: 3rem;
        background: #009789;
        line-height: 2rem;
        margin: 1rem auto;
        border: 1px solid #cdcdcd;
        border-radius: 1.3rem;
        color: white;
        &:active{
            background: #02b19f;
        }
    }

}

</style>

</style>

