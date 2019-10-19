<template>
    <div class="circle_button" :style="styleSheets" @click="onCircleButtonClick">
            <svg class="icon menu_icon" aria-hidden="true">
                <use v-bind:[iconfontStr]="iconHref" />
            </svg>
            <p>{{buttonName}}</p>
    </div>
</template>

<script>
export default {
    name: 'circle_button',
    props: {
        iconHref: String,
        backgroundColor: String,
        buttonName: String,
        horizantalPosition: String,
        onCircleButtonClick: Function
    },
    data(){
        return {
            iconfontStr: 'xlink:href',
            left: '50%',
            transform: 'translate(-50%, 0)',
            styleSheets: {}
        }
    },
    mounted(){
        if(this.horizantalPosition === 'left'){
            this.styleSheets = {
                left: '2.5rem',
                backgroundColor: this.backgroundColor
            }
        }else if(this.horizantalPosition === 'right'){
            this.styleSheets = {
                right: '2.5rem',
                backgroundColor: this.backgroundColor
            }
        }else{
            this.styleSheets = {
                left: '50%',
                transform: 'translate(-50%, 0)',
                backgroundColor: this.backgroundColor
            }
        }
    },
    methods: {
        defaultClick(){}
    }

}
</script>

<style lang="scss" scoped>
.menu_icon {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
}
.circle_button {
    position: fixed;
    bottom: 1rem;
    width: 5rem;
    height: 5rem;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0.5rem 0 0 0;
    p {
        margin-top: -0.5rem;
    }
}
</style>

