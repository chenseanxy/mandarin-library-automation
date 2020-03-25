<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/librarian.png" alt>
          <span class="title-box">Librarian Background Management System</span>
        </div>
        <div>
          <el-button type="primary" @click="home">Librarian Home Page</el-button>
          <el-button type="danger" @click="logout">Logout</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '300px' ">
          <div class="toggle-button" @click="toggleCollapse">{{collapsetext}}</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="whitesmoke"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>Book management</span>
              </template>
              <el-menu-item index="AddBook" @click="saveNavState('AddBook')">Add books</el-menu-item>
              <el-menu-item index="SearchBook" @click="saveNavState('SearchBook')">Search for Books</el-menu-item>
              <el-menu-item index="ViewLog" @click="saveNavState('ViewLog')">View operation log</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>Reader account management</span>
              </template>
              <el-menu-item index="RegisterAccount" @click="saveNavState('RegisterAccount')">Registered accounts</el-menu-item>
              <el-menu-item index="EditAccount" @click="saveNavState('EditAccount')">Edit - Delete accounts</el-menu-item>
              <el-menu-item index="BookRecording" @click="saveNavState('BookRecording')">Borrowing - Penalty records</el-menu-item>
            </el-submenu>
            <el-menu-item index="Fromalities" @click="saveNavState('Fromalities')">
              <i class="el-icon-finished"></i>
              <span slot="title">Application for loan</span>
            </el-menu-item>
            <el-menu-item index="IncomeRecord" @click="saveNavState('IncomeRecord')">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">Library income records</span>
            </el-menu-item>
            <el-menu-item index="Announcement" @click="saveNavState('Announcement')">
              <i class="el-icon-data-board"></i>
              <span slot="title">Announcement management</span>
            </el-menu-item>
            <el-menu-item index="Others" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">Other functions</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      activePath: "",
      collapsetext: ">>>"
    };
  },
  created() {
    if (window.sessionStorage.getItem("authority") != "librarian") {
      this.$message.error("Permission error, please login again");
      return this.$router.push("/Login");
    }
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$message.success("Logout successfully");
      this.$router.push("/LibrarianLogin");
    },
    home() {
      window.sessionStorage.setItem("activePath", "");
      this.activePath = "";
      this.$router.push("/LibrarianHome/Welcome");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.collapsetext = this.isCollapse ? ">>>" : "< < < < < < < < < < < < < < < <";
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: black;
  font-size: 20px;
}
.header-box {
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: whitesmoke;
}
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
}
.title-box {
  margin-left: 12px;
}
.toggle-button {
  background-color: #ccc;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

