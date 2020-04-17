<template>
  <div class="login_container">
    <el-header>
      <div class="header_box">
        <img width="101px" height="47px" src="../../assets/mandarin.png">
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
              src="../../assets/librarian.png"
              alt
            >
          </div>
        </div>
        <h2 class="word_box">Application to Change Librarian Password</h2>
        <el-form
          ref="passwordChangeRef"
          :model="passwordChange"
          :rules="passwordChangeRules"
          label-width="150px"
          class="login_form"
        >
          <el-form-item label="librarian account" prop="username">
            <el-input
              v-model="passwordChange.username"
              prefix-icon="el-icon-user"
              placeholder="Please enter your account"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="librarian password" prop="password">
            <el-input
              v-model="passwordChange.password"
              prefix-icon="el-icon-lock"
              placeholder="Please enter your new password"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="confirm password" prop="passwordconfirm">
            <el-input
              v-model="passwordChange.passwordconfirm"
              prefix-icon="el-icon-finished"
              placeholder="Please confirm your password"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="info" @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="submit">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value !== this.passwordChange.password) {
        callback(
          new Error("The password is not consistent with the previous one")
        );
      } else {
        callback();
      }
    };
    return {
      passwordChange: {
        username: "",
        password: "",
        passwordconfirm: ""
      },
      passwordChangeRules: {
        username: [
          {
            required: true,
            message: "Please enter your librarian account",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter your new password",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "The length should be between 5 and 20 characters",
            trigger: "blur"
          }
        ],
        passwordconfirm: [
          {
            required: true,
            message: "Please enter your new password again",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "The length should be between 5 and 20 characters",
            trigger: "blur"
          },
          { validator: checkPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      return this.$router.push("/LibrarianLogin");
    },
    goToMainPage() {
      return this.$router.push("/MainPage");
    },
    submit() {
      this.$refs.passwordChangeRef.validate(async valid => {
        if (!valid) return;
        this.$http.post("/api/user/change_password",{
                  account: this.passwordChange.username,
                  password: this.passwordChange.password
                }).then((res) => {
                  console.log(res);
               });
        this.$message.success("Submit successfully!");
        return this.$router.push("/LibrarianLogin");
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
  height: 100%;
}
.login_box {
  width: 650px;
  height: 415px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -43%);
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