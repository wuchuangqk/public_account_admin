<template>
  <div class="app-page">
    <header class="app-search">
      <el-button type="primary" @click="$refs['content-form'].open()"
        >添加</el-button
      >
    </header>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中，请稍候……"
    >
      <el-table-column label="内容" prop="info"></el-table-column>
      <el-table-column label="结算周期" prop="settcycle_id"></el-table-column>
      <el-table-column label="二维码地址" prop="pic"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.form.open(scope.row.id)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="app-pagination-wrap">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="searchParams.pageSize"
        :current-page="searchParams.pageIndex"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <PublishForm ref="form" @update-data="fetchData"></PublishForm>
    <ContentForm ref="content-form" @update-data="fetchData"></ContentForm>
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import PublishForm from "./publish-form.vue";
import ContentForm from "./content-form.vue";
import { getPublishList } from "@/api/publish";
export default {
  mixins: [listMixin],
  components: { PublishForm, ContentForm },
  data() {
    return {
      tableData: [{ content: "sdfsdfs" }],
    };
  },
  methods: {
    // 获取发布内容列表
    fetchData() {
      getPublishList(this.searchParams).then((res) => {
        this.hideLoading();
        this.tableData = res.data;
      });
      this.showLoading();
    },
  },
  mounted() {
    // 获取发布内容列表
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>
