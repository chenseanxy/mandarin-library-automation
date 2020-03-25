<template>
  <div class="login_container">
    <div class="head_box">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Menu text1</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Menu text2</template>
          <el-menu-item index="2-1">Text options1</el-menu-item>
          <el-menu-item index="2-2">Text options2</el-menu-item>
          <el-menu-item index="2-3">Text options3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">Text options4</template>
            <el-menu-item index="2-4-1">Secondary option text1</el-menu-item>
            <el-menu-item index="2-4-2">Secondary option text2</el-menu-item>
            <el-menu-item index="2-4-3">Secondary option text3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>Menu text3</el-menu-item>
      </el-menu>
    </div>
    <div>
      <div class="login_box">
        <div class="avatar_box">
          <div class="sign_box">
            <img
              height="70px"
              width="70px"
              border-radius="50%"
              background-color="#eee"
              src="../assets/reader.png"
              alt
            >
          </div>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="Please enter the reader account (default: user)"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="Please enter the reader password (default: user)"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="info" @click="resetLoginForm">Reset</el-button>
            <el-button type="primary" @click="changepassword">Change the password</el-button>
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
          { required: true, message: "Please enter your reader account", trigger: "blur" }
        ],
        password: [
          { required: true, message: "Please enter your reader email", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "The length should be between 4 and 20 characters",
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
    //！！！修改 login() 调用后端 API 以对账户密码进行验证 ！！！
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        if (
          this.loginForm.username == "user" &&
          this.loginForm.password == "user"
        ) {
          this.$router.push("/ReaderHome");
          return this.$message.success("Login successful");
        }
        return this.$message.error("Wrong account number or password");
        //登录成功后应返回一个 token 标志该用户以正确的权限访问其它页面
        //token应保存在 sessionStorage 中
        //window.sessionStorage.setItem("token", 后端返回的token);
        //使用下面的语句跳转到下一页面，譬如 AdminHome 页面
        //this.$router.push("/AdminHome");
      });
    },
    changepassword() {
      this.$router.push("/ReaderChangePassword");
      return this.$message.success("Go to modify");
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: gainsboro;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
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
</style>

