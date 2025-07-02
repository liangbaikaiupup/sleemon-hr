import EluForm from './elu-form/index'


// 把组件保存到一个数组中,可有多个
const components = [EluForm];
// 插件安装方法
const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  
   // 遍历组件列表并注册全局组件
   components.map((component) => {
    Vue.component(component.name, component);
  });
}

// 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  // 组件列表
  ...components,
}

export {
  EluForm
} 