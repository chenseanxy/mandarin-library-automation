<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Book management</el-breadcrumb-item>
      <el-breadcrumb-item>Search for Books</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="searchbook-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="Please enter book ID / book title / author / category "></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="width:100%">Search</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe :data="booklist">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="booklist-expand">
              <el-form-item label="Book ID ">
                <el-popover placement="right" width="300" close-delay="200" trigger="hover">
                  <el-link :underline="false" slot="reference">{{scope.row.book_id}}</el-link>
                  <barcode
                    style="text-align:center"
                    :value="scope.row.book_id"
                  >Fail to show barcode.</barcode>
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
        <el-table-column label="Book ID" prop="book_id" width="100">
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
        <el-table-column label="Operation" fixed="right" width="160px">
          <template slot-scope="scope">
            <el-popover placement="left" width="500" trigger="click" @hide="cancelEditBook(scope.$index)">
              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                @click="startEditBook(scope.row.book_id,scope.row.bookname,scope.row.author,scope.row.location,scope.row.state,scope.row.category,scope.row.price)"
                :loading="editbookformvisible"
                circle
              ></el-button>
              <h3 style="text-align: center;">Edit Book</h3>
              <el-form
                v-if="editbookformvisible"
                :ref="`${scope.$index}-editBookFormRef`"
                :model="editBookForm"
                :rules="editBookFormRules"
                label-width="120px"
                style="padding-right:20px;"
                size="small"
              >
                <el-form-item label="Book ID" prop="book_id">
                  <el-input
                    v-model="editBookForm.book_id"
                    placeholder="Please enter the book ID"
                    :disabled="true"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Book title" prop="booktitle">
                  <el-input
                    v-model.trim="editBookForm.booktitle"
                    placeholder="Please enter the booktitle"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Author" prop="author">
                  <el-input
                    v-model.trim="editBookForm.author"
                    placeholder="Please enter the author`s name"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Category" prop="category">
                  <el-input
                    v-model.trim="editBookForm.category"
                    placeholder="Please enter the category"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Location" prop="location">
                  <el-input
                    type="textarea"
                    v-model="editBookForm.location"
                    placeholder="Please enter the location"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Price (￥)" prop="price">
                  <el-input-number
                    style="width:100%"
                    v-model="editBookForm.price"
                    placeholder="Please enter the price"
                    clearable
                    :min="1"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="State" prop="state">
                  <el-select
                    v-model="editBookForm.state"
                    style="width:100%"
                    placeholder="Please choose the state"
                  >
                    <el-option value="Not loaned"></el-option>
                    <el-option value="Lost"></el-option>
                    <el-option value="Loaned out"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button type="text" @click="cancelEditBook(scope.$index)" size="mini">Cancel</el-button>
                <el-button
                  style="margin-left:10px;"
                  type="primary"
                  @click="completeEditBook(scope.$index)"
                  size="mini"
                >Modify</el-button>
              </div>
            </el-popover>
            <el-popconfirm
              :title="'Are you sure to DELETE '+scope.row.bookname+' ?'"
              confirmButtonText="Delete"
              @onConfirm="completeDeleteBook"
              cancelButtonText="Cancel"
              confirmButtonType="danger"
            >
              <el-button
                slot="reference"
                style="margin-left:10px;"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-popconfirm>
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
      total: 0,
      editbookformvisible: false,
      editBookForm: {
        booktitle: "",
        author: "",
        location: "",
        book_id: "",
        state: "",
        category: "",
        price: ""
      },
      editBookFormRules: {
        booktitle: [
          {
            required: true,
            message: "Please enter the booktitle",
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
        state: [
          {
            required: true,
            message: "Please choose the state",
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
    startEditBook(book_id, bookname, author, location, state, category, price) {
      this.editbookformvisible = true;
      this.editBookForm.book_id = book_id;
      this.editBookForm.booktitle = bookname;
      this.editBookForm.author = author;
      this.editBookForm.location = location;
      this.editBookForm.state = state;
      this.editBookForm.category = category;
      this.editBookForm.price = price;
    },
    cancelEditBook(index) {
      // 下面这行语句用于关闭popover窗口
      document.querySelector("#app").click();
      this.$refs[`${index}-editBookFormRef`].resetFields();
      setTimeout(() => {
        this.editbookformvisible = false;
      }, 200);
    },
    completeEditBook(index) {
      this.$refs[`${index}-editBookFormRef`].validate(async valid => {
        if (!valid) return;
        // 在这里添加后端交互
        document.querySelector("#app").click();
        this.$message.success("Modifying book succeeded");
        setTimeout(() => {
        this.editbookformvisible = false;
      }, 200);
      });
    },
    completeDeleteBook() {
      // 在这里添加后端交互
      this.$message.success("Deleting book succeeded");
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
.booklist-expand {
  font-size: 0;
}
.booklist-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>

