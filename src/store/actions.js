export default {
    // context 还可以写成：{state,commit,getter}
    addGoods(context,payload){
      
     return  new Promise((resolve,reject)=>{

          const oldGood = context.state.carList.find(item => item.iid == payload.iid)
          if(oldGood){
               context.commit("addOldCount",oldGood)
               resolve("商品数+1")
          }else{
               
               payload.checked = true  //购物车列表中选中状态使用
               payload.count = 1
               context.commit("addGoodsPush",payload)
               resolve("新增商品")

          }
       })

    }
      
}