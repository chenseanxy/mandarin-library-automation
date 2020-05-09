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
        book_id: "",
        bookname: "",
        author: "",
        category: "",
        location: "",
        price: 1,
        state:"not loaned"
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
      }
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      this.$http.post("/api/user/search_all",{
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.booklist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.booklist.push(table[i]);
            }
            console.log(res);
        });
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
    completeAddBook(){
      var bookname=this.addBookForm.bookname;
      var author=this.addBookForm.author;
      var category=this.addBookForm.category;
      var location=this.addBookForm.loctaion;
      var price=this.addBookForm.price;
      var state=this.addBookForm.state;

      this.dialogVisible = false;
      this.$refs.addBookFormRef.resetFields();

      this.$http.post("/api/user/check_id",{
          }).then((res) => {
            var now=res.body[0].value;
           
            var book_id=now.toString();
            var zero="";
            for(var i=book_id.length;i<5;i++){
              zero=zero+"0";
            }
            book_id=zero+book_id;
            
            this.$http.post("/api/user/addbook",{
              book_id:book_id,
              bookname:bookname,
              author:author,
              category:category,
              location:location,
              price:price,
              state:state
            }).then((res) => {
              console.log(res);
              this.$message.success("Add a book successfully");
              this.getBookList();
              this.$http.post("/api/user/change_id",{
              }).then((res) => {
                console.log(res);
              });
              this.getBookList();
            });
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


