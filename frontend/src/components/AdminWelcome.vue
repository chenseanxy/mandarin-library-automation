<template>
<div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
</el-breadcrumb>

  





<h1 id="app">
     {{date}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <el-button type="text"   @click="dialogVisible = true">摘要</el-button>
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

<h1>DEAR ADMIN,HAVE A NICE DAY!</h1>


<img src="../assets/timg.jpg" alt="">


</div>
</template>

<style>
.app{
  font-size: 100px;
  color: aqua;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        
      
        
        }
      },
    
    mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
  };
</script>