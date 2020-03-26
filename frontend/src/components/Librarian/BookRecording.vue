<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>借还缴罚记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="viewlog-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-input placeholder="请输入 操作人 / 读者账户 / 书籍名称 / 书籍ID / 操作时间 / 操作类别"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button-group>
          <el-button type="primary">搜索借还记录</el-button>
          <el-button type="primary">搜索缴罚记录</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="loglist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="操作人" prop="name"></el-table-column>
        <el-table-column label="读者账户" prop="readeraccount"></el-table-column>
        <el-table-column label="书籍名称" prop="bookname"></el-table-column>
        <el-table-column label="书籍ID" prop="bookid"></el-table-column>
        <el-table-column label="操作时间" prop="time" min-width="85px"></el-table-column>
        <el-table-column label="金额" prop="arrears"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.operation)" effect="dark">{{scope.row.operation}}</el-tag>
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
      loglist: [],
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    getLogList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.loglist = [
          {
            bookname: "明朝那些事儿",
            readeraccount: "18000000003",
            name: "Librarian",
            time: "2020-03-01 14:24:08",
            bookid: "9787801656087",
            operation: "借出"
          },
          {
            bookname: "明朝那些事儿",
            readeraccount: "18000000003",
            name: "18000000003",
            arrears: "5.00",
            bookid: "9787801656087",
            operation: "欠费未缴"
          }
        ];
      }
      this.total = 2;
      this.$message.success("获取记录成功");
    },
    judgeType(status) {
      if (status == "欠费未缴") return "danger";
      if (status == "欠费已缴") return "info";
      return "primary";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getLogList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.viewlog-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>


