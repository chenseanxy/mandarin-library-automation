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
      <div class="login_box">
        <div class="avatar_box">
          <div class="sign_box">
            <img
              height="70px"
              width="70px"
              border-radius="50%"
              background-color="#eee"
              src="../assets/librarian.png"
              alt
            >
          </div>
        </div>
        <h1 class="word_box">Librarian Login</h1>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="150px"
          class="login_form"
        >
          <el-form-item label="librarian account" prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="Please enter the librarian account (Default: librarian)"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="librarian password" prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="Please enter the librarian password (Default: librarian)"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="info" @click="resetLoginForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "", // ！！！ username 和 password 分别是输入的账号和密码 ！！！
        password: ""
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: "Please enter the librarian account",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter the librarian password",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "The length should be between 5 and 20 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    goToMainPage() {
      return this.$router.push("/MainPage");
    },
    //！！！修改 login() 调用后端 API 以对账户密码进行验证 ！！！
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        if (
          this.loginForm.username == "librarian" &&
          this.loginForm.password == "librarian"
        ) {
          this.$message.success("Librarian login successfully!");
          window.sessionStorage.setItem("authority", "librarian");
          window.sessionStorage.setItem("activePath", "Welcome");
          return this.$router.push("/LibrarianHome");
        }
        return this.$message.error("Account or password error!");
        //登录成功后应返回一个 token 标志该用户以正确的权限访问其它页面
        //token应保存在 sessionStorage 中
        //window.sessionStorage.setItem("token", 后端返回的token);
        //使用下面的语句跳转到下一页面，譬如 AdminHome 页面
        //this.$router.push("/AdminHome");
      });
    }
  }
};
</script>

<style scoped>
.login_container {
  background: -webkit-linear-gradient(180deg, #191970, #078F99 ); /* Chrome 10+, Saf5.1+ */
  background:    -moz-linear-gradient(180deg, #191970, #078F99 ); /* FF3.6+ */
  background:     -ms-linear-gradient(180deg, #191970, #078F99 ); /* IE10 */
  background:      -o-linear-gradient(180deg, #191970, #078F99 ); /* Opera 11.10+ */
  background:         linear-gradient(180deg, #191970, #078F99 ); /* W3C */
  height: 100%;
}
.login_box {
  width: 650px;
  height: 350px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
}
.sign_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 35px;
  box-sizing: border-box;
}
.btns {
  display: flex;
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
  padding-top: 75px;
}
</style>