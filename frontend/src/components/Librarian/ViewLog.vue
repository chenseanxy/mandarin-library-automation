<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看操作日志</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="viewlog-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="请输入 操作人 / 书籍ID / 类型 / 时间"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">搜索日志</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="loglist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="操作人" prop="name"></el-table-column>
        <el-table-column label="书籍名称" prop="bookname"></el-table-column>
        <el-table-column label="书籍ID" prop="bookid"></el-table-column>
        <el-table-column label="操作时间" prop="time"></el-table-column>
        <el-table-column label="操作类型">
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
            bookname: "大雪中的山庄",
            name: "Librarian",
            time: "2020-03-10 17:28:31",
            bookid: "9787530216835",
            operation: "修改"
          },
          {
            bookname: "三生三世 十里桃花",
            name: "Librarian",
            time: "2020-03-09 15:28:30",
            bookid: "9787544138000",
            operation: "新增"
          },
          {
            bookname: "何以笙箫默",
            name: "Librarian",
            time: "2020-03-05 17:28:59",
            bookid: "9787505414709",
            operation: "新增"
          },
          {
            bookname: "人类简史",
            name: "Librarian",
            time: "2020-03-01 18:28:00",
            bookid: "9787508647357",
            operation: "新增"
          },
          {
            bookname: "画的秘密",
            name: "Librarian",
            time: "2020-03-01 11:04:07",
            bookid: "9787550265608",
            operation: "删除"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.loglist = [
          {
            bookname: "明朝那些事儿",
            name: "Librarian",
            time: "2020-02-29 11:24:08",
            bookid: "9787801656087",
            operation: "新增"
          },
          {
            bookname: "大雪中的山庄",
            name: "Librarian",
            time: "2020-02-28 17:27:01",
            bookid: "9787530216835",
            operation: "新增"
          },
          {
            bookname: "少有人走的路",
            name: "Librarian",
            time: "2020-02-28 07:48:07",
            bookid: "9787807023777",
            operation: "新增"
          },
          {
            bookname: "追寻生命的意义",
            name: "Librarian",
            time: "2020-02-14 11:18:22",
            bookid: "9787501162734",
            operation: "新增"
          },
          {
            bookname: "秘密花园",
            name: "Librarian",
            time: "2020-02-10 12:27:41",
            bookid: "9787550252585",
            operation: "新增"
          }
        ];
      }
      if (this.pagenum == 3) {
        this.loglist = [
          {
            bookname: "画的秘密",
            name: "Librarian",
            time: "2020-02-09 11:21:22",
            bookid: "9787550265608",
            operation: "新增"
          }
        ];
      }
      this.total = 11;
      this.$message.success("获取日志成功");
    },
    judgeType(status) {
      if (status == "新增") return "success";
      if (status == "删除") return "danger";
      else return "warning";
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
