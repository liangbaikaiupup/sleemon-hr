import Vue from "vue";
import App from "./App.vue";
import "@/styles/comon.scss";

// 引入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入我们的组件库
import EluUI from '../packages/index.js'

Vue.use(ElementUI)
// 批量注册所有组件
Vue.use(EluUI)

// 或者单独注册组件（可选）
// import { EluForm, EluGridForm, EluTable, EluDictTag } from '../packages/index.js'
// Vue.component('EluForm', EluForm)
// Vue.component('EluGridForm', EluGridForm)
// Vue.component('EluTable', EluTable)
// Vue.component('EluDictTag', EluDictTag)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
