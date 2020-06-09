<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Reader account management</el-breadcrumb-item>
      <el-breadcrumb-item>Borrowing - Penalty records</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="viewlog-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input 
          v-model="SearchForm1.search_id"
          placeholder="Please enter the operator / account / book ID / book title">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button 
          style="width:100%" 
          @click="search_for_loan_and_return"
          type="primary">Search for loan and return records</el-button>
        </el-col>
      </el-row>
      <p style="padding:0px;"></p>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input 
          v-model="SearchForm2.search_id"
          placeholder="Please enter the operator / account / book ID / book title">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button 
          style="width:100%" 
          @click="search_for_penalty_records"
          type="warning">Search for penalty records</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="loglist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Operator" prop="operator">
        </el-table-column>
        <el-table-column label="Account" prop="account">
        </el-table-column>
        <el-table-column label="Book title" prop="book_title">
        </el-table-column>
        <el-table-column label="Book ID" prop="book_id">     
        </el-table-column>
        <el-table-column label="Operation time" prop="operation_time" min-width="85px">
        </el-table-column>
        <el-table-column label="Amount" prop="amount">
        </el-table-column>
        <el-table-column label="Status" prop="status">
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
      SearchForm1: {
        search_id: ""
      },
      SearchForm2: {
        search_id: ""
      },
      loglist: [],
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    getLogList() {
      // 修改这里以从后端调取信息
  /*    if (this.pagenum == 1) {
        this.loglist = [
          {
            bookname: "Those things in the Ming Dynasty",
            readeraccount: "18000000003",
            name: "Librarian",
            time: "2020-03-01 14:24:08",
            bookid: "9787801656087",
            operation: "Loan out"
          },
          {
            bookname: "Those things in the Ming Dynasty",
            readeraccount: "18000000003",
            name: "18000000003",
            arrears: "5.00",
            bookid: "9787801656087",
            operation: "In arrears"
          }
        ];
      }
      this.total = 2;
      this.$message.success("Record successfully obtained");    */
        this.$http.post("/api/user/show_book_record",{
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.loglist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.loglist.push(table[i]);
            }
            console.log(res);
        });
      this.$message.success("Record successfully obtained");
    },
    search_for_loan_and_return()
    {
        this.$http.post("/api/user/search_for_loan_and_return",{
            operator: this.SearchForm1.search_id,
            account: this.SearchForm1.search_id,
            book_id: this.SearchForm1.search_id,
            book_title: this.SearchForm1.search_id,
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.loglist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.loglist.push(table[i]);
            }
            console.log(res);
        });
      
      this.$message.success("Search successfully!");
    },
    search_for_penalty_records()
    {
        this.$http.post("/api/user/search_for_penalty_records",{
            operator: this.SearchForm2.search_id,
            account: this.SearchForm2.search_id,
            book_id: this.SearchForm2.search_id,
            book_title: this.SearchForm2.search_id,
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.loglist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.loglist.push(table[i]);
            }
            console.log(res);
        });
      
      this.$message.success("Search successfully!");
    },
    judgeType(status) {
      if (status == "In arrears") return "danger";
      if (status == "Arrears paid") return "info";
      return "primary";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getLogList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.viewlog-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>


