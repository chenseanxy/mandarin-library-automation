<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="hover">
      <el-alert title="Please select the function you want to use on the left side" type="info" center show-icon></el-alert>
      <div>
        <p>The time is now {{currentTime}} , Check the last 5 logins to confirm account security.</p>
      </div>
      <el-table stripe max-height="500" :data="loginlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Login IP" prop="ip"></el-table-column>
        <el-table-column label="Login Time" prop="time"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-main {
  background-color: #eee;
  color: #333;
}
.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* font-size: 20px; */
  margin: 0 auto;
  /* width: 700px; */
}
</style>

<script>
export default {
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: "", // 获取当前时间
      loginlist: []
    };
  },
  created() {
    this.getLoginList();
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        "  " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();
    }, 500);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    getLoginList() {
      // 修改这里以从后端调取信息
      this.loginlist = [
        {
          ip: "112.24.133.88",
          time: "2020-03-10 17:28:31"
        },
        {
          ip: "112.24.133.88",
          time: "2020-03-09 15:28:30"
        },
        {
          ip: "112.24.133.88",
          time: "2020-03-05 17:28:59"
        },
        {
          ip: "112.24.133.88",
          time: "2020-03-01 18:28:00"
        },
        {
          ip: "112.24.133.88",
          time: "2020-03-01 11:04:07"
        }
      ];
    }
  }
};
</script>