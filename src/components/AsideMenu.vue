<template>
    <aside class="aside_menu" :style="{transform:isOpen?'translateX(0%)':'translateX(-100%)'}">
        <ul @click="onAsideClick">
            <slot></slot>
        </ul>
        <div class="menu_button" @click="onAsideClick">
            <svg class="icon menu_icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1" />
            </svg>
            <p>菜单</p>
        </div>

        <div class="cover" :style="{width: w, height: h}" v-show="isOpen" @click="onAsideClick"></div>
    </aside>

</template>

<script>
export default {
    name: 'aside_menu',
    data(){
        return {
            isOpen: false,
            w: 2*window.innerWidth + 'px',  //乘一个2就不会出现覆盖层的动画了
            h: window.innerHeight + 'px'
        }
    },
    methods: {
        onAsideClick(){
            this.isOpen = !this.isOpen
        }
    }
};
</script>

<style lang="scss" scoped>
.menu_icon{
    width: 2rem;
    height: 2rem;
    color: #ffffff;
}
.aside_menu{
    width: 25%;
    position: fixed;
    background: #eeeeee;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 10;
    transition: all .3s;
    transform: translateX(-100%);
    ul{
        width: 100%;
        position: absolute;
        height: 100%;
        z-index: 100;
        padding-top: 1rem;
        background: #eeeeee;
        li{
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            overflow: hidden;
            margin: 1rem 0;
        }
        
    }
    .menu_button{
        position: absolute;
        z-index: 10;
        width: 5rem;
        height: 4rem;
        line-height: 1rem;
        right: -3.3rem;
        top: 50%;
        transform: translate(0%, -50%);
        background: rgba(132, 128, 128, 0.9);
        text-align: center;
        border-radius: 50%;
        color: #ffffff;
        box-sizing: border-box;
        padding-left: 1rem;
        padding-top: .5rem;
    }
    .cover{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(132, 128, 128, 0.4);
    }
}


</style>
