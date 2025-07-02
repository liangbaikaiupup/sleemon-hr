<template>
  <div id="app">
    <dynamic-options-demo></dynamic-options-demo>
  </div>
</template>

<script>
import DynamicOptionsDemo from './components/DynamicOptionsDemo.vue'

export default {
  name: "App",
  components: {
    DynamicOptionsDemo
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
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
