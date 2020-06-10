<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Reader MainPage</el-breadcrumb-item>
      <el-breadcrumb-item>Account Management</el-breadcrumb-item>
      <el-breadcrumb-item>Modify Personal Information</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
    <el-header>Reader Information</el-header>
    <el-main>Edit informaiton

    <el-card class="modifyinformation-card" shadow="hover">
      <el-col :gutter="20">
      </el-col>
      <el-divider></el-divider>
      <el-table stripe max-height="400" :data="userinformationlist">
        <el-table-column label="username" prop="username"></el-table-column>
        <el-table-column label="operation">
          <template>
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-circle-check" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        
      


        <el-table-column label="email" prop="email"></el-table-column>
        <el-table-column label="operation" >
          <template>
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-circle-check" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>


        <el-table-column label="position" prop="position"></el-table-column>
        <el-table-column label="operation" >
          <template>
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-circle-check" circle></el-button>
            </el-tooltip>
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
    </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userinformationlist: [],
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getUserInformationList();
  },
  methods: {
    getUserInformationList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.userinformationlist = [
          {
            username: "user1",
            email: "123456@126.com",
            position: "teacher",
          },
          
        ];
      }
      
      this.total = 1;
    },
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.modifyinformation-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>