<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>welcome page</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main_container">
      <el-container>
        <el-main>
          <h2>Now the time is {{currentTime}}</h2>
          <h2>Welcome to Mandarin Library</h2>
        </el-main>
      </el-container>
    </div>

    <!-- <h1 id="app">
     {{date}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <el-button type="text"   @click="dialogVisible = true">Summary</el-button>
</h1>
<el-dialog
  title="摘要"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
  <span>超管能够对图书管理员账号进行管理，对图书馆进行管理，以及对超管密码进行修改，希望左边栏能够对你有帮助</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
  </span>
</el-dialog>

    <h1>DEAR ADMIN,HAVE A NICE DAY!</h1>-->

    <!-- <img src="../assets/taylor.jpg" alt="" width="100%" height="100%"> -->
  </div>
</template>
<style scoped>
/* .el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  } */

.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;/*透明度*/
}
.main_container {
  padding-bottom: 65%;
  height: 0;
  background: url("../assets/taylor.jpg") no-repeat center center fixed;
  background-size: cover;
  background-color: #0c1424;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
</style>

<script>
export default {
  //   data() {
  //     return {
  //       date: new Date(),

  //       }
  //     },

  //   mounted() {
  //   let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
  //   this.timer = setInterval(() => {
  //     _this.date = new Date(); // 修改数据date
  //   }, 1000)
  // },

  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: "" // 获取当前时间
    };
  },
  created() {
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
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>