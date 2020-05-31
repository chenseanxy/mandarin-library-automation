<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Modify Super Password</el-breadcrumb-item>
    </el-breadcrumb>
    <h1></h1>
    <el-col :span="8" >
    <p>Fine:{{input1}}</p>
    <el-input placeholder="Please input fine" v-model="input10" ></el-input>
    <h1></h1>
    <p>Return Period:{{input2}}</p>
    <el-input placeholder="Please input period" v-model="input20" ></el-input>
    <h1></h1>
    <p>Deposit:{{input3}}</p>
    <el-input placeholder="Please input deposit" v-model="input30"  ></el-input>
    <h1></h1>
    <el-button type="submit" @click="startHacking">SUBMIT</el-button>
    </el-col>
</div>
</template>

<script>
  export default {
    data() {
      return {
        input1: '1',
        input2: '30',
        input3: '300',
        input10: this.input1,
        input20: this.input2,
        input30: this.input3
      };
    },
    methods: {
    startHacking () {
      this.input1 = this.input10
      this.input2 = this.input20
      this.input3 = this.input30
      this.$message.success('suceed!')
    },
  }
  }
</script>

<style>
.el-col
{
text-align :center

  
}



</style>