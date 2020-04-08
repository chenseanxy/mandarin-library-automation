<template>
  <div>

    <el-card class="searchbook-card" shadow="hover">
      
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="图书名" prop="bookname"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="出版社" prop="publisher"></el-table-column>
        <el-table-column label="ISBN" prop="isbn">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template>
            <el-tooltip class="item" effect="dark" content="重新借阅" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-reading" circle></el-button>
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
            bookname: "追寻生命的意义",
            author: "[奥] 维克多·弗兰克",
            publisher: "新华出版社",
            isbn: "9787501162734",
            status: "在馆"
          },
          {
            bookname: "秘密花园",
            author: "乔汉娜·贝斯福",
            publisher: "北京联合出版公司",
            isbn: "9787550252585",
            status: "在馆"
          },
          {
            bookname: "何以笙箫默",
            author: "顾漫",
            publisher: "朝华出版社",
            isbn: "9787505414709",
            status: "遗失"
          }
        ];
      }
      
      this.total = 1;
      this.$message.success("获取书籍列表成功");
    },
    judgeType(status) {
      if (status == "在馆") return "success";
      if (status == "遗失") return "danger";
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

