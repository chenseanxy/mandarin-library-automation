<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Reader account management</el-breadcrumb-item>
      <el-breadcrumb-item>Edit - Delete accounts</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="registeraccount-card" shadow="hover">
      <el-alert
        title="Before deleting your account, please make sure that the reader has returned the book and paid the fine"
        center
        type="warning"
        show-icon
      ></el-alert>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-input 
              v-model="SearchForm.search_id"
              placeholder="Please enter account / email ">
              </el-input>
        </el-col>
        <el-col :span="6">
          <el-button 
          type="primary" 
          @click="search"
          style="width:100%">Search accounts
          </el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="accountlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Account" prop="reader_account">
        <template slot-scope="scope">
          {{ scope.row.reader_account }}
        </template>
        </el-table-column>
        <el-table-column label="Email" prop="email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operation" fixed="right" width="160px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="Edit"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-popconfirm
              :title="'Are you sure to DELETE '+scope.row.reader_account+' ?'"
              confirmButtonText="Delete"
              cancelButtonText="Cancel"
              confirmButtonType="danger"
              icon="el-icon-warning"
              iconColor="#FF6262"
            >
              <el-button
                slot="reference"
                @click="delete_account(scope.row.reader_account)"
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
  created() {
    this.getAccountList();
  },
  data() {
    return {
       SearchForm: {
        search_id: ""
      },
      accountlist: [],
      pagenum: 1,
      total: 0
    };
  },
  methods: {
    getAccountList() {
      // 修改这里以从后端调取信息
/*      
      if (this.pagenum == 1) {
        this.accountlist = [
          {
            readeraccount: "18000000000",
            readeremail: "18000000000@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000001",
            readeremail: "18000000001@reader.com",
            status: "Deleted"
          },
          {
            readeraccount: "18000000002",
            readeremail: "18000000002@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000003",
            readeremail: "18000000003@reader.com",
            status: "In arrears"
          },
          {
            readeraccount: "18000000004",
            readeremail: "18000000004@reader.com",
            status: "Normal"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.accountlist = [
          {
            readeraccount: "18000000005",
            readeremail: "18000000005@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000006",
            readeremail: "18000000006@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000007",
            readeremail: "18000000007@reader.com",
            status: "Normal"
          }
        ];
      }
      this.total = 8;
      */
       this.$http.post("/api/user/search_all",{
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.accountlist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.accountlist.push(table[i]);
            }
            console.log(res);
        });
      
      this.$message.success("Getting reader list succeeded");
    },
    delete_account(the_account)
    {
         this.$http.post("/api/user/delete_reader_account",{
                  account: the_account,
                }).then((res) => {
                  console.log(res);
               });
        this.$message.success("Delete successfully!");
    },
    search()
    {
       /*  this.$http.post("/api/user/delete_reader_account",{
                  account: this.SearchForm.search_id,
                  email: this.SearchForm.search_id,
                }).then((res) => {
                  console.log(res);
               });
          this.getAccountList();
        this.$message.success("Search successfully!");  */

        this.$http.post("/api/user/search_from_id",{
            account: this.SearchForm.search_id,
            email: this.SearchForm.search_id,
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.accountlist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              this.accountlist.push(table[i]);
            }
            console.log(res);
        });
      
      this.$message.success("Search successfully!");
    },
    judgeType(status) {
      if (status == "Normal") return "success";
      if (status == "Deleted") return "info";
      else return "danger";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getAccountList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-alert {
  margin-bottom: 15px;
}
.registeraccount-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>



