<template>
  <div class="outer">
    <!--导航栏-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Borrow&Return management</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>Registered accounts</el-breadcrumb-item> -->
    </el-breadcrumb>

    <div class="block">
      <!--用来设置悬浮黑色框-->
      <div class="info_box">
        <!--标题-->
        <h2>Manage</h2>
        <!--表单区域-->

        <el-row :gutter="5">
          <el-col :span="12">
            <div>
              <el-tag type="success">Fine</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="count-fine">$ {{fineValue1}} /day</p>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <div>
              <el-tag type="success">Period</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="count-returnPeriod">{{returnPeriod1}} days</p>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <div>
              <el-tag type="success">Depoist</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="count-depoist">$ {{depoist1}}</p>
          </el-col>
        </el-row>

        <el-row :gutter="3" class="btns">
          <!-- <el-col :span="8">
            <div class="grid-content bg-purple-dark"></div>
          </el-col> -->
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-edit" size="big" @click="showadddialogVisible()">Edit </el-button>
          </el-col>
          <!--el-col :span="10">
            <el-button type="danger" icon="el-icon-close" size="big" @click="adddialogVisible=true">Cancel</el-button>
          </el-col-->
        </el-row>



      </div>
      <el-dialog
              title="Modifying"
              :visible.sync="adddialogVisible"
              width="50%"
              @close="adddialogClosed"
      >
        <!--span>这是一段信息</span -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="110px">
          <el-form-item label="finevalue" prop="fineValue">
            <el-input v-model="addForm.fineValue"></el-input>
          </el-form-item>
          <el-form-item label="Period" prop="returnPeriod">
            <el-input v-model="addForm.returnPeriod"></el-input>
          </el-form-item>
          <el-form-item label="depoist" prop="depoist">
            <el-input v-model="addForm.depoist"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">CANCEL</el-button>
    <el-button type="primary" @click="editinfo">OK</el-button>
  </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //罚金，归还期限，保证金
      adddialogVisible:false,
      fineValue1:1,
      returnPeriod1:30,
      depoist1:300,


      addForm:{
        fineValue:'1',
        returnPeriod:'30',
        depoist:'300'
      },
      addFormRules:{
        fineValue:[
          {
            required:true,message:"please input fineValue",trigger:"blur"
          }
        ],
        returnPeriod:[
          {
            required:true,message:"please input Period",trigger:"blur"
          }
        ],
        depoist:[
          {
            required:true,message:"please input depoist",trigger:"blur"
          }
        ]
      }
    };
  },
  created(){
      this.adddialogClosed()
  },
  methods:{
    //监听用户对话框
    adddialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    showadddialogVisible(){
      this.adddialogVisible=true
    },
    editinfo(){
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid) return
        await this.$http.put('BorrowManage/'+this.addForm,{
          fineValue: this.addForm.fineValue,
          returnPeriod:this.addForm.returnPeriod,
          depoist:this.addForm.depoist
        })
      })
      this.fineValue1=this.addForm.fineValue
      this.returnPeriod1=this.addForm.returnPeriod
      this.depoist1=this.addForm.depoist
      this.adddialogVisible=false
      this.adddialogClosed()
      this.$message.success('Succeed')

    }
  }

};
</script>

<style lang="less" scoped>
.outer {
  height: 100%;
  width: 100%;
}

//面包屑
.el-breadcrumb {
  /*面包屑下拉间隙*/
  margin-bottom: 15px;
}

//带图片区域
.block {
  background-color: #2b4b6b;
  background: url("../../assets/susan.jpg") no-repeat center center fixed;
  /* background-size: 100% 100%; */
  background-size: cover;
  /* background-repeat: no-repeat; */
  height: 100%;
  width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

//黑盒子
.info_box {
  /*让盒子进行位移*/
  // position: absolute;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 500px;
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.info_box h2 {
  //这个margin再说吧
  margin: 0 0 30px;
  padding: 0;
  text-align: center;
  color: #fff;
}

.el-tag {
  height: 40px;
  width: 100px;
  font-size: larger;
  font-weight: bold;
  // text-align: center;
  // align-content: center;
  // align-items: center;
  margin-bottom: 15px;
  margin-top: 12px;
}
//输入文本框的样式，需要修改
.login_form {
  position: absolute;
  //position: relative;
  // bottom: 60px;
  // width: 100%;
  // padding: 0 20px;
  // box-sizing: border-box;
}
//按钮的样式
.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  // position: relative;
  // bottom: 0;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.count-fine {
  font-size: xx-large;
  font-weight: bolder;
  color: #409eff;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 12px;
}

.count-depoist {
  font-size: xx-large;
  font-weight: bolder;
  color: #d9e626;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 12px;
}

.count-returnPeriod {
  font-size: xx-large;
  font-weight: bolder;
  color: #ff5d40;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 12px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>