<template>
    <div id="my-dialog">
        <div class="cover"></div>
        <div class="content">
        <h3 class="title">{{title}}</h3>
            <div class="free-zone">
                <slot>这是一个弹窗</slot>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "my-dialog",
    
    data() {
        return {
            
        }
    },
    props: {
        title: String
    },
    methods: {
    }
}
</script>


<style lang="scss" scoped>
#my-dialog{
    .cover{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #00000055;
        z-index: 1000;
    }
    .content{
        
        width: 78%;
        min-height: 5rem;
        border: 1px solid #cdcdcd;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1010;
        background: #fff;
        .title{
            background: #cdcdcd;
            color: #fff;
            padding: .6rem 0;
        }
        .free-zone{
            width: 100%;
            margin: 1.5rem auto 0 auto;
            box-sizing: border-box;
        }
        .close-btn{
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            font-size: 1.5rem;
            width: 1.5rem;
            height: 1.5rem;
            border-left: .01rem #cdcdcd solid;
            border-bottom: .01rem #cdcdcd solid;
        }


    }
    
}

</style>