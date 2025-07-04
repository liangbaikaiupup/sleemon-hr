<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="formRules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    :disabled="disabled"
    :inline="inline"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :hide-required-asterisk="hideRequiredAsterisk"
    @submit.native.prevent="handleSubmit"
  >
    <!-- 栅格布局容器 -->
    <el-row
      :gutter="rowGutter"
      :justify="rowJustify"
      :align="rowAlign"
      :tag="rowTag"
    >
      <el-col
        v-for="(field, index) in formConfig"
        :key="field.prop || index"
        :span="field.span || defaultColSpan"
        :offset="field.offset || 0"
        :push="field.push || 0"
        :pull="field.pull || 0"
        :xs="field.xs"
        :sm="field.sm"
        :md="field.md"
        :lg="field.lg"
        :xl="field.xl"
      >
        <el-form-item
          :label="field.label"
          :prop="field.prop"
          :rules="field.rules"
          :label-width="field.labelWidth"
          :required="field.required"
          :error="field.error"
          :show-message="field.showMessage"
          :inline-message="field.inlineMessage"
          :size="field.size"
        >
          <!-- 输入框 -->
          <el-input
            v-if="field.type === 'input'"
            v-model="formData[field.prop]"
            :type="field.inputType || 'text'"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :clearable="field.clearable !== false"
            :show-password="field.showPassword"
            :maxlength="field.maxlength"
            :minlength="field.minlength"
            :show-word-limit="field.showWordLimit"
            :prefix-icon="field.prefixIcon"
            :suffix-icon="field.suffixIcon"
            :autosize="field.autosize"
            :rows="field.rows"
            @input="handleFieldChange(field.prop, $event)"
            @change="handleFieldChange(field.prop, $event)"
            @blur="handleFieldBlur(field.prop, $event)"
            @focus="handleFieldFocus(field.prop, $event)"
          ></el-input>

          <!-- 选择器 -->
          <el-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :clearable="field.clearable !== false"
            :multiple="field.multiple"
            :collapse-tags="field.collapseTags"
            :filterable="field.filterable"
            :allow-create="field.allowCreate"
            :remote="field.remote"
            :remote-method="field.remoteMethod"
            :loading="getFieldLoading(field.prop)"
            :no-data-text="field.noDataText || '暂无数据'"
            :no-match-text="field.noMatchText || '无匹配数据'"
            @change="handleFieldChange(field.prop, $event)"
            @blur="handleFieldBlur(field.prop, $event)"
            @focus="handleFieldFocus(field.prop, $event)"
            @visible-change="handleSelectVisibleChange(field, $event)"
          >
            <el-option
              v-for="option in getFieldOptions(field.prop)"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            ></el-option>
          </el-select>

          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="field.type === 'radio'"
            v-model="formData[field.prop]"
            :disabled="field.disabled"
            :size="field.size"
            @change="handleFieldChange(field.prop, $event)"
          >
            <el-radio
              v-for="option in field.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-radio>
          </el-radio-group>

          <!-- 复选框组 -->
          <el-checkbox-group
            v-else-if="field.type === 'checkbox'"
            v-model="formData[field.prop]"
            :disabled="field.disabled"
            :size="field.size"
            :min="field.min"
            :max="field.max"
            @change="handleFieldChange(field.prop, $event)"
          >
            <el-checkbox
              v-for="option in field.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>

          <!-- 开关 -->
          <el-switch
            v-else-if="field.type === 'switch'"
            v-model="formData[field.prop]"
            :disabled="field.disabled"
            :active-text="field.activeText"
            :inactive-text="field.inactiveText"
            :active-value="field.activeValue"
            :inactive-value="field.inactiveValue"
            :active-color="field.activeColor"
            :inactive-color="field.inactiveColor"
            @change="handleFieldChange(field.prop, $event)"
          ></el-switch>

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="field.type === 'date'"
            v-model="formData[field.prop]"
            :type="field.dateType || 'date'"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :clearable="field.clearable !== false"
            :format="field.format"
            :value-format="field.valueFormat"
            :start-placeholder="field.startPlaceholder"
            :end-placeholder="field.endPlaceholder"
            :range-separator="field.rangeSeparator"
            :picker-options="field.pickerOptions"
            @change="handleFieldChange(field.prop, $event)"
          ></el-date-picker>

          <!-- 时间选择器 -->
          <el-time-picker
            v-else-if="field.type === 'time'"
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :clearable="field.clearable !== false"
            :format="field.format"
            :value-format="field.valueFormat"
            :picker-options="field.pickerOptions"
            @change="handleFieldChange(field.prop, $event)"
          ></el-time-picker>

          <!-- 数字输入框 -->
          <el-input-number
            v-else-if="field.type === 'number'"
            v-model="formData[field.prop]"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            :step-strictly="field.stepStrictly"
            :precision="field.precision"
            :disabled="field.disabled"
            :controls="field.controls !== false"
            :controls-position="field.controlsPosition"
            :placeholder="field.placeholder"
            @change="handleFieldChange(field.prop, $event)"
          ></el-input-number>

          <!-- 滑块 -->
          <el-slider
            v-else-if="field.type === 'slider'"
            v-model="formData[field.prop]"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            :disabled="field.disabled"
            :show-input="field.showInput"
            :show-input-controls="field.showInputControls"
            :input-size="field.inputSize"
            :show-stops="field.showStops"
            :show-tooltip="field.showTooltip"
            :range="field.range"
            :vertical="field.vertical"
            :height="field.height"
            @change="handleFieldChange(field.prop, $event)"
          ></el-slider>

          <!-- 评分 -->
          <el-rate
            v-else-if="field.type === 'rate'"
            v-model="formData[field.prop]"
            :max="field.max"
            :disabled="field.disabled"
            :low-threshold="field.lowThreshold"
            :high-threshold="field.highThreshold"
            :colors="field.colors"
            :void-color="field.voidColor"
            :disabled-void-color="field.disabledVoidColor"
            :icon-classes="field.iconClasses"
            :void-icon-class="field.voidIconClass"
            :disabled-void-icon-class="field.disabledVoidIconClass"
            :show-text="field.showText"
            :show-score="field.showScore"
            :text-color="field.textColor"
            :texts="field.texts"
            @change="handleFieldChange(field.prop, $event)"
          ></el-rate>

          <!-- 颜色选择器 -->
          <el-color-picker
            v-else-if="field.type === 'color-picker'"
            v-model="formData[field.prop]"
            :disabled="field.disabled"
            :size="field.size"
            :show-alpha="field.showAlpha"
            :color-format="field.colorFormat"
            :popper-class="field.popperClass"
            :predefine="field.predefine"
            @change="handleFieldChange(field.prop, $event)"
          ></el-color-picker>

          <!-- 级联选择器 -->
          <el-cascader
            v-else-if="field.type === 'cascader'"
            v-model="formData[field.prop]"
            :options="field.options"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :clearable="field.clearable !== false"
            :show-all-levels="field.showAllLevels !== false"
            :collapse-tags="field.collapseTags"
            :separator="field.separator"
            :filterable="field.filterable"
            :filter-method="field.filterMethod"
            :debounce="field.debounce"
            :before-filter="field.beforeFilter"
            :props="field.props"
            :size="field.size"
            @change="handleFieldChange(field.prop, $event)"
            @expand-change="handleCascaderExpandChange(field.prop, $event)"
          ></el-cascader>

          <!-- 上传组件 -->
          <el-upload
            v-else-if="field.type === 'upload'"
            v-model="formData[field.prop]"
            :action="field.action"
            :headers="field.headers"
            :data="field.data"
            :multiple="field.multiple"
            :name="field.name"
            :drag="field.drag"
            :accept="field.accept"
            :list-type="field.listType"
            :auto-upload="field.autoUpload !== false"
            :show-file-list="field.showFileList !== false"
            :disabled="field.disabled"
            :limit="field.limit"
            :file-list="field.fileList"
            :http-request="field.httpRequest"
            :before-upload="field.beforeUpload"
            :before-remove="field.beforeRemove"
            :on-preview="field.onPreview"
            :on-remove="field.onRemove"
            :on-success="(response, file, fileList) => handleUploadSuccess(field.prop, response, file, fileList)"
            :on-error="(err, file, fileList) => handleUploadError(field.prop, err, file, fileList)"
            :on-progress="(event, file, fileList) => handleUploadProgress(field.prop, event, file, fileList)"
            :on-exceed="(files, fileList) => handleUploadExceed(field.prop, files, fileList)"
            :on-change="(file, fileList) => handleUploadChange(field.prop, file, fileList)"
          >
            <el-button v-if="!field.drag" :size="field.size || 'small'" type="primary">
              <i class="el-icon-upload"></i>
              {{ field.buttonText || '点击上传' }}
            </el-button>
            <div v-else class="el-upload__text">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                {{ field.dragText || '将文件拖到此处，或点击上传' }}
              </div>
            </div>
            <div v-if="field.tip" slot="tip" class="el-upload__tip">
              {{ field.tip }}
            </div>
          </el-upload>

          <!-- 自定义插槽 -->
          <slot
            v-else-if="field.type === 'slot'"
            :name="field.slotName"
            :field="field"
            :value="formData[field.prop]"
            :form-data="formData"
          ></slot>

          <!-- 默认输入框 -->
          <el-input
            v-else
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            @input="handleFieldChange(field.prop, $event)"
            @change="handleFieldChange(field.prop, $event)"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 默认按钮 -->
    <el-form-item v-if="showDefaultButtons">
      <el-button type="primary" :icon="submitIcon" :loading="submitLoading" @click="handleSubmit">
        {{ submitText }}
      </el-button>
      <el-button :icon="resetIcon" @click="handleReset">
        {{ resetText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "EluGridForm",
  props: {
    // 表单配置
    config: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 表单数据
    model: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: "auto",
    },
    // 标签位置
    labelPosition: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right", "top"].includes(value),
    },
    // 尺寸
    size: {
      type: String,
      default: "small",
      validator: (value) => ["medium", "small", "mini"].includes(value),
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 行内表单
    inline: {
      type: Boolean,
      default: true,
    },
    // 是否显示验证信息
    showMessage: {
      type: Boolean,
      default: true,
    },
    // 是否以行内形式显示验证信息
    inlineMessage: {
      type: Boolean,
      default: false,
    },
    // 是否在输入框中显示校验结果图标
    statusIcon: {
      type: Boolean,
      default: false,
    },
    // 是否在 rules 属性改变后立即触发一次验证
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    // 是否隐藏必填字段的标签旁边的红色星号
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
    // 是否显示默认按钮
    showDefaultButtons: {
      type: Boolean,
      default: true,
    },
    // 提交按钮文本
    submitText: {
      type: String,
      default: "查询",
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: "重置",
    },
    // 提交时是否显示loading
    submitLoading: {
      type: Boolean,
      default: false,
    },
    // 提交按钮图标
    submitIcon: {
      type: String,
      default: "el-icon-search",
    },
    // 重置按钮图标
    resetIcon: {  
      type: String,
      default: "el-icon-refresh",
    },
    // 栅格布局相关属性
    // 行间距
    rowGutter: {
      type: [Number, String],
      default: 0,
    },
    // 水平排列方式
    rowJustify: {
      type: String,
      default: "start",
      validator: (value) => ["start", "end", "center", "space-around", "space-between"].includes(value),
    },
    // 垂直排列方式
    rowAlign: {
      type: String,
      default: "top",
      validator: (value) => ["top", "middle", "bottom"].includes(value),
    },
    // 行标签
    rowTag: {
      type: String,
      default: "div",
    },
    // 默认列宽度
    defaultColSpan: {
      type: [Number, String],
      default: 6,
    },
  },
  data() {
    return {
      formData: this.model,
      // 动态选项数据缓存
      dynamicOptions: {},
      // 加载状态缓存
      loadingStates: {},
      // 已加载的字段缓存
      loadedFields: new Set(),
    };
  },
  computed: {
    // 表单配置
    formConfig() {
      return this.config;
    },
    // 表单验证规则
    formRules() {
      const rules = {};
      this.config.forEach((field) => {
        if (field.prop && field.rules) {
          rules[field.prop] = field.rules;
        }
      });
      return rules;
    },
  },
  watch: {
    model: {
      handler(newVal) {
        this.formData = newVal;
      },
      deep: true,
    },
  },
  async mounted() {
    // 初始化时加载需要立即加载的动态选项
    // loadImmediate 默认为 true，如果字段配置了 api 且没有明确设置为 false，则立即加载
    const immediateFields = this.config.filter(
      (field) => field.api && field.loadImmediate !== false
    );
    const promises = immediateFields.map((field) =>
      this.loadFieldOptions(field)
    );
    await Promise.all(promises);
  },
  methods: {
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        } else {
          this.$emit("validate-error");
          return false;
        }
      });
    },

    // 重置表单
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit("reset");
    },

    // 字段值变化
    handleFieldChange(prop, value) {
      this.$emit("field-change", prop, value, this.formData);
    },

    // 字段失焦
    handleFieldBlur(prop, event) {
      this.$emit("field-blur", prop, event, this.formData);
    },

    // 字段聚焦
    handleFieldFocus(prop, event) {
      this.$emit("field-focus", prop, event, this.formData);
    },

    // 验证表单
    validate(callback) {
      return this.$refs.form.validate(callback);
    },

    // 验证表单的某个字段
    validateField(prop, callback) {
      return this.$refs.form.validateField(prop, callback);
    },

    // 重置表单字段
    resetFields() {
      return this.$refs.form.resetFields();
    },

    // 清除验证信息
    clearValidate(props) {
      return this.$refs.form.clearValidate(props);
    },

    // 滚动到指定字段
    scrollToField(prop) {
      return this.$refs.form.scrollToField(prop);
    },

    // 获取字段的选项数据
    getFieldOptions(prop) {
      const field = this.config.find((f) => f.prop === prop);
      if (!field) return [];

      // 如果有动态数据源，优先使用动态数据
      if (this.dynamicOptions[prop]) {
        return this.dynamicOptions[prop];
      }

      // 否则使用静态选项
      return field.options || [];
    },

    // 获取字段的加载状态
    getFieldLoading(prop) {
      return this.loadingStates[prop] || false;
    },

    // 处理选择器显示状态变化
    async handleSelectVisibleChange(field, visible) {
      if (visible && field.api && !this.loadedFields.has(field.prop)) {
        await this.loadFieldOptions(field);
      }
    },

    // 加载字段选项数据
    async loadFieldOptions(field) {
      const { prop, api, apiParams = {}, transformResponse } = field;

      // 如果已经加载过，直接返回
      if (this.loadedFields.has(prop)) {
        return;
      }

      // 设置加载状态
      this.$set(this.loadingStates, prop, true);

      try {
        // 调用API获取数据
        let response;
        if (typeof api === "function") {
          // 如果是函数，直接调用
          response = await api(apiParams);
        } else if (typeof api === "string") {
          // 如果是字符串，作为URL进行GET请求
          response = await this.$http.get(api, { params: apiParams });
        } else {
          throw new Error("API配置无效");
        }

        // 转换响应数据
        let options = response;
        if (transformResponse && typeof transformResponse === "function") {
          options = transformResponse(response);
        } else if (response && response.data) {
          options = response.data;
        }

        // 验证选项数据格式
        if (!Array.isArray(options)) {
          console.warn(`字段 ${prop} 的选项数据格式不正确，应为数组`);
          options = [];
        }

        // 缓存选项数据
        this.$set(this.dynamicOptions, prop, options);
        this.loadedFields.add(prop);

        // 触发选项加载完成事件
        this.$emit("options-loaded", prop, options);
      } catch (error) {
        console.error(`加载字段 ${prop} 的选项数据失败:`, error);
        this.$emit("options-load-error", prop, error);
      } finally {
        // 清除加载状态
        this.$set(this.loadingStates, prop, false);
      }
    },

    // 手动刷新字段选项
    async refreshFieldOptions(prop) {
      const field = this.config.find((f) => f.prop === prop);
      if (field && field.api) {
        // 清除缓存
        this.loadedFields.delete(prop);
        this.$delete(this.dynamicOptions, prop);

        // 重新加载
        await this.loadFieldOptions(field);
      }
    },

    // 批量刷新所有动态选项
    async refreshAllOptions() {
      const dynamicFields = this.config.filter((field) => field.api);
      const promises = dynamicFields.map((field) =>
        this.refreshFieldOptions(field.prop)
      );
      await Promise.all(promises);
    },

    // 处理级联选择器展开变化
    handleCascaderExpandChange(prop, expandedOptions) {
      this.$emit("cascader-expand-change", prop, expandedOptions, this.formData);
    },

    // 上传成功
    handleUploadSuccess(prop, response, file, fileList) {
      this.$emit("upload-success", prop, response, file, fileList, this.formData);
    },

    // 上传失败
    handleUploadError(prop, err, file, fileList) {
      this.$emit("upload-error", prop, err, file, fileList, this.formData);
    },

    // 上传进度
    handleUploadProgress(prop, event, file, fileList) {
      this.$emit("upload-progress", prop, event, file, fileList, this.formData);
    },

    // 超出限制
    handleUploadExceed(prop, files, fileList) {
      this.$emit("upload-exceed", prop, files, fileList, this.formData);
    },

    // 文件状态改变
    handleUploadChange(prop, file, fileList) {
      this.$emit("upload-change", prop, file, fileList, this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
}
.el-row{
  width: 100%;
}
/* 栅格布局下的样式调整 */
.el-col {
  .el-form-item {
    width: 100%;
    
    /* 确保表单控件占满整个列宽度 */
    .el-input,
    .el-select,
    .el-radio-group,
    .el-checkbox-group,
    .el-date-picker,
    .el-time-picker,
    .el-input-number,
    .el-slider,
    .el-switch,
    .el-rate,
    .el-color-picker,
    .el-cascader,
    .el-upload {
      width: 100%;
    }
    
    /* 确保 el-form-item__content 占满宽度 */
    .el-form-item__content {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    
    /* 特殊处理某些组件 */
    .el-input-number {
      .el-input__inner {
        width: 100%;
      }
    }
    
    .el-slider {
      .el-slider__runway {
        width: 100%;
      }
    }
    
    .el-rate {
      display: flex;
      align-items: center;
    }
    
    .el-switch {
      display: inline-block;
    }
    
    .el-upload {
      .el-upload-dragger {
        width: 100%;
      }
    }
    
    /* 确保单选框和复选框组占满宽度 */
    .el-radio-group,
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    
    /* 确保级联选择器占满宽度 */
    .el-cascader {
      width: 100%;
    }
  }
}

/* 自定义样式 */
.json-form {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.json-form .el-form-item {
  margin-bottom: 18px;
}

.json-form .el-form-item__label {
  font-weight: 500;
  color: #333;
}

.json-form .el-input__inner,
.json-form .el-textarea__inner {
  border-radius: 4px;
}

.json-form .el-button {
  border-radius: 4px;
  font-weight: 500;
}

.json-form .el-button + .el-button {
  margin-left: 10px;
}
</style> 