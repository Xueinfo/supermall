const mutations = {
    // mutations 唯一的目的就是修改state中状态
    // 所以 mutation中的方法 可能完成的事件比较单一一点 比如一个方法值更改一个值
    // 所以建议将 添加到购物车的商品 逻辑判断写到异步actions中操作 更改值时调用mutation中对应的方法  
    addCarGoods(state,info){
        // 判断添加进来的商品 在购物车中是否存在 
        // 方案一：使用传统的for循环 判断iid 是否存在
        // let oldGood = null
        // for(let item of state.carList){
        //      if(item.iid === info.iid){
        //         oldGood = item
        //      }
        // }
        // if(oldGood){
        //     oldGood.count += 1
        // }else{
        //     info.count = 1
        //     state.carList.push(info)
        // }

        //方案二：使用vue的 find函数  判断添加商品的iid 是否存在 
        const oldGood = state.carList.find(item => item.iid === info.iid)
        if(oldGood){
            oldGood.count += 1
        }else{
            info.count = 1
            info.checked = true
            state.carList.push(info)
        }
        console.log(state.carList)
    },
    addOldCount(state,payload){
        // 添加的商品是在购物车中存在的时候，修改该商品的数量+1
        payload.count += 1
    },
    addGoodsPush(state,payload){
        // 添加的商品在购物车中不存在时，添加到购物车
        state.carList.push(payload)
        console.log(state.carList)
    }    
}

export default mutations