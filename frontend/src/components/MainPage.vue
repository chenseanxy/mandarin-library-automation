<template>
  <el-scrollbar>
    <el-carousel
      arrow="never"
      direction="vertical"
      indicator-position="none"
      :interval="1000"
      :height="carouselHeight+'px'"
    >
      <div class="main_container">
        <el-carousel-item v-for="item in 4" :key="item" style="width:100%;"></el-carousel-item>
        <el-header>
          <div class="header_box">
            <img width="101px" height="47px" src="../assets/mandarin.png">
            <span class="title_box">Mandarin Library Automation</span>
          </div>
          <div class="login_box">
            <el-button>Announcement</el-button>
            <el-button type="primary" @click="readerLogin">Login</el-button>
          </div>
        </el-header>
        <div>
          <div class="maininfo_box">
            <img class="maininfo_img_box" width="152px" height="70px" src="../assets/mandarin.png">
            <div class="word_box">
              <h1>
                Mandarin Library
                <br>Automation
              </h1>
              <p>Presenting Wonderful for You</p>
            </div>
          </div>
        </div>
      </div>
    </el-carousel>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      carouselHeight: ""
    };
  },
  created() {
    const loading = this.$loading({
      lock: true
    });
    this.carouselHeight = window.innerHeight + 1;
    this.$notify.info({
      title: "开发指南",
      duration: 0,
      offset: 50,
      dangerouslyUseHTMLString: true,
      message: this.$createElement("div", null, [
        this.$createElement("p", null, "此版本更新于2020年4月3日。"),
        this.$createElement(
          "p",
          null,
          "如果你无法看见最新的内容，你可能需要清除浏览器缓存。"
        ),
        this.$createElement(
          "p",
          null,
          "通过下面的按钮，你可以快速抵达各个页面。主页按钮将自动完成登录操作。"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "primary", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToReaderLogin }
          },
          "读者登录"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "primary", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToLibrarianLogin }
          },
          "图管登录"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "primary", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToAdminLogin }
          },
          "超管登录"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "success", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToReaderHome }
          },
          "读者主页"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "success", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToLibrarianHome }
          },
          "图管主页"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "success", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToAdminHome }
          },
          "超管主页"
        ),
        this.$createElement(
          "el-button",
          {
            props: { plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToMainPage }
          },
          "项目主页"
        ),
        this.$createElement(
          "p",
          null,
          "如果你对Vue.js仍然有困惑，下面这个教学视频也许会帮助你。"
        ),
        this.$createElement(
          "el-button",
          {
            props: { type: "danger", plain: "true" },
            style: { width: "240px", margin: "5px" },
            on: { click: this.goToVedio }
          },
          "Vue.js 实战入门教学"
        )
      ])
    });
    setTimeout(() => {
      loading.close();
    }, 500);
  },
  methods: {
    readerLogin() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
    goToReaderLogin() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
    goToLibrarianLogin() {
      window.sessionStorage.clear();
      this.$router.push("/LibrarianLogin");
    },
    goToAdminLogin() {
      window.sessionStorage.clear();
      this.$router.push("/AdminLogin");
    },
    goToReaderHome() {
      window.sessionStorage.setItem("authority", "reader");
      this.$router.push("/ReaderHome");
      return this.$message.success("Login successfully!");
    },
    goToLibrarianHome() {
      window.sessionStorage.setItem("authority", "librarian");
      window.sessionStorage.setItem("activePath", "Welcome");
      this.$router.push("/LibrarianHome");
      return this.$message.success("Librarian login successfully!");
    },
    goToAdminHome() {
      window.sessionStorage.setItem("authority", "admin");
      this.$router.push("/AdminHome");
      return this.$message.success("Admin login successfully!");
    },
    goToMainPage() {
      window.sessionStorage.clear();
      this.$router.push("/MainPage");
    },
    goToVedio() {
      window.open("https://www.bilibili.com/video/av74592164");
    }
  }
};
</script>

<style scoped>
.main_container {
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
.header_box {
  display: flex;
  align-items: center;
}
.title_box {
  margin-left: 12px;
}
.el-carousel__item:nth-child(1) {
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
}
.el-carousel__item:nth-child(2) {
  background: -webkit-linear-gradient(
    180deg,
    #0484da,
    #003366
  ); /* Chrome 10+, Saf5.1+ */
  background: -moz-linear-gradient(180deg, #0484da, #003366); /* FF3.6+ */
  background: -ms-linear-gradient(180deg, #0484da, #003366); /* IE10 */
  background: -o-linear-gradient(180deg, #0484da, #003366); /* Opera 11.10+ */
  background: linear-gradient(180deg, #0484da, #003366); /* W3C */
  z-index: -1;
}
.el-carousel__item:nth-child(3) {
  background: -webkit-linear-gradient(
    180deg,
    #003366,
    #191970
  ); /* Chrome 10+, Saf5.1+ */
  background: -moz-linear-gradient(180deg, #003366, #191970); /* FF3.6+ */
  background: -ms-linear-gradient(180deg, #003366, #191970); /* IE10 */
  background: -o-linear-gradient(180deg, #003366, #191970); /* Opera 11.10+ */
  background: linear-gradient(180deg, #003366, #191970); /* W3C */
  z-index: -1;
}
.el-carousel__item:nth-child(4) {
  background: -webkit-linear-gradient(
    180deg,
    #191970,
    #078f99
  ); /* Chrome 10+, Saf5.1+ */
  background: -moz-linear-gradient(180deg, #191970, #078f99); /* FF3.6+ */
  background: -ms-linear-gradient(180deg, #191970, #078f99); /* IE10 */
  background: -o-linear-gradient(180deg, #191970, #078f99); /* Opera 11.10+ */
  background: linear-gradient(180deg, #191970, #078f99); /* W3C */
  z-index: -1;
}
</style>

