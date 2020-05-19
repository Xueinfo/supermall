<template>
    <div id="baseInfo" v-if="Object.keys(goodsInfo).length !==0">
        <div class="info-title">
            {{goodsInfo.title}}
        </div>
        <div class="info-price">
            <span class="n-price">{{goodsInfo.newPrice}}</span>
            <span class="o-price">{{goodsInfo.oldPrice}}</span>
            <span class="discount">{{goodsInfo.discount}}</span>
        </div>
        <div class="info-columns">
            <span >{{goodsInfo.columns[0]}}</span>
            <span>{{goodsInfo.columns[1]}}</span>
            <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
        </div>
        <div class="info-services">
            <span class="info-services-item" v-for="index in goodsInfo.services.length-1" :key="index">
                <img :src="goodsInfo.services[index-1].icon" alt="">
                <span>{{goodsInfo.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goodsInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
    #baseInfo{
        margin-top: 15px;
        /* margin: 0 8px; */
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color:#222;
        font-size: 18px;
    }
    .info-price{
        margin-top: 10px;
    }
    .info-price .n-price{
        font-size: 24px;
        color: var(--color-height-text);
    }
    .info-price .o-price{
        font-size: 13px;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .info-price .discount{
        font-size: 12px;
        color: #fff;
        background-color: var(--color-height-text);
        border-radius: 8px;
        padding: 2px 5px;
        margin-left: 5px;
        /* 让元素上浮一些 */
        position: relative;
        top: -8px;
    }
    .info-columns{
        font-size: 13px;
        margin-top: 15px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .info-services{
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .info-services-item img{
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
    .info-services-item span{
        color: #333;
        font-size: 13px;
    }

</style>