<template>
    <div class="tabcontrol" >
        <div class="tab-item" v-for="(item,index) in titles" :key="index" :class="{active:index === currentIndex}" @click="tabindex(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"TabControl",
    props:{
        titles:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        tabindex(index){
            this.currentIndex = index
            this.$emit('tabControl_click',index)
        }
    }
}
</script>
<style scoped>
    .tabcontrol{
        display: flex;
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-item{
        flex: 1;
    }
    .active{
       color: var(--color-height-text);
       
    }
    .active span{
        padding: 5px;
        border-bottom: 2px solid var(--color-height-text);
    }
</style>