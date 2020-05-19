<template>
    <div id="home">
        <!-- 顶部 -->
        <navbar class="nav">
            <div slot="center">
                美丽说
            </div>
        </navbar>
        <!--伪吸顶-->
        <tab-control 
            :titles="['流行','新品','精选']"
            @tabControl_click="controlClick" 
            v-show="showTabCon"
            class="tabControl"
             ref="tabControlTop1"
        />
        <!-- better Scroll start-->
        
        <scroll class="content" 
        :pullUpLoad="datapullUpLoad"
        @pullingUp="scrollPull"
        :probeType=3
        ref="scroll"
        @scrollPos="scrollPosition"
        >
            <!-- 滚动banner图 -->
            <home-swiper :banners="banners" @swiperImgLoad="bannerLoad"/>
            <!-- 推荐位 -->
            <recommend :recommends="recommends" />
            <!--  -->
            <feature />
            <!-- 商品小导航  -->
            <tab-control :titles="['流行','新品','精选']"
            @tabControl_click="controlClick" 
            ref="tabControlTop"
            />
            <!-- 商品列表 -->
            <goods-list :goodslist="goods[currentType]" />
        </scroll>
        <!-- better Scroll end-->
        <!-- 返回顶部 -->
        <back-top v-show="showTop" @click.native="BackTop" />

       
    </div>
</template>
<script>

// 网络请求
import {getHomeMultidata,getHomeGoods} from "network/home";
// 组件
import navbar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import recommend from "./childComps/Recommend"
import feature from "./childComps/Feature"
import TabControl from "components/content/TabControl"
import GoodsList from "components/content/goodsList/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/BackTop"
// 常量
import {POP,NEW,SELL,BACKTOP_DISTANCE} from "common/const"
import {debounce} from "common/utils"
// 混入使用
import {itemImgMixin} from "common/mixin"


export default {
    name:"home",
    components:{
        navbar,
        HomeSwiper,
        recommend,
        feature,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    mixins:[itemImgMixin],
    data(){
        return{
            // banner图列表数据
            banners:[],
            // 存储推荐位信息
            recommends:[],
            // 用来存储商品数据
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            // 当前展示的商品类别  是流行 还是 新品 还是 精选
            currentType:'pop',
            // 控制返回顶部 是否显示 false 不显示
            showTop:false,
            // 控制 伪吸顶 是否显示 false 不显示
            showTabCon:false,
            // 用来记录商品导航初始Y轴位置
            tabControlTopHeight:0,
            // 用来记录离开时的Y轴位置
            saveY:0,
            // 
            datapullUpLoad:true
        }
    },
    // 周期函数
    created(){
        // html加载完成之前
        this.getHomeMulti()
        this.getgoods(POP)
        this.getgoods(NEW)
        this.getgoods(SELL)
        // console.log("created")
    },
    activated(){
        // 页面处于活跃时调用，在created之后调用
        this.$refs.scroll.scrollTo(0,this.saveY)
         this.$refs.scroll.refresh()
    },
    mounted(){
        // 此处使用混入了  mixins
        // html加载完成后执行
        // 总事件线：
        // const refresh = debounce(this.$refs.scroll.refresh,100)
        // // 为了在离开当前页面时取消监听时间总监函数
        // this.itemImgsListener = ()=>{
        //     refresh()
            
        // }
        // // 监听事件总线函数
        // this.$bus.$on("goodimgLoad",this.itemImgsListener)
    },
    deactivated(){
        // 页面处于不活跃时 调用  离开页面时 前台是在使用keep-alive前提下会调用
        this.saveY = this.$refs.scroll.scroll.y
        // console.log(this.saveY)
        // 离开页面时取消事件总线监听函数 this.$bus.$off("监听的函数名"，"监听函数执行的函数名")
        this.$bus.$off("goodimgLoad",this.itemImgsListener)
        
    },
    destroyed(){
        // Vue实例销毁后调用，离开Home组件后调用  即去另外一个页面时，但若加了keepalive则不会调用该生命周期函数
        console.log("home destroy")
    },
    
    methods:{
        // 返回顶部：
        BackTop(){
            // console.log("0000")
            this.$refs.scroll.backTop(0,0,500)
        },
        // 防抖函数
        // debounce(func,delay){
        //     let timer = null
        //     return function(...args){
        //         if(timer) clearTimeout(timer)       
        //         timer = setTimeout(()=>{
        //             func.apply(this,args)
        //         },delay)
        //     }
        // },
        
        // 监听事件：
        // 监听banner图是否加载出来
        bannerLoad(){
            // 获取 最初tabControl 距离顶的高度
          this.tabControlTopHeight =  this.$refs.tabControlTop.$el.offsetTop
        },
        // 监听滑动：
        scrollPosition(position){
            // console.log(position)
            this.showTop = -position.y > BACKTOP_DISTANCE
            // tabControl 距离顶的实时高度 对比 最初高度 tabControlTopHeight
            this.showTabCon = -position.y > this.tabControlTopHeight
        },
        // 上啦加载更多
        scrollPull(){
            this.getgoods(this.currentType)
            console.log("上啦加载更多111")
        },
        // 监听点击的流行、新品、精选
        controlClick(index){
            
            switch(index){
                case 0:
                    this.currentType = POP
                break
                case 1:
                    this.currentType = NEW
                break
                case 2:
                    this.currentType = SELL
            }
            this.$refs.tabControlTop1.currentIndex=index
            this.$refs.tabControlTop.currentIndex = index
        },
        // 网络请求：
        // 获取banner图 推荐位信息
        getHomeMulti(){
            getHomeMultidata().then(res=>{
                console.log(res)
                this.banners=res.data['banner'].list;
                this.recommends=res.data['recommend'].list;
                // console.log(this.recommends)
                
            })
        },
        // 获取商品列表信息
        getgoods(type){
            let page = this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
                // console.log(res.data)
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page+=1;
                // 完成上啦加载更多
                this.$refs.scroll.finishPull()
            })
            
        }

    }
}
</script>
<style scoped>
#home{
    height: 100vh;
}
.nav{
    background-color: var(--color-tint);
    color: #fff;
}
.content{
    position: absolute;
    top: 43px;
    bottom:49px ;
    left: 0;
    right: 0;
    overflow: hidden;
}
.tabControl{
    position: absolute;
    top:42px;
    right: 0;
    left: 0;
    z-index: 9;
}
</style>