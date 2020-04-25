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
          <el-input placeholder="Please enter librarian account "></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="width:100%">Search</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      
      <!--这里是table的内容，这里把data改成liblist -->
      <el-table stripe max-height="500" :data="booklist">
      
        <!-- <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Account" prop="account"></el-table-column>
        <el-table-column label="Email" prop="Email"></el-table-column>
        <el-table-column label="Password" prop="password"></el-table-column> -->
        
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Publisher" prop="publisher"></el-table-column>
        
        
        <el-table-column label="ISBN" prop="isbn">
          <!--这一段可以删了，是一段弹出式对话框，鼠标移动到显示-->
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        
        <!--这是状态那一列-->
        <el-table-column label="State">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        
        <!--两个操作那一列，在这里admin也要实现编辑和删除-->
        <el-table-column label="Operation" fixed="right" width="160px">
          <template slot-scope="scope">
            
            <!--这是我暂时写的，得会你还是得用底下的，弹窗-->
            <!-- <el-popover placement="left" width="500" trigger="click">
              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-popover> -->

            <!--这是弹出式悬浮框，点击弹出-->
            <el-popover placement="left" width="500" trigger="click">
              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                @click="startEditBook(scope.row.isbn,scope.row.bookname,scope.row.author,scope.row.publisher,scope.row.status)"
                circle
              ></el-button>

              
              <!--这是弹出来的修改框,我先暂时注释掉了-->
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
            
            <!--这是删除时弹出的确认框-->
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

            <!--account删除时的弹框，应该修改好了-->
            <!-- <el-popconfirm
              :title="'Are you sure to DELETE '+scope.row.bookname+' ?'"
              confirmButtonText="Delete"
              @onConfirm="completeDeleteAccount"
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
            </el-popconfirm> -->

          </template>
        
        </el-table-column>
      </el-table>

      <!--最下面的导航栏，应该修改好了-->
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

      //lib属性1
      // liblist: [],
      // editLibForm: {
      //   account: "",
      //   Email: "",
      //   password: "",
      //   status: ""
      // },

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
      },
        
        //lib属性2
      // editLibFormRules: {
      //     account: [
      //     {
      //       required: true,
      //       message: "Please enter account",
      //       trigger: "blur"
      //     }
      //   ],
      //     Email: [
      //     {
      //       required: true,
      //       message: "Please enter the Email",
      //       trigger: "blur"
      //     }
      //   ],
      //     password: [
      //     {
      //       required: true,
      //       message: "Please enter the password",
      //       trigger: "blur"
      //     }
      //   ],
      //     status: [
      //     {
      //       required: true,
      //       message: "Please choose the status",
      //       trigger: "blur"
      //     }
      //   ]
      // }
    };
  },


  created() {
    this.getBookList();
  },

  // created() {
  //   this.getLibList();
  // },

  methods: {
    
    //这里返回图书信息
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


    //这里返回lib信息
    // getLibList() {
    //   // 修改这里以从后端调取信息
    //   if (this.pagenum == 1) {
    //     this.liblist = [
    //       {
    //         account: "Villa",
    //         Email: "abcde@qq.com",
    //         password: "Beijing",
    //         status: "Normal"
    //       },
    //       {
    //         account: "Sheng",
    //         Email: "GuMan@qq.com",
    //         password: "Beijing",
    //         status: "Lost"
    //       },
    //       {
    //         account: "Brief",
    //         Email: "Yuval@qq.com",
    //         password: "9787508647357",
    //         status: "Normal"
    //       },
    //       {
    //         account: "Ming",
    //         Email: "ang@qq.com",
    //         password: "0165608",
    //         status: "Normal"
    //       },
    //       {
    //         account: "ghadfjksdh",
    //         Email: "dsakh@qq.com",
    //         password: "0ajdksl",
    //         status: "Normal"
    //       }
    //     ];
    //   }
    //   if (this.pagenum == 2) {
    //     this.booklist = [
    //       {
    //         account: "fhkadj",
    //         Email: "faihd@qq.com",
    //         password: "fkhjas",
    //         status: "Normal"
    //       },
    //       {
    //         account: "lfadhs",
    //         Email: "lfkhasj@qq.com",
    //         password: "falcsdjakl",
    //         status: "Normal"
    //       },
    //       {
    //         account: "flhask",
    //         Email: "iuyfdsjkfhd@qq.com",
    //         password: "fidushifs",
    //         status: "Normal"
    //       }
    //     ];
    //   }
    //   this.total = 8;
    //   this.$message.success("Fetching book list succeeded");
    // },


    judgeType(status) {
      if (status == "Not loaned") return "success";
      if (status == "Lost") return "danger";
      else return "info";
    },

    //给状态设置底色
    // judgeType(status) {
    //   if (status == "Normal") return "success";
    //   if (status == "Lost") return "danger";
    //   else return "info";
    // },

    
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getBookList();
    },

    //跳到下一页获取信息
    // handleCurrentChange(newPage) {
    //   this.pagenum = newPage;
    //   this.getLibList();
    // },

    //这几行是用来加书的函数
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
      this.$refs.editBookFormRef.validate(async valid => {
        if (!valid) return;
        document.querySelector("#app").click();
        this.$message.success("Modifying book succeeded");
      });
    },
    //这是删书的函数，已经没用了
    completeDeleteBook() {
      this.$message.success("Deleting book succeeded");
    },

    //删除账号
    completeDeleteAccount() {
      this.$message.success("Deleting account succeeded");
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

