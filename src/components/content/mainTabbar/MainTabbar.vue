<template>
    <tabbar>
      <tabbaritem path="/home">
        <img slot="item-ico" src="~assets/imgs/tabbar/home.svg" alt="">
        <img slot="item-ico-active" src="~assets/imgs/tabbar/home1.svg" alt="">
        <div slot="item-text" >首页</div>
      </tabbaritem>
      <tabbaritem  path="/category">
        <img slot="item-ico" src="~assets/imgs/tabbar/classify.svg" alt="">
        <img slot="item-ico-active" src="~assets/imgs/tabbar/classify1.svg" alt="">
        <div slot="item-text" >分类</div>
      </tabbaritem>
      <tabbaritem  path="/cart">
        <img slot="item-ico" src="~assets/imgs/tabbar/shoppingCar.svg" alt="">
        <img slot="item-ico-active" src="~assets/imgs/tabbar/shoppingCar1.svg" alt="">
        <div slot="item-text" >购物车</div>
      </tabbaritem>
      <tabbaritem  path="/profile">
        <img slot="item-ico" src="~assets/imgs/tabbar/profile.svg" alt="">
        <img slot="item-ico-active" src="~assets/imgs/tabbar/profile1.svg" alt="">
        <div slot="item-text" >我的</div>
      </tabbaritem>
    </tabbar>
</template>
<script>
import tabbar from "components/common/tabbar/TabBar"
import tabbaritem from "components/common/tabbar/TabBarItem"

export default {
    name:"maintabbar",
    components:{
        tabbar,
        tabbaritem
    }
}
</script>