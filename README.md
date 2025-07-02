# Sleemon HR 组件库

基于 Element UI 封装的组件库，包含表单组件和表格组件，支持 JSON 配置方式实现，提供丰富的功能和便捷的使用方式。

## 组件列表

- **EluForm** - 基于 Element UI 封装的表单组件，支持多种表单控件类型、动态选项配置和文件上传功能
- **EluTable** - 基于 Element UI 封装的表格组件，支持 JSON 配置方式实现，提供丰富的表格功能

---

# EluForm 组件

基于 Element UI 封装的表单组件，支持多种表单控件类型、动态选项配置和文件上传功能。

## 功能特性

- 🎨 **多种控件类型** - 支持输入框、选择器、日期、评分、颜色选择器、上传等
- 🚀 **动态选项支持** - 支持函数、URL、异步函数等多种数据源
- 📝 **数据转换** - 支持自定义数据转换函数
- 🎯 **智能缓存** - 自动缓存已加载的选项数据
- 🔄 **手动刷新** - 支持手动刷新单个或所有选项
- ⚡ **懒加载** - 支持按需加载，提升性能
- 🎨 **加载状态** - 显示加载状态和错误处理
- 📁 **文件上传** - 支持多种上传方式和事件处理

## 支持的组件类型

| 类型 | 说明 | 对应 Element UI 组件 |
|------|------|---------------------|
| `input` | 输入框 | el-input |
| `select` | 选择器 | el-select |
| `radio` | 单选框组 | el-radio-group |
| `checkbox` | 复选框组 | el-checkbox-group |
| `switch` | 开关 | el-switch |
| `date` | 日期选择器 | el-date-picker |
| `time` | 时间选择器 | el-time-picker |
| `number` | 数字输入框 | el-input-number |
| `slider` | 滑块 | el-slider |
| `rate` | 评分 | el-rate |
| `color-picker` | 颜色选择器 | el-color-picker |
| `cascader` | 级联选择器 | el-cascader |
| `upload` | 上传组件 | el-upload |
| `slot` | 自定义插槽 | - |

## Props 属性

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `config` | Array | [] | 表单配置数组，必填 |
| `model` | Object | {} | 表单数据对象，必填 |
| `labelWidth` | String | 'auto' | 标签宽度 |
| `labelPosition` | String | 'right' | 标签位置，可选值：'left'、'right'、'top' |
| `size` | String | 'small' | 尺寸，可选值：'medium'、'small'、'mini' |
| `disabled` | Boolean | false | 是否禁用整个表单 |
| `inline` | Boolean | false | 是否为行内表单 |
| `showMessage` | Boolean | true | 是否显示验证信息 |
| `inlineMessage` | Boolean | false | 是否以行内形式显示验证信息 |
| `statusIcon` | Boolean | false | 是否在输入框中显示校验结果图标 |
| `validateOnRuleChange` | Boolean | true | 是否在 rules 属性改变后立即触发一次验证 |
| `hideRequiredAsterisk` | Boolean | false | 是否隐藏必填字段的标签旁边的红色星号 |

### 按钮相关属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `showDefaultButtons` | Boolean | true | 是否显示默认按钮 |
| `submitText` | String | '提交' | 提交按钮文本 |
| `resetText` | String | '重置' | 重置按钮文本 |
| `submitLoading` | Boolean | false | 提交时是否显示loading |

## Methods 方法

### 表单验证方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `validate` | callback | Promise | 验证表单，支持回调函数 |
| `validateField` | prop, callback | Promise | 验证表单的某个字段 |
| `clearValidate` | props | - | 清除验证信息，props 可以是字符串或数组 |
| `resetFields` | - | - | 重置表单字段 |
| `scrollToField` | prop | - | 滚动到指定字段 |

### 动态选项方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `refreshFieldOptions` | prop | Promise | 手动刷新单个字段的选项数据 |
| `refreshAllOptions` | - | Promise | 批量刷新所有动态选项 |
| `getFieldOptions` | prop | Array | 获取字段的选项数据 |
| `getFieldLoading` | prop | Boolean | 获取字段的加载状态 |

## Events 事件

### 表单事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `submit` | formData | 表单提交成功时触发 |
| `reset` | - | 表单重置时触发 |
| `validate-error` | - | 表单验证失败时触发 |

### 字段事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `field-change` | prop, value, formData | 字段值变化时触发 |
| `field-blur` | prop, event, formData | 字段失焦时触发 |
| `field-focus` | prop, event, formData | 字段聚焦时触发 |

### 动态选项事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `options-loaded` | prop, options | 选项加载完成时触发 |
| `options-load-error` | prop, error | 选项加载失败时触发 |

### 级联选择器事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `cascader-expand-change` | prop, expandedOptions, formData | 级联选择器展开变化时触发 |

### 上传组件事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `upload-success` | prop, response, file, fileList, formData | 上传成功时触发 |
| `upload-error` | prop, err, file, fileList, formData | 上传失败时触发 |
| `upload-progress` | prop, event, file, fileList, formData | 上传进度变化时触发 |
| `upload-exceed` | prop, files, fileList, formData | 超出限制时触发 |
| `upload-change` | prop, file, fileList, formData | 文件状态改变时触发 |

## 基础用法

### 1. 简单表单

```vue
<template>
  <elu-form
    :config="formConfig"
    :model="formData"
    label-width="120px"
    @submit="handleSubmit"
    @reset="handleReset"
  ></elu-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        city: ''
      },
      formConfig: [
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          placeholder: '请输入姓名',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'email',
          label: '邮箱',
          placeholder: '请输入邮箱',
          rules: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ]
        },
        {
          type: 'select',
          prop: 'city',
          label: '城市',
          placeholder: '请选择城市',
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('表单提交:', formData)
    },
    handleReset() {
      console.log('表单重置')
    }
  }
}
</script>
```

### 2. 表单验证

```vue
<template>
  <elu-form
    ref="eluForm"
    :config="formConfig"
    :model="formData"
    label-width="120px"
    @submit="handleSubmit"
  ></elu-form>
  
  <el-button @click="validateForm">验证表单</el-button>
  <el-button @click="clearValidation">清除验证</el-button>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      formConfig: [
        {
          type: 'input',
          prop: 'username',
          label: '用户名',
          placeholder: '请输入用户名',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'password',
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'confirmPassword',
          label: '确认密码',
          type: 'password',
          placeholder: '请再次输入密码',
          rules: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value !== this.formData.password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('表单提交:', formData)
    },
    
    // 手动验证表单
    async validateForm() {
      try {
        const valid = await this.$refs.eluForm.validate()
        if (valid) {
          this.$message.success('验证通过')
        }
      } catch (error) {
        this.$message.error('验证失败')
      }
    },
    
    // 清除验证信息
    clearValidation() {
      this.$refs.eluForm.clearValidate()
    }
  }
}
</script>
```

## 动态选项功能

### 1. 使用函数作为数据源

```javascript
{
  type: 'select',
  prop: 'city',
  label: '城市',
  placeholder: '请选择城市',
  filterable: true,
  clearable: true,
  // 使用函数作为API
  api: async (params) => {
    // 模拟API调用
    const response = await fetch('/api/cities', {
      method: 'POST',
      body: JSON.stringify(params)
    })
    return response.json()
  },
  // 转换响应数据
  transformResponse: (data) => {
    return data.map(item => ({
      label: item.cityName,
      value: item.cityCode
    }))
  }
}
```

### 2. 使用URL作为数据源

```javascript
{
  type: 'select',
  prop: 'department',
  label: '部门',
  placeholder: '请选择部门',
  filterable: true,
  clearable: true,
  // 使用URL作为API
  api: '/api/departments',
  apiParams: { status: 'active' },
  transformResponse: (response) => {
    return response.data.map(dept => ({
      label: dept.name,
      value: dept.id,
      disabled: dept.disabled
    }))
  }
}
```

### 3. 手动刷新选项

```vue
<template>
  <elu-form
    ref="eluForm"
    :config="formConfig"
    :model="formData"
    @options-loaded="handleOptionsLoaded"
    @options-load-error="handleOptionsLoadError"
  ></elu-form>
  
  <el-button @click="refreshCityOptions">刷新城市选项</el-button>
  <el-button @click="refreshAllOptions">刷新所有选项</el-button>
</template>

<script>
export default {
  methods: {
    // 刷新单个字段选项
    async refreshCityOptions() {
      try {
        await this.$refs.eluForm.refreshFieldOptions('city')
        this.$message.success('城市选项刷新成功')
      } catch (error) {
        this.$message.error('城市选项刷新失败')
      }
    },
    
    // 刷新所有动态选项
    async refreshAllOptions() {
      try {
        await this.$refs.eluForm.refreshAllOptions()
        this.$message.success('所有选项刷新成功')
      } catch (error) {
        this.$message.error('选项刷新失败')
      }
    },
    
    // 选项加载完成
    handleOptionsLoaded(prop, options) {
      console.log(`字段 ${prop} 选项加载完成:`, options)
    },
    
    // 选项加载失败
    handleOptionsLoadError(prop, error) {
      console.error(`字段 ${prop} 选项加载失败:`, error)
    }
  }
}
</script>
```

## 组件类型配置

### 输入框 (input)

```javascript
{
  type: 'input',
  prop: 'name',
  label: '姓名',
  placeholder: '请输入姓名',
  disabled: false,
  clearable: true,
  showPassword: false,
  type: 'text', // text, textarea, password
  maxlength: 50,
  showWordLimit: true,
  autosize: { minRows: 2, maxRows: 6 }, // 仅 textarea 有效
  rules: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ]
}
```

### 选择器 (select)

```javascript
{
  type: 'select',
  prop: 'city',
  label: '城市',
  placeholder: '请选择城市',
  disabled: false,
  clearable: true,
  multiple: false,
  collapseTags: false,
  filterable: true,
  allowCreate: false,
  remote: false,
  loading: false,
  noDataText: '暂无数据',
  noMatchText: '无匹配数据',
  options: [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' }
  ],
  // 动态选项配置
  api: this.getCityOptions,
  apiParams: { type: 'major' },
  transformResponse: (data) => {
    return data.map(item => ({
      label: item.cityName,
      value: item.cityCode
    }))
  }
}
```

### 单选框组 (radio)

```javascript
{
  type: 'radio',
  prop: 'gender',
  label: '性别',
  disabled: false,
  size: 'medium',
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]
}
```

### 复选框组 (checkbox)

```javascript
{
  type: 'checkbox',
  prop: 'hobbies',
  label: '兴趣爱好',
  disabled: false,
  size: 'medium',
  min: 1,
  max: 3,
  options: [
    { label: '阅读', value: 'reading' },
    { label: '音乐', value: 'music' },
    { label: '运动', value: 'sports' },
    { label: '旅行', value: 'travel' }
  ]
}
```

### 开关 (switch)

```javascript
{
  type: 'switch',
  prop: 'status',
  label: '状态',
  disabled: false,
  activeText: '开启',
  inactiveText: '关闭',
  activeValue: true,
  inactiveValue: false,
  activeColor: '#13ce66',
  inactiveColor: '#ff4949'
}
```

### 日期选择器 (date)

```javascript
{
  type: 'date',
  prop: 'birthday',
  label: '生日',
  placeholder: '请选择日期',
  disabled: false,
  clearable: true,
  dateType: 'date', // date, datetime, datetimerange, daterange
  format: 'yyyy-MM-dd',
  valueFormat: 'yyyy-MM-dd',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  rangeSeparator: '至',
  pickerOptions: {
    disabledDate(time) {
      return time.getTime() > Date.now()
    }
  }
}
```

### 时间选择器 (time)

```javascript
{
  type: 'time',
  prop: 'workTime',
  label: '工作时间',
  placeholder: '请选择时间',
  disabled: false,
  clearable: true,
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss',
  pickerOptions: {
    selectableRange: '09:00:00 - 18:00:00'
  }
}
```

### 数字输入框 (number)

```javascript
{
  type: 'number',
  prop: 'age',
  label: '年龄',
  placeholder: '请输入年龄',
  disabled: false,
  min: 0,
  max: 120,
  step: 1,
  stepStrictly: false,
  precision: 0,
  controls: true,
  controlsPosition: 'right'
}
```

### 滑块 (slider)

```javascript
{
  type: 'slider',
  prop: 'score',
  label: '评分',
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  showInput: true,
  showInputControls: true,
  inputSize: 'small',
  showStops: true,
  showTooltip: true,
  range: false,
  vertical: false,
  height: '300px'
}
```

### 评分 (rate)

```javascript
{
  type: 'rate',
  prop: 'rating',
  label: '评分',
  disabled: false,
  max: 5,
  lowThreshold: 2,
  highThreshold: 4,
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A'],
  voidColor: '#C6D1DE',
  disabledVoidColor: '#C0C4CC',
  iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  voidIconClass: 'el-icon-star-off',
  disabledVoidIconClass: 'el-icon-star-on',
  showText: true,
  showScore: true,
  textColor: '#1f2d3d',
  texts: ['极差', '失望', '一般', '满意', '惊喜']
}
```

### 颜色选择器 (color-picker)

```javascript
{
  type: 'color-picker',
  prop: 'themeColor',
  label: '主题色',
  disabled: false,
  size: 'medium',
  showAlpha: true,
  colorFormat: 'hex', // hex, rgb, hsl
  popperClass: 'custom-color-picker',
  predefine: [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
  ]
}
```

### 级联选择器 (cascader)

```javascript
{
  type: 'cascader',
  prop: 'region',
  label: '地区',
  placeholder: '请选择地区',
  disabled: false,
  clearable: true,
  showAllLevels: true,
  collapseTags: false,
  separator: ' / ',
  filterable: true,
  filterMethod: null,
  debounce: 300,
  beforeFilter: null,
  size: 'medium',
  options: [
    {
      value: 'beijing',
      label: '北京',
      children: [
        {
          value: 'haidian',
          label: '海淀区',
          children: [
            { value: 'zhongguancun', label: '中关村' },
            { value: 'wudaokou', label: '五道口' }
          ]
        }
      ]
    }
  ],
  props: {
    expandTrigger: 'hover', // hover, click
    checkStrictly: false,
    emitPath: true
  }
}
```

### 上传组件 (upload)

```javascript
{
  type: 'upload',
  prop: 'files',
  label: '文件上传',
  action: '/api/upload',
  headers: {
    'Authorization': 'Bearer token'
  },
  data: {
    type: 'avatar'
  },
  multiple: true,
  name: 'file',
  drag: false,
  accept: '.jpg,.jpeg,.png,.gif',
  listType: 'text', // text, picture, picture-card
  autoUpload: true,
  showFileList: true,
  disabled: false,
  limit: 5,
  fileList: [],
  httpRequest: null,
  beforeUpload: (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.$message.error('上传文件大小不能超过 10MB!');
      return false;
    }
    return true;
  },
  beforeRemove: (file, fileList) => {
    return this.$confirm(`确定移除 ${file.name}？`);
  },
  onPreview: (file) => {
    console.log('预览文件:', file);
  },
  onRemove: (file, fileList) => {
    console.log('移除文件:', file);
  },
  onSuccess: (response, file, fileList) => {
    this.$message.success('上传成功');
  },
  onError: (err, file, fileList) => {
    this.$message.error('上传失败');
  },
  onProgress: (event, file, fileList) => {
    console.log('上传进度:', event.percent);
  },
  onExceed: (files, fileList) => {
    this.$message.warning(`最多只能上传 ${this.limit} 个文件`);
  },
  onChange: (file, fileList) => {
    console.log('文件状态改变:', file.status);
  },
  tip: '只能上传jpg/png/gif文件，且不超过10MB',
  buttonText: '选择文件',
  dragText: '将文件拖到此处，或点击上传'
}
```

### 自定义插槽 (slot)

```javascript
{
  type: 'slot',
  prop: 'customField',
  label: '自定义字段',
  slotName: 'custom-slot'
}
```

```vue
<elu-form :config="formConfig" :model="formData">
  <template #custom-slot="{ field, value, formData }">
    <el-button @click="handleCustomAction">自定义操作</el-button>
  </template>
</elu-form>
```

## 注意事项

1. **数据格式** - API返回的数据必须能够转换为 `{label, value, disabled?}` 格式
2. **错误处理** - 建议实现 `options-load-error` 事件处理
3. **缓存机制** - 组件会自动缓存已加载的选项，避免重复请求
4. **性能优化** - 使用 `loadImmediate: false` 可以实现懒加载（默认为 true，会立即加载）
5. **网络请求** - 如果使用URL作为API，确保项目中配置了HTTP客户端（如axios）
6. **文件上传** - 上传组件需要配置正确的上传地址和权限
7. **表单验证** - 建议为重要字段配置验证规则
8. **事件处理** - 根据业务需求处理相应的事件回调

## 高级用法

### 条件加载

```javascript
{
  type: 'select',
  prop: 'district',
  label: '区县',
  placeholder: '请选择区县',
  api: this.getDistricts,
  apiParams: (formData) => ({
    cityCode: formData.city
  }),
  // 只有当城市选择后才加载区县
  loadCondition: (formData) => !!formData.city
}
```

### 依赖加载

```javascript
{
  type: 'select',
  prop: 'street',
  label: '街道',
  placeholder: '请选择街道',
  api: this.getStreets,
  apiParams: (formData) => ({
    districtCode: formData.district
  }),
  // 当区县变化时重新加载
  dependencies: ['district']
}
```

### 自定义验证

```javascript
{
  type: 'input',
  prop: 'phone',
  label: '手机号',
  placeholder: '请输入手机号',
  rules: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号格式',
      trigger: 'blur'
    }
  ]
}
```

### 动态表单

```javascript
// 根据条件动态显示/隐藏字段
computed: {
  dynamicFormConfig() {
    return this.formConfig.filter(field => {
      if (field.showCondition) {
        return field.showCondition(this.formData)
      }
      return true
    })
  }
}
```

这些高级功能可以根据实际需求进行扩展实现。

---

# EluTable 组件

基于 Element UI 的 `el-table` 封装的表格组件，支持 JSON 配置方式实现，提供丰富的功能和便捷的使用方式。

## 特性

- 🚀 **JSON 配置**：通过配置对象快速定义表格列
- 🎯 **功能完整**：支持选择、排序、筛选、分页等完整功能
- 🛠️ **高度可定制**：支持自定义工具栏、操作列、展开内容
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🎨 **样式统一**：与 Element UI 设计风格保持一致

## 基础用法

```vue
<template>
  <elu-table
    :data="tableData"
    :columns="columns"
    :show-toolbar="true"
    :show-selection="true"
    :show-actions="true"
    @refresh="handleRefresh"
    @add="handleAdd"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
      ],
      columns: [
        { prop: 'name', label: '姓名', width: 120, sortable: true },
        { prop: 'age', label: '年龄', width: 80, sortable: true },
        { prop: 'email', label: '邮箱', minWidth: 200 }
      ]
    }
  },
  methods: {
    handleRefresh() {
      // 刷新数据
    },
    handleAdd() {
      // 新增数据
    },
    handleEdit(row, index) {
      // 编辑数据
    },
    handleDelete(row, index) {
      // 删除数据
    }
  }
}
</script>
```

## Props

### 基础属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 表格数据 | Array | — | [] |
| columns | 列配置 | Array | — | [] |
| height | 表格高度 | String/Number | — | — |
| maxHeight | 表格最大高度 | String/Number | — | — |
| stripe | 是否为斑马纹表格 | Boolean | — | false |
| border | 是否带有纵向边框 | Boolean | — | true |
| size | 尺寸 | String | medium/small/mini | small |
| fit | 列的宽度是否自撑开 | Boolean | — | true |
| showHeader | 是否显示表头 | Boolean | — | true |
| highlightCurrentRow | 是否要高亮当前行 | Boolean | — | false |

### 工具栏相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showToolbar | 是否显示工具栏 | Boolean | — | false |
| showRefresh | 是否显示刷新按钮 | Boolean | — | true |
| showAdd | 是否显示新增按钮 | Boolean | — | true |

### 选择列相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showSelection | 是否显示选择列 | Boolean | — | false |
| selectionWidth | 选择列宽度 | String/Number | — | 55 |
| selectionFixed | 选择列是否固定 | String/Boolean | — | false |
| reserveSelection | 是否保留选择状态 | Boolean | — | false |
| selectable | 选择条件函数 | Function | — | — |

### 单选列相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showRadio | 是否显示单选列 | Boolean | — | false |
| radioWidth | 单选列宽度 | String/Number | — | 55 |
| radioFixed | 单选列是否固定 | String/Boolean | — | false |
| radioLabel | 单选列标题 | String | — | '选择' |
| radioAlign | 单选列对齐方式 | String | left/center/right | center |
| selectedRow | 当前选中的行数据 | Object | — | null |
| selectedRowKey | 当前选中的行标识 | String/Number | — | null |

### 序号列相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showIndex | 是否显示序号列 | Boolean | — | false |
| indexLabel | 序号列标题 | String | — | '序号' |
| indexWidth | 序号列宽度 | String/Number | — | 60 |
| indexFixed | 序号列是否固定 | String/Boolean | — | false |
| indexAlign | 序号列对齐方式 | String | left/center/right | center |

### 展开列相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showExpand | 是否显示展开列 | Boolean | — | false |
| expandWidth | 展开列宽度 | String/Number | — | 50 |
| expandFixed | 展开列是否固定 | String/Boolean | — | false |

### 操作列相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showActions | 是否显示操作列 | Boolean | — | false |
| actionsLabel | 操作列标题 | String | — | '操作' |
| actionsWidth | 操作列宽度 | String/Number | — | 150 |
| actionsFixed | 操作列是否固定 | String/Boolean | — | 'right' |
| actionsAlign | 操作列对齐方式 | String | left/center/right | center |
| showEdit | 是否显示编辑按钮 | Boolean | — | true |
| showDelete | 是否显示删除按钮 | Boolean | — | true |

### 分页相关

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| showPagination | 是否显示分页器 | Boolean | — | false |
| currentPage | 当前页码 | Number | — | 1 |
| pageSize | 每页显示条数 | Number | — | 10 |
| pageSizes | 每页显示条数选项 | Array | — | [10, 20, 50, 100] |
| total | 总条数 | Number | — | 0 |
| paginationLayout | 分页器布局 | String | — | 'total, sizes, prev, pager, next, jumper' |
| paginationSmall | 是否使用小型分页器 | Boolean | — | false |
| paginationBackground | 是否为分页按钮添加背景色 | Boolean | — | true |
| pagerCount | 页码按钮的数量 | Number | — | 7 |
| hideOnSinglePage | 只有一页时是否隐藏 | Boolean | — | false |

## 列配置 (columns)

每列的配置对象支持以下属性：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| prop | 对应列内容的字段名 | String | — | — |
| label | 显示的标题 | String | — | — |
| width | 对应列的宽度 | String/Number | — | — |
| minWidth | 对应列的最小宽度 | String/Number | — | — |
| fixed | 列是否固定在左侧或者右侧 | String/Boolean | true/left/right | — |
| sortable | 对应列是否可以排序 | Boolean | — | false |
| sortMethod | 对数据进行排序的时候使用的方法 | Function | — | — |
| sortBy | 指定数据按照哪个属性进行排序 | String/Array/Function | — | — |
| sortOrders | 数据在排序时所使用排序策略的轮转顺序 | Array | — | ['ascending', 'descending', null] |
| resizable | 对应列是否可以通过拖动来改变宽度 | Boolean | — | true |
| formatter | 用来格式化内容 | Function | — | — |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip | Boolean | — | false |
| align | 对齐方式 | String | left/center/right | left |
| headerAlign | 表头对齐方式 | String | left/center/right | — |
| className | 列的 className | String | — | — |
| labelClassName | 当前列标题的自定义类名 | String | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function | Function | — | — |
| reserveSelection | 仅对 type=selection 的列有效，类型为 Boolean | Boolean | — | false |
| filters | 数据过滤的选项 | Array | — | — |
| filterPlacement | 过滤弹出框的定位 | String | — | — |
| filterMultiple | 数据过滤的选项是否多选 | Boolean | — | true |
| filterMethod | 数据过滤使用的方法 | Function | — | — |
| filteredValue | 选中的数据过滤项 | Array | — | — |
| slot | 自定义内容插槽名 | String | — | — |
| headerSlot | 自定义表头插槽名 | String | — | — |

## Events

### 表格事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| radio-change | 当单选选择发生变化时会触发该事件 | row |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| header-contextmenu | 当某一列的表头被鼠标右键点击时会触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 | row, expandedRows |

### 工具栏事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| refresh | 点击刷新按钮时触发 | — |
| add | 点击新增按钮时触发 | — |

### 操作列事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| edit | 点击编辑按钮时触发 | row, index |
| delete | 点击删除按钮时触发 | row, index |

### 分页事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| size-change | 每页条数改变时触发 | size |
| page-change | 当前页改变时触发 | page |

## Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| toolbar-left | 工具栏左侧内容 | — |
| toolbar-right | 工具栏右侧内容 | — |
| expand | 展开行内容 | { row, $index, column } |
| actions | 操作列内容 | { row, $index, column } |
| [column.slot] | 自定义列内容 | { row, $index, column } |
| [column.headerSlot] | 自定义列表头 | { column, $index } |

## Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getTable | 获取表格实例 | — |
| setCurrentRow | 设置当前行 | row |
| toggleRowSelection | 切换行选择状态 | row, selected |
| toggleAllSelection | 切换全选状态 | — |
| clearSelection | 清空选择 | — |
| clearSort | 清空排序 | — |
| clearFilter | 清空筛选 | columnKeys |
| doLayout | 手动排序 | — |
| sort | 排序 | prop, order |
| getRowKey | 获取行的唯一标识 | row |
| setSelectedRow | 设置选中的行 | row |
| getSelectedRow | 获取选中的行 | — |
| clearRadioSelection | 清空单选选择 | — |

## 高级用法

### 单选表格

```vue
<template>
  <elu-table
    :data="tableData"
    :columns="columns"
    :show-radio="true"
    :selected-row-key="selectedRowKey"
    @radio-change="handleRadioChange"
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
      selectedRowKey: null,
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'age', label: '年龄' }
      ]
    }
  },
  methods: {
    handleRadioChange(row) {
      console.log('选中的行：', row)
      this.selectedRowKey = row ? row.id : null
    }
  }
}
</script>
```

### 自定义列内容

```vue
<template>
  <elu-table :data="tableData" :columns="columns">
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <el-tag :type="getStatusType(row.status)">
        {{ getStatusText(row.status) }}
      </el-tag>
    </template>
    
    <!-- 自定义操作列 -->
    <template #actions="{ row, $index }">
      <el-button size="small" type="primary" @click="handleView(row)">
        查看
      </el-button>
      <el-button size="small" type="success" @click="handleEdit(row, $index)">
        编辑
      </el-button>
    </template>
  </elu-table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'status', label: '状态', slot: 'status' },
        { prop: 'actions', label: '操作', slot: 'actions' }
      ]
    }
  }
}
</script>
```

### 展开行

```vue
<template>
  <elu-table :data="tableData" :columns="columns" :show-expand="true">
    <template #expand="{ row }">
      <div class="expand-detail">
        <h4>详细信息</h4>
        <p>姓名：{{ row.name }}</p>
        <p>年龄：{{ row.age }}</p>
        <p>邮箱：{{ row.email }}</p>
      </div>
    </template>
  </elu-table>
</template>
```

### 排序和筛选

```vue
<template>
  <elu-table :data="tableData" :columns="columns" @sort-change="handleSortChange" @filter-change="handleFilterChange" />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          prop: 'name',
          label: '姓名',
          sortable: true,
          filters: [
            { text: '张三', value: '张三' },
            { text: '李四', value: '李四' }
          ],
          filterMethod: (value, row) => row.name === value
        },
        {
          prop: 'age',
          label: '年龄',
          sortable: true,
          formatter: (row, column, cellValue) => `${cellValue}岁`
        }
      ]
    }
  },
  methods: {
    handleSortChange({ prop, order }) {
      console.log('排序变化：', prop, order)
    },
    handleFilterChange() {
      console.log('筛选变化')
    }
  }
}
</script>
```

## 注意事项

1. 列配置中的 `prop` 属性必须唯一
2. 使用自定义插槽时，需要在列配置中指定 `slot` 属性
3. 分页功能需要手动处理数据加载逻辑
4. 表格高度建议设置，避免数据过多时页面过长
5. 选择功能需要配合 `row-key` 属性使用，确保数据唯一性 