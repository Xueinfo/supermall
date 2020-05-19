<template>
    <div class="goods-item" @click="go_detail">
        <!-- <a href=""> -->
            <img :src="showimg" alt="" @load="goodsimgLoad">
            <div class="goods-info">
                <p>{{itemList.title}}</p>
                <span class="price">{{itemList.price}}</span>
                <span class="cfav">{{itemList.cfav}}</span>
            </div>
            
        <!-- </a> -->
    </div>
</template>
<script>
export default {
    name:"goodslistItem",
    props:{
        itemList:{
            type:Object ,
            default:{}
        }
    },

    created(){
        // console.log(this.itemList)
    },
    methods:{
        // 监听图片加载 发送事件总线
        goodsimgLoad(){
            // 因当前页面 首页和详情页都有使用
            // 可以通过判断路由来设置监听函数  this.$router.path.indexOf("/home")
            // 但也可以不更改此页面而且首页和详情页 取消事件总线监听的函数
            this.$bus.$emit("goodimgLoad")
        },
        go_detail(){
            console.log("go_detail")
            this.$router.push("/detail/" + this.itemList.iid)
        }
    },
    computed:{
        showimg(){
            return this.itemList.image || this.itemList.show.img 
        }
    }
}
</script>
<style scoped>
    .goods-item{
        width: 48%;
        font-size: 12px;
        position: relative;
        padding-bottom: 40px;
        background-color: #fff;
    }
    .goods-item img{
        width: 100%;
    }
    .goods-info{
        position: absolute;
        bottom: 5;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-height-text);
        margin-right: 20px;
    }
    .goods-info .cfav{
        position: relative;
    }
    .goods-info .cfav::before{
        content:"";
        position: absolute;
        left: -15px;
        right: 0;
        top: 0px;
        width:14px;
        height: 14px;
        background: url("~assets/imgs/common/collect.svg") 0 0/14px 14px;
    }
</style>