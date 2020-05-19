<template>
    <div class="shopInfo">
        <div class="shop-top">
            <img :src="shopInfo.logo">
            <span>{{shopInfo.name}}</span>
        </div>
        <div class="shop-midden">
            <div class="shop-midden-item shop-midden-left">
                <div class="info-sells">
                    <div class="sells-num">
                    {{shopInfo.sells}}
                    </div>
                    <div class="sells-text">
                        总销量
                    </div>
                </div>
                <div class="info-goods">
                    <div class="goods-num">
                    {{shopInfo.goodsCount}}
                    </div>
                    <div class="goods-text">
                        全部宝贝
                    </div>
                </div>
            </div>
            <div class="shop-midden-item shop-midden-right">
                <table>
                    <tr v-for="(item,index) in shopInfo.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">
                            {{item.score}}
                        </td>
                        <td class="better" :class="{'better-more':item.isBetter}">
                            <span>
                                {{item.isBetter?'高':'低'}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"DetailShopInfo",
    props:{
        shopInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
    .shop-top{
        line-height: 45px;
        display: flex;
        align-items: center;
        margin: 25px 0;
        background-color: #fff;
    }
    .shop-top img{
        width:45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,.1);
        margin-right: 10px;
        margin-left:8px;
    }
    .shop-midden{
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
    .shop-midden-item{
        flex: 1;
    }
    .shop-midden-left{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #333;
        text-align: center;
        border-right: 1px solid rgba(0,0,0,.1);
    }
    .sells-text,.goods-text{
        margin-top: 10px;
        font-size: 12px;
    }
    .sells-num,.goods-num{
        font-size: 18px;
    }
    .shop-midden-right{
        font-size: 13px;
        color: #333;
    }
    .shop-midden-right table{
        width: 120px;
        margin-left: 15px;
    }
    .shop-midden-right table td{
        padding: 5px 0;
    }
    .shop-midden-right .score {
    color: #5ea732;
  }

  .shop-midden-right .score-better {
    color: #f13e3a;
  }
  .shop-midden-right .better span{
      background-color: #5ea732;
      color: #fff;
  }
  .shop-midden-right .better-more span{
      background-color: #f13e3a;
  }
  .shop-bottom{
      text-align: center;
      margin-top: 10px;
  }
  .enter-shop{
      display: inline-block;
      width: 150px;
      height: 30px;
      line-height: 30px;
      background-color: #f2f5f8;
      font-size: 14px;
      text-align: center;
      border-radius: 10px;
  }
</style>