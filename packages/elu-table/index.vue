<template>
  <div class="elu-table">
    <!-- 表格工具栏 -->
    <div v-if="showToolbar" class="elu-table__toolbar">
      <div class="elu-table__toolbar-left">
        <slot name="toolbar-left"></slot>
      </div>
      <div class="elu-table__toolbar-right">
        <slot name="toolbar-right">
          <!-- <el-button
            v-if="showRefresh"
            :size="size"
            icon="el-icon-refresh"
            @click="handleRefresh"
          >
            刷新
          </el-button>
          <el-button
            v-if="showAdd"
            :size="size"
            type="primary"
            icon="el-icon-plus"
            @click="handleAdd"
          >
            新增
          </el-button> -->
        </slot>
      </div>
    </div>

    <!-- 表格主体 -->
    <el-table
      ref="table"
      :data="tableData"
      v-bind="$attrs"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      :table-layout="tableLayout"
      :scrollbar-always-on="scrollbarAlwaysOn"
      :flexible="flexible"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        :width="selectionWidth"
        :fixed="selectionFixed"
        :reserve-selection="reserveSelection"
        :selectable="selectable"
      ></el-table-column>

      <!-- 单选列 -->
      <el-table-column
        v-if="showRadio"
        :label="radioLabel"
        :width="radioWidth"
        :fixed="radioFixed"
        :align="radioAlign"
      >
        <template #default="scope">
          <el-radio
            v-model="radioValue"
            :value="getRowKey(scope.row)"
            :label="getRowKey(scope.row)"
          >
            <span></span>
          </el-radio>
        </template>
      </el-table-column>

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel"
        :width="indexWidth"
        :fixed="indexFixed"
        :align="indexAlign"
      ></el-table-column>

      <!-- 展开列 -->
      <el-table-column
        v-if="showExpand"
        type="expand"
        :width="expandWidth"
        :fixed="expandFixed"
      >
        <template #default="scope">
          <slot name="expand" :row="scope.row" :$index="scope.$index" :column="scope.column">
            <div class="elu-table__expand-content">
              {{ scope.row }}
            </div>
          </slot>
        </template>
      </el-table-column>

      <!-- 动态列 -->
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
      >
        <!-- 自定义表头 -->
        <template #header="scope" v-if="column.headerSlot">
          <slot :name="column.headerSlot" :column="scope.column" :$index="scope.$index"></slot>
        </template>

        <!-- 自定义内容 -->
        <template #default="scope" v-if="column.slot">
          <slot :name="column.slot" :row="scope.row" :$index="scope.$index" :column="scope.column">
            <!-- 默认内容 -->
            <span v-if="column.formatter">
              {{ column.formatter(scope.row, scope.column, scope.row[column.prop], scope.$index) }}
            </span>
            <span v-else>
              {{ scope.row[column.prop] }}
            </span>
          </slot>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="showActions"
        :label="actionsLabel"
        :width="actionsWidth"
        :fixed="actionsFixed"
        :align="actionsAlign"
      >
        <template #default="scope">
          <slot name="actions" :row="scope.row" :$index="scope.$index" :column="scope.column">
            <!-- 默认操作按钮 -->
            <el-button
              v-if="showEdit"
              :size="size"
              type="primary"
              link
              @click="handleEdit(scope.row, scope.$index)"
            >
              编辑
            </el-button>
            <el-button
              v-if="showDelete"
              :size="size"
              type="danger"
              link
              @click="handleDelete(scope.row, scope.$index)"
            >
              删除
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div v-if="showPagination" class="elu-table__pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="total"
        :small="paginationSmall"
        :background="paginationBackground"
        :pager-count="pagerCount"
        :hide-on-single-page="hideOnSinglePage"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "EluTable",
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    // 列配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 表格高度
    height: {
      type: [String, Number],
      default: null,
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default: null,
    },
    // 是否为斑马纹表格
    stripe: {
      type: Boolean,
      default: false,
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: true,
    },
    // 尺寸
    size: {
      type: String,
      default: "small",
      validator: (value) => ["medium", "small", "mini"].includes(value),
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: true,
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 是否要高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    // 当前行的 key，只写属性
    currentRowKey: {
      type: [String, Number],
      default: null,
    },
    // 行的 className 的回调方法
    rowClassName: {
      type: [String, Function],
      default: null,
    },
    // 行的 style 的回调方法
    rowStyle: {
      type: [Object, Function],
      default: null,
    },
    // 单元格的 className 的回调方法
    cellClassName: {
      type: [String, Function],
      default: null,
    },
    // 单元格的 style 的回调方法
    cellStyle: {
      type: [Object, Function],
      default: null,
    },
    // 表头行的 className 的回调方法
    headerRowClassName: {
      type: [String, Function],
      default: null,
    },
    // 表头行的 style 的回调方法
    headerRowStyle: {
      type: [Object, Function],
      default: null,
    },
    // 表头单元格的 className 的回调方法
    headerCellClassName: {
      type: [String, Function],
      default: null,
    },
    // 表头单元格的 style 的回调方法
    headerCellStyle: {
      type: [Object, Function],
      default: null,
    },
    // 行数据的 Key，用来优化 Table 的渲染
    rowKey: {
      type: [String, Function],
      default: null
    },
    // 空数据时显示的文本内容
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    // 是否默认展开所有行
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 展开行的 keys 数组
    // expandRowKeys: {
    //   type: Array,
    //   default: () => [],
    // },
    // 默认的排序列的 prop 和顺序
    defaultSort: {
      type: Object,
      default: () => ({}),
    },
    // tooltip effect 属性
    tooltipEffect: {
      type: String,
      default: "dark",
    },
    // 是否在表尾显示合计行
    showSummary: {
      type: Boolean,
      default: false,
    },
    // 合计行第一列的文本
    sumText: {
      type: String,
      default: "合计",
    },
    // 自定义的合计计算方法
    summaryMethod: {
      type: Function,
      default: null,
    },
    // 合并行或列的计算方法
    spanMethod: {
      type: Function,
      default: null,
    },
    // 在多选表格中，当仅有部分行被选中时，点击表头的全选框时的行为
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    // 展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16,
    },
    // 是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: false,
    },
    // 加载子节点数据的方法
    load: {
      type: Function,
      default: null,
    },
    // 渲染嵌套数据的配置选项
    treeProps: {
      type: Object,
      default: () => ({
        hasChildren: "hasChildren",
        children: "children",
      }),
    },
    // 设置表格单元、行和列的布局方式
    tableLayout: {
      type: String,
      default: "fixed",
    },
    // 总是显示滚动条
    scrollbarAlwaysOn: {
      type: Boolean,
      default: false,
    },
    // 为表格设置最大高度
    flexible: {
      type: Boolean,
      default: false,
    },

    // 工具栏相关
    showToolbar: {
      type: Boolean,
      default: false,
    },
    showRefresh: {
      type: Boolean,
      default: true,
    },
    showAdd: {
      type: Boolean,
      default: true,
    },

    // 选择列相关
    showSelection: {
      type: Boolean,
      default: false,
    },
    selectionWidth: {
      type: [String, Number],
      default: 55,
    },
    selectionFixed: {
      type: [String, Boolean],
      default: false,
    },
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Function,
      default: null,
    },

    // 单选相关
    showRadio: {
      type: Boolean,
      default: false,
    },
    radioWidth: {
      type: [String, Number],
      default: 55,
    },
    radioFixed: {
      type: [String, Boolean],
      default: false,
    },
    radioLabel: {
      type: String,
      default: "选择",
    },
    radioAlign: {
      type: String,
      default: "center",
    },
    selectedRow: {
      type: Object,
      default: null,
    },
    selectedRowKey: {
      type: [String, Number],
      default: null,
    },

    // 序号列相关
    showIndex: {
      type: Boolean,
      default: false,
    },
    indexLabel: {
      type: String,
      default: "序号",
    },
    indexWidth: {
      type: [String, Number],
      default: 60,
    },
    indexFixed: {
      type: [String, Boolean],
      default: false,
    },
    indexAlign: {
      type: String,
      default: "center",
    },

    // 展开列相关
    showExpand: {
      type: Boolean,
      default: false,
    },
    expandWidth: {
      type: [String, Number],
      default: 50,
    },
    expandFixed: {
      type: [String, Boolean],
      default: false,
    },

    // 操作列相关
    showActions: {
      type: Boolean,
      default: false,
    },
    actionsLabel: {
      type: String,
      default: "操作",
    },
    actionsWidth: {
      type: [String, Number],
      default: 150,
    },
    actionsFixed: {
      type: [String, Boolean],
      default: "right",
    },
    actionsAlign: {
      type: String,
      default: "center",
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },

    // 分页相关
    showPagination: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    total: {
      type: Number,
      default: 0,
    },
    paginationLayout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    paginationSmall: {
      type: Boolean,
      default: false,
    },
    paginationBackground: {
      type: Boolean,
      default: true,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "select",
    "select-all",
    "selection-change",
    "radio-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change",
    "refresh",
    "add",
    "edit",
    "delete",
    "size-change",
    "page-change",
  ],
  data() {
    return {
      tableData: this.data,
      internalSelectedRowKey: this.selectedRowKey,
    };
  },
  computed: {
    // 单选状态计算属性
    radioValue: {
      get() {
        return this.internalSelectedRowKey;
      },
      set(value) {
        this.internalSelectedRowKey = value;
        const selectedRow = this.tableData.find(row => this.getRowKey(row) === value);
        this.$emit("radio-change", selectedRow || null);
      }
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.tableData = newVal;
      },
      deep: true,
    },
    selectedRowKey: {
      handler(newVal) {
        this.internalSelectedRowKey = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    // 表格事件处理
    handleSelect(selection, row) {
      this.$emit("select", selection, row);
    },
    handleSelectAll(selection) {
      this.$emit("select-all", selection);
    },
    handleSelectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    handleCellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    handleCellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    handleCellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    handleCellDblclick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    handleRowClick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    handleRowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    handleRowDblclick(row, column, event) {
      this.$emit("row-dblclick", row, column, event);
    },
    handleHeaderClick(column, event) {
      this.$emit("header-click", column, event);
    },
    handleHeaderContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    handleSortChange({ column, prop, order }) {
      this.$emit("sort-change", { column, prop, order });
    },
    handleFilterChange(filters) {
      this.$emit("filter-change", filters);
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("current-change", currentRow, oldCurrentRow);
    },
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    handleExpandChange(row, expandedRows) {
      this.$emit("expand-change", row, expandedRows);
    },

    // 工具栏事件处理
    handleRefresh() {
      this.$emit("refresh");
    },
    handleAdd() {
      this.$emit("add");
    },

    // 操作列事件处理
    handleEdit(row, index) {
      this.$emit("edit", row, index);
    },
    handleDelete(row, index) {
      this.$emit("delete", row, index);
    },

    // 分页事件处理
    handleSizeChange(size) {
      this.$emit("size-change", size);
    },
    handlePageChange(page) {
      this.$emit("page-change", page);
    },

    // 公共方法
    // 获取表格实例
    getTable() {
      return this.$refs.table;
    },

    // 设置当前行
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },

    // 切换行选择状态
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },

    // 切换全选状态
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },

    // 清空选择
    clearSelection() {
      this.$refs.table.clearSelection();
    },

    // 清空排序
    clearSort() {
      this.$refs.table.clearSort();
    },

    // 清空筛选
    clearFilter(columnKeys) {
      this.$refs.table.clearFilter(columnKeys);
    },

    // 手动排序
    doLayout() {
      this.$refs.table.doLayout();
    },

    // 排序
    sort(prop, order) {
      this.$refs.table.sort(prop, order);
    },

    // 单选相关方法
    // 获取行的唯一标识
    getRowKey(row) {
      if (this.rowKey) {
        return typeof this.rowKey === 'function' ? this.rowKey(row) : row[this.rowKey];
      }
      return row.id || row.key || JSON.stringify(row);
    },

    // 设置选中的行
    setSelectedRow(row) {
      this.$emit("radio-change", row);
    },

    // 获取选中的行
    getSelectedRow() {
      return this.selectedRow;
    },

    // 清空单选选择
    clearRadioSelection() {
      this.$emit("radio-change", null);
    },
  },
};
</script>

<style lang="scss" scoped>
.elu-table {
  .elu-table__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 16px;
    padding: 8px 0;

    .elu-table__toolbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .elu-table__toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .elu-table__pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    padding: 8px 0;
  }

  .elu-table__expand-content {
    padding: 16px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
}
</style> 