<template>
  <div class="libRegister">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Account management</el-breadcrumb-item>
      <el-breadcrumb-item>Registered accounts</el-breadcrumb-item>
    </el-breadcrumb>

    
    <div class="myStyle">
    
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >

        <el-form-item label="Account" prop="age">
          <el-input v-model.number="ruleForm.age" placeholder="Please enter account" clearable></el-input>
        </el-form-item>

        <el-form-item label="Email" prop="age">
          <el-input v-model.number="ruleForm.age" placeholder="Please enter email" clearable></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="Please input a password" clearable></el-input>
        </el-form-item>

        <el-form-item label="Confirm password" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="Please confirm password" clearable></el-input>
        </el-form-item>

        <!-- <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: "libRegister",
  data() {
    
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please enter password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please enter password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("The two passwords are inconsistent!"));
      } else {
        callback();
      }
    };

    var checkAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter account"));
      } else {
        callback();
      }
    };

    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter email"));
      } else {
        callback();
      }
    };
    
    return {
      ruleForm: {
        account: "",
        email: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }], 
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.searchbook-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-breadcrumb {
  margin-bottom: 15px;
}
.registeraccount-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
.el-alert {
  margin-bottom: 15px;
}

.myStyle {
  padding: 3% 20%;
}
</style>

