<template>
    <div id="order">
        <h3>下单成功</h3>
        <nav-button
            :commands="['menu', 'cart', 'personal']"
            @changeState="isNavOpen = !isNavOpen"
            @subClick="onSubClick"
        />

        <router-link to="/home" tag="div">
            <CircleButton
                iconHref="#icon-qicheqianlian-1"
                buttonName="菜单"
                backgroundColor="#000000"
                horizantalPosition="right"
                :onCircleButtonClick="onMenuClick"
                v-show="!isNavOpen"
            />
        </router-link>
    </div>
</template>

<script>
import NavButton from "../components/NavButton.vue";
import CircleButton from "../components/CircleButton.vue";
import Config from "../models/config.js";
import Storage from '../models/storage.js'
export default {
    name: "order",
    data() {
        return {
            isNavOpen: false,
            api: Config.api,
            uid: 1,
            dataList: {}
        };
    },
    methods: {
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
        }
    },
    mounted(){
    },
    components: {
        NavButton,
        CircleButton
    }
};
</script>

<style lang="scss" scoped>
#order{
    h3{
        text-align: center;
        margin: 3rem 0;
    }
}
</style>

