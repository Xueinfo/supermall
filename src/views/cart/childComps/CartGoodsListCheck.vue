<template>
    <div class="checkbox">
        <img src="~assets/imgs/cart/tick.svg" alt="" :class="{check:isCheck}">
    </div>
</template>
<script>
export default {
    name:"CartGoodsListCheck",
    props:{
        isCheck:{
            type:Boolean
        }
    }
}
</script>
<style scoped>
.checkbox{
    width: 18px;
    height: 18px;
    margin-left: 5px;
    margin-right: 1px;
}
.checkbox img{
    border-radius: 50%;
    border:2px solid #aaa;
    
}
.checkbox .check{
    
    border:2px solid var(--color-tint);
    background-color: var(--color-tint);
}
</style>