<template>
    <div>
      <el-container>
      <el-main>
        <h2>Information Modified！</h2>
      </el-main>
     </el-container>

      <div class="change_box">
        <el-container>
      <el-main>
        <h3>Current nickname : user2</h3>
        <h3>Current gender : male</h3>
        <h3>Current age : 19</h3>
        <h3>Current phone : 87654321</h3>
      </el-main>
    </el-container>
        <el-form
          ref="changeFormRef"
          :model="changeForm"
          :rules="changeFormRules"
          label-width="0px"
          class="change_form"
        >
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
      }
    };
  },
  methods: {
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
  height: 280px;
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
.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 20px;
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
</style>