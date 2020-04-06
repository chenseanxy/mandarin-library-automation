<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Book management</el-breadcrumb-item>
      <el-breadcrumb-item>Add books</el-breadcrumb-item>
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
              v-model="addBookForm.booktitle"
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
        <barcode
          style="text-align:center;"
          :value="this.addBookForm.isbn"
          :margin="0"
          :height="60"
        >Enter ISBN to show barcode.</barcode>
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
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Publisher" prop="publisher"></el-table-column>
        <el-table-column label="ISBN" prop="isbn">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="State">
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
      dialogVisible: false,
      booklist: [],
      pagenum: 1,
      total: 0,
      addBookForm: {
        booktitle: "",
        author: "",
        publisher: "",
        isbn: ""
      },
      addBookFormRules: {
        booktitle: [
          {
            required: true,
            message: "Please enter the booktitle",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "Please enter the author",
            trigger: "blur"
          }
        ],
        publisher: [
          {
            required: true,
            message: "Please enter the publisher",
            trigger: "blur"
          }
        ],
        isbn: [
          {
            required: true,
            message: "Please enter the ISBN",
            trigger: "blur"
          }
        ]
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
            bookname: "Villa in heavy snow",
            author: "Higashino Keigo",
            publisher: "Beijing October Literature and Art Publishing House",
            isbn: "9787530216835",
            status: "Not loaned"
          },
          {
            bookname: "Ten Mile Peach",
            author: "Tang Qigongzi",
            publisher: "Shenyang Publishing House",
            isbn: "9787544138000",
            status: "Not loaned"
          },
          {
            bookname: "Why Sheng Xiaomo",
            author: "Gu Man",
            publisher: "Chaohua Publishing House",
            isbn: "9787505414709",
            status: "Lost"
          },
          {
            bookname: "Brief history of humanity",
            author: "[Israel] Yuval Herali",
            publisher: "CITIC Publishing House",
            isbn: "9787508647357",
            status: "Not loaned"
          },
          {
            bookname: "Those things in the Ming Dynasty",
            author: "DangNianMingyue",
            publisher: "China Customs Press",
            isbn: "9787801656087",
            status: "Loaned out"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            bookname: "Few people",
            author: "M. Scott Parker",
            publisher: "Jilin Literature and History Press",
            isbn: "9787807023777",
            status: "Not loaned"
          },
          {
            bookname: "Pursuing the meaning of life",
            author: "[Austria] Victor Frank",
            publisher: "Xinhua Publishing House",
            isbn: "9787501162734",
            status: "Not loaned"
          },
          {
            bookname: "Secret garden",
            author: "Johanna Besford",
            publisher: "Beijing United Publishing Company",
            isbn: "9787550252585",
            status: "Not loaned"
          }
        ];
      }
      this.total = 8;
      this.$message.success("Fetching book list succeeded");
    },
    judgeType(status) {
      if (status == "Not loaned") return "success";
      if (status == "Lost") return "danger";
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
      this.$refs.addBookFormRef.validate(async valid => {
        if (!valid) return false;
        this.dialogVisible = false;
        this.$refs.addBookFormRef.resetFields();
        this.$message.success("Add a book successfully");
      });
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

