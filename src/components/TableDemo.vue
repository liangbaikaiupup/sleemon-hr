<template>
  <div class="table-demo">
    <h1>EluTable 表格组件演示</h1>
    
    <!-- 基础表格演示 -->
    <div class="demo-section">
      <h2>基础表格</h2>
      <elu-table
        :data="tableData"
        :columns="basicColumns"
        :show-toolbar="true"
        :show-selection="true"
        :show-index="true"
        :show-actions="true"
        :show-pagination="true"
        :total="tableData.length"
        @refresh="handleRefresh"
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
        @selection-change="handleSelectionChange"
        @page-change="handlePageChange"
      >
        <!-- 自定义工具栏 -->
        <template #toolbar-left>
          <el-button size="small" type="success" @click="handleExport">
            导出
          </el-button>
        </template>
        
        <!-- 自定义操作列 -->
        <template #actions="{ row, $index }">
          <el-button size="small" type="primary" link @click="handleView(row)">
            查看
          </el-button>
          <el-button size="small" type="success" link @click="handleEdit(row, $index)">
            编辑
          </el-button>
          <el-button size="small" type="danger" link @click="handleDelete(row, $index)">
            删除
          </el-button>
        </template>
      </elu-table>
    </div>

    <!-- 高级表格演示 -->
    <div class="demo-section">
      <h2>高级表格（排序、筛选、格式化）</h2>
      <elu-table
        :data="tableData"
        :columns="advancedColumns"
        :stripe="true"
        :border="true"
        :show-toolbar="true"
        :show-selection="true"
        :show-actions="true"
        :show-pagination="true"
        :total="tableData.length"
        :page-sizes="[5, 10, 20, 50]"
        @refresh="handleRefresh"
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
        @sort-change="handleSortChange"
        @filter-change="handleFilterChange"
        @selection-change="handleSelectionChange"
        @page-change="handlePageChange"
      >
        <!-- 自定义状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
        
        <!-- 自定义日期列 -->
        <template #createTime="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </elu-table>
    </div>

    <!-- 展开表格演示 -->
    <div class="demo-section">
      <h2>展开表格</h2>
      <elu-table
        :data="tableData"
        :columns="expandColumns"
        :show-expand="true"
        :show-actions="true"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        <!-- 自定义展开内容 -->
        <template #expand="{ row }">
          <div class="expand-detail">
            <h4>详细信息</h4>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="姓名">{{ row.name }}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{ row.age }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ row.email }}</el-descriptions-item>
              <el-descriptions-item label="地址">{{ row.address }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag :type="getStatusType(row.status)">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">{{ formatDate(row.createTime) }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </elu-table>
    </div>

    <!-- 单选表格演示 -->
    <div class="demo-section">
      <h2>单选表格</h2>
      <elu-table
        :data="tableData"
        :columns="radioColumns"
        :show-radio="true"
        :show-actions="true"
        :selected-row-key="selectedRowKey"
        @radio-change="handleRadioChange"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        <!-- 自定义操作列 -->
        <template #actions="{ row, $index }">
          <el-button size="small" type="primary" link @click="handleView(row)">
            查看
          </el-button>
          <el-button size="small" type="success" link @click="handleEdit(row, $index)">
            编辑
          </el-button>
        </template>
      </elu-table>
      
      <!-- 单选结果展示 -->
      <div v-if="selectedRow" class="radio-info">
        <h4>当前选中：</h4>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="姓名">{{ selectedRow.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ selectedRow.age }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ selectedRow.email }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(selectedRow.status)">
              {{ getStatusText(selectedRow.status) }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <div class="radio-actions">
          <el-button size="small" @click="clearRadioSelection">清空选择</el-button>
        </div>
      </div>
    </div>

    <!-- 选择结果展示 -->
    <div v-if="selectedRows.length > 0" class="selection-info">
      <h4>已选择 {{ selectedRows.length }} 项：</h4>
      <el-tag
        v-for="row in selectedRows"
        :key="row.id"
        closable
        @close="removeSelection(row)"
      >
        {{ row.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableDemo",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "张三",
          age: 25,
          email: "zhangsan@example.com",
          address: "北京市朝阳区",
          status: 1,
          createTime: "2024-01-15 10:30:00",
        },
        {
          id: 2,
          name: "李四",
          age: 30,
          email: "lisi@example.com",
          address: "上海市浦东新区",
          status: 2,
          createTime: "2024-01-16 14:20:00",
        },
        {
          id: 3,
          name: "王五",
          age: 28,
          email: "wangwu@example.com",
          address: "广州市天河区",
          status: 1,
          createTime: "2024-01-17 09:15:00",
        },
        {
          id: 4,
          name: "赵六",
          age: 35,
          email: "zhaoliu@example.com",
          address: "深圳市南山区",
          status: 3,
          createTime: "2024-01-18 16:45:00",
        },
        {
          id: 5,
          name: "钱七",
          age: 27,
          email: "qianqi@example.com",
          address: "杭州市西湖区",
          status: 2,
          createTime: "2024-01-19 11:30:00",
        },
      ],
      selectedRows: [],
      selectedRow: null,
      selectedRowKey: null,
      basicColumns: [
        {
          prop: "name",
          label: "姓名",
          width: 120,
          sortable: true,
        },
        {
          prop: "age",
          label: "年龄",
          width: 80,
          sortable: true,
        },
        {
          prop: "email",
          label: "邮箱",
          minWidth: 200,
          showOverflowTooltip: true,
        },
        {
          prop: "address",
          label: "地址",
          minWidth: 200,
          showOverflowTooltip: true,
        },
      ],
      advancedColumns: [
        {
          prop: "name",
          label: "姓名",
          width: 120,
          sortable: true,
          filters: [
            { text: "张三", value: "张三" },
            { text: "李四", value: "李四" },
            { text: "王五", value: "王五" },
          ],
          filterMethod: (value, row) => row.name === value,
        },
        {
          prop: "age",
          label: "年龄",
          width: 80,
          sortable: true,
          formatter: (row, column, cellValue) => `${cellValue}岁`,
        },
        {
          prop: "email",
          label: "邮箱",
          minWidth: 200,
          showOverflowTooltip: true,
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          slot: "status",
          filters: [
            { text: "正常", value: 1 },
            { text: "禁用", value: 2 },
            { text: "删除", value: 3 },
          ],
          filterMethod: (value, row) => row.status === value,
        },
        {
          prop: "createTime",
          label: "创建时间",
          width: 180,
          slot: "createTime",
          sortable: true,
        },
      ],
      expandColumns: [
        {
          prop: "name",
          label: "姓名",
          width: 120,
        },
        {
          prop: "age",
          label: "年龄",
          width: 80,
        },
        {
          prop: "email",
          label: "邮箱",
          minWidth: 200,
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          slot: "status",
        },
      ],
      radioColumns: [
        {
          prop: "name",
          label: "姓名",
          width: 120,
        },
        {
          prop: "age",
          label: "年龄",
          width: 80,
        },
        {
          prop: "email",
          label: "邮箱",
          minWidth: 200,
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          slot: "status",
        },
      ],
    };
  },
  methods: {
    // 工具栏事件
    handleRefresh() {
      this.$message.success("刷新成功");
    },
    handleAdd() {
      this.$message.info("点击了新增按钮");
    },
    handleExport() {
      this.$message.success("导出成功");
    },

    // 操作列事件
    handleView(row) {
      this.$message.info(`查看用户：${row.name}`);
    },
    handleEdit(row, index) {
      this.$message.info(`编辑用户：${row.name}，索引：${index}`);
    },
    handleDelete(row, index) {
      this.$confirm(`确定要删除用户 ${row.name} 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message.success("删除成功");
      }).catch(() => {
        this.$message.info("已取消删除");
      });
    },

    // 表格事件
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handleRadioChange(row) {
      this.selectedRow = row;
      this.selectedRowKey = row ? row.id : null;
      this.$message.info(row ? `选中用户：${row.name}` : "已清空选择");
    },
    handleSortChange({ prop, order }) {
      this.$message.info(`排序：${prop} ${order}`);
    },
    handleFilterChange() {
      this.$message.info("筛选条件变化");
    },
    handlePageChange(page) {
      this.$message.info(`切换到第 ${page} 页`);
    },

    // 移除选择
    removeSelection(row) {
      const index = this.selectedRows.findIndex(item => item.id === row.id);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    },
    clearRadioSelection() {
      this.selectedRow = null;
      this.selectedRowKey = null;
      this.$message.info("已清空单选");
    },

    // 工具方法
    getStatusType(status) {
      const statusMap = {
        1: "success",
        2: "warning",
        3: "danger",
      };
      return statusMap[status] || "info";
    },
    getStatusText(status) {
      const statusMap = {
        1: "正常",
        2: "禁用",
        3: "删除",
      };
      return statusMap[status] || "未知";
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleString("zh-CN");
    },
  },
};
</script>

<style lang="scss" scoped>
.table-demo {
  padding: 20px;

  h1 {
    margin-bottom: 30px;
    color: #303133;
    text-align: center;
  }

  .demo-section {
    margin-bottom: 40px;

    h2 {
      margin-bottom: 20px;
      color: #606266;
      font-size: 18px;
      border-left: 4px solid #409eff;
      padding-left: 12px;
    }
  }

  .selection-info {
    margin-top: 20px;
    padding: 16px;
    background-color: #f5f7fa;
    border-radius: 4px;

    h4 {
      margin-bottom: 12px;
      color: #606266;
    }

    .el-tag {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }

  .expand-detail {
    padding: 16px;

    h4 {
      margin-bottom: 16px;
      color: #303133;
    }
  }

  .radio-info {
    margin-top: 20px;
    padding: 16px;
    background-color: #f0f9ff;
    border-radius: 4px;
    border: 1px solid #b3d8ff;

    h4 {
      margin-bottom: 12px;
      color: #606266;
    }

    .radio-actions {
      margin-top: 12px;
    }
  }
}
</style> 