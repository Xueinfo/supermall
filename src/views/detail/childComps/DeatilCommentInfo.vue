<template>
    <div class="comment" v-if="commentInfo.cRate > 0">
        <div class="comment-top">
            <div>用户评价</div>
            <div>更多</div>
        </div>
        <div class="comment-content">
            <div v-for="(item,index) in commentInfo.list" :key="index">
                <div class="comment-user">
                    <img :src="item.user.avatar" alt="">
                    <span>{{item.user.uname}}</span>
                </div>
                <div class="con">
                    <p>{{item.content}}</p>
                </div>
                <div class="comment-span">
                    <span class="time">{{item.created | showTime}}</span>
                    <span>{{item.style}}</span>
                </div>
                <!-- hasOwnProperty()用来判断数组中是否有此键 -->
                <div v-if="item.hasOwnProperty('images')" class="comment-img">
                    <img v-for="(img,indez) in item.images" :key="indez" :src="img" alt="">
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {formatDate} from "common/utils.js"
export default {
    name:"DeatilCommentInfo",
    props:{
        commentInfo:{
            type:Object
        }
    },
    filters:{
        showTime(value){
            let date = new Date(value*1000);
            return formatDate(date,"yyyy-MM-dd hh:mm:ss")
        }
    }
}
</script>
<style scoped>
.comment{
    width: 100%;
    padding: 0 15px;
    padding-bottom: 20px;
    border-bottom: 5px solid #f2f5f8;
    margin-bottom: 20px;
}
.comment-top{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 2px solid #f2f5f8;
}
.comment-content{
    margin-top: 10px;
}
.comment-user{
    display: flex;
    align-items:center;
    font-size: 15px;
}
.comment-user img{
    width: 15%;
    margin-right: 5px;
    border-radius: 50%;
}
.comment-content .con p{
    font-size: 13px;
    margin: 10px 0px;
}

.comment-span{
    font-size: 12px;
    color: #bbb;
    margin-bottom: 10px;
}
.comment-span .time{
    margin-right: 5px;
}
.comment-img img{
    width: 20%;
}
</style>