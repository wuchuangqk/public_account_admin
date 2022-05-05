<template>
  <div class="app-page">
    <header class="app-search">
      <el-button type="primary">发布</el-button>
    </header>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中，请稍候……"
    >
      <el-table-column label="项目介绍" prop="content"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-pagination-wrap">
      <el-pagination
        background
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="searchParams.pageSize"
        :current-page="searchParams.pageIndex"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  data() {
    return {
      tableData: [
        {content: 'sdfsdfs'}
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
