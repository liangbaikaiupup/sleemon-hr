# Sleemon HR 组件库

基于 Element UI 封装的组件库，提供表单组件、表格组件和字典标签组件，支持 JSON 配置方式实现。

## 组件列表

- **EluForm** - 传统表单组件，支持多种控件类型和动态选项
- **EluGridForm** - 栅格布局表单组件，支持响应式布局
- **EluTable** - 表格组件，支持 JSON 配置和丰富功能
- **EluDictTag** - 字典标签组件，用于显示数据字典

## 安装

```bash
npm install sleemon-hr
```

## 快速开始

```javascript
import Vue from 'vue'
import { EluForm, EluGridForm, EluTable, EluDictTag } from 'sleemon-hr'

// 注册组件
Vue.component('EluForm', EluForm)
Vue.component('EluGridForm', EluGridForm)
Vue.component('EluTable', EluTable)
Vue.component('EluDictTag', EluDictTag)
```

---

# 表单组件

## EluForm - 传统表单组件

基于 Element UI 封装的表单组件，支持多种表单控件类型和动态选项配置，适用于垂直排列的表单布局。

### 基础用法

```vue
<template>
  <elu-form
    :config="formConfig"
    :model="formData"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '' },
      formConfig: [
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          rules: [{ required: true, message: '请输入姓名' }]
        },
        {
          type: 'select',
          prop: 'city',
          label: '城市',
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('提交:', formData)
    }
  }
}
</script>
```

### 行内表单

```vue
<elu-form
  :config="formConfig"
  :model="formData"
  :inline="true"
  @submit="handleSubmit"
/>
```

## EluGridForm - 栅格布局表单组件

基于 Element UI 栅格系统的表单组件，支持响应式布局，适用于复杂的多列表单布局。

### 基础栅格布局

```vue
<template>
  <elu-grid-form
    :config="formConfig"
    :model="formData"
    :row-gutter="20"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '', phone: '', age: '' },
      formConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          span: 12, // 占一半宽度
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          span: 12, // 占一半宽度
          required: true
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          span: 12
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          span: 12
        },
        {
          prop: 'address',
          label: '详细地址',
          type: 'input',
          span: 24, // 占满整行
          autosize: { minRows: 2, maxRows: 4 }
        }
      ]
    }
  }
}
</script>
```

### 响应式栅格布局

```javascript
const responsiveConfig = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 24,    // 默认占满整行
    xs: 24,      // 超小屏幕占满
    sm: 12,      // 小屏幕占一半
    md: 8,       // 中等屏幕占1/3
    lg: 6,       // 大屏幕占1/4
    xl: 4        // 超大屏幕占1/6
  }
]
```

### 栅格布局属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `rowGutter` | Number/String | `0` | 行间距 |
| `rowJustify` | String | `'start'` | 水平排列方式 |
| `rowAlign` | String | `'top'` | 垂直排列方式 |
| `defaultColSpan` | Number/String | `6` | 默认列宽度 |

### 字段级栅格属性

每个字段配置可以包含以下栅格相关属性：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `span` | Number/String | 列宽度（1-24） |
| `offset` | Number/String | 列偏移量 |
| `push` | Number/String | 列向右移动格数 |
| `pull` | Number/String | 列向左移动格数 |
| `xs` | Number/String/Object | 超小屏幕 (<768px) 的列宽度 |
| `sm` | Number/String/Object | 小屏幕 (≥768px) 的列宽度 |
| `md` | Number/String/Object | 中等屏幕 (≥992px) 的列宽度 |
| `lg` | Number/String/Object | 大屏幕 (≥1200px) 的列宽度 |
| `xl` | Number/String/Object | 超大屏幕 (≥1920px) 的列宽度 |

### 组件选择建议

**使用 EluForm 的场景：**
- 简单的表单布局
- 移动端优先的应用
- 字段数量较少的表单
- 需要垂直排列的表单

**使用 EluGridForm 的场景：**
- 复杂的表单布局
- 桌面端优先的应用
- 字段数量较多的表单
- 需要响应式布局的表单
- 需要多列布局的表单

## 支持的控件类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `input` | 输入框 | 文本、密码、文本域 |
| `select` | 选择器 | 单选、多选、可搜索 |
| `radio` | 单选框组 | 单选按钮 |
| `checkbox` | 复选框组 | 多选按钮 |
| `switch` | 开关 | 布尔值切换 |
| `date` | 日期选择器 | 日期、时间、范围 |
| `time` | 时间选择器 | 时间选择 |
| `number` | 数字输入框 | 数字输入 |
| `slider` | 滑块 | 数值范围选择 |
| `rate` | 评分 | 星级评分 |
| `color-picker` | 颜色选择器 | 颜色选择 |
| `cascader` | 级联选择器 | 多级选择 |
| `upload` | 上传组件 | 文件上传 |

## 动态选项

```javascript
{
  type: 'select',
  prop: 'city',
  label: '城市',
  // 使用函数作为数据源
  api: async () => {
    const response = await fetch('/api/cities')
    return response.json()
  },
  // 转换响应数据
  transformResponse: (data) => {
    return data.map(item => ({
      label: item.cityName,
      value: item.cityCode
    }))
  },
  // 延迟加载（仅在展开时加载）
  loadImmediate: false
}
```

---

# EluTable 组件

基于 Element UI 的表格组件，支持 JSON 配置方式实现。

## 基础用法

```vue
<template>
  <elu-table
    :data="tableData"
    :columns="columns"
    :show-toolbar="true"
    :show-selection="true"
    @refresh="loadData"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 }
      ],
      columns: [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', minWidth: 200 }
      ]
    }
  },
  methods: {
    loadData() {
      // 加载数据
    },
    handleEdit(row) {
      console.log('编辑:', row)
    },
    handleDelete(row) {
      console.log('删除:', row)
    }
  }
}
</script>
```

## 主要功能

- ✅ **JSON 配置** - 通过配置对象定义表格列
- ✅ **选择功能** - 支持单选、多选
- ✅ **排序筛选** - 支持列排序和数据筛选
- ✅ **分页功能** - 内置分页组件
- ✅ **工具栏** - 刷新、新增等操作按钮
- ✅ **操作列** - 编辑、删除等操作按钮
- ✅ **自定义列** - 支持插槽自定义列内容
- ✅ **展开行** - 支持行展开显示详细信息
- ✅ **序号列** - 自动生成序号
- ✅ **单选列** - 支持单选模式

## 列配置

```javascript
const columns = [
  {
    prop: 'name',           // 字段名
    label: '姓名',          // 列标题
    width: 120,            // 列宽度
    sortable: true,        // 可排序
    formatter: (row, col, value) => {
      return value.toUpperCase() // 格式化显示
    },
    slot: 'name-slot'      // 自定义插槽
  }
]
```

## 表格功能配置

### 工具栏配置

```javascript
{
  showToolbar: true,        // 显示工具栏
  showRefresh: true,        // 显示刷新按钮
  showAdd: true            // 显示新增按钮
}
```

### 选择功能配置

```javascript
{
  showSelection: true,      // 显示多选列
  selectionWidth: 55,       // 选择列宽度
  reserveSelection: false,  // 保留选择状态
  selectable: (row) => {    // 自定义选择逻辑
    return row.status === 'active'
  }
}
```

### 单选功能配置

```javascript
{
  showRadio: true,          // 显示单选列
  radioWidth: 55,           // 单选列宽度
  selectedRowKey: 1,        // 当前选中行
  @radio-change: (row) => { // 单选变化事件
    console.log('选中:', row)
  }
}
```

### 序号列配置

```javascript
{
  showIndex: true,          // 显示序号列
  indexLabel: '序号',       // 序号列标题
  indexWidth: 60,           // 序号列宽度
  indexAlign: 'center'      // 序号列对齐方式
}
```

### 展开行配置

```javascript
{
  showExpand: true,         // 显示展开列
  expandWidth: 50,          // 展开列宽度
  @expand-change: (row, expandedRows) => {
    console.log('展开变化:', row, expandedRows)
  }
}
```

### 操作列配置

```javascript
{
  showActions: true,        // 显示操作列
  actionsLabel: '操作',     // 操作列标题
  actionsWidth: 150,        // 操作列宽度
  showEdit: true,           // 显示编辑按钮
  showDelete: true,         // 显示删除按钮
  @edit: (row, index) => {  // 编辑事件
    console.log('编辑:', row, index)
  },
  @delete: (row, index) => { // 删除事件
    console.log('删除:', row, index)
  }
}
```

### 分页配置

```javascript
{
  showPagination: true,     // 显示分页
  currentPage: 1,           // 当前页
  pageSize: 10,             // 每页条数
  total: 100,               // 总条数
  pageSizes: [10, 20, 50, 100], // 每页条数选项
  @page-change: (page) => { // 页码变化事件
    console.log('页码变化:', page)
  },
  @size-change: (size) => { // 每页条数变化事件
    console.log('条数变化:', size)
  }
}
```

## 自定义插槽

### 自定义列内容

```vue
<elu-table :data="tableData" :columns="columns">
  <!-- 自定义状态列 -->
  <template #status="{ row }">
    <el-tag :type="getStatusType(row.status)">
      {{ getStatusText(row.status) }}
    </el-tag>
  </template>
  
  <!-- 自定义操作列 -->
  <template #actions="{ row, $index }">
    <el-button size="small" @click="handleView(row)">查看</el-button>
    <el-button size="small" type="primary" @click="handleEdit(row, $index)">编辑</el-button>
    <el-button size="small" type="danger" @click="handleDelete(row, $index)">删除</el-button>
  </template>
  
  <!-- 自定义展开内容 -->
  <template #expand="{ row }">
    <div class="expand-detail">
      <h4>详细信息</h4>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ row.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ row.age }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </template>
</elu-table>
```

### 自定义工具栏

```vue
<elu-table :data="tableData" :columns="columns" :show-toolbar="true">
  <!-- 自定义工具栏左侧 -->
  <template #toolbar-left>
    <el-button size="small" type="success" @click="handleExport">导出</el-button>
    <el-button size="small" type="warning" @click="handleBatchDelete">批量删除</el-button>
  </template>
  
  <!-- 自定义工具栏右侧 -->
  <template #toolbar-right>
    <el-button size="small" type="primary" @click="handleAdd">新增</el-button>
  </template>
</elu-table>
```

---

# EluDictTag 组件

字典标签组件，用于显示数据字典的标签形式。

## 基础用法

```vue
<template>
  <elu-dict-tag
    :options="statusOptions"
    :value="userStatus"
  />
</template>

<script>
export default {
  data() {
    return {
      userStatus: 'active',
      statusOptions: [
        { label: '在职', value: 'active', elTagType: 'success' },
        { label: '离职', value: 'inactive', elTagType: 'danger' },
        { label: '待入职', value: 'pending', elTagType: 'warning' }
      ]
    }
  }
}
</script>
```

## 支持的标签类型

- `default` - 默认标签
- `primary` - 主要标签
- `success` - 成功标签
- `warning` - 警告标签
- `danger` - 危险标签
- `info` - 信息标签

## 多选模式

```vue
<elu-dict-tag
  :options="statusOptions"
  :value="['active', 'pending']"  // 数组形式支持多选
/>
```

## 自定义样式

```javascript
const options = [
  {
    label: '在职',
    value: 'active',
    elTagType: 'success',
    elTagClass: 'custom-tag'  // 自定义 CSS 类
  }
]
```

---

## 完整示例

### 栅格表单 + 表格 + 字典标签组合

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <elu-grid-form
      :config="searchConfig"
      :model="searchForm"
      :row-gutter="16"
      @submit="handleSearch"
    />
    
    <!-- 数据表格 -->
    <elu-table
      :data="tableData"
      :columns="tableColumns"
      :show-toolbar="true"
      :show-selection="true"
      :show-pagination="true"
      :total="total"
      @refresh="loadData"
      @page-change="handlePageChange"
    >
      <!-- 自定义状态列 -->
      <template #status="{ row }">
        <elu-dict-tag
          :options="statusOptions"
          :value="row.status"
        />
      </template>
      
      <!-- 自定义操作列 -->
      <template #actions="{ row, $index }">
        <el-button size="small" type="primary" link @click="handleView(row)">查看</el-button>
        <el-button size="small" type="success" link @click="handleEdit(row, $index)">编辑</el-button>
        <el-button size="small" type="danger" link @click="handleDelete(row, $index)">删除</el-button>
      </template>
    </elu-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: { name: '', status: '' },
      searchConfig: [
        { 
          type: 'input', 
          prop: 'name', 
          label: '姓名',
          span: 8
        },
        { 
          type: 'select', 
          prop: 'status', 
          label: '状态', 
          span: 8,
          options: [
            { label: '全部', value: '' },
            { label: '在职', value: 'active' },
            { label: '离职', value: 'inactive' }
          ]
        },
        {
          type: 'date',
          prop: 'dateRange',
          label: '入职日期',
          span: 8,
          dateType: 'daterange'
        }
      ],
      tableData: [],
      tableColumns: [
        { prop: 'name', label: '姓名' },
        { prop: 'status', label: '状态', slot: 'status' }
      ],
      statusOptions: [
        { label: '在职', value: 'active', elTagType: 'success' },
        { label: '离职', value: 'inactive', elTagType: 'danger' }
      ],
      total: 0
    }
  },
  methods: {
    handleSearch() {
      this.loadData()
    },
    loadData() {
      // 加载数据逻辑
    },
    handlePageChange(page) {
      this.loadData()
    }
  }
}
</script>
```

### 传统表单 + 表格组合

```vue
<template>
  <div>
    <!-- 简单搜索表单 -->
    <elu-form
      :config="searchConfig"
      :model="searchForm"
      :inline="true"
      @submit="handleSearch"
    />
    
    <!-- 数据表格 -->
    <elu-table
      :data="tableData"
      :columns="tableColumns"
      :show-toolbar="true"
      @refresh="loadData"
    />
  </div>
</template>
```

## 栅格系统说明

Element UI 的栅格系统基于 24 列布局：

- `span` 值范围：1-24
- `span: 24` 表示占满整行
- `span: 12` 表示占一半宽度
- `span: 8` 表示占 1/3 宽度
- `span: 6` 表示占 1/4 宽度
- `span: 4` 表示占 1/6 宽度

## 响应式断点

| 断点 | 屏幕宽度 | 说明 |
|------|----------|------|
| `xs` | < 768px | 超小屏幕（手机） |
| `sm` | ≥ 768px | 小屏幕（平板） |
| `md` | ≥ 992px | 中等屏幕（小桌面） |
| `lg` | ≥ 1200px | 大屏幕（桌面） |
| `xl` | ≥ 1920px | 超大屏幕（大桌面） |

## 注意事项

1. **Element UI 依赖** - 需要先安装并引入 Element UI
2. **数据格式** - 注意各组件对数据格式的要求
3. **事件处理** - 根据业务需求处理相应的事件回调
4. **性能优化** - 大数据量时注意性能优化
5. **栅格布局** - 确保每行的 `span` 总和不超过 24
6. **响应式设计** - 为关键字段配置响应式属性
7. **表格配置** - 确保表格有正确的 `row-key` 配置

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79

## 许可证

MIT License 