<template>
    <div class="cart-goods-list">
        <scroll class="content" ref="scroll">
            
        <cart-goods-list-item  
            :cartList="cartList"
            v-for="item in cartList"  :key="item.iid" :item-info="item"
        />
        
        </scroll>
    </div>
</template>
<script>
import scroll from "components/common/scroll/Scroll"
import CartGoodsListItem from "./CartGoodsListItem" 

import { mapGetters } from "vuex"

export default {
    name:"CartGoodsList",
    components:{
        scroll,
        CartGoodsListItem
    },
    activated(){
        // console.log("activated")
        this.$refs.scroll.refresh()
    },
    computed:{
        ...mapGetters(['cartList'])
    }
   
}
</script>
<style scoped>
    .cart-goods-list{
        height: calc(100% - 44px - 49px);
    }
    .content{
        height: 100%;
        overflow: hidden;
        /* height: 100%;
        position: absolute;
        top: 43px;
        bottom:49px ;
        left: 0;
        right: 0;
        overflow: hidden; */
    }
</style>