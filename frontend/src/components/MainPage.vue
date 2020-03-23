<template>
  <div class="main_container">
    <div class="head_box">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">菜单文本1</el-menu-item>
        <el-submenu index="2">
          <template slot="title">菜单文本2</template>
          <el-menu-item index="2-1">选项文本1</el-menu-item>
          <el-menu-item index="2-2">选项文本2</el-menu-item>
          <el-menu-item index="2-3">选项文本3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项文本4</template>
            <el-menu-item index="2-4-1">次级选项文本1</el-menu-item>
            <el-menu-item index="2-4-2">次级选项文本2</el-menu-item>
            <el-menu-item index="2-4-3">次级选项文本3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>菜单文本3</el-menu-item>
        <div class="login_box">
          <el-button type="primary" @click="readerLogin">读者登录</el-button>
        </div>
      </el-menu>
    </div>
    <div>
      <div class="maininfo_box">
        <img class="maininfo_img_box" width="152px" height="70px" src="../assets/mandarin.png">
        <div class="word_box">
          <h1>Mandarin-Library Automation</h1>
          <p>Presenting Wonderful for You</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    readerLogin() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    }
  }
};
</script>

<style scoped>
.main_container {
  background: url(../assets/blur-book-stack-books-bookshel.jpg) center center
    no-repeat;
  height: 100%;
}
.maininfo_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
.maininfo_img_box {
  text-align: center;
  padding-left: 149px;
  padding-top: 20px;
}
.word_box {
  text-align: center;
  line-height: 30px;
  padding-top: 10px;
}
.head_box {
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
.login_box {
  position: absolute;
  right: 20px;
  padding: 10px;
}
</style>

