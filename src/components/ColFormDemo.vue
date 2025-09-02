<template>
 <div class="demo-container">
  <h2>HR布局表单示例</h2>
  
  <div class="demo-section">
    <h3>基本使用</h3>
    <p>默认显示前6个字段，其余字段可通过展开按钮查看</p>
    <elu-col-form 
      :config="formConfig" 
      :model="formData" 
      :row-gutter="20" 
      submit-text="提交"
      reset-text="重置"
      @submit="handleSubmit"
      @reset="handleReset" 
      @toggle-expand="handleToggleExpand" />
  </div>
  
  <div class="demo-section">
    <h3>自定义显示字段数量</h3>
    <p>通过 defaultVisibleFields 属性可以自定义默认显示的字段数量</p>
    <elu-col-form 
      :config="formConfig" 
      :model="formData" 
      :row-gutter="20" 
      :default-visible-fields="3"
      submit-text="查询"
      @submit="handleSubmit"
      @reset="handleReset" />
  </div>

 </div>
</template>

<script>

export default {
  name: 'ColFormDemo',
  components: {

  },
  data() {
    return {
      formConfig: [
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          placeholder: '请输入姓名',
          rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
        {
          label: '性别',
          prop: 'gender',
          type: 'select',
          placeholder: '请选择性别',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          label: '部门',
          prop: 'department',
          type: 'select',
          placeholder: '请选择部门',
          options: [
            { label: '人力资源部', value: 'hr' },
            { label: '技术部', value: 'tech' },
            { label: '财务部', value: 'finance' },
            { label: '市场部', value: 'marketing' }
          ]
        },
        {
          label: '职位',
          prop: 'position',
          type: 'input',
          placeholder: '请输入职位'
        },
        {
          label: '入职日期',
          prop: 'entryDate',
          type: 'date',
          placeholder: '请选择入职日期',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          label: '工作年限',
          prop: 'workYears',
          type: 'number',
          placeholder: '请输入工作年限'
        },
        {
          label: '薪资',
          prop: 'salary',
          type: 'number',
          placeholder: '请输入薪资'
        },
        {
          label: '联系电话',
          prop: 'phone',
          type: 'input',
          placeholder: '请输入联系电话'
        },
        {
          label: '邮箱',
          prop: 'email',
          type: 'input',
          placeholder: '请输入邮箱'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '在职', value: 'active' },
            { label: '离职', value: 'inactive' },
            { label: '休假', value: 'vacation' }
          ]
        }
      ],
      formData: {
        name: '',
        gender: '',
        department: '',
        position: '',
        entryDate: '',
        workYears: 0,
        salary: 0,
        phone: '',
        email: '',
        status: 'active'
      }
    }
  },
  methods: {
    handleSubmit(data) {
      console.log('表单提交数据:', data)
      this.$message.success('表单提交成功')
    },
    handleReset() {
      console.log('表单已重置')
      this.$message.info('表单已重置')
    },
    handleToggleExpand(expanded) {
      console.log('表单字段' + (expanded ? '已展开' : '已收起'))
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 20px;
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #303133;
  }
  
  .demo-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    
    h3 {
      margin-bottom: 15px;
      font-size: 18px;
      color: #303133;
    }
    
    p {
      margin-bottom: 15px;
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>
