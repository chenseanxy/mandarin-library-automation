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
          <el-input placeholder="Please enter book title / author / publisher / ISBN "></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="width:100%">Search</el-button>
        </el-col>
      </el-row>
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
        <el-table-column label="Operation" fixed="right" width="160px">
          <template slot-scope="scope">
            <el-popover placement="left" width="500" trigger="click">
              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                @click="startEditBook(scope.row.isbn,scope.row.bookname,scope.row.author,scope.row.publisher,scope.row.status)"
                circle
              ></el-button>
              <h3 style="text-align: center;">Edit Book</h3>
              <el-form
                ref="editBookFormRef"
                :model="editBookForm"
                :rules="editBookFormRules"
                label-width="120px"
                style="padding-right:20px;"
                size="small"
              >
                <el-form-item label="ISBN" prop="isbn">
                  <el-input
                    v-model="editBookForm.isbn"
                    placeholder="Please enter the ISBN"
                    :disabled="true"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Book title" prop="booktitle">
                  <el-input
                    v-model="editBookForm.booktitle"
                    placeholder="Please enter the booktitle"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Author" prop="author">
                  <el-input
                    v-model="editBookForm.author"
                    placeholder="Please enter the author`s name"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Publisher" prop="publisher">
                  <el-input
                    type="textarea"
                    v-model="editBookForm.publisher"
                    placeholder="Please enter the publisher"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="Status" prop="status">
                  <el-select
                    v-model="editBookForm.status"
                    style="width:100%"
                    placeholder="Please choose the status"
                  >
                    <el-option value="Not loaned"></el-option>
                    <el-option value="Lost"></el-option>
                    <el-option value="Loaned out"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button type="text" @click="cancelEditBook()" size="mini">Cancel</el-button>
                <el-button
                  style="margin-left:10px;"
                  type="primary"
                  @click="completeEditBook()"
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
      editBookForm: {
        booktitle: "",
        author: "",
        publisher: "",
        isbn: "",
        status: ""
      },
      editBookFormRules: {
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
        ],
        status: [
          {
            required: true,
            message: "Please choose the status",
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
    startEditBook(isbn, bookname, author, publisher, status) {
      this.editBookForm.isbn = isbn;
      this.editBookForm.booktitle = bookname;
      this.editBookForm.author = author;
      this.editBookForm.publisher = publisher;
      this.editBookForm.status = status;
    },
    cancelEditBook() {
      // 下面这行语句用于关闭popover窗口
      document.querySelector("#app").click();
    },
    completeEditBook() {
      document.querySelector("#app").click();
      this.$message.success("Modifying book succeeded");
    },
    completeDeleteBook() {
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
</style>

