// 将Toast封装成插件

import Toast from "./Toast"

const obj={}
obj.install=function(Vue){
    // 将组件封装成插件顺序
    // 1.创建组件构成器
  const toastContrustor = Vue.extend(Toast)
    // 2.用new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast =  new toastContrustor()  
    // 3.将组件对象，手动挂载到某一个元素上 $mount用来挂载
    toast.$mount(document.createElement("div")) //挂载到一个现创建的div上
    // 4.将这个div 添加到body里  toast.$el 指的就是 div
    document.body.appendChild(toast.$el)

    // 在vue原型上 添加上$toast  Vue.prototype是原型
    Vue.prototype.$toast = toast
}
export default obj