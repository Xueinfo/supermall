import {request} from "./request"
export function getDetail(iid){
    return request({
        url:"/detail",
        params:{
           iid 
        }
    })
}
// 获取商品详情页推荐数据
export function getRecommend(){
    return request({
        url:"/recommend"
    })
}
export class Goods{
    // 整理商品基本信息到一处
    constructor(itemInfo,columns,services){
        // 商品标题
        this.title = itemInfo.title
        // 商品描述
        this.desc = itemInfo.desc
        // 商品价格
        this.newPrice = itemInfo.price
        // 商品旧价格
        this.oldPrice = itemInfo.oldPrice
        // 商品折扣  discount：折扣
        this.discount = itemInfo.discountDesc
        // [ 0: "销量 52"1: "收藏20人" 2: "默认快递" ]  columns：柱
        this.columns = columns
        // 存储 “"7天无理由退货" "72小时发货" "退货补运费"以及对应的ico图片
        this.services = services
        // 价格 low降低，now 现在
        this.realPrice = itemInfo.lowNowPrice
        // 最低价格：
        this.lowPrice = itemInfo.lowPrice
        // 商品轮播图第一个图片
        this.topImage=itemInfo.topImages[0]
    }
}
// 商家信息
export class Shop{
    constructor(shopInfo){
        // 店铺logo
        this.logo = shopInfo.shopLogo;
        // 店铺名称
        this.name = shopInfo.name;
        // 
        this.fans = shopInfo.cFans;
        // 总销量
        this.sells = shopInfo.cSells;
        //评分： 描述相符，价格合理，质量满意；isBetter :控制显示的颜色
        this.score = shopInfo.score;
        // 全部宝贝
        this.goodsCount = shopInfo.cGoods;
    }
}
// 参数
export class GoodsParams{
    constructor(info,rule){
        this.image = info.images?info.images[0]:"";
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}