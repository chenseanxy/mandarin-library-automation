<template>
  <div>
    <el-card class="searchbook-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input v-model="input" placeholder="Please enter title / author / publisher / ISBN "></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="search">Search</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="title" prop="bookname"></el-table-column>
        <el-table-column label="author" prop="author"></el-table-column>
        <el-table-column label="Categroy" prop="publisher"></el-table-column>
        <el-table-column label="ISBN" prop="isbn">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="state">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="operation" fixed="right">
          <template>
            <el-tooltip class="item" effect="dark" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-reading" @click="reserve" circle></el-button>
            </el-tooltip>
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
      input: '',
      booklist: [],
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    reserve() {
      this.$router.push("/ReaderHome/ReaderSearchBook");
      return this.$message.success("Cancel the reservation!");
    },
    search() {
    this.$router.push("/ReaderHome/ReaderSearchNewBook");
    return this.$message.success("Go to search page!");
	},
    getBookList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.booklist = [
          {
            bookname: "Villa in heavy snow",
            author: "Higashino Keigo",
            publisher: "Math",
            isbn: "00001",
            status: "reserved"
          },
          {
            bookname: "Ten Mile Peach",
            author: "Tang Qigongzi",
            publisher: "Geography",
            isbn: "00002",
            status: "Not loaned"
          },
          {
            bookname: "Why Sheng XiaoMo",
            author: "Gu Man",
            publisher: "Science",
            isbn: "00003",
            status: "loaned out"
          },
          {
            bookname: "Brief history of humanity",
            author: "[Israel] Yuval Herali",
            publisher: "History",
            isbn: "00004",
            status: "Not loaned"
          },
          {
            bookname: "Those things in the Ming Dynasty",
            author: "DangNianMingYue",
            publisher: "History",
            isbn: "00005",
            status: "loaned out"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            bookname: "The road less traveled",
            author: "M. Scott Peck",
            publisher: "History",
            isbn: "00006",
            status: "Not loaned",
          },
          {
            bookname: "The search for meaning in life",
            author: " Victor Frank",
            publisher: "History",
            isbn: "00007",
            status: "Not loaned"
          },
          {
            bookname: "Secret Garden",
            author: " Johanna Basford",
            publisher: "Math",
            isbn: "00008",
            status: "Not loaned"
          }
        ];
      }
      this.total = 8;
    },
    judgeType(status) {
      if (status == "loaned out") return "success";
      if (status == "reserved") return "danger";
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

