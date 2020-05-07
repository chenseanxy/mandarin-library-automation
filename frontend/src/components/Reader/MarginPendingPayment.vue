<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Reader Main Page</el-breadcrumb-item>
      <el-breadcrumb-item>Account Management</el-breadcrumb-item>
      <el-breadcrumb-item>Margin To Pay</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="searchbook-card" shadow="hover">
      <el-row :gutter="20">
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="username" prop="username"></el-table-column>
        <el-table-column label="margin pending" prop="marginpending"></el-table-column>
        <el-table-column label="status">
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
            marginpending:"$300",
            status: "Paid"
          },
         
        ];
      }
      
      this.$message.success("Successfully obtaining margin information");
    },
    judgeType(status) {
      if (status == "Paid") return "success";
      if (status == "To pay") return "danger";
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

