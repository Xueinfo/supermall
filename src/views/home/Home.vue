<template>
    <div>
        <navbar class="nav">
            <div slot="center">
                购物车
            </div>
        </navbar>
    </div>
</template>
<script>
import navbar from "components/common/navbar/NavBar"
export default {
    name:"home",
    components:{
        navbar
    }
}
</script>
<style scoped>
.nav{
    background-color: var(--color-tint);
    color: #fff;
}
</style>