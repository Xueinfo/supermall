<template>
    <div class="allCheck">
        <img src="~assets/imgs/cart/tick.svg" alt="" :class="{checked:isCheck}">
        <span>全选</span>
    </div>
</template>
<script>
export default {
    name:"CartBottCheck",
    props:{
        isCheck:false
    }
}
</script>
<style scoped>

.allCheck img{
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
    margin: 0 5px;
}
.checked{
    border: 2px solid var(--color-tint);
    background-color: var(--color-tint);
}
</style>