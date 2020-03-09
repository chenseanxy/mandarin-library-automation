<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
        </el-breadcrumb>          
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
              <span>现在时间是 {{currentTime}} </span>
              </div>
              <div class="text-item">
                <i class="el-icon-info"></i>
                 请在左侧选择你想要使用的功能
              </div>
            </el-card>
    </div>
</template>
<style scoped>
  .el-breadcrumb{
    margin-bottom: 15px;
  }
  .el-main {
    background-color: #eee;
    color: #333;
  }  
  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    font-size: 20px;
    margin: 0 auto;
    height: 200px;
    /* width: 700px; */
  }
  .text-item {
    line-height:80px;
  }
</style>

<script>
export default {
data() {
    return {
      timer: "",//定义一个定时器的变量
      currentTime: "", // 获取当前时间
    };
  },
created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "年" +
        (new Date().getMonth() + 1) +
        "月" +
        new Date().getDate() +
        "日  " +
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
  }    
}
</script>