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
          <el-form-item label="Book id" prop="book_id">
            <el-input
              v-model="addBookForm.book_id"
              prefix-icon="el-icon-reading"
              placeholder="Please enter the Book id"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Book title" prop="bookname">
            <el-input
              v-model="addBookForm.bookname"
              prefix-icon="el-icon-notebook-2"
              placeholder="Please enter the bookname"
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
          <el-form-item label="Category" prop="category">
            <el-input
              v-model="addBookForm.category"
              prefix-icon="el-icon-folder"
              placeholder="Please enter the category"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Location" prop="location">
            <el-input
              v-model="addBookForm.location"
              prefix-icon="el-icon-location"
              placeholder="Please enter the location"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input
              v-model="addBookForm.price"
              prefix-icon="el-icon-coin"
              placeholder="Please enter the price"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="ISBN">
            <el-input
              v-model="addBookForm.ISBN"
              prefix-icon="el-icon-document-remove"
              placeholder="Please enter the ISBN"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <barcode
          style="text-align:center;"
          :value="this.addBookForm.ISBN"
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
        <el-table-column label="Book id" prop="book_id"></el-table-column>
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Publisher" prop="publisher"></el-table-column>
        <el-table-column label="Category" prop="category"></el-table-column>
        <el-table-column label="Location" prop="location"></el-table-column>
        <el-table-column label="Price" prop="price"></el-table-column>
        <el-table-column label="ISBN" prop="ISBN">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.ISBN}}</el-link>
              <barcode style="text-align:center" :value="scope.row.ISBN">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="State">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.state)" effect="dark">{{scope.row.state}}</el-tag>
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
        book_id: "",
        bookname: "",
        author: "",
        publisher: "",
        ISBN: "",
        category: "",
        location: "",
        price: ""
      },
      addBookFormRules: {
        book_id: [
          {
            required: true,
            message: "Please enter the book_id",
            trigger: "blur"
          }
        ],
        bookname: [
          {
            required: true,
            message: "Please enter the bookname",
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
        category: [
          {
            required: true,
            message: "Please enter the category",
            trigger: "blur"
          }
        ],
        location: [
          {
            required: true,
            message: "Please enter the location",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Please enter the price",
            trigger: "blur"
          }
        ],
        ISBN: [
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
            book_id: "1",
            bookname: "Villa in heavy snow",
            author: "Higashino Keigo",
            publisher: "Beijing October Literature and Art Publishing House",
            category: "Math",
            location: "2 floor, bookcase No.34",
            price: "23",
            ISBN: "9787530216835",
            state: "Not loaned"
          },
          {
            book_id: "2",
            bookname: "Ten Mile Peach",
            author: "Tang Qigongzi",
            publisher: "Shenyang Publishing House",
            category: "Geography",
            location: "3 floor, bookcase No.44",
            price: "34",
            ISBN: "9787544138000",
            state: "Not loaned"
          },
          {
            book_id: "3",
            bookname: "Why Sheng Xiaomo",
            author: "Gu Man",
            publisher: "Chaohua Publishing House",
            category: "Science",
            location: "5 floor, bookcase No.3",
            price: "53",
            ISBN: "9787505414709",
            state: "Lost"
          },
          {
            book_id: "4",
            bookname: "Brief history of humanity",
            author: "[Israel] Yuval Herali",
            publisher: "CITIC Publishing House",
            category: "History",
            location: "2 floor, bookcase No.13",
            price: "46",
            ISBN: "9787508647357",
            state: "Not loaned"
          },
          {
            book_id: "5",
            bookname: "Those things in the Ming Dynasty",
            author: "DangNianMingyue",
            publisher: "China Customs Press",
            category: "History",
            location: "1 floor, bookcase No.66",
            price: "55",
            ISBN: "9787801656087",
            state: "Loaned out"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            book_id: "6",
            bookname: "Few people",
            author: "M. Scott Parker",
            publisher: "Jilin Literature and History Press",
            category: "Social",
            location: "4 floor, bookcase No.43",
            price: "53",
            ISBN: "9787807023777",
            state: "Not loaned"
          },
          {
            book_id: "7",
            bookname: "Pursuing the meaning of life",
            author: "[Austria] Victor Frank",
            publisher: "Xinhua Publishing House",
            category: "Human",
            location: "3 floor, bookcase No.22",
            price: "47",
            ISBN: "9787501162734",
            state: "Not loaned"
          },
          {
            book_id: "8",
            bookname: "Secret garden",
            author: "Johanna Besford",
            publisher: "Beijing United Publishing Company",
            category: "Art",
            location: "5 floor, bookcase No.37",
            price: "75",
            ISBN: "9787550252585",
            state: "Not loaned"
          }
        ];
      }
      this.total = 8;
      this.$message.success("Fetching book list succeeded");
    },
    judgeType(state) {
      if (state == "Not loaned") return "success";
      if (state == "Lost") return "danger";
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


