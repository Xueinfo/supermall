<template>
    <div id="detail-nav">
        <nav-bar>
            <div slot="left" class="detail-left" @click="backClick">
                <img src="~assets/imgs/common/back.svg" alt="">
            </div>
            <div slot="center" class="conter-detail">
                <div class="conter-item" 
                    v-for="(item,index) in titles" 
                    :key="index"
                    :class="{active:currentIndex === index}"
                    @click="itemClick(index)"
                    >
                   {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
export default {
    name:"DetailTab",
    components:{
        NavBar
    },
    data(){
        return {
            titles:["商品","参数","评论","推荐"],
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit("navTab",index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>
<style scoped>
    .conter-detail{
        display: flex;
    }
    .conter-item{
        flex: 1;
    }
    .detail-left{
        text-align: center;
        margin-top: 7px;
    }
    .active{
        color: var(--color-height-text);
    }
</style>