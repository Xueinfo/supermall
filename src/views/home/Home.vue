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
import {getHomeMultidata} from "network/home"

export default {
    name:"home",
    components:{
        navbar
    },
    data(){
        return{
            banners:[],
            recommends:[]
        }
    },
    created(){
        getHomeMultidata().then(res=>{
            console.log(res)
            this.banners=res.data.banners;
            this.recommends=res.data.recommends;
        })
    }
}
</script>
<style scoped>
.nav{
    background-color: var(--color-tint);
    color: #fff;
}
</style>