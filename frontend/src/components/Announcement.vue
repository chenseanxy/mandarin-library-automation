<template>
  <div class="login_container">
    <el-header>
      <div class="header_box">
        <img width="101px" height="47px" src="../assets/mandarin.png" />
        <span class="title_box">Mandarin Library Automation</span>
      </div>
      <el-button type="primary" @click="goToMainPage">MainPage</el-button>
    </el-header>
    <div>
      <div class="maininfo_box">
        <div class="word_box">
          <h1>Library Announcement</h1>
        </div>
        <div class="announcement_box">
          <h3>
            <i style="padding-left: 15px;"></i>
            {{announcementtitle}}
          </h3>
          <p>
            <i style="padding-left: 15px;"></i>
            {{announcementcontent}}
          </p>
          <p style="text-align: right;color: #C8C9CC;">{{announcementtime}}</p>
        </div>
        <div class="btns">
          <el-button
            :disabled="lastButtonDisabled()"
            :loading="lastButtonLoading"
            type="plain"
            @click="getLast"
            icon="el-icon-arrow-left"
          >Last</el-button>
          <el-button
            :disabled="nextButtonDisabled()"
            :loading="nextButtonLoading"
            type="primary"
            @click="getNext"
          >
            Next
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAnnouncement();
  },
  data() {
    return {
      lastButtonLoading: false,
      nextButtonLoading: false,
      announcementtitle: "",
      announcementcontent: "",
      announcementtime: "",
      pagenum: 1,
      totalnum: 0
    };
  },
  methods: {
    goToMainPage() {
      return this.$router.push("/MainPage");
    },
    lastButtonDisabled() {
      if (this.pagenum <= 1) return true;
      return false;
    },
    nextButtonDisabled() {
      if (this.pagenum >= this.totalnum) return true;
      return false;
    },
    getLast() {
      this.lastButtonLoading = true;
      this.pagenum = this.pagenum - 1;
      this.getAnnouncement();
      setTimeout(() => {
        this.lastButtonLoading = false;
      }, 200);
    },
    getNext() {
      this.nextButtonLoading = true;
      this.pagenum = this.pagenum + 1;
      this.getAnnouncement();
      setTimeout(() => {
        this.nextButtonLoading = false;
      }, 200);
    },
    getAnnouncement() {
      this.$http.post("/api/announce/search_all",{
          }).then((res) => {
            var table=res.body;
            this.totalnum=table.length;
            this.announcementtitle = table[this.pagenum-1].title;
            this.announcementcontent =table[this.pagenum-1].content;
            this.announcementtime= table[this.pagenum-1].time.slice(0,10)+" "+table[this.pagenum-1].time.slice(11,19);
            console.log(res);
        });
    }
  }
};
</script>

<style scoped>
.login_container {
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
  height: 100%;
}
.maininfo_box {
  width: 650px;
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
.btns {
  margin-top: 16px;
  margin-bottom: 16px;
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
.word_box {
  text-align: center;
  line-height: 30px;
  padding-top: 10px;
}
.announcement_box {
  margin-left: 35px;
  margin-right: 35px;
  text-align: left;
  line-height: 30px;
}
</style>