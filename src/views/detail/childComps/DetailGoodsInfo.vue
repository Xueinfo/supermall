<template>
    <div v-if="Object.keys(detailInfo).length!==0" class="goods-info">
        <div class="info-desc">
            <div class="start"></div>
            <div class="desc">
                {{detailInfo.desc}}
            </div>
            <div class="end"></div>
        </div>
        <div class="info-key">
            {{detailInfo.detailImage[0].key}}
        </div>
        <div class="detailInfo-img">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="goodsinfoImg">
        </div>
    </div>
</template>
<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailInfo:{
            type:Object
        }
    },
    data(){
        return {
            countImg:0
        }
    },
    methods:{
        goodsinfoImg(){
            this.countImg++
            
            if(this.countImg === this.detailInfo.detailImage[0].list.length){
               console.log("emit")
                this.$emit("DetailLoad")
            }
        }
    }
}
</script>
<style scoped>
    .goods-info{
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-desc{
        padding: 0 15px;
    }
    .info-desc .desc{
        padding: 15px 0;
        font-size: 14px;
        
    }
    .info-desc .start,.info-desc .end{
        width: 90px;
        height: 1px;
        background-color: #333;
        position: relative;
    }
    .info-desc .start{
        float: left;
    }
    .info-desc .end{
        float:right;
    }
    .info-desc .start::before,.info-desc .end::after{
        content: "";
        width: 5px;
        height: 5px;
        background-color: #333;
        position: absolute;
        bottom: 0px;
    }
    
    .info-desc .end::after{
        right: 0;
    }
    
    .info-key{
        margin: 10px 0 10px 15px;
        color: #333;
        font-size: 15px;
    }

    .detailInfo-img img{
        width: 100%;
    }

</style>