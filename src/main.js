import Vue from "vue";
import App from "./App.vue";
import "@/styles/comon.scss";

// 引入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入我们的插件
import EluForm from '../packages/index.js'

Vue.use(ElementUI)
Vue.use(EluForm)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
