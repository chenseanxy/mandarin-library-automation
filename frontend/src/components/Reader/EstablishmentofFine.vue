<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>读者首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>罚金缴纳</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="searchbook-card" shadow="hover">
      <el-row :gutter="20">
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="username" prop="username"></el-table-column>
        <el-table-column label="fine pending" prop="finepending"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :total="total"
        page-size="5"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marginlist: [],
      pagenum: 1,
      total: 1
    };
  },
  created() {
    this.getMarginList();
  },
  methods: {
    getMarginList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.booklist = [
          {
            username: "user1",
            finepending:"$0",
            status: "已缴纳"
          },
         
        ];
      }
      
      this.$message.success("获取罚金信息成功");
    },
    judgeType(status) {
      if (status == "已缴纳") return "success";
      if (status == "未缴纳") return "danger";
      else return "info";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getBookList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.searchbook-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>

