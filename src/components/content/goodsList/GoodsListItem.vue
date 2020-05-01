<template>
    <div class="goods-item">
        <a href="">
            <img :src="itemList.show.img" alt="" @load="goodsimgLoad">
            <div class="goods-info">
                <p>{{itemList.title}}</p>
                <span class="price">{{itemList.price}}</span>
                <span class="cfav">{{itemList.cfav}}</span>
            </div>
            
        </a>
    </div>
</template>
<script>
export default {
    name:"goodslistItem",
    props:{
        itemList:{
            type:Object ,
            default:{}
        }
    },

    created(){
        // console.log(this.itemList)
    },
    methods:{
        goodsimgLoad(){
            this.$bus.$emit("goodimgLoad")
        }
    }
}
</script>
<style scoped>
    .goods-item{
        width: 48%;
        font-size: 12px;
        position: relative;
        padding-bottom: 40px;
        background-color: #fff;
    }
    .goods-item img{
        width: 100%;
    }
    .goods-info{
        position: absolute;
        bottom: 5;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-height-text);
        margin-right: 20px;
    }
    .goods-info .cfav{
        position: relative;
    }
    .goods-info .cfav::before{
        content:"";
        position: absolute;
        left: -15px;
        right: 0;
        top: 0px;
        width:14px;
        height: 14px;
        background: url("~assets/imgs/common/collect.svg") 0 0/14px 14px;
    }
</style>