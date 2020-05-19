import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
// 引入封装的toast插件
import toast from "components/common/toast"

// 事件总线
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
