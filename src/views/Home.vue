<template>
    <div class="index">

        <div class="index_content">
            <div class="category" v-for="(item, index) in dataList" :key="index">
                <h3 class="category_title">{{item.type}}</h3>
                <ul class="item_list">
                    <li class="item" v-for="(food, foodIndex) in item.foods_list" :key="foodIndex">
                        <router-link tag="div" :to="'/detail?id='+food.pk" class="inner">
                            <img :src="apiAddr+'/static/media/'+food.fields.gpic"/>
                            <p class="name">{{food.fields.gtitle}}</p>
                            <p class="price">￥{{food.fields.gprice}}</p>
                        </router-link>
                    </li>
                   
                </ul>
            </div>

            
        </div>

        <aside-menu>
            <li v-for="(item, index) in dataList" :key="index" @click="clickMenu(index)">{{item.type}}</li>
        </aside-menu>
        <nav-button
            @changeState="isNavOpen = !isNavOpen"
            :commands="['menu', 'cart', 'personal']"
            @subClick="onSubClick"
        />
        <router-link tag="div" to="/cart">
            <CircleButton
                iconHref="#icon-qicheqianlian-1"
                buttonName="购物车"
                backgroundColor="#ff0000"
                horizantalPosition="right"
                :onCircleButtonClick="onCartClick"
                v-show="!isNavOpen"
            />
            
        </router-link>
        <div class="food_num" v-if="cartCount">{{cartCount}}</div>
    </div>
</template>

<script>
import AsideMenu from "../components/AsideMenu.vue";
import NavButton from "../components/NavButton.vue";
import CircleButton from "../components/CircleButton.vue";
import Config from "../models/config.js"
import Storage from '../models/storage.js'
export default {
    name: "home",
    data() {
        return {
            isNavOpen: false,
            dataList: [],
            apiAddr: Config.apiAddr,
            cartCount: 0,
            uid: 'b1'
        };
    },
    components: {
        AsideMenu,
        NavButton,
        CircleButton
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
        onCartClick() {
            // alert('点击购物车')
        },
        requestData(){
            this.$axios.post(this.apiAddr+'/goods/appindex') //获取菜品数据
            .then((res) => {
                // this.dataList = res.data.result
                console.log(res)
                if(res.data.success){
                    this.dataList = res.data.cate_list

                }
            })
            .catch((err) => {
                console.log(err)
            })

            // this.$axios.get(this.api+'api/cartCount?uid='+this.uid) //获取购物车中菜品数量
            // .then((res) => {
            //     console.log(res)
            //     this.cartCount = res.data.result
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
        },
        clickMenu(index){
            let categorys = document.querySelectorAll('.category')
            document.documentElement.scrollTop = categorys[index].offsetTop
            //让文档的滚动条距离顶部的高度 = 右侧分类距离页面顶部的高度
        }
    },
    mounted(){
        this.requestData()
    }
};
</script>

<style lang="scss" scoped>
.menu_icon {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
}
.index_header {
    width: 95%;
    margin: 1rem auto;
    height: 4.4rem;
    & > ul {
        display: flex;
        background: #ffffff;
        & > li {
            flex: 1;
            text-align: center;
        }
    }
}
.index_content {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 3rem;
    .category {
        width: 100%;

        .category_title {
            text-align: center;
            margin: 3rem 0 1rem 0;
        }
        .item_list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .item {
                width: 33.3%;
                padding: 0 0.5rem;
                box-sizing: border-box;
                .inner {
                    overflow: hidden;
                    border-radius: 0.5rem;
                    background: #ffffff;
                    img {
                        width: 100%;
                        height: 8rem;
                    }
                    p {
                        padding: 0.2rem 0.5rem;
                    }
                    .name {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
.cart_button {
    position: fixed;
    width: 5rem;
    height: 5rem;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0.5rem 0 0 0;
    background: #ff0000;
    right: 2.5rem;
    bottom: 1rem;
    z-index: 1;
    p {
        margin-top: -0.5rem;
    }
}
.food_num{
    position: fixed;
    width: 2rem;
    height: 2rem;
    background: #ff0000;
    bottom: 4.5rem;
    right: 2.2rem;
    border-radius: 50%;
    text-align: center;
    line-height: 2rem;
    color: #ffffff;
}
</style>

