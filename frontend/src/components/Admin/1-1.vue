<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Account management</el-breadcrumb-item>
      <el-breadcrumb-item>Registered accounts</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="registeraccount-card" shadow="hover">
      <!-- <el-alert title="注册账户前，请确认读者已缴纳保证金" center type="warning" show-icon></el-alert> -->
      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入账户"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入邮箱"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入密码"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">注册账户</el-button>
        </el-col>
      </el-row> -->
      
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="input1" placeholder="Please enter account" clearable></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="input2" placeholder="Please enter email" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="Please input a password" v-model="input3" show-password></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-edit" @click="startHacking">Registered</el-button>
        </el-col>
      </el-row>
      
      <el-divider></el-divider>
      <!-- <el-table stripe max-height="500" :data="accountlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="账户" prop="readeraccount"></el-table-column>
        <el-table-column label="邮箱" prop="readeremail"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>-->

      <!-- <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :total="total"
        page-size="5"
      ></el-pagination> -->
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
      input1: '',
      input2: '',
      input3: '',
      accountlist: [],
      pagenum: 1,
      total: 0
    };
  },
  methods: {
    startHacking () {
    this.$http.post('/api/user/search_id_exist',{//这里是将input1的值传给接口search_id_exist，这个接口add在serve文件夹下lilrarian_api.js里定义
      id: this.input1,
    },{}).then(function(data){
            console.log("search请求成功！ ",data.body);
            var content=data.body;
            if (content.length != 0) {//判断账户是否存在
              this.$notify({
              title: 'Error',
              type: 'error',
              message: 'Account has been used!',
              duration: 5000
              })
            }
            else{
              this.$http.post('/api/user/add', {//这里是将input123的值传给接口add，这个接口add在serve文件夹下lilrarian_api.js里定义
              id: this.input1,
              em: this.input2,
              pw: this.input3
              },{}).then((response) => {
              console.log(response);
              });
              this.$notify({
              title: 'It works!',
              type: 'success',
              message: 'Succeed!',
              duration: 5000
              })
            }
          },function(response){
                console.log(response);
            })
      
    },

    getAccountList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.accountlist = [
          {
            readeraccount: "18000000000",
            readeremail: "18000000000@reader.com",
            status: "正常"
          },
          {
            readeraccount: "18000000001",
            readeremail: "18000000001@reader.com",
            status: "已注销"
          },
          {
            readeraccount: "18000000002",
            readeremail: "18000000002@reader.com",
            status: "正常"
          },
          {
            readeraccount: "18000000003",
            readeremail: "18000000003@reader.com",
            status: "欠费"
          },
          {
            readeraccount: "18000000004",
            readeremail: "18000000004@reader.com",
            status: "正常"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.accountlist = [
          {
            readeraccount: "18000000005",
            readeremail: "18000000005@reader.com",
            status: "正常"
          },
          {
            readeraccount: "18000000006",
            readeremail: "18000000006@reader.com",
            status: "正常"
          },
          {
            readeraccount: "18000000007",
            readeremail: "18000000007@reader.com",
            status: "正常"
          }
        ];
      }
      this.total = 8;
      // this.$message.success("获取读者列表成功");
    },
    judgeType(status) {
      if (status == "正常") return "success";
      if (status == "已注销") return "info";
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
.registeraccount-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
.el-alert {
  margin-bottom: 15px;
}
</style>

