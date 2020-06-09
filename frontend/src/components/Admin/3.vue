<template>
  <div>
    
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Modify Super Password</el-breadcrumb-item>
    </el-breadcrumb>
    <h1></h1>
    
    
    
    <el-col :span="8" >
      
    <el-input placeholder="Please input origin password" v-model="input1" show-password ></el-input>
    <h1></h1>
    <el-input placeholder="Please input new password" v-model="input2" show-password ></el-input>
    <h1></h1>
    <el-input placeholder="Please input new password again" v-model="input3" show-password ></el-input>
    <h1></h1>

    <el-button type="submit" round>SUBMIT</el-button>
    </el-col>

    
    
  
  
  
  

</div>


</template>


<script>
  export default {
    data() {
     
      return {
        input1: '',
        input2: '',
        input3: ''
    
        
        
      };
    },
  }
</script>

<style>
.el-col
{
text-align :center

  
}



</style>