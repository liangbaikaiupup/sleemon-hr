<template>
  <div class="grid-form-demo">
    <h2>栅格布局表单演示</h2>
    
    <!-- 基础栅格布局 -->
    <div class="demo-section">
      <h3>基础栅格布局（2列布局）</h3>
      <elu-grid-form
        :config="basicGridConfig"
        :model="formData"
        :row-gutter="20"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </div>

    <!-- 3列布局 -->
    <div class="demo-section">
      <h3>3列布局</h3>
      <elu-grid-form
        :config="threeColumnConfig"
        :model="formData"
        :row-gutter="16"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </div>

    <!-- 4列布局 -->
    <div class="demo-section">
      <h3>4列布局</h3>
      <elu-grid-form
        :config="fourColumnConfig"
        :model="formData"
        :row-gutter="12"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </div>

    <!-- 响应式栅格布局 -->
    <div class="demo-section">
      <h3>响应式栅格布局</h3>
      <elu-grid-form
        :config="responsiveGridConfig"
        :model="formData"
        :row-gutter="24"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </div>

    <!-- 混合布局 -->
    <div class="demo-section">
      <h3>混合布局（栅格 + 传统）</h3>
      <elu-grid-form
        :config="mixedConfig"
        :model="formData"
        :row-gutter="16"
        :row-justify="'space-between'"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    </div>

    <!-- 表单数据展示 -->
    <div class="demo-section">
      <h3>表单数据</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GridFormDemo',
  components: {
    
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        city: '',
        address: '',
        birthday: '',
        status: '',
        description: '',
        tags: [],
        avatar: '',
        department: '',
        position: '',
        salary: '',
        experience: ''
      },
      // 基础栅格布局配置（2列）
      basicGridConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          span: 12, // 占12列（一半宽度）
          required: true,
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          span: 12, // 占12列（一半宽度）
          required: true,
          rules: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ]
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          placeholder: '请输入手机号',
          span: 12,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
          ]
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          placeholder: '请输入年龄',
          span: 12,
          min: 1,
          max: 120
        },
        {
          prop: 'gender',
          label: '性别',
          type: 'radio',
          span: 12,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '城市',
          type: 'select',
          placeholder: '请选择城市',
          span: 12,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'address',
          label: '详细地址',
          type: 'input',
          placeholder: '请输入详细地址',
          span: 24, // 占满整行
          autosize: { minRows: 2, maxRows: 4 }
        }
      ],
      // 3列布局配置
      threeColumnConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          span: 8, // 占8列（1/3宽度）
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          span: 8, // 占8列（1/3宽度）
          required: true
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          placeholder: '请输入手机号',
          span: 8, // 占8列（1/3宽度）
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          placeholder: '请输入年龄',
          span: 8,
          min: 1,
          max: 120
        },
        {
          prop: 'gender',
          label: '性别',
          type: 'radio',
          span: 8,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '城市',
          type: 'select',
          placeholder: '请选择城市',
          span: 8,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        }
      ],
      // 4列布局配置
      fourColumnConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          span: 6, // 占6列（1/4宽度）
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          span: 6, // 占6列（1/4宽度）
          required: true
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          placeholder: '请输入手机号',
          span: 6, // 占6列（1/4宽度）
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          placeholder: '请输入年龄',
          span: 6, // 占6列（1/4宽度）
          min: 1,
          max: 120
        },
        {
          prop: 'gender',
          label: '性别',
          type: 'radio',
          span: 6,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '城市',
          type: 'select',
          placeholder: '请选择城市',
          span: 6,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'department',
          label: '部门',
          type: 'select',
          placeholder: '请选择部门',
          span: 6,
          options: [
            { label: '技术部', value: 'tech' },
            { label: '产品部', value: 'product' },
            { label: '设计部', value: 'design' },
            { label: '运营部', value: 'operation' }
          ]
        },
        {
          prop: 'position',
          label: '职位',
          type: 'input',
          placeholder: '请输入职位',
          span: 6
        }
      ],
      // 响应式栅格布局配置
      responsiveGridConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          span: 24, // 默认占满整行
          xs: 24,   // 超小屏幕占满
          sm: 12,   // 小屏幕占一半
          md: 8,    // 中等屏幕占1/3
          lg: 6,    // 大屏幕占1/4
          xl: 4,    // 超大屏幕占1/6
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
          required: true
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          placeholder: '请输入手机号',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          placeholder: '请输入年龄',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4
        },
        {
          prop: 'gender',
          label: '性别',
          type: 'radio',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '城市',
          type: 'select',
          placeholder: '请选择城市',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'birthday',
          label: '生日',
          type: 'date',
          placeholder: '请选择生日',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4
        },
        {
          prop: 'status',
          label: '状态',
          type: 'switch',
          span: 24,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
          activeText: '启用',
          inactiveText: '禁用'
        },
        {
          prop: 'description',
          label: '描述',
          type: 'input',
          placeholder: '请输入描述',
          span: 24, // 描述字段占满整行
          autosize: { minRows: 3, maxRows: 6 }
        }
      ],
      // 混合布局配置
      mixedConfig: [
        {
          prop: 'name',
          label: '姓名',
          type: 'input',
          placeholder: '请输入姓名',
          span: 8,
          required: true
        },
        {
          prop: 'email',
          label: '邮箱',
          type: 'input',
          inputType: 'email',
          placeholder: '请输入邮箱',
          span: 8,
          required: true
        },
        {
          prop: 'phone',
          label: '手机号',
          type: 'input',
          placeholder: '请输入手机号',
          span: 8
        },
        {
          prop: 'age',
          label: '年龄',
          type: 'number',
          placeholder: '请输入年龄',
          span: 6
        },
        {
          prop: 'gender',
          label: '性别',
          type: 'radio',
          span: 6,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '城市',
          type: 'select',
          placeholder: '请选择城市',
          span: 6,
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'status',
          label: '状态',
          type: 'switch',
          span: 6,
          activeText: '启用',
          inactiveText: '禁用'
        },
        {
          prop: 'tags',
          label: '标签',
          type: 'select',
          placeholder: '请选择标签',
          span: 12,
          multiple: true,
          options: [
            { label: '标签1', value: 'tag1' },
            { label: '标签2', value: 'tag2' },
            { label: '标签3', value: 'tag3' },
            { label: '标签4', value: 'tag4' }
          ]
        },
        {
          prop: 'avatar',
          label: '头像',
          type: 'upload',
          span: 12,
          action: '/api/upload',
          listType: 'picture-card',
          buttonText: '上传头像'
        },
        {
          prop: 'address',
          label: '详细地址',
          type: 'input',
          placeholder: '请输入详细地址',
          span: 24, // 地址字段占满整行
          autosize: { minRows: 2, maxRows: 4 }
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('表单提交:', formData)
      this.$message.success('表单提交成功！')
    },
    handleReset() {
      console.log('表单重置')
      this.$message.info('表单已重置')
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-form-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    color: #303133;
    margin-bottom: 30px;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background: #fff;

    h3 {
      color: #606266;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ebeef5;
    }

    pre {
      background: #f5f7fa;
      padding: 15px;
      border-radius: 4px;
      font-size: 12px;
      color: #606266;
      overflow-x: auto;
    }
  }
}
</style> 