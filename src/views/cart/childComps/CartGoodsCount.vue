<template>
    <div class="goods-count">
        <div class="item bottCheck">
            <cart-bott-check 
            :is-check="isCheck"
            @click.native="selectAll"
             />
            
        </div>
        <div class="item totalPrice">
            合计：{{totalPrice}}
        </div>
        <div class="item computed" @click="goComputed">
            去计算({{totalLength}})
        </div>
    </div>
</template>
<script>

import CartBottCheck from "./CartBottCheck"

export default {
    name:"CartGoodsCount",
    components:{
        CartBottCheck
    },
    computed:{ 
        totalPrice(){
          return  this.$store.getters.cartList.filter(item=>{
                return item.checked
            }).reduce((previos,n)=>{
                return previos + (n.price * n.count)
            },0)
            
        },
        totalLength(){
           return  this.$store.getters.cartList.filter(item=>item.checked).length
        },
        isCheck(){
            // filter方法过滤数组是全部循环遍历一遍
            // find方法 是只要找到符合条件的就停止遍历
           if(this.$store.getters.cartList.length === 0) return false  
           return !this.$store.getters.cartList.find(item=>!item.checked)
        }
    },
    methods:{
        selectAll(){
            if(this.$store.getters.cartList.length === 0) return false
            if(this.isCheck){
                // 当前是全选 点击变成全不选
                this.$store.getters.cartList.forEach(item=>item.checked = false)
            }else{
                // 当前不是全选 点击变成全选
                this.$store.getters.cartList.forEach(item=>item.checked = true)
            } 
        },
        goComputed(){
            if(!this.isCheck){
                this.$toast.show("请选择商品",2000)
            }
        }
    }
}
</script>
<style scoped>
    .goods-count{
        width: 100%;
        height: 49px;
        line-height: 49px;

        position: absolute;
        bottom: 48px;

        display: flex;

        background-color: #eee;
        color: #888;
    }
    .goods-count .item{
        flex: 1;
    }
    .goods-count .bottCheck{
        display: flex;
        align-items: center;
    }
    .totalPrice,.computed{
        text-align: center;
        
    }
    .computed{
        background-color: red;
        color: #fff;
    }
</style>