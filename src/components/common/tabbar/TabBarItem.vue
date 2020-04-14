<template>
    <div class="tabbaritem" @click="itemClick">
        <div>
            <slot v-if="!isActive" name="item-ico"></slot>
            <slot v-else name="item-ico-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot  name="item-text"></slot>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"tabbaritem",
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'var(--color-tint)'
        }
    },
    data(){
        return{
            // isActive:false
        }
    },
    computed:{
        isActive(){
          return this.$route.path.indexOf(this.path)!==-1

        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style scoped>
.tabbaritem{
  flex:1;
  text-align: center;
}
.tabbaritem img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 4px;
}
/* .active{
    color:var(--color-tint)
} */
</style>