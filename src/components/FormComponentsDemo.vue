<template>
  <div class="form-components-demo">
    <h1>EluForm 组件类型演示</h1>
    
    <div class="demo-section">
      <h2>所有表单控件类型</h2>
      
      <elu-form
        ref="componentsForm"
        :config="formConfig"
        :model="formData"
        label-width="140px"
        @submit="handleSubmit"
        @reset="handleReset"
        @field-change="handleFieldChange"
      ></elu-form>
      
      <div class="actions">
        <el-button @click="validateForm">验证表单</el-button>
        <el-button @click="resetForm">重置表单</el-button>
        <el-button @click="getFormData">获取表单数据</el-button>
        <el-button @click="setFormData">设置表单数据</el-button>
      </div>
    </div>

    <!-- 表单数据展示 -->
    <div class="demo-section">
      <h2>表单数据</h2>
      <el-card>
        <div slot="header">
          <span>当前表单数据</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="copyFormData">复制</el-button>
        </div>
        <pre class="form-data-output">{{ JSON.stringify(formData, null, 2) }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormComponentsDemo',
  data() {
    return {
      formData: {
        // 输入框类型
        text: '',
        password: '',
        number: '',
        email: '',
        url: '',
        tel: '',
        
        // 文本域
        textarea: '',
        
        // 选择框类型
        select: '',
        multipleSelect: [],
        filterableSelect: '',
        
        // 日期时间类型
        date: '',
        datetime: '',
        daterange: [],
        datetimerange: [],
        month: '',
        year: '',
        week: '',
        
        // 数字输入框
        numberInput: '',
        
        // 开关
        switch: false,
        
        // 单选框
        radio: '',
        radioGroup: '',
        
        // 复选框
        checkbox: [],
        
        
        // 滑块
        slider: 0,
        rangeSlider: [0, 100],
        
        // 评分
        rate: 0,
        
        // 颜色选择器
        color: '',
        
        // 级联选择器
        cascader: [],
        
        // 上传
        upload: [],
        
        // 拖拽上传
        dragUpload: [],
        
        // 时间选择器
        time: '',
        timeRange: [],
        
        // 自动完成
        autocomplete: '',
        
        // 数字输入框
        inputNumber: 0
      },
      
      formConfig: [
        // ========== 输入框类型 ==========
        {
          type: 'input',
          prop: 'text',
          label: '文本输入框',
          placeholder: '请输入文本',
          rules: [
            { required: true, message: '请输入文本', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'password',
          label: '密码输入框',
          inputType: 'password',
          placeholder: '请输入密码',
          showPassword: true,
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'number',
          label: '数字输入框',
          inputType: 'number',
          placeholder: '请输入数字',
          rules: [
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'email',
          label: '邮箱输入框',
          inputType: 'email',
          placeholder: '请输入邮箱',
          rules: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'url',
          label: 'URL输入框',
          inputType: 'url',
          placeholder: '请输入URL',
          rules: [
            { type: 'url', message: '请输入正确的URL地址', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          prop: 'tel',
          label: '电话输入框',
          inputType: 'tel',
          placeholder: '请输入电话号码',
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
          ]
        },
        
        // ========== 文本域 ==========
        {
          type: 'textarea',
          prop: 'textarea',
          label: '文本域',
          placeholder: '请输入多行文本',
          rows: 4,
          maxlength: 200,
          showWordLimit: true,
          rules: [
            { max: 200, message: '文本长度不能超过200个字符', trigger: 'blur' }
          ]
        },
        
        // ========== 选择框类型 ==========
        {
          type: 'select',
          prop: 'select',
          label: '下拉选择框',
          placeholder: '请选择选项',
          clearable: true,
          options: [
            { label: '选项1', value: 'option1' },
            { label: '选项2', value: 'option2' },
            { label: '选项3', value: 'option3' },
            { label: '选项4', value: 'option4' }
          ],
          rules: [
            { required: true, message: '请选择选项', trigger: 'change' }
          ]
        },
        {
          type: 'select',
          prop: 'multipleSelect',
          label: '多选下拉框',
          placeholder: '请选择多个选项',
          multiple: true,
          clearable: true,
          collapseTags: true,
          options: [
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
            { label: '选项C', value: 'c' },
            { label: '选项D', value: 'd' },
            { label: '选项E', value: 'e' }
          ]
        },
        {
          type: 'select',
          prop: 'filterableSelect',
          label: '可搜索选择框',
          placeholder: '请输入关键词搜索',
          filterable: true,
          clearable: true,
          allowCreate: true,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
            { label: '杭州', value: 'hangzhou' }
          ]
        },
        
        // ========== 日期时间类型 ==========
        {
          type: 'date',
          prop: 'date',
          label: '日期选择器',
          placeholder: '请选择日期',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'datetime',
          prop: 'datetime',
          label: '日期时间选择器',
          placeholder: '请选择日期时间',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'daterange',
          prop: 'daterange',
          label: '日期范围选择器',
          placeholder: '请选择日期范围',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'datetimerange',
          prop: 'datetimerange',
          label: '日期时间范围选择器',
          placeholder: '请选择日期时间范围',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'month',
          prop: 'month',
          label: '月份选择器',
          placeholder: '请选择月份',
          format: 'yyyy-MM',
          valueFormat: 'yyyy-MM',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'year',
          prop: 'year',
          label: '年份选择器',
          placeholder: '请选择年份',
          format: 'yyyy',
          valueFormat: 'yyyy',
          clearable: true
        },
        {
          type: 'date',
          dateType: 'week',
          prop: 'week',
          label: '周选择器',
          placeholder: '请选择周',
          format: 'yyyy 第 WW 周',
          valueFormat: 'yyyy-WW',
          clearable: true
        },
        
        // ========== 数字输入框 ==========
        {
          type: 'input-number',
          prop: 'inputNumber',
          label: '数字输入框',
          placeholder: '请输入数字',
          min: 0,
          max: 100,
          step: 1,
          precision: 0,
          controls: true,
          controlsPosition: 'right'
        },
        
        // ========== 开关 ==========
        {
          type: 'switch',
          prop: 'switch',
          label: '开关',
          activeText: '开启',
          inactiveText: '关闭',
          activeColor: '#13ce66',
          inactiveColor: '#ff4949'
        },
        
        // ========== 单选框 ==========
        {
          type: 'radio',
          prop: 'radio',
          label: '单选框',
          options: [
            { label: '选项1', value: 'radio1' },
            { label: '选项2', value: 'radio2' },
            { label: '选项3', value: 'radio3' }
          ]
        },
       
        
        // ========== 复选框 ==========
       
        {
          type: 'checkbox',
          prop: 'checkbox',
          label: '复选框',
          options: [
            { label: '选项1', value: 'check1' },
            { label: '选项2', value: 'check2' },
            { label: '选项3', value: 'check3' },
            { label: '选项4', value: 'check4' }
          ]
        },
        
        // ========== 滑块 ==========
        {
          type: 'slider',
          prop: 'slider',
          label: '滑块',
          min: 0,
          max: 100,
          step: 1,
          showInput: true,
          showInputControls: true,
          inputSize: 'small'
        },
        {
          type: 'slider',
          prop: 'rangeSlider',
          label: '范围滑块',
          range: true,
          min: 0,
          max: 100,
          step: 1,
          showInput: true,
          showInputControls: true,
          inputSize: 'small'
        },
        
        // ========== 评分 ==========
        {
          type: 'rate',
          prop: 'rate',
          label: '评分',
          max: 5,
          showText: true,
          showScore: true,
          texts: ['极差', '失望', '一般', '满意', '惊喜'],
          colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A']
        },
        
        // ========== 颜色选择器 ==========
        {
          type: 'color-picker',
          prop: 'color',
          label: '颜色选择器',
          showAlpha: true,
          colorFormat: 'hex',
          predefine: [
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585'
          ]
        },
        
        // ========== 时间选择器 ==========
        {
          type: 'time',
          prop: 'time',
          label: '时间选择器',
          placeholder: '请选择时间',
          format: 'HH:mm:ss',
          valueFormat: 'HH:mm:ss',
          clearable: true
        },
        {
          type: 'time',
          timeType: 'timerange',
          prop: 'timeRange',
          label: '时间范围选择器',
          placeholder: '请选择时间范围',
          format: 'HH:mm:ss',
          valueFormat: 'HH:mm:ss',
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          clearable: true
        },
        
        // ========== 自动完成 ==========
        {
          type: 'autocomplete',
          prop: 'autocomplete',
          label: '自动完成',
          placeholder: '请输入内容',
          fetchSuggestions: this.querySearch,
          clearable: true
        },
        
        // ========== 级联选择器 ==========
        {
          type: 'cascader',
          prop: 'cascader',
          label: '级联选择器',
          placeholder: '请选择地区',
          filterable: true,
          clearable: true,
          showAllLevels: true,
          separator: ' / ',
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
                    { value: 'wudaokou', label: '五道口' },
                    { value: 'xierqi', label: '西二旗' }
                  ]
                },
                {
                  value: 'chaoyang',
                  label: '朝阳区',
                  children: [
                    { value: 'sanlitun', label: '三里屯' },
                    { value: 'guomao', label: '国贸' },
                    { value: 'wangjing', label: '望京' }
                  ]
                }
              ]
            },
            {
              value: 'shanghai',
              label: '上海',
              children: [
                {
                  value: 'huangpu',
                  label: '黄浦区',
                  children: [
                    { value: 'nanjinglu', label: '南京路' },
                    { value: 'waitan', label: '外滩' },
                    { value: 'xintiandi', label: '新天地' }
                  ]
                },
                {
                  value: 'pudong',
                  label: '浦东新区',
                  children: [
                    { value: 'lujiazui', label: '陆家嘴' },
                    { value: 'jinqiao', label: '金桥' },
                    { value: 'zhangjiang', label: '张江' }
                  ]
                }
              ]
            }
          ]
        },
        
        // ========== 上传组件 ==========
        {
          type: 'upload',
          prop: 'upload',
          label: '文件上传',
          action: 'https://jsonplaceholder.typicode.com/posts/',
          multiple: true,
          limit: 5,
          accept: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx',
          listType: 'text',
          tip: '只能上传jpg/png/gif/pdf/doc文件，且不超过10MB',
          buttonText: '选择文件',
          beforeUpload: (file) => {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
              this.$message.error('上传文件大小不能超过 10MB!');
              return false;
            }
            return true;
          },
          onSuccess: (response, file, fileList) => { // eslint-disable-line no-unused-vars
            this.$message.success('上传成功');
          },
          onError: (err, file, fileList) => { // eslint-disable-line no-unused-vars
            this.$message.error('上传失败');
          }
        },
        
        // ========== 拖拽上传 ==========
        {
          type: 'upload',
          prop: 'dragUpload',
          label: '拖拽上传',
          action: 'https://jsonplaceholder.typicode.com/posts/',
          drag: true,
          multiple: false,
          accept: '.jpg,.jpeg,.png,.gif',
          listType: 'picture',
          tip: '只能上传jpg/png/gif文件，且不超过5MB',
          dragText: '将图片拖到此处，或点击上传',
          beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            const isLt5M = file.size / 1024 / 1024 < 5;
            
            if (!isImage) {
              this.$message.error('只能上传图片文件!');
              return false;
            }
            if (!isLt5M) {
              this.$message.error('上传图片大小不能超过 5MB!');
              return false;
            }
            return true;
          }
        }
      ]
    }
  },
  methods: {
    // 表单提交
    handleSubmit(formData) {
      console.log('表单提交:', formData)
      this.$message.success('表单提交成功！')
    },
    
    // 表单重置
    handleReset() {
      console.log('表单重置')
      this.$message.info('表单已重置')
    },
    
    // 字段值变化
    handleFieldChange(prop, value) {
      console.log(`字段 ${prop} 值变化:`, value)
    },
    
    // 验证表单
    async validateForm() {
      try {
        const valid = await this.$refs.componentsForm.validate()
        if (valid) {
          this.$message.success('表单验证通过')
        }
      } catch (error) {
        this.$message.error('表单验证失败')
      }
    },
    
    // 重置表单
    resetForm() {
      this.$refs.componentsForm.resetFields()
      this.$message.info('表单已重置')
    },
    
    // 获取表单数据
    getFormData() {
      console.log('当前表单数据:', this.formData)
      this.$message.info('表单数据已输出到控制台')
    },
    
    // 设置表单数据
    setFormData() {
      this.formData = {
        text: '预设文本',
        select: 'option1',
        date: '2024-01-01',
        switch: true,
        radio: 'radio1',
        checkbox: true,
        slider: 50,
        rate: 4,
        color: '#409EFF'
      }
      this.$message.success('表单数据已设置')
    },
    
    // 复制表单数据
    copyFormData() {
      const dataStr = JSON.stringify(this.formData, null, 2)
      navigator.clipboard.writeText(dataStr).then(() => {
        this.$message.success('表单数据已复制到剪贴板')
      }).catch(() => {
        this.$message.error('复制失败')
      })
    },
    
    // 自动完成搜索建议
    querySearch(queryString, callback) {
      const suggestions = [
        { value: 'Vue.js' },
        { value: 'Element UI' },
        { value: 'JavaScript' },
        { value: 'TypeScript' },
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Node.js' },
        { value: 'Python' },
        { value: 'Java' },
        { value: 'C++' }
      ]
      
      const results = queryString
        ? suggestions.filter(item => 
            item.value.toLowerCase().includes(queryString.toLowerCase())
          )
        : suggestions
      
      callback(results)
    }
  }
}
</script>

<style scoped>
.form-components-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.form-components-demo h1 {
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

.form-data-output {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  max-height: 400px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-components-demo {
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

/* 表单布局优化 */
:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input),
:deep(.el-select),
:deep(.el-date-editor),
:deep(.el-cascader) {
  width: 100%;
}

:deep(.el-slider) {
  margin-top: 8px;
}

:deep(.el-rate) {
  margin-top: 8px;
}

:deep(.el-color-picker) {
  margin-top: 8px;
}
</style> 