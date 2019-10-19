<template>
    <div id="cart">
        <div class="cart_header" v-if="goodsList.length != 0">
            <h2 class="header_title">购物车</h2>
            <div class="cart_info">
                <p class="food_number">购物车中总共{{totalNumber}}个菜</p>
                <p class="total">
                    合计
                    <span class="price">￥{{totalPrice}}</span>
                </p>
            </div>
        </div>
        <div class="cart_tip" v-else>
            <h2>购物车空空的</h2>
            <p>您可以点击下面的菜单开始点菜</p>
        </div>
        

        <div class="cart_content">
            <ul class="cart_list">
                <li class="cart_item" v-for="(item, index) in goodsList" :key="index">
                    <img :src="apiAddr+'/static/media/'+item[0].fields.gpic" alt />
                    <div class="item_content">
                        <h3 class="name">{{item[0].fields.gtitle}}</h3>
                        <p class="price">￥{{item[0].fields.gprice}}</p>
                    </div>
                    <div class="item_amount">
                        <div class="amount_controler">
                            <div class="controler_inner">
                                <div class="sub" @click="onSub(index)">-</div>
                                <input class="amount" type="number" v-model="cartList[index].count"/>
                                <div class="add" @click="onAdd(index)">+</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <nav-button
            @changeState="isNavOpen = !isNavOpen"
            :commands="['menu', 'cart', 'personal']"
            @subClick="onSubClick"
        />
            <CircleButton
                iconHref="#icon-qicheqianlian-1"
                buttonName="下单"
                backgroundColor="#ff0000"
                horizantalPosition="right"
                :onCircleButtonClick="onOkClick"
                v-show="!isNavOpen"
            />

        <router-link to="/home" tag="div">
            <CircleButton
                iconHref="#icon-qicheqianlian-1"
                buttonName="菜单"
                backgroundColor="#000000"
                horizantalPosition="center"
                :onCircleButtonClick="onMenuClick"
                v-show="!isNavOpen"
            />
        </router-link>
    </div>
</template>

<script>
import NavButton from "../components/NavButton.vue";
import CircleButton from "../components/CircleButton.vue";
import Config from "../models/config.js"
import Storage from "../models/storage.js";
import qs from 'qs'
import Utils from '../utils/util.js'
export default {
    name: "cart",
    data() {
        return {
            isNavOpen: false,
            apiAddr: Config.apiAddr,
            cartList: [],   //购物车菜品数据
            goodsList: [],
            uid: '2'
        };
    },
    methods: {
        onOkClick() {
            this.$router.push({path: '/order'})
        },
        onMenuClick() {
            // alert("点击菜单");
        },
        onSubClick(command){
            if(command == 'menu'){
                this.$router.push({path: '/home'})
            }else if(command == 'cart'){
                this.$router.push({path: '/cart'})
            }else if(command == 'personal'){
                this.$router.push({path: '/personal'})
            }
        },
        getCartData(){
            const user_id = Utils.storage.get('userInfo').userId
            this.$axios.get(this.apiAddr+`/cart/appcartdetails?user_id=${user_id}`)
            .then((res) => {
                console.log(res)
                // this.dataList = res.data.result
                this.cartList = res.data.cartlist
                this.goodsList = res.data.goodslist
            })
            .catch((err) => {
                console.log(err)
            })
        },
        onAdd(cartIndex){
            const user_id = Utils.storage.get('userInfo').userId
            const goods_id = this.cartList[cartIndex].goods_id
            const count = ++this.cartList[cartIndex].count
            this.$axios.get(`${this.apiAddr}/cart/appcartAlter?user_id=${user_id}&goods_id=${goods_id}&count=${count}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        onSub(cartIndex){
            if(this.cartList[cartIndex].count == 0){
                return 
            }
            const user_id = Utils.storage.get('userInfo').userId
            const goods_id = this.cartList[cartIndex].goods_id
            const count = --this.cartList[cartIndex].count
            this.$axios.get(`${this.apiAddr}/cart/appcartAlter?user_id=${user_id}&goods_id=${goods_id}&count=${count}`)
            .then((res) => {
                console.log(res)
                if(count == 0){
                    this.cartList.splice(cartIndex, 1)
                    this.goodsList.splice(cartIndex, 1)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            
        }
    },
    computed: {
        totalPrice(){   //购物车内菜品总价
            let tp = 0
            for(let i in this.cartList){
                tp += Number.parseFloat(this.goodsList[i][0].fields.gprice) * Number.parseInt(this.cartList[i].count)
            }
            return tp
        },
        totalNumber(){  //购物车内菜品总数
            let tn = 0
            for(let item of this.cartList){
                tn += Number.parseInt(item.count)
            }
            return tn
        },
        
    },
    mounted(){
        this.getCartData()
    },
    components: {
        NavButton,
        CircleButton
    }
};
</script>

<style lang="scss" scoped>
.menu_icon {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
}

.cart_header {
    width: 95%;
    margin: 1rem auto;
    background: #ffffff;
    padding-bottom: 0.3rem;
    .header_title {
        width: 95%;
        margin: 0 auto;
        text-align: center;
        padding: 1.5rem 0rem;
        border-bottom: 1px solid #eeeeee;
    }
    .cart_info {
        width: 95%;
        margin: 0 auto;
        position: relative;
        p {
            margin: 0.5rem 0;
        }
        .meal_number {
            color: #ff0000;
        }
        .mark {
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 0.5rem;
        }
        .total {
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #eeeeee;
            .price {
                color: #ff0000;
                font-size: 2.5rem;
            }
        }
        .modify_button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            height: 3.5rem;
            overflow: hidden;
            text-align: center;
            p {
                position: relative;
                top: -1rem;
                text-align: center;
            }
        }
    }
}

.cart_content {
    width: 95%;
    background: #ffffff;
    margin: 1rem auto;
    .cart_list {
        .cart_item {
            width: 100%;
            display: flex;
            border-top: 1px solid #eeeeee;
            box-sizing: border-box;
            padding: 1rem 1rem;
            position: relative;
            img {
                width: 6rem;
                height: 6rem;
            }
            .item_content {
                margin-left: 1rem;
            }
            .item_amount {
                position: absolute;
                right: 1rem;
                bottom: 0.5rem;
                // width: 18rem;
                text-align: center;
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
                        }
                        .sub,
                        .add {
                            color: red;
                            font-size: 2rem;
                        }
                        .amount{
                            text-align: center;
                            background: #fff;
                        }   
                    }
                }
            }
        }
    }
}

.cart_tip{
        width: 100%;
        background: #f7f7f7;
        margin: .5rem auto;
        h2{
            text-align: center;
            padding: 4rem 0 1.5rem 0;
        }
        p{
            text-align: center;
        }
}
</style>

