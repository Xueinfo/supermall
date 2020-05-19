<!--本页返回顶部使用混入写的--->
<template>
    <div id="detail">
        <!-- 详情页 -->
        <!-- 导航 -->
        <detail-nav @navTab="navClick" ref="nav"></detail-nav>
        <scroll 
            class="detail-scroll-content" 
            ref="scroll"
            :probeType="3"
            @scrollPos="scrollPosition"
        >
            <!-- 轮播图 -->
            <detail-swiper :top-images="topImage" />
            <!-- 商品基本信息 -->
            <detail-base-info :goods-info="goods" />
            <!-- 店铺信息 -->
            <detail-shop-info :shop-info="shopInfo" /> 
            <!-- 商品详情 -->
            <detail-goods-info :detail-info="detailInfo" 
            @DetailLoad="goodsInfoImgLoad" />
            <!-- 商品参数 -->
            <detail-params-info ref="params" :params="paramsInfo" />
            <!-- 用户评论 -->
            <detail-comment-info ref="comment" :comment-info="commentInfo" />
            <!-- 推荐位 -->
            <goods-list ref="recommend" :goodslist="recommends" />
        </scroll>
        <!-- 底部菜单 -->
        <detail-bottom-bar @carBarClick="addGoodsToCar" />
        <!-- 返回顶部 -->
        <back-top v-show="showTop" @click.native="BackTop" />

        <!-- <toast /> -->

    </div>
</template>
<script>
import {getDetail,getRecommend,Goods,Shop,GoodsParams} from "network/detail"

import DetailNav from "./childComps/DetailTab"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamsInfo from "./childComps/DeatilParamsInfo"
import DetailCommentInfo from "./childComps/DeatilCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import GoodsList from "components/content/goodsList/GoodsList"


import Scroll from "components/common/scroll/Scroll"
import {debounce} from "common/utils"// 引入防抖函数
import {itemImgMixin,getTop} from "common/mixin"// 混入使用

// import Toast from "components/common/toast/Toast"

export default {
    name:"Detail",
    components:{
        DetailNav,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll,
        DetailParamsInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
        
    },
    // 混入
    mixins:[itemImgMixin,getTop],
    data(){
        return{
            iid:null,
            topImage:[],
            data:{},
            goods:{},
            shopInfo:{},
            detailInfo:{},
            paramsInfo:{},
            rateInfo:{},
            commentInfo:{},
            recommends:{},
            // 存放顶部菜单对应的y轴距离
            NavScrollY:[],
            // 存放获取Y轴距离的代码
            getScrollYfun:null,
            // 实时Y轴位置
            scrollY:0,
            currIndex:0
        }
    },
    created(){
        this.iid=this.$route.params.iid
        // console.log(this.iid)
        
        getDetail(this.iid).then(res=>{
                // console.log(res)
                this.data = res.result
                console.log(this.data)
                this.topImage = res.result.itemInfo.topImages
                // 获取商品基本信息
                this.goods = new Goods(this.data.itemInfo,this.data.columns,this.data.shopInfo.services)     
                // 获取店铺信息
                this.shopInfo =  new Shop(this.data.shopInfo)
                // console.log(this.shopInfo)
                // 获取商品详情信息
                this.detailInfo = this.data.detailInfo
                // console.log(this.detailInfo)
                // 参数
                this.paramsInfo = new GoodsParams(this.data.itemParams.info,this.data.itemParams.rule)
                // console.log(this.paramsInfo)
                // 评价数据
                this.commentInfo = this.data.rate
                
                /*****关于顶部导航点击跳转的思路1 解析******/ 
                // 假设：在此处获取顶部菜单对应的y轴距离；虽然此处的数据获取完毕，但是没有完成Dom渲染，所以会有undefined
                // 在此处获取 参数，评论，推荐组件对应的Y轴距离，使用offsetTop
                // this.$refs.refname.$el.offsetTop
                // 但是在此处获取，值不对；
                // 值不对的原因：this.$refs.refname.$el压根没有渲染
                // this.NavScrollY = []
                // this.NavScrollY.push(this.$refs.params.$el.offsetTop)
                // this.NavScrollY.push(this.$refs.comment.$el.offsetTop)
                // this.NavScrollY.push(this.$refs.recommend.$el.offsetTop)
                /************/ 

                /*****关于顶部导航点击跳转的思路2 解析******/
                // 在nextTick中获取；$nextTick是在DOM更新后执行，参数是一个函数 意思是DOM更新后（DOM渲染完毕后）执行参数函数； 
                // 在 created 和 mounted 阶段，如果需要操作渲染后的视图，也要使用 nextTick 方法
                // 应用场景：需要在视图更新之后，基于新的视图进行操作。等待渲染完毕再去执行某些函数
                // this.$nextTick(()=>{
                    // 在此处获取：值不对;
                    // 值不对的原因：图片没有计算在内；
                    // 它是 ： 根据最新的数据，对应的DOM是已经被渲染出来
                    //         但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片） ；offsetTop值不对的时候都是因为图片
                //     this.NavScrollY = []
                //     this.NavScrollY.push(this.$refs.params.$el.offsetTop)
                //     this.NavScrollY.push(this.$refs.comment.$el.offsetTop)
                //     this.NavScrollY.push(this.$refs.recommend.$el.offsetTop)
                // })
                /***********/

        })

        // 获取推荐位数据
        getRecommend().then(res=>{
           
            this.recommends = res.data
            // console.log(this.recommends)
        })

        // 获取顶部需要的Y轴距离 设置防抖
        this.getScrollYfun = debounce(()=>{
            this.NavScrollY = []
            this.NavScrollY.push(0)
            this.NavScrollY.push(this.$refs.params.$el.offsetTop)
            this.NavScrollY.push(this.$refs.comment.$el.offsetTop)
            this.NavScrollY.push(this.$refs.recommend.$el.offsetTop)
            // 为了判断条件的方案二写法
            this.NavScrollY.push(Number.MAX_VALUE)
            // console.log("Y距离防抖")
        },100)
    },
    activated(){
        // console.log(this.$route.params)
    },
    mounted(){
        // 此处使用混入了 mixins
        // let refresh = debounce(this.$refs.scroll.refresh,100) 
        // this.itemImgsListener = ()=>{
        //     refresh()
        //     console.log("refresh")
        // }
        // this.$bus.$on("goodimgLoad",this.itemImgsListener)
    },
    destoryed(){
        this.$bus.$off("goodimgLoad",this.itemImgsListener)
        
    },
    methods:{
        goodsInfoImgLoad(){
            // 滚动 监听图片加载后 刷新scroll
            // this.$refs.scroll.refresh()
            // 因在mixin.js中的data 已经定义了refresh 且又在 mounted中赋值了
            // 且在当前组件中也使用了混入：mixins:[]
            // 所以此处可直接使用 也同样起到了防抖作用
            this.refresh()

            // 待图片加载完成后获取顶部需要的Y轴距离
            // 为了不是每加载一次图片就获取一次，要使用防抖函数
            // 在created中 将获取的代码 放到防抖函数中 
            // 在此处执行函数
            // 这样就不会多次获取了  提高性能
            this.getScrollYfun()
            
            
        },
        navClick(currentindex){
            // 点击顶部导航跳转到对应的位置
            console.log(currentindex);
            // let y = this.NavScrollY[currentindex];
            this.$refs.scroll.scrollTo(0,-this.NavScrollY[currentindex],300)
        },
        
        scrollPosition(position){
            // 返回顶部
            this.backTopMixin(position)

            // 监听滚动位置 实时获取y轴距离
            // 当滚动到参数位置时，顶部导航自动切换到“参数”的实现
            this.scrollY = -position.y
            let length = this.NavScrollY.length
            for(let i in this.NavScrollY){
                // for in 循环时  的 i 是字符串类型 需要转换数字类型
                i=parseInt(i)
                
                /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && this.scrollY >= this.NavScrollY[i] && this.scrollY < this.this.NavScrollY[i+1]) || (i === (length-1) && this.scrollY >= this.NavScrollY[i]),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: this.NavScrollY, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(this.scrollY >= this.NavScrollY[i])即可?
           * 解答: 比如在某一个this.scrollY大于第0个时, 就会break, 不会判断后面的i了.
           */
                // 方案一的判断写法
                // if(
                //     this.currIndex !== i
                //     &&
                //     (
                //         (
                //             i < length-1
                //             &&
                //             this.scrollY >= this.NavScrollY[i] 
                //             && 
                //             this.scrollY < this.NavScrollY[i+1]
                //         )
                //         ||
                //         (
                //             i === length-1
                //             &&
                //             this.scrollY >= this.NavScrollY[i]
                //         )
                //     )
                // )
                // 方案二写法：
                // if 条件简化  为了方便判断 可以给 NavScrollY数组最后添加一个很大的值 大于前三个值的（Number.MAX_VALUE  js能获取到的最大的数值）
                // 用于和最后一个主题的top进行比较.
                if(
                    this.currIndex !== i 
                    && 
                    (
                        this.scrollY >= this.NavScrollY[i]
                        &&
                        this.scrollY < this.NavScrollY[i+1]
                    )
                
                )
                {
                    this.currIndex=i
                    this.$refs.nav.currentIndex = this.currIndex
                }

            }
        },
        // 加入购物车
        addGoodsToCar(){
            // 添加到购物车的商品的 信息shop_car_good
            let shop_car_good = {};
            shop_car_good.iid = this.iid
            shop_car_good.title = this.goods.title
            shop_car_good.desc = this.goods.desc
            shop_car_good.price = this.goods.lowPrice
            shop_car_good.image = this.goods.topImage
            // console.log(shop_car_good)
            // this.$store.commit("addCarGoods",shop_car_good)
            this.$store.dispatch("addGoods",shop_car_good).then(res=>{
                // console.log(res)
                // 使用封装的插件toast 进行弹窗提示
                this.$toast.show(res,2000)
                
            })
        }

    }
}
</script>
<style scoped>
    #detail{
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .detail-scroll-content{
        position: absolute;
        top: 44px;
        overflow: hidden;
        bottom: 60px;
    }
</style>