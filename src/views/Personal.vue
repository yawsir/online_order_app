<template>
    <div id="personal">
        <router-link to="/home" tag="div" class="back_button">返回</router-link>
         <div class="info-box">
            <div class="avator">
                <img src="../assets/gjbwg.png" alt="">
            </div>
            <div class="info">
                <p class="row">
                    <span>{{userInfo.uname}}&nbsp;</span>
                </p>
                <p class="row">{{userInfo.uemail}}</p>
                <p class="row">收货地址：{{userInfo.uaddress}}</p>
                <p class="row">电话：{{userInfo.uphone}}</p>
                <p class="row">收获人：{{userInfo.ushou}}</p>
            </div>
        </div>

        <div class="operate-box">
            <div class="operate" @click="showPwdDialog=true">修改收获信息</div>
            <div class="operate" @click="showLogoutDialog=true">退出登录</div>
        </div>

        <nav-button
            @changeState="isNavOpen = !isNavOpen"
            :commands="['menu', 'cart', 'personal']"
            @subClick="onSubClick"
        />

        <my-dialog v-show="showPwdDialog" title="修改收获信息"> 
            <div class="form-block">
                <label for="newAddr" class="dialog-label">新地址</label>
                <input type="text" id="newAddr" v-model="addressInfo.newAddress">
            </div>
            <div class="form-block">
                <label for="phone" class="dialog-label">电话</label>
                <input type="text" id="phone" v-model="addressInfo.phone">
            </div>
            <div class="form-block">
                <label for="consignee" class="dialog-label">收货人</label>
                <input type="text" id="consignee" v-model="addressInfo.consignee">
            </div>
            <div class="form-block">
                <button class="btn" @click="closePwdDialog">取消</button>
                <button class="btn" @click="modifyAddress">确认</button>
            </div>
        </my-dialog>

        <my-dialog v-show="showLogoutDialog" title="确认退出登录">
            <div class="form-block">
                <button class="btn" @click="closeLogoutDialog">取消</button>
                <button class="btn" @click="logout">确认</button>
            </div>
        </my-dialog>
    </div>
</template>

<script>
import MyDialog from '../components/MyDialog'
import NavButton from "../components/NavButton.vue";
import Config from "../models/config.js"
import Storage from '../models/storage.js'
import Utils from '../utils/util'
import qs from 'qs'
export default {
    name: "personal",

    data() {
        return {
            userInfo: {},
            userId: Utils.storage.get('userInfo').userId,
            addressInfo:{
                newAddress: '',
                phone: '',
                consignee: ''
            },
            showPwdDialog: false,
            showLogoutDialog: false,
            isNavOpen: false
        }
    },
    methods: {
        onSubClick(command){
            console.log(command)
            if(command == 'menu'){
                this.$router.push({path: '/home'})
            }else if(command == 'cart'){
                this.$router.push({path: '/cart'})
            }else if(command == 'personal'){
                this.$router.push({path: '/personal'})
            }
        },
        //查询信息
        queryUserInfo(user_id){
            this.$axios.get(`${Config.apiAddr}/user/appuserInfo?user_id=${user_id}`)
            .then(res => {
                console.log(res)
                if(res.data.success){
                    this.userInfo = res.data.userInfo[0].fields
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        //修改密码
        modifyAddress(){
            let str = this.checkForm()
            if(str === ''){
                const p = {
                    user_id: this.userId,
                    user_phone: this.addressInfo.phone,
                    user_takeout: this.addressInfo.consignee,
                    user_address: this.addressInfo.newAddress
                }
                this.$axios.post(`${Config.apiAddr}/user/appaddress`, qs.stringify(p))
                .then(res => {
                    console.log(res)
                    if(res.data.success){
                        this.queryUserInfo(this.userId)
                        this.showToast(1000, '修改成功')
                        this.closePwdDialog()
                            
                    }else{
                        this.showToast(1000, '修改失败')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.showToast(1000, str)
            }
        },
        //退出登录
        logout(){
            Utils.storage.remove('userInfo')
            this.$router.replace({path: '/login'})
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
        //检查表单
        checkForm(){
            let str = ''
            if(!this.addressInfo.newAddress || !this.addressInfo.phone || !this.addressInfo.consignee){
                str = '填写不完整'
            }
            return str
        },
        closePwdDialog(){
            this.showPwdDialog = false
        },
        closeLogoutDialog(){
            this.showLogoutDialog = false
        }
    },
    mounted() {
        this.queryUserInfo(this.userId)
    },
    components: {
        MyDialog,
        NavButton
    }
}
</script>

<style lang="scss" scoped>
#personal {
    .back_button {
        position: fixed;
        top: 1.5rem;
        left: 1.5rem;
        width: 5rem;
        height: 5rem;
        background: #000000bb;
        border-radius: 50%;
        color: #ffffff;
        line-height: 5rem;
        text-align: center;
        box-sizing: border-box;
        padding-left: 0.6rem;
        &::before {
            content: "";
            display: block;
            border-bottom: #ffffff solid 0.2rem;
            border-left: #ffffff solid 0.2rem;
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            top: 2rem;
            left: 0.8rem;
            transform: rotate(45deg);
        }
    }
    @mixin box{
        width: 70%;
        margin: 7rem auto;
        border: 1px solid #cdcdcd;
        border-radius: 1.5rem;
        padding: 2rem 0;
    }
    .info-box{
            font-size: 1.5rem;
        @include box;
        display: flex;
        align-items: center;
        .avator{
            width: 5rem;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 1.5rem;
            img{
                width: 5rem;
                height: 5rem;
                vertical-align: middle;
            }
        }
        .info{
            .row{
                color: #909399;
                margin: .4rem;
                font-size: 1rem;
            }
        }
    }
    .operate-box{
        @include box;
        padding: 0 1.2rem 1.3rem;
        box-sizing: border-box;
        font-size: 1.5rem;
        .operate{
            color: #909399;
            border-bottom: .01rem solid;
            text-align: left;
            padding: 1.4rem 1.3rem .8rem;
        }
    }
    .form-block{
        color: #909399;
        margin: 1.3rem 0 1.3rem;
        text-align: left;
        display: flex;
        justify-content: center;
        .dialog-label{
            padding-left: .3rem;
            text-align: left;
            flex: 1;
        }
        input{
            height: 2rem;
            padding: .05rem .1rem;
            border: 1px solid #cdcdcd;
            flex: 3.5;
            border-radius: 1rem;
            &:focus{
                border: .1px solid #0ff;
                border-radius: 1rem;
            }
        }
        
    }
    .btn{
        width: 20%;
        height: 2.3rem;
        background: #009789;
        border: 1px;
        border-radius: 1rem;
        box-shadow: .02rem .02rem .05rem .02rem;
        color: #fff;
        font-size: .25rem;
        padding: .05rem .1rem;
        margin: .2rem .3rem .2rem 0;
        &:active{
            background: #02b19f;
        }
                
    }
}
</style>