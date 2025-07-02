# Sleemon HR 插件

这是一个 Vue 2.x 插件，提供 HR 相关功能组件。

## 安装

```bash
npm install sleemon-hr
# 或
yarn add sleemon-hr
```

## 使用方法

### 全局注册

```javascript
import Vue from 'vue'
import SleemonHr from 'sleemon-hr'

Vue.use(SleemonHr)
```

### 局部使用

```javascript
import { SleemonHr } from 'sleemon-hr'

export default {
  components: {
    SleemonHr
  }
}
```

### 在模板中使用

```vue
<template>
  <div>
    <SleemonHr />
  </div>
</template>
```

## 打包命令

- `npm run build:lib` - 构建开发版本
- `npm run build:lib:min` - 构建生产版本（压缩）

## 文件结构

```
packages/
├── index.js          # 插件入口文件
├── components/       # 组件目录
│   └── SleemonHr.vue # 主组件
└── README.md         # 使用说明
``` 