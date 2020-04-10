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
          <el-form-item label="Book title" prop="bookname">
            <el-input
              v-model="addBookForm.bookname"
              prefix-icon="el-icon-notebook-2"
              placeholder="Please enter the book title"
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
          <el-form-item label="Price (￥)" prop="price">
            <el-input-number
              style="width:100%"
              v-model="addBookForm.price"
              placeholder="Please enter the price"
              clearable
              :min="1"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <div>
            <el-button @click="cancelAddBook">Cancel</el-button>
            <el-button type="success" @click="completeAddBook">Complete</el-button>
          </div>
        </span>
      </el-dialog>
      <el-divider></el-divider>
      <el-table stripe :data="booklist">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="booklist-expand">
              <el-form-item label="Book id ">
                <el-popover placement="right" width="300" close-delay="200" trigger="hover">
                  <el-link :underline="false" slot="reference">{{scope.row.book_id}}</el-link>
                  <barcode style="text-align:center" :value="scope.row.book_id">Fail to show barcode.</barcode>
                </el-popover>
              </el-form-item>
              <el-form-item label="Book title ">
                <span>{{ scope.row.bookname }}</span>
              </el-form-item>
              <el-form-item label="Author ">
                <span>{{ scope.row.author }}</span>
              </el-form-item>
              <el-form-item label="Category ">
                <span>{{ scope.row.category }}</span>
              </el-form-item>
              <el-form-item label="Location ">
                <span>{{ scope.row.location }}</span>
              </el-form-item>
              <el-form-item label="Price ">
                <span>￥ {{ scope.row.price }}</span>
              </el-form-item>
              <el-form-item label="State ">
                <el-tag :type="judgeType(scope.row.state)" effect="dark">{{scope.row.state}}</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="Book id" prop="book_id" width="100">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.book_id}}</el-link>
              <barcode style="text-align:center" :value="scope.row.book_id">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Category" prop="category"></el-table-column>
        <el-table-column label="Price" prop="price">
          <template slot-scope="scope">
            <span>￥ {{ scope.row.price }}</span>
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
        bookname: "",
        author: "",
        category: "",
        location: "",
        price: ""
      },
      addBookFormRules: {
        bookname: [
          {
            required: true,
            message: "Please enter the book title",
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
        ]
      },
      
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
            book_id: "00001",
            bookname: "Villa in heavy snow",
            author: "Higashino Keigo",
            category: "Math",
            location: "2 floor, bookcase No.34",
            price: "23",
            state: "Not loaned"
          },
          {
            book_id: "00002",
            bookname: "Ten Mile Peach",
            author: "Tang Qigongzi",
            category: "Geography",
            location: "3 floor, bookcase No.44",
            price: "34",
            state: "Not loaned"
          },
          {
            book_id: "00003",
            bookname: "Why Sheng Xiaomo",
            author: "Gu Man",
            category: "Science",
            location: "5 floor, bookcase No.3",
            price: "53",
            state: "Lost"
          },
          {
            book_id: "00004",
            bookname: "Brief history of humanity",
            author: "[Israel] Yuval Herali",
            category: "History",
            location: "2 floor, bookcase No.13",
            price: "46",
            state: "Not loaned"
          },
          {
            book_id: "00005",
            bookname: "Those things in the Ming Dynasty",
            author: "DangNianMingyue",
            category: "History",
            location: "1 floor, bookcase No.66",
            price: "55",
            state: "Loaned out"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            book_id: "00006",
            bookname: "Few people",
            author: "M. Scott Parker",
            category: "Social",
            location: "4 floor, bookcase No.43",
            price: "53",
            state: "Not loaned"
          },
          {
            book_id: "00007",
            bookname: "Pursuing the meaning of life",
            author: "[Austria] Victor Frank",
            category: "Human",
            location: "3 floor, bookcase No.22",
            price: "47",
            state: "Not loaned"
          },
          {
            book_id: "00008",
            bookname: "Secret garden",
            author: "Johanna Besford",
            category: "Art",
            location: "5 floor, bookcase No.37",
            price: "75",
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
.booklist-expand {
  font-size: 0;
}
.booklist-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
<style>
/* <style>与<style scoped>的区别是前者会影响所有页面的样式，后者scoped属性会限制 */
/* 该组件的style的作用域，无法作用于其他element组件。通常情况，使用<style scoped> */
.booklist-expand label {
  width: 120px;
  font-weight: bold;
  color: #99a9bf;
}
</style>


