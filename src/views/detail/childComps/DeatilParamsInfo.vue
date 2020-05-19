<template>
    <div class="paramsInfo">
        
            <table class="sizes-table" v-for="(tr,index) in params.sizes" :key="index">
                <tr v-for="(td,indez) in tr" :key="indez">
                    <td v-for="(item,indey) in td" :key="indey">
                        {{item}}
                    </td>
                </tr>
            </table>
            <table class="infos-table">
                <tr v-for="(item,index) in params.infos" :key="index">
                    <td class="infos-table-key">{{item.key}}</td>
                    <td class="infos-table-value">{{item.value}}</td>
                </tr>
            </table>
            <div class="params-image" v-if="params.image !== ''">
                <img :src="params.image" alt="">
            </div>
    </div>
</template>
<script>
export default {
    name:"DetailParamsInfo",
    props:{
        params:{
            type:Object
        }
    }
    
}
</script>
<style scoped>
    .paramsInfo{
        padding: 20px 15px;
        font-size: 14px;
        border-bottom: 5px solid #f2f5f8;
    }
    .paramsInfo table{
        width: 100%;
        border-collapse: collapse;
    }
    .paramsInfo table tr{
        height: 42px;
    }
    .paramsInfo table tr td{
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .infos-table-key{
        width: 95px;
    }
    .infos-table{
        border-top: 1px solid rgba(0,0,0,.1);
    }
    .infos-table-value{
        color: #eb4868;
    }
    .params-image img{
        width: 100%;
    }
</style>