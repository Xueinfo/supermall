<template>
    <div id="Cart">
        <!-- 顶部头 -->
        <navbar class="nav">
            <div slot="center">
                <!-- 方法一 -->
                购物车({{cartLength}})
                <!-- 方法二 -->
                <!-- 购物车({{length}}) -->
            </div>
        </navbar>
        
            <!-- 商品列表 -->
            <cart-goods-list />
        

        <!-- 底部统计 -->
        <cart-goods-count />


    </div>
</template>
<script>

import navbar from "components/common/navbar/NavBar"

import CartGoodsList from "./childComps/CartGoodsList"
import CartGoodsCount from "./childComps/CartGoodsCount"

// 将store里的getters里的方法直接引入到组件
import { mapGetters } from "vuex"

export default {
    name:"cart",
    components:{
        navbar,
        scroll,
        CartGoodsList,
        CartGoodsCount
    },
    
    computed:{
        // 使用store里getters里的cartLength方法 方法一
        ...mapGetters(['cartLength'])
        // 方法二：可以给方法起别名：
        // ...mapGetters({
        //     length:'cartLength'
        // })
    }
}
</script>
<style scoped>
    #Cart{
        height: 100vh;
    }
    .nav{
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
    
</style>