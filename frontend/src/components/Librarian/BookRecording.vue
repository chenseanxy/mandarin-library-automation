<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Reader account management</el-breadcrumb-item>
      <el-breadcrumb-item>Borrowing - Penalty records</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="viewlog-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input placeholder="Please enter the operator / account / book ID / book title"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button style="width:100%" type="primary">Search for loan and return records</el-button>
        </el-col>
      </el-row>
      <p style="padding:0px;"></p>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input placeholder="Please enter the operator / account / book ID / book title"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button style="width:100%" type="warning">Search for penalty records</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="loglist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Operator" prop="name"></el-table-column>
        <el-table-column label="Account" prop="readeraccount"></el-table-column>
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Book ID" prop="bookid">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.bookid}}</el-link>
              <barcode style="text-align:center" :value="scope.row.bookid">Fail to show barcode.</barcode>
            </el-popover>
          </template>          
        </el-table-column>
        <el-table-column label="Operation time" prop="time" min-width="85px"></el-table-column>
        <el-table-column label="Amount" prop="arrears"></el-table-column>
        <el-table-column label="Status">
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
            bookname: "Those things in the Ming Dynasty",
            readeraccount: "18000000003",
            name: "Librarian",
            time: "2020-03-01 14:24:08",
            bookid: "9787801656087",
            operation: "Loan out"
          },
          {
            bookname: "Those things in the Ming Dynasty",
            readeraccount: "18000000003",
            name: "18000000003",
            arrears: "5.00",
            bookid: "9787801656087",
            operation: "In arrears"
          }
        ];
      }
      this.total = 2;
      this.$message.success("Record successfully obtained");
    },
    judgeType(status) {
      if (status == "In arrears") return "danger";
      if (status == "Arrears paid") return "info";
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


