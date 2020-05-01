<template>
    <div class="goods" >
        <goods-list-item v-for="(item,index) in goodslist.list" :key="index" :itemList="item" />
    </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"
export default {
    name:"goodslist",
    components:{
        GoodsListItem
    },
    props:{
        goodslist:{
            type:Object,
            default:{}
        }
    },
    created(){
        // console.log(this.goodslist)
    }
}
</script>
<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>