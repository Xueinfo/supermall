<template>
    
        <div class="goodslist">

            <div class="select">
                <cart-goods-list-check 
                    @click.native="check" 
                    :is-check="itemInfo.checked"
                />
            </div>
            
            <div class="goods-image">
                <img :src="itemInfo.image" alt="">
            </div>
            <div class="goods-info">
                <div class="goods-info-title">
                    {{itemInfo.title}}
                </div>
                <div class="goods-info-desc">
                    {{itemInfo.desc}}
                </div>
                <div class="goods-info-price">
                    <span class="price">¥{{itemInfo.price}}</span>
                    <span class="count">X{{itemInfo.count}}</span>
                </div>
            </div>
        </div>
    
</template>
<script>

import CartGoodsListCheck from "./CartGoodsListCheck"

export default {
    name:"CartGoodsListItem",
    components:{
        CartGoodsListCheck
    },
    
    props:{
        itemInfo:{
            type:Object ,
            default:{}
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        check(){
            this.itemInfo.checked = !this.itemInfo.checked
        }
    }
}
</script>
<style scoped>

    .goodslist{
        width: 100%;
        height: 150px;
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f2f5f8;
    }
    .select{
        width: 14%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .goods-image img{
        width: 100px;
        height: 130px;
        border-radius: 5px;
        margin-right: 15px;
        margin-left: 5px;
    }
    .goods-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 15px;
    }
    .goods-info-title{
        width: 220px;
        color: black;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .goods-info-desc{
        width: 221px;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .goods-info-price span{
        display: block;
    }
    .goods-info-price{
        display: flex;
        justify-content: space-between;
    }
    .goods-info-price .price{
        color:#F88A55;
        font-size: 15px;
    }
    .goods-info-price .count{
        color: black;
        font-size: 13px;
    }
</style>