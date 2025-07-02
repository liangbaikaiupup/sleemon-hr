# EluForm 动态选项功能

EluForm 组件现在支持从接口动态获取选项数据，适用于需要从服务器加载选项的场景。

## 功能特性

- 🚀 **多种API支持** - 支持函数、URL、异步函数等多种数据源
- 📝 **数据转换** - 支持自定义数据转换函数
- 🎯 **智能缓存** - 自动缓存已加载的选项数据
- 🔄 **手动刷新** - 支持手动刷新单个或所有选项
- ⚡ **懒加载** - 支持按需加载，提升性能
- 🎨 **加载状态** - 显示加载状态和错误处理

## 基本用法

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

### 3. 立即加载选项

```javascript
{
  type: 'select',
  prop: 'category',
  label: '分类',
  placeholder: '请选择分类',
  api: this.getCategories,
            loadImmediate: true // 立即加载（默认值，可省略）
}
```

## 配置选项

### API 配置

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| api | Function/String | 数据源，可以是函数或URL | - |
| apiParams | Object | API调用参数 | {} |
| transformResponse | Function | 数据转换函数 | - |
| loadImmediate | Boolean | 是否立即加载 | true |

### 数据转换函数

`transformResponse` 函数用于将API返回的数据转换为组件需要的格式：

```javascript
transformResponse: (response) => {
  // response 是API返回的原始数据
  return response.data.map(item => ({
    label: item.name,    // 显示文本
    value: item.id,      // 选项值
    disabled: item.disabled // 是否禁用（可选）
  }))
}
```

## 事件处理

### 选项加载事件

```vue
<elu-form
  :config="formConfig"
  :model="formData"
  @options-loaded="handleOptionsLoaded"
  @options-load-error="handleOptionsLoadError"
></elu-form>
```

```javascript
methods: {
  // 选项加载完成
  handleOptionsLoaded(prop, options) {
    console.log(`字段 ${prop} 选项加载完成:`, options)
  },
  
  // 选项加载失败
  handleOptionsLoadError(prop, error) {
    console.error(`字段 ${prop} 选项加载失败:`, error)
  }
}
```

## 手动刷新选项

### 刷新单个字段选项

```javascript
// 通过 ref 调用
await this.$refs.eluForm.refreshFieldOptions('city')
```

### 刷新所有动态选项

```javascript
// 刷新所有有API配置的字段
await this.$refs.eluForm.refreshAllOptions()
```

## 完整示例

```vue
<template>
  <div>
    <elu-form
      ref="eluForm"
      :config="formConfig"
      :model="formData"
      label-width="120px"
      @submit="handleSubmit"
      @options-loaded="handleOptionsLoaded"
      @options-load-error="handleOptionsLoadError"
    ></elu-form>
    
    <el-button @click="refreshOptions">刷新选项</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        city: '',
        department: ''
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
          type: 'select',
          prop: 'city',
          label: '城市',
          placeholder: '请选择城市',
          filterable: true,
          clearable: true,
          api: this.getCityOptions,
          apiParams: { type: 'major' },
          transformResponse: (data) => {
            return data.map(item => ({
              label: item.cityName,
              value: item.cityCode
            }))
          },
          // loadImmediate: true // 默认值，可省略
        },
        {
          type: 'select',
          prop: 'department',
          label: '部门',
          placeholder: '请选择部门',
          filterable: true,
          clearable: true,
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
      ]
    }
  },
  methods: {
    // 模拟获取城市数据
    async getCityOptions(params) {
      await new Promise(resolve => setTimeout(resolve, 800))
      return [
        { cityCode: 'beijing', cityName: '北京' },
        { cityCode: 'shanghai', cityName: '上海' },
        { cityCode: 'guangzhou', cityName: '广州' }
      ]
    },
    
    // 表单提交
    handleSubmit(formData) {
      console.log('表单提交:', formData)
    },
    
    // 选项加载完成
    handleOptionsLoaded(prop, options) {
      console.log(`字段 ${prop} 选项加载完成:`, options)
    },
    
    // 选项加载失败
    handleOptionsLoadError(prop, error) {
      console.error(`字段 ${prop} 选项加载失败:`, error)
    },
    
    // 刷新选项
    async refreshOptions() {
      try {
        await this.$refs.eluForm.refreshAllOptions()
        this.$message.success('选项刷新成功')
      } catch (error) {
        this.$message.error('选项刷新失败')
      }
    }
  }
}
</script>
```

## 注意事项

1. **数据格式** - API返回的数据必须能够转换为 `{label, value, disabled?}` 格式
2. **错误处理** - 建议实现 `options-load-error` 事件处理
3. **缓存机制** - 组件会自动缓存已加载的选项，避免重复请求
4. **性能优化** - 使用 `loadImmediate: false` 可以实现懒加载（默认为 true，会立即加载）
5. **网络请求** - 如果使用URL作为API，确保项目中配置了HTTP客户端（如axios）

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

这些高级功能可以根据实际需求进行扩展实现。 