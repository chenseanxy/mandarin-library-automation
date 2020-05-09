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
      if (this.pagenum == 1) {
        this.announcementtitle = "关于冠状病毒等相关免费科研信息资源整理";
        this.announcementcontent =
          "近期新冠肺炎疫情的发展情况牵动着每个人的心。经过此次疫情，大众的工作生活发生了不小的改变，也收获了许多“防疫”经验。对科研工作者来说，疫情的发生可以局限科研空间，却无法阻止科研工作者进行学术研究的深度，“远距离”科研成为信息时代普遍的工作模式，并为科研工作提供更高效的科研机会。";
        this.announcementtime = "2020-03-01 00:00:00";
      } else if (this.pagenum == 2) {
        this.announcementtitle = "信息时代如何做好“远距离”科研";
        this.announcementcontent =
          "面对“新型冠状病毒肺炎”疫情，国际相关学科领域学者也在密切关注，新的学术研究成果，也通过现代网络环境下催生的新的出版模式得到最快的传播。科研信息的快速传播，加速了人类对疾病的了解和研究进程，助力人们迅速有效的遏制疾病机器传播。";
        this.announcementtime = "2020-03-01 00:00:00";
      } else {
        this.announcementtitle = "图书馆数字资源助您宅家决胜科研";
        this.announcementcontent =
          "疫情防控期间，继上期推出直接支持教学的数字资源汇总，图书馆“数字资源阅读推广工作组”本期围绕支持我校师生的科研活动，重新梳理了已购数字资源并精选整理了相应的免费网络资源，归纳成了以下五大类六个专题。";
        this.announcementtime = "2020-03-01 00:00:00";
      }
      this.totalnum = 3;
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