<template>
  <div class="libRegister">
  <!-- <div class="backImage"> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Account management</el-breadcrumb-item>
      <el-breadcrumb-item>Registered accounts</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- <el-card class="registeraccount-card" shadow="hover"> -->
    <div class="myStyle">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <!--账号表单项-->
        <el-form-item label="Account" prop="account">
          <el-input v-model.number="ruleForm.account" placeholder="Please enter account" clearable></el-input>
        </el-form-item>
        <h1></h1>

        <!--邮箱表单项-->
        <el-form-item label="Email" prop="email">
          <el-input v-model.number="ruleForm.email" placeholder="Please enter email" clearable></el-input>
        </el-form-item>
        <h1></h1>

        <!--密码表单项-->
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="Please input a password" clearable></el-input>
        </el-form-item>
        <h1></h1>

        <!--确认密码表单项-->
        <el-form-item label="Confirm password" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="Please confirm password" clearable></el-input>
        </el-form-item>
        <h1></h1>


        <el-form-item>
          <!--原来的提交表单的按钮是这个，不知道怎么修改注释掉了-->

          <!-- <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button> -->
          
          <el-button type="primary" @click="startHacking">Register</el-button>
          
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  name: "libRegister",
  data() {
    
    //这4个变量用于表单项数据的验证
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
      //表单对应的变量
      ruleForm: {
        account: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }], 
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  methods: {
    //原来提交表单的函数
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
    },

    startHacking () {
    this.$http.post('/api/user/search_id_exist',{//调用接口search_id_exist
      id: this.account,//将input1的值（即账户）传给接口，后端服务器将会进行查找操作
    },{}).then(function(data){
            console.log("search请求成功！ ",data.body);//记录日志（可以不用管）
            var content=data.body;//创建一个变量content储存该接口返回的数据
            if (content.length != 0) {//判断账户是否存在：返回数据长度为零即没有查找到
              this.$notify({//网页提示
              title: 'Error',
              type: 'error',
              message: 'Account has been used!',
              duration: 5000
              })
            }
            else{
              this.$http.post('/api/user/add', {//调用接口add
              id: this.account,//将input1、2、3（即账户邮箱密码）的值传给接口add，后端服务器将会进行数据库的add操作
              em: this.email,
              pw: this.pass
              },{}).then((response) => {
              console.log(response);
              });
              this.$notify({
              title: 'It works!',
              type: 'success',
              message: 'Succeed!',
              duration: 5000
              })
            }
          },function(response){
                console.log(response);
            })
      
    },
  }
};
</script>

<style scoped>
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

/*暂时写了一个背景和边距的css */
.myStyle {
  /*离顶端距离，离两边距离 */
  padding: 5% 25%;
  /* width: 100%; */
  padding-bottom: 58%;
  height: 0;
  background: url('../../assets/guille.jpg') no-repeat center center fixed;
  background-size: cover;
  background-color: #0C1424;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

</style>

