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