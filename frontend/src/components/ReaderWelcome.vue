<template>
  <div class="main_container">
    <el-container>
      <el-main>
        <h2>Now the time is {{currentTime}}</h2>
        <h2>Welcome to Mandarin Library</h2>
      </el-main>
    </el-container>
  </div>
</template>
<style>
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
  opacity: 0.8;
}
.main_container {
  background: url(../assets/blur-book-stack-books-bookshel.jpg) center center
    no-repeat;
  height: 100%;
}
</style>

<script>
export default {
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
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>