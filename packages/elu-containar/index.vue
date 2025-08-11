<template>
  <div class="page-container">
    <el-card v-if="isHeader" class="hr-card__header">
      <slot name="header"></slot>
    </el-card>

    <el-row
      :gutter="10"
      :style="{ height: isHeader ? 'calc(100% - 58px)' : '100%' }"
    >
      <el-col v-if="isAside" :span="4" class="h-full">
        <el-card class="h-full">
          <slot name="aside"> </slot>
        </el-card>
      </el-col>
      <el-col :span="isAside ? 20 : 24" class="h-full">
        <el-card class="h-full" style="padding: 24px 5px 24px 20px">
          <slot></slot>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EluContainar",

  props: {
    isHeader: {
      type: Boolean,
      default: true,
    },
    isAside: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding-left: 10px;
  padding-right: 10px;

  height: 100%;
}

.avue-view {
  padding-bottom: unset;
}

::v-deep .el-card__body {
  padding: unset;
}

.hr-card__header {
  height: 48px;
  border-radius: 6px;
  margin-bottom: 10px;
  padding-left: 31px;

  ::v-deep .el-tabs__item {
    height: 48px;
    line-height: 48px;
  }

  ::v-deep .el-tabs__header {
    margin: unset;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    opacity: 0;
  }
}

.h-full {
  height: 100%;

  ::v-deep .el-card__body {
    height: 100%;
  }
}
</style>
