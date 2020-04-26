<template>
  <div class="login_container">
    <el-header>
      <div class="header_box">
        <img width="101px" height="47px" src="../assets/mandarin.png">
        <span class="title_box">Mandarin Library Automation</span>
      </div>
      <el-button type="primary" @click="goToMainPage">MainPage</el-button>
    </el-header>
    <div>
      <div class="maininfo_box">
        <img class="maininfo_img_box" width="152px" height="70px" src="../assets/mandarin.png">
        <div class="word_box">
          <h1>404 NOT FOUND</h1>
          <p>
            We are sorry, but the page you want to visit does not exist.
            <br>This may be because you entered a wrong URL.
            <br>If you have any questions, please contact the webmaster.
          </p>
        </div>
        <div class="btns">
          <el-button type="plain" @click="$router.back(-1)">Go Back</el-button>
          <el-button type="primary" @click="goToMainPage">MainPage</el-button>
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
    goToMainPage() {
      return this.$router.push("/MainPage");
    }
  }
};
</script>

<style scoped>
.login_container {
  background: -webkit-linear-gradient(
    180deg,
    #078f99,
    #0484da
  ); /* Chrome 10+, Saf5.1+ */
  background: -moz-linear-gradient(180deg, #078f99, #0484da); /* FF3.6+ */
  background: -ms-linear-gradient(180deg, #078f99, #0484da); /* IE10 */
  background: -o-linear-gradient(180deg, #078f99, #0484da); /* Opera 11.10+ */
  background: linear-gradient(180deg, #078f99, #0484da); /* W3C */
  z-index: -1;
  height: 100%;
}
.maininfo_box {
  width: 650px;
  height: 350px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  display: flex;
  padding-right: 35px;
  justify-content: flex-end;
}
.header_box {
  display: flex;
  align-items: center;
}
.title_box {
  margin-left: 12px;
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
.maininfo_img_box {
  text-align: center;
  margin-left: 249px;
  margin-right: 249px;
  margin-top: 20px;
}
.word_box {
  text-align: center;
  line-height: 30px;
  padding-top: 10px;
}
</style>