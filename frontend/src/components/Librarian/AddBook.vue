<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="addBook-card" shadow="hover">
      <el-alert title="Click the button below to add a book" center type="info" show-icon></el-alert>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button
            type="primary"
            style="width:100%"
            @click="dialogVisible = true"
          >Click here to add books</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="Add books"
        :visible.sync="dialogVisible"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          ref="addBookFormRef"
          :model="addBookForm"
          :rules="addBookFormRules"
          label-width="140px"
          style="padding-right:40px;"
        >
          <el-form-item label="Book title" prop="booktitle">
            <el-input
              v-model.number="addBookForm.booktitle"
              prefix-icon="el-icon-notebook-2"
              placeholder="Please enter the booktitle"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Author" prop="author">
            <el-input
              v-model="addBookForm.author"
              prefix-icon="el-icon-user"
              placeholder="Please enter the author`s name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Publisher" prop="publisher">
            <el-input
              v-model="addBookForm.publisher"
              prefix-icon="el-icon-office-building"
              placeholder="Please enter the publisher"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input
              v-model="addBookForm.isbn"
              prefix-icon="el-icon-document-remove"
              placeholder="Please enter the ISBN"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <barcode style="text-align:center;" :value="this.addBookForm.isbn" :margin="0" :height="60">Enter ISBN to show barcode.</barcode>
        <span slot="footer">
          <div>
            <el-button @click="cancelAddBook">Cancel</el-button>
            <el-button type="success" @click="completeAddBook">Complete</el-button>
          </div>
        </span>
      </el-dialog>
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
        <!-- <el-table-column label = "操作" fixed="right"></el-table-column> -->
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
      dialogVisible: false,
      booklist: [],
      pagenum: 1,
      total: 0,
      addBookForm: {
        booktitle: "",
        author: "",
        publisher: "",
        isbn: ""
      }
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
            bookname: "大雪中的山庄",
            author: "东野圭吾",
            publisher: "北京十月文艺出版社",
            isbn: "9787530216835",
            status: "在馆"
          },
          {
            bookname: "三生三世 十里桃花",
            author: "唐七公子",
            publisher: "沈阳出版社",
            isbn: "9787544138000",
            status: "在馆"
          },
          {
            bookname: "何以笙箫默",
            author: "顾漫",
            publisher: "朝华出版社",
            isbn: "9787505414709",
            status: "遗失"
          },
          {
            bookname: "人类简史",
            author: "[以色列] 尤瓦尔·赫拉利",
            publisher: "中信出版社",
            isbn: "9787508647357",
            status: "在馆"
          },
          {
            bookname: "明朝那些事儿",
            author: "当年明月",
            publisher: "中国海关出版社",
            isbn: "9787801656087",
            status: "已借出"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            bookname: "少有人走的路",
            author: "M·斯科特·派克",
            publisher: "吉林文史出版社",
            isbn: "9787807023777",
            status: "在馆"
          },
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
          }
        ];
      }
      this.total = 8;
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
    },
    cancelAddBook() {
      this.dialogVisible = false;
      this.$refs.addBookFormRef.resetFields();
    },
    completeAddBook() {
      this.dialogVisible = false;
      this.$refs.addBookFormRef.resetFields();   
      this.$message.success("Add a book successfully");   
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.addBook-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
.el-alert {
  margin-bottom: 15px;
}
</style>

