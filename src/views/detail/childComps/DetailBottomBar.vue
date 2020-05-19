<template>
    <div class="bottomBar">
        <div class="bar-item bar-left">
            <div class="icon customer-service">
                <i></i>
                <div>
                    客服
                </div>
            </div>
            <div class="icon detail-shop">
                <i></i>
                <div>
                    店铺
                </div>                
            </div>
            <div class="icon collect" @click="collClick" >
                <i :style="collStyle"></i>
                <div>
                    收藏
                </div>                
            </div>
        </div>
        <div class="bar-item  bar-right">
            <div class="add_shopcar" @click="shopcarClick">
                加入购物车
            </div>
            <div class="shoping" >
                购买
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name:"DetailBottomBar",
    data(){
        return{
            collStyle:"",
            isColl:false
        }
    },
    methods:{
        collClick(){
            if(!this.isColl){
                this.collStyle = "background-position:0 -27px;";
                this.isColl = true;
            }else{
                this.isColl = false;
                this.collStyle = "background-position:0 -0px;";
            }
            
        },
        shopcarClick(){
            this.$emit("carBarClick")
        }
    }
}
</script>
<style scoped>
.bottomBar{
    width: 100%;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
}
.bar-item{
    flex: 1;
}
.bar-left{
    display: flex;
}
.bar-left .icon{
    flex: 1;
    
}
.bar-left .icon i{
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/imgs/detail/detail_bottom.png") 0 0/100%;
    margin: 0 auto;
}
.bar-left .customer-service i{
    background-position:0 -54px;
}
.bar-left .detail-shop i{
    background-position:0 -98px;
}
/*  */
.bar-right{
    display: flex;
    
}
.bar-right div{
    flex: 1;
    line-height: 49px;
}
.add_shopcar{
    background-color: #ffe817;
    color:black;
}
.shoping{
    background-color: #f69;
    color: #333;
}
</style>