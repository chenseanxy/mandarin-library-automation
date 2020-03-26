<template>
  <el-container>
    <el-main>
      <h2>现在时间是 {{currentTime}}</h2>
      <h2>在ReaderWelcome.vue中完善本页内容</h2>
    </el-main>
  </el-container>
</template>
<style>
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
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