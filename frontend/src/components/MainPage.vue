<template>
  <div class="main_container">
    <el-header>
      <div class="header-box">
        <img width="101px" height="47px" src="../assets/mandarin.png">
        <span class="title-box">Mandarin Library Automation</span>
      </div>
      <div class="login_box">
        <el-button>公告</el-button>
        <el-button type="primary" @click="readerLogin">读者登录</el-button>
      </div>
    </el-header>
    <div>
      <div class="maininfo_box">
        <img class="maininfo_img_box" width="152px" height="70px" src="../assets/mandarin.png">
        <div class="word_box">
          <h1>Mandarin Library Automation</h1>
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
.el-header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: black;
  font-size: 20px;
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
.login_box {
  float: right;
}
.header-box {
  display: flex;
  align-items: center;
}
.title-box {
  margin-left: 12px;
}
</style>

