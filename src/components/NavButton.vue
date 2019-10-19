<template>
        <div class="nav_button" @click="onNavButtonClick">
            <div class="main_menu">
                <svg class="icon menu_icon" aria-hidden="true">
                <use v-bind:[iconfontStr]="isOpen? '#icon-cha' : '#icon-daohang' " />
                </svg>
                <p>{{isOpen ? '返回': '导航'}}</p>
            </div>
            <ul class="sub_list">
                
                <li class="sub_item button" v-for="(item, index) in subItems" 
                :key="index" :style="{top:item.top+'rem', left:item.left+'rem'}"
                 @click.stop="onSubItemsClick(commands[index])">
                    <svg class="icon menu_icon" aria-hidden="true">
                        <use v-bind:[iconfontStr]="item.iconHref"></use>
                    </svg>
                    <p>{{item.itemName}}</p>
                </li>
            </ul>
            <div class="cover" :style="{width: w, height: h}" 
                v-show="isOpen"></div>
        </div>

</template>

<script>
//接收commands数组 里面为4个command 对应4个子菜单点击时发出的命令
export default {
    name: "nav_button",
    props:{
        commands: Array
    },
    data() {
        return {
            isOpen: false,
            iconfontStr: 'xlink:href',
            subItems: [
                {iconHref: '#icon-caidan2', itemName: '菜单', top:0, left:0},
                {iconHref: '#icon-qicheqianlian-1', itemName: '购物车', top:0, left:0},
                {iconHref: '#icon-icon-', itemName: '个人中心', top:0, left:0},
            ],
            w: window.innerWidth + 'px',
            h: window.innerHeight + 'px'
        }
    },
    methods:{
        getPoint(hypotenuse, degree){//已知斜边长度和角度 获取left 和 top值
            let left = Math.ceil(Math.sin(degree * 0.017453293 ) * hypotenuse) 
            let top = Math.ceil(Math.cos(degree * 0.017453293 ) * hypotenuse)
            return {
                left,
                top
            }
        },
        onNavButtonClick(){ //点击导航按钮
            let r = 13//导航按钮子菜单弹出半径
            
            if(this.isOpen){
                for(let i in this.subItems){
                    this.subItems[i].top = this.subItems[i].left = 0
                }
            }else{
                for(let i in this.subItems){
                    this.subItems[i].top = -this.getPoint(r, 90*i/(this.subItems.length-1)).top
                    this.subItems[i].left =  this.getPoint(r, 90*i/(this.subItems.length-1)).left
                }
            }
            this.isOpen = !this.isOpen
            this.$emit('changeState', this.isOpen)
        },
        onSubItemsClick(command){
            this.$emit('subClick', command)
        }
    }
};
</script>

<style lang="scss" scoped>
.menu_icon {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
} 
.nav_button{
    position: fixed;
    width: 5rem;
    height: 5rem;
    bottom: 1rem;
    left: 2.5rem;
    color: #ffffff;
    text-align: center;
    .main_menu{
        position: absolute;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        box-sizing: border-box;
        padding: .5rem 0 0 0;
        background: #000000;
        z-index: 100; 
        p{
            margin-top: -0.5rem;
        }
    }
    .sub_list{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        height: 5rem;
        z-index: 10;
        .sub_item{
            width: 5rem;
            height: 5rem;
            position: absolute;
            border-radius: 50%;
            top: 0;
            left: 0;
            display: block;
            box-sizing: border-box;
            background: #000000;
            padding: .5rem 0 0 0;
            transition: all .3s;
            z-index: 10;
            p{
                margin-top: -0.3rem;
            }
        }
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

