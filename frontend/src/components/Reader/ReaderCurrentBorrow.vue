<template>
  <div>

    <el-container>
      <el-main>
        <h2>There will be an email alert 30 days before the due date！</h2>
      </el-main>
    </el-container>

    <el-card class="searchbook-card" shadow="hover">
      
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Press" prop="publisher"></el-table-column>
        <el-table-column label="ISBN" prop="isbn">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
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
      booklist: [],
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.booklist = [
          {
            bookname: "Things in Ming Dynasty",
            author: "Dang Nian Mingyue",
            publisher: "China customs press",
            isbn: "9787801656087",
            status: "Borrowing"
          }
        ];
      }
      
      this.total = 1;
      this.$message.success("Get the list of books successfully");
    },
    judgeType(status) {
      if (status == "Available") return "success";
      if (status == "Lost") return "danger";
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
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 20px;
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
</style>

