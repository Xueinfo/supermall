import {debounce} from "./utils"
import BackTop from "components/content/BackTop"// 返回顶部组件
import {BACKTOP_DISTANCE} from "common/const"//常量

// 图片加载完成后butterScroll刷新 保证获取的Y轴位置准备
export const itemImgMixin={
    data(){
        return{
            itemImgsListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.refresh,100) 
        this.itemImgsListener = ()=>{
            this.refresh()
            
        }
        this.$bus.$on("goodimgLoad",this.itemImgsListener)
        console.log("混入")
    }
}

// 返回顶部

export const getTop = {
    data(){
        return{
            // 控制返回顶部 是否显示 false 不显示
            showTop:false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        // 返回顶部：
        BackTop(){
            this.$refs.scroll.backTop(0,0,500)
        },
        backTopMixin(pos){
            // 通过比较实时y轴距离与设定的距离 来控制 返回顶部是否显示
            this.showTop = -pos.y > BACKTOP_DISTANCE
        }
    }
}