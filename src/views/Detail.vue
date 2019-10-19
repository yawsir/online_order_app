<template>
    <div class="detail">
        <router-link to="/home" tag="div" class="back_button">返回</router-link>

        <div class="detail_header">
            <img :src="apiAddr+'/static/media/'+detailData.fields.gpic" alt />
            <h2 class="name">{{detailData.fields.gtitle}}</h2>
            <p class="price">￥{{detailData.fields.gprice}}/份</p>
        </div>

        <div class="detail_content">
            <h3 class="content_title">商品详情</h3>
            <img :src="apiAddr+'/static/media/'+detailData.fields.gpic" alt />
            <p class="content_introduce" v-html="detailData.fields.gcontent"></p>
        </div>

        <div class="detail_footer">
            <div class="footer_amount">
                <!-- 这里可能用ui库代替 先自己做练习 -->
                <span>数量:</span>
                <div class="amount_controler">
                    <div class="controler_inner">
                        <div class="sub" @click="onSub">-</div>
                        <input class="amount" type="number" v-model="num" disabled="disabled">
                        <div class="add" @click="onAdd">+</div>
                    </div>
                </div>
            </div>

            <div class="footer_into_cart"
                @click="onAddCart">加入购物车</div>
        </div>
    </div>
</template>

<script>
import Config from '../models/config.js'
import Stroage from '../models/storage.js'
import Utils from '../utils/util.js'
import qs from 'qs'
export default {
    name:'detail',
    data(){
        return {
            apiAddr: Config.apiAddr,
            detailData: {
                fields: {gpic:''}
            },
            num: 1
        }
    },
    methods: {
        requestData(id){    //向后台请求数据
            this.$axios.get(this.apiAddr+'/goods/appdetail?id='+id)
            .then((res) => {
                console.log(res)
                if(res.data.success){
                    this.detailData = res.data.good_detail[0]
                }
                // this.detailData = res.data.result[0]
            })
            .catch((err) => {
                console.log(err)
            })
        },
        onSub(){
            if(this.num > 1){
                --this.num
            }
        },
        onAdd(){
            ++this.num
        },
        onAddCart(){    //点击添加至购物车
            const uid = Utils.storage.get('userInfo').userId
            // console.log(uid)
            const p = {
                user_id: uid,
                goods_id: this.detailData.pk,
                goods_count: this.num
            }
            console.log(p)
            this.$axios.get(this.apiAddr+`/cart/appAddcart?user_id=${uid}&goods_id=${p.goods_id}&goods_count=${p.goods_count}`)
            .then((res) => {
                    // console.log(res)
                    if(res.data.success){
                        this.$router.push({path: '/home'})
                        this.showToast(1000, '添加成功')
                    }else{
                        this.showToast(1000, '添加失败')
                    }
            })
            .catch((err) => {
                console.log(err)
                this.showToast(1000, '服务器异常')

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
        }

    },
    mounted(){
        this.requestData(this.$route.query.id)
    }
};
</script>

<style lang="scss" scoped>
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

.detail_header {
    width: 95%;
    margin: 0 auto;
    background: #ffffff;
    margin-bottom: 1rem;
    img {
        width: 100%;
        height: 18rem;
    }
    .name {
        margin-left: 0.5rem;
    }
    .price {
        color: red;
    }
}

.detail_content {
    background: #ffffff;
    width: 95%;
    margin: 0 auto;
    padding: 1rem 0 10rem 0;
    img {
        width: 95%;
        margin: 0 auto;
        display: block;
    }
    .content_title {
        margin-left: 2.5%;
    }
    .content_introduce {
        width: 95%;
        margin: 0 auto;
    }
}

.detail_footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4.4rem;
    font-size: 1.6rem;
    background: #ffffff;
    line-height: 4.4rem;
    border-top: #eeeeee solid 1px;
    .footer_amount {
        position: absolute;
        left: 2rem;
        top: 0;
        width: 18rem;
       
        .amount_controler {
            display: inline-block;
            .controler_inner {
                display: flex;
                width: 9rem;
                text-align: center;
                .sub,
                .amount,
                .add {
                    flex: 1;
                    width: 3rem;
                    height: 3rem;
                    line-height: 3rem;
                    border: solid #eeeeee 1px;
                    display: block;
                    text-align: center;
                    background: #ffffff;
                }
                .sub,
                .add {
                    color: red;
                    font-size: 2rem;
                }
            }
        }
    }

    .footer_into_cart {
        position: absolute;
        right: 2rem;
        top: 0.5rem;
        height: 3rem;
        line-height: 3rem;
        background: #ff0000;
        border-radius: 0.5rem;
        color: #ffffff;
        font-size: 1.2rem;
        padding: 0 0.5rem;
    }
}
</style>

