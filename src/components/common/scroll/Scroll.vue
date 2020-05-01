<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BetterScroll from "better-scroll"
export default {
    name:"scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
           scroll:null 
        }
    },
    mounted(){
      setTimeout(()=>{
          this.__initScroll()
      },20)
    },
    methods:{
        __initScroll(){
            if(!this.$refs.wrapper) return
            this.scroll =  new BetterScroll(this.$refs.wrapper,{
                    click:true,
                    probeType:this.probeType,
                    pullUpLoad:this.pullUpLoad
                })
                // 监听上啦加载
                this.scroll.on("pullingUp",()=>{
                    this.$emit("pullingUp")
                })
                // 监听滑动，获取位置
                this.scroll.on("scroll",position=>{
                    // console.log(position)
                    this.$emit("scrollPos",position)
                })
        },
        finishPull(){
           this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        // 返回顶部
        backTop(x,y,time){
            this.scroll && this.scroll.scrollTo(x,y,time)
        }
    }
}
</script>
<style scoped>

</style>