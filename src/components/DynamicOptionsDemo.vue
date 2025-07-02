<template>
  <div class="elu-form-demo">
    <h1>EluForm 组件完整方法示例</h1>
    
    <!-- 基础表单示例 -->
    <div class="demo-section">
      <h2>1. 基础表单功能</h2>
      <elu-form
        ref="basicForm"
        :config="basicFormConfig"
        :model="basicFormData"
        label-width="120px"
        @submit="handleBasicSubmit"
        @reset="handleBasicReset"
        @field-change="handleFieldChange"
        @field-blur="handleFieldBlur"
        @field-focus="handleFieldFocus"
      ></elu-form>
      
      <div class="actions">
        <el-button @click="validateBasicForm">验证表单</el-button>
        <el-button @click="validateBasicField">验证单个字段</el-button>
        <el-button @click="clearBasicValidate">清除验证</el-button>
        <el-button @click="scrollToBasicField">滚动到字段</el-button>
      </div>
    </div>

    <!-- 动态选项表单示例 -->
    <div class="demo-section">
      <h2>2. 动态选项功能</h2>
      <elu-form
        ref="dynamicForm"
        :config="dynamicFormConfig"
        :model="dynamicFormData"
        label-width="120px"
        @submit="handleDynamicSubmit"
        @options-loaded="handleOptionsLoaded"
        @options-load-error="handleOptionsLoadError"
      ></elu-form>
      
      <div class="actions">
        <el-button @click="refreshCityOptions">刷新城市选项</el-button>
        <el-button @click="refreshAllOptions">刷新所有选项</el-button>
                 <el-button @click="getCityOptionsData">获取城市选项</el-button>
        <el-button @click="getCityLoading">获取城市加载状态</el-button>
      </div>
    </div>

    <!-- 高级功能示例 -->
    <div class="demo-section">
      <h2>3. 高级功能演示</h2>
      <elu-form
        ref="advancedForm"
        :config="advancedFormConfig"
        :model="advancedFormData"
        :inline="true"
        label-width="120px"
        size="small"
        @submit="handleAdvancedSubmit"
      ></elu-form>
      
      <div class="actions">
        <el-button @click="toggleFormDisabled">切换禁用状态</el-button>
        <el-button @click="changeFormSize">切换尺寸</el-button>
        <el-button @click="toggleInlineMode">切换行内模式</el-button>
      </div>
    </div>

    <!-- 方法调用结果展示 -->
    <div class="demo-section">
      <h2>4. 方法调用结果</h2>
      <el-card>
        <div slot="header">
          <span>控制台输出</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="clearConsole">清空</el-button>
        </div>
        <pre class="console-output">{{ consoleOutput }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EluFormDemo',
  data() {
    return {
      // 基础表单数据
      basicFormData: {
        name: '',
        email: '',
        phone: '',
        description: ''
      },
      
      // 动态表单数据
      dynamicFormData: {
        city: '',
        department: '',
        role: [],
        date: []
      },
      
      // 高级表单数据
      advancedFormData: {
        username: '',
        password: '',
        confirmPassword: '',
        agreement: false
      },
      
      // 控制台输出
      consoleOutput: '',
      
      // 基础表单配置
      basicFormConfig: [
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          placeholder: '请输入姓名',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'email',
          label: '邮箱',
          placeholder: '请输入邮箱',
          rules: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'phone',
          label: '手机号',
          placeholder: '请输入手机号',
          rules: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
          ]
        },
        {
          type: 'textarea',
          prop: 'description',
          label: '描述',
          placeholder: '请输入描述信息',
          rows: 3,
          maxlength: 200,
          showWordLimit: true
        }
      ],
      
      // 动态表单配置
      dynamicFormConfig: [
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
          }
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
        },
        {
          type: 'select',
          prop: 'role',
          label: '角色',
          placeholder: '请选择角色',
          filterable: true,
          clearable: true,
          multiple: true,
          api: async () => {
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
          type: 'date',
          dateType: 'daterange',
          prop: 'date',
          label: '日期范围',
          placeholder: '请选择日期',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        }
      ],
      
      // 高级表单配置
      advancedFormConfig: [
        {
          type: 'input',
          prop: 'username',
          label: '用户名',
          placeholder: '请输入用户名',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        },
                 {
           type: 'input',
           prop: 'password',
           label: '密码',
           inputType: 'password',
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
           inputType: 'password',
           placeholder: '请再次输入密码',
          rules: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value !== this.advancedFormData.password) {
                  callback(new Error('两次输入密码不一致'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        },
        {
          type: 'checkbox',
          prop: 'agreement',
          label: '同意协议',
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请同意用户协议'))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // ========== 基础表单方法 ==========
    
    // 表单提交
    handleBasicSubmit(formData) {
      this.log('基础表单提交:', formData)
      this.$message.success('基础表单提交成功！')
    },
    
    // 表单重置
    handleBasicReset() {
      this.log('基础表单重置')
      this.$message.info('基础表单已重置')
    },
    
         // 字段值变化
     handleFieldChange(prop, value) {
       this.log(`字段 ${prop} 值变化:`, value)
     },
    
         // 字段失焦
     handleFieldBlur(prop, event) {
       this.log(`字段 ${prop} 失焦:`, event.target.value)
     },
     
     // 字段聚焦
     handleFieldFocus(prop) {
       this.log(`字段 ${prop} 聚焦`)
     },
    
    // 验证表单
    async validateBasicForm() {
      try {
        const valid = await this.$refs.basicForm.validate()
        this.log('表单验证结果:', valid)
        if (valid) {
          this.$message.success('表单验证通过')
        }
      } catch (error) {
        this.log('表单验证失败:', error)
        this.$message.error('表单验证失败')
      }
    },
    
    // 验证单个字段
    async validateBasicField() {
      try {
        await this.$refs.basicForm.validateField('name')
        this.log('字段验证通过')
        this.$message.success('字段验证通过')
      } catch (error) {
        this.log('字段验证失败:', error)
        this.$message.error('字段验证失败')
      }
    },
    
    // 清除验证信息
    clearBasicValidate() {
      this.$refs.basicForm.clearValidate()
      this.log('清除验证信息')
      this.$message.info('验证信息已清除')
    },
    
    // 滚动到指定字段
    scrollToBasicField() {
      this.$refs.basicForm.scrollToField('name')
      this.log('滚动到姓名字段')
    },
    
    // ========== 动态选项方法 ==========
    
    // 动态表单提交
    handleDynamicSubmit(formData) {
      this.log('动态表单提交:', formData)
      this.$message.success('动态表单提交成功！')
    },
    
    // 选项加载完成
    handleOptionsLoaded(prop, options) {
      this.log(`字段 ${prop} 选项加载完成:`, options)
      this.$message.success(`${prop} 选项加载完成`)
    },
    
    // 选项加载失败
    handleOptionsLoadError(prop, error) {
      this.log(`字段 ${prop} 选项加载失败:`, error)
      this.$message.error(`${prop} 选项加载失败`)
    },
    
    // 刷新城市选项
    async refreshCityOptions() {
      try {
        await this.$refs.dynamicForm.refreshFieldOptions('city')
        this.log('城市选项刷新成功')
        this.$message.success('城市选项刷新成功')
      } catch (error) {
        this.log('城市选项刷新失败:', error)
        this.$message.error('城市选项刷新失败')
      }
    },
    
    // 刷新所有选项
    async refreshAllOptions() {
      try {
        await this.$refs.dynamicForm.refreshAllOptions()
        this.log('所有选项刷新成功')
        this.$message.success('所有选项刷新成功')
      } catch (error) {
        this.log('选项刷新失败:', error)
        this.$message.error('选项刷新失败')
      }
    },
    
         // 获取城市选项数据
     getCityOptionsData() {
       const options = this.$refs.dynamicForm.getFieldOptions('city')
       this.log('获取城市选项:', options)
       this.$message.info(`获取到 ${options.length} 个城市选项`)
     },
    
    // 获取城市加载状态
    getCityLoading() {
      const loading = this.$refs.dynamicForm.getFieldLoading('city')
      this.log('城市加载状态:', loading)
      this.$message.info(`城市加载状态: ${loading ? '加载中' : '已完成'}`)
    },
    
    // ========== 高级功能方法 ==========
    
    // 高级表单提交
    handleAdvancedSubmit(formData) {
      this.log('高级表单提交:', formData)
      this.$message.success('高级表单提交成功！')
    },
    
    // 切换表单禁用状态
    toggleFormDisabled() {
      const form = this.$refs.advancedForm
      const isDisabled = !form.disabled
      form.disabled = isDisabled
      this.log('切换表单禁用状态:', isDisabled)
      this.$message.info(`表单已${isDisabled ? '禁用' : '启用'}`)
    },
    
    // 切换表单尺寸
    changeFormSize() {
      const sizes = ['medium', 'small', 'mini']
      const currentSize = this.$refs.advancedForm.size
      const currentIndex = sizes.indexOf(currentSize)
      const nextIndex = (currentIndex + 1) % sizes.length
      const nextSize = sizes[nextIndex]
      
      this.$refs.advancedForm.size = nextSize
      this.log('切换表单尺寸:', `${currentSize} -> ${nextSize}`)
      this.$message.info(`表单尺寸已切换为: ${nextSize}`)
    },
    
    // 切换行内模式
    toggleInlineMode() {
      const form = this.$refs.advancedForm
      const isInline = !form.inline
      form.inline = isInline
      this.log('切换行内模式:', isInline)
      this.$message.info(`表单已${isInline ? '切换为行内模式' : '切换为块级模式'}`)
    },
    
    // ========== 工具方法 ==========
    
    // 模拟获取城市数据
    async getCityOptions(params) {
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
      
      if (params.type === 'major') {
        return cities.slice(0, 6)
      }
      
      return cities
    },
    
    // 记录日志
    log(...args) {
      const timestamp = new Date().toLocaleTimeString()
      const message = `[${timestamp}] ${args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')}`
      
      this.consoleOutput = message + '\n' + this.consoleOutput
      
      // 限制输出长度
      if (this.consoleOutput.length > 5000) {
        this.consoleOutput = this.consoleOutput.substring(0, 5000)
      }
      
      // 同时输出到浏览器控制台
      console.log(...args)
    },
    
    // 清空控制台
    clearConsole() {
      this.consoleOutput = ''
    }
  }
}
</script>

<style scoped>
.elu-form-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.elu-form-demo h1 {
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
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.actions .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.console-output {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .elu-form-demo {
    padding: 10px;
  }
  
  .demo-section {
    padding: 15px;
  }
  
  .actions .el-button {
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 12px;
  }
}
</style> 