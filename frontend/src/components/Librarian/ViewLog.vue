<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Book management</el-breadcrumb-item>
      <el-breadcrumb-item>View operation log</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="viewlog-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="Please enter the operator / book ID / type / time"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="width:100%">Search logs</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="loglist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Operator" prop="name"></el-table-column>
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Book ID" prop="bookid">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.bookid}}</el-link>
              <barcode style="text-align:center" :value="scope.row.bookid">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operation time" prop="time"></el-table-column>
        <el-table-column label="Operation type">
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
      if (this.pagenum == 1) {
        this.loglist = [
          {
            bookname: "Villa in heavy snow",
            name: "Librarian",
            time: "2020-03-10 17:28:31",
            bookid: "9787530216835",
            operation: "Modify"
          },
          {
            bookname: "Ten Mile Peach",
            name: "Librarian",
            time: "2020-03-09 15:28:30",
            bookid: "9787544138000",
            operation: "Add"
          },
          {
            bookname: "Why Sheng Xiaomo",
            name: "Librarian",
            time: "2020-03-05 17:28:59",
            bookid: "9787505414709",
            operation: "Add"
          },
          {
            bookname: "Brief history of humanity",
            name: "Librarian",
            time: "2020-03-01 18:28:00",
            bookid: "9787508647357",
            operation: "Add"
          },
          {
            bookname: "Painting secrets",
            name: "Librarian",
            time: "2020-03-01 11:04:07",
            bookid: "9787550265608",
            operation: "Delete"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.loglist = [
          {
            bookname: "Those things in the Ming Dynasty",
            name: "Librarian",
            time: "2020-02-29 11:24:08",
            bookid: "9787801656087",
            operation: "Add"
          },
          {
            bookname: "Villa in heavy snow",
            name: "Librarian",
            time: "2020-02-28 17:27:01",
            bookid: "9787530216835",
            operation: "Add"
          },
          {
            bookname: "Few people",
            name: "Librarian",
            time: "2020-02-28 07:48:07",
            bookid: "9787807023777",
            operation: "Add"
          },
          {
            bookname: "Pursuing the meaning of life",
            name: "Librarian",
            time: "2020-02-14 11:18:22",
            bookid: "9787501162734",
            operation: "Add"
          },
          {
            bookname: "Secret garden",
            name: "Librarian",
            time: "2020-02-10 12:27:41",
            bookid: "9787550252585",
            operation: "Add"
          }
        ];
      }
      if (this.pagenum == 3) {
        this.loglist = [
          {
            bookname: "Painting secrets",
            name: "Librarian",
            time: "2020-02-09 11:21:22",
            bookid: "9787550265608",
            operation: "Add"
          }
        ];
      }
      this.total = 11;
      this.$message.success("Get log successfully");
    },
    judgeType(status) {
      if (status == "Add") return "success";
      if (status == "Delete") return "danger";
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
