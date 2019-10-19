
<template>
    <div class="footer">
        <nav-button :subItemsClick='subItemsClick' @changeState='navChangeState'/>
        <div class="cart_button" v-show="!isNavOpen">
            <svg class="icon menu_icon" aria-hidden="true">
                <use xlink:href="#icon-qicheqianlian-1" />
            </svg>
            <p>购物车</p>
        </div>

        <div class="menu_button" v-show="!isNavOpen">
            <svg class="icon menu_icon" aria-hidden="true">
                <use xlink:href="#icon-caidan2" />
            </svg>
            <p>菜单</p>
        </div>
    </div>
</template>

<script>
//subItemsClick为导航按钮子菜单点击事件
import NavButton from "./NavButton.vue";
export default {
    name: "v-footer",
    data() {
        return {
            isNavOpen: false
        };
    },
    methods: {
        navChangeState(isNavOpen){
            this.isNavOpen = isNavOpen
        }
    },
    components: {
        NavButton
    },
    props:{
        subItemsClick: Array
    }
};
</script>

<style lang="scss" scoped>
.menu_icon {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
}
.menu_button {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translate(-50%, 0);
    width: 5rem;
    height: 5rem;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0.5rem 0 0 0;
    background: #000000;
    p {
        margin-top: -0.5rem;
    }
}

.cart_button {
    position: fixed;
    right: 2.5rem;
    bottom: 1rem;
    width: 5rem;
    height: 5rem;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0.5rem 0 0 0;
    background: #ff0000;

    p {
        margin-top: -0.5rem;
    }
}
</style>

