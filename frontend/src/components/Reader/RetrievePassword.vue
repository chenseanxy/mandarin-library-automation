<template>
  
    <div>
      <div class="change_box">
        <el-form
          ref="changeFormRef"
          :model="changeForm"
          :rules="changeFormRules"
          label-width="0px"
          class="change_form"
        >  
          <el-form-item prop="password">
            <el-input
              v-model="changeForm.password"
              prefix-icon="el-icon-lock"
              placeholder="Please enter the new password (default: user)"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              v-model="changeForm.repassword"
              prefix-icon="el-icon-lock"
              placeholder="Please confirm the password again (default user)"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="info" @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="change">Retrieve</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      changeForm: {
        username: "", // ！！！ username 和 password 分别是输入的账号和密码 ！！！
        password: ""
      },
      changeFormRules: {
        username: [
          { required: true, message: "Please enter your reader account", trigger: "blur" }
        ],
        email: [
          { required: true, message: "Please enter your reader email", trigger: "blur" }
        ],
        password: [
          { required: true, message: "Please enter your reader password", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "The length should be between 4 and 20 characters",
            trigger: "blur"
          }
        ],
        repassword: [
          { required: true, message: "Please confirm the password again", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    change() {
      this.$refs.changeFormRef.validate(async valid => {
        if (!valid) return;
        if (
          this.changeForm.password == "user" &&
          this.changeForm.repassword == "user" 
        ) {
          this.$router.push("/Login");
          return this.$message.success("Password changed successfully");
        }
        //登录成功后应返回一个 token 标志该用户以正确的权限访问其它页面
        //token应保存在 sessionStorage 中
        //window.sessionStorage.setItem("token", 后端返回的token);
        //使用下面的语句跳转到下一页面，譬如 AdminHome 页面
        //this.$router.push("/AdminHome");
      });
    },
    cancel() {
      this.$router.push("/ReaderHome");
    }
  }
};
</script>

<style scoped>
.change_container {
  background-color: gainsboro;
  height: 100%;
}
.change_box {
  width: 450px;
  height: 250px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 60%;
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
.change_form {
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
</style>

