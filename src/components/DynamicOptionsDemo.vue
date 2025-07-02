<template>
  <div class="dynamic-options-demo">
    <h1>动态选项功能演示</h1>
    
    <div class="demo-section">
      <h2>动态选项表单</h2>
      
      <elu-form
        :config="formConfig"
        :model="formData"
        :inline="true"
        label-width="120px"
        @submit="handleSubmit"
        @options-loaded="handleOptionsLoaded"
        @options-load-error="handleOptionsLoadError"
      ></elu-form>
      
      <div class="actions">
        <el-button @click="refreshCityOptions">刷新城市选项</el-button>
        <el-button @click="refreshAllOptions">刷新所有选项</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicOptionsDemo',
  data() {
    return {
      formData: {
        name: '',
        city: '',
        district:'',
        department: '',
        role: [],
        date:[]
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
          // 使用函数作为API
          api: this.getCityOptions,
          apiParams: { type: 'major' },
          transformResponse: (data) => {
            return data.map(item => ({
              label: item.cityName,
              value: item.cityCode
            }))
          }
          // loadImmediate 默认为 true，可省略
        },
        {
          type: 'select',
          prop: 'district',
          label: '区',
          placeholder: '请选择区',
          filterable: true,
          clearable: true,
          // 使用函数作为API
          options: [  
            { label: '东城区', value: 'dongcheng' },
            { label: '西城区', value: 'xicheng' },
            { label: '朝阳区', value: 'chaoyang' },
            { label: '海淀区', value: 'haidian' },
            { label: '丰台区', value: 'fengtai' },
          ]
        },
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
        },
        {
          type: 'select',
          prop: 'role',
          label: '角色',
          placeholder: '请选择角色',
          filterable: true,
          clearable: true,
          multiple: true,
          // 使用异步函数
          api: async () => {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000))
            return [
              { id: 1, name: '管理员', code: 'admin' },
              { id: 2, name: '编辑', code: 'editor' },
              { id: 3, name: '查看者', code: 'viewer' },
              { id: 4, name: '访客', code: 'guest' }
            ]
          },
          transformResponse: (data) => {
            return data.map(role => ({
              label: role.name,
              value: role.code
            }))
          }
        },
        {
          type:'date',
          dateType:'daterange',
          prop:'date',
          label:'日期',
          placeholder:'请选择日期',
          format:'yyyy-MM-dd',
          valueFormat:'yyyy-MM-dd',
          rangeSeparator:'至',
          startPlaceholder:'开始日期',
          endPlaceholder:'结束日期',
          rules:[
            { required: false, message: '请选择日期', trigger: 'blur' }
          ]
        }
      ]
    }
  },
  methods: {
    // 模拟获取城市数据的函数
    async getCityOptions(params) {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const cities = [
        { cityCode: 'beijing', cityName: '北京' },
        { cityCode: 'shanghai', cityName: '上海' },
        { cityCode: 'guangzhou', cityName: '广州' },
        { cityCode: 'shenzhen', cityName: '深圳' },
        { cityCode: 'hangzhou', cityName: '杭州' },
        { cityCode: 'nanjing', cityName: '南京' },
        { cityCode: 'wuhan', cityName: '武汉' },
        { cityCode: 'chengdu', cityName: '成都' },
        { cityCode: 'xian', cityName: '西安' },
        { cityCode: 'tianjin', cityName: '天津' }
      ]
      
      // 根据参数过滤
      if (params.type === 'major') {
        return cities.slice(0, 6)
      }
      
      return cities
    },
    
    // 表单提交
    handleSubmit(formData) {
      console.log('表单提交:', formData)
      this.$message.success('表单提交成功！')
    },
    
    // 选项加载完成
    handleOptionsLoaded(prop, options) {
      console.log(`字段 ${prop} 选项加载完成:`, options)
      this.$message.success(`${prop} 选项加载完成`)
    },
    
    // 选项加载失败
    handleOptionsLoadError(prop, error) {
      console.error(`字段 ${prop} 选项加载失败:`, error)
      this.$message.error(`${prop} 选项加载失败`)
    },
    
    // 刷新城市选项
    async refreshCityOptions() {
      try {
        await this.$refs.eluForm.refreshFieldOptions('city')
        this.$message.success('城市选项刷新成功')
      } catch (error) {
        this.$message.error('城市选项刷新失败')
      }
    },
    
    // 刷新所有选项
    async refreshAllOptions() {
      try {
        await this.$refs.eluForm.refreshAllOptions()
        this.$message.success('所有选项刷新成功')
      } catch (error) {
        this.$message.error('选项刷新失败')
      }
    }
  }
}
</script>

<style scoped>
.dynamic-options-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.dynamic-options-demo h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #409eff;
  font-size: 18px;
}

.actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.actions .el-button {
  margin-right: 10px;
}
</style> 