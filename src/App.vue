<template>
  <div id="app">
    <div class="app-header">
      <h1>Sleemon HR - 组件库演示</h1>
      <div class="nav-tabs">
        <el-button 
          :type="activeTab === 'methods' ? 'primary' : 'default'"
          @click="activeTab = 'methods'"
        >
          表单方法演示
        </el-button>
        <el-button 
          :type="activeTab === 'components' ? 'primary' : 'default'"
          @click="activeTab = 'components'"
        >
          表单组件类型
        </el-button>
        <el-button 
          :type="activeTab === 'table' ? 'primary' : 'default'"
          @click="activeTab = 'table'"
        >
          表格组件演示
        </el-button>
        <el-button 
          :type="activeTab === 'dictTag' ? 'primary' : 'default'"
          @click="activeTab = 'dictTag'"
        >
          字典标签组件演示
        </el-button>
      </div>
    </div>
    
    <div class="app-content">
      <dynamic-options-demo v-if="activeTab === 'methods'"></dynamic-options-demo>
      <form-components-demo v-if="activeTab === 'components'"></form-components-demo>
      <table-demo v-if="activeTab === 'table'"></table-demo>
      <dict-tag-demo v-if="activeTab === 'dictTag'"></dict-tag-demo>
    </div>
  </div>
</template>

<script>
import DynamicOptionsDemo from './components/DynamicOptionsDemo.vue'
import FormComponentsDemo from './components/FormComponentsDemo.vue'
import TableDemo from './components/TableDemo.vue'
import DictTagDemo from './components/DictTagDemo.vue'

export default {
  name: "App",
  components: {
    DynamicOptionsDemo,
    FormComponentsDemo,
    TableDemo,
    DictTagDemo
  },
  data() {
    return {
      activeTab: 'components'
    }
  }
};
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: 300;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-tabs .el-button {
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 500;
}

.app-content {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 24px;
  }
  
  .nav-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-tabs .el-button {
    width: 200px;
  }
  
  .app-content {
    padding: 10px;
  }
}
</style>
