<template>
    <div class="recommend" v-if="recommends.length">
        <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:"Recommend",
    props:{
        recommends:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style scoped>
    .recommend{
        width: 100%;
        display: flex;
        padding: 15px 0 30px;
        border-bottom: 10px solid #eeeeee;
        background-color: #fff;
    }
    .recommend-item{
        flex: 1;
        text-align: center;
    }
    .recommend-item img{
        width: 87%;
    }
</style>