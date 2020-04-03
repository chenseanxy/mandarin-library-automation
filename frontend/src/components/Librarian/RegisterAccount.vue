<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Reader account management</el-breadcrumb-item>
      <el-breadcrumb-item>Register accounts</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="registeraccount-card" shadow="hover">
      <el-alert
        title="Click the button below to collect a ￥300 deposit and register a reader's account"
        center
        type="info"
        show-icon
      ></el-alert>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button
            type="primary"
            style="width:100%"
            @click="dialogVisible1 = true"
          >Collect a ￥300 deposit and continue to register a reader's account</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="Collect deposit"
        :visible.sync="dialogVisible1"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          :rules="depositFormRules"
          :model="depositForm"
          label-width="140px"
          ref="depositFormRef"
        >
          <el-form-item label="Deposit charged" prop="deposit">
            <el-select
              style="width:100%;"
              v-model="depositForm.deposit"
              placeholder="Please select the amount you charge"
            >
              <el-option label="￥300" value="300"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <div>
            <el-button @click="cancelAccountRegister">Cancel</el-button>
            <el-button type="primary" @click="continueAccountRegister">Continue</el-button>
          </div>
        </span>
      </el-dialog>
      <el-dialog
        title="Register account"
        :visible.sync="dialogVisible2"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          ref="accountRegisterFormRef"
          :model="accountRegisterForm"
          :rules="accountRegisterFormRules"
          label-width="140px"
        >
          <el-form-item label="Reader account" prop="username">
            <el-input
              v-model.number="accountRegisterForm.username"
              prefix-icon="el-icon-user"
              placeholder="Please enter the reader account (Phone number)"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Reader email" prop="email">
            <el-input
              v-model="accountRegisterForm.email"
              prefix-icon="el-icon-message"
              placeholder="Please enter the reader email (Optional)"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <div>
            <el-button @click="backAccountRegister">Back</el-button>
            <el-button type="success" @click="completeAccountRegister">Complete</el-button>
          </div>
        </span>
      </el-dialog>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="accountlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Account" prop="readeraccount"></el-table-column>
        <el-table-column label="Email" prop="readeremail"></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :total="total"
        page-size="5"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getAccountList();
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the account"));
      } else {
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("Please enter the correct account"));
        }
      }
    };
    return {
      depositValue: "",
      accountlist: [],
      pagenum: 1,
      dialogVisible1: false,
      dialogVisible2: false,
      total: 0,
      depositForm: {
        deposit: ""
      },
      accountRegisterForm: {
        username: "",
        email: ""
      },
      accountRegisterFormRules: {
        username: [
          {
            required: true,
            message: "Please enter the account",
            trigger: "blur"
          },
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          {
            required: false,
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please enter the correct email address",
            trigger: ["blur", "change"]
          }
        ]
      },
      depositFormRules: {
        deposit: [
          {
            required: true,
            message: "Please select the amount",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getAccountList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.accountlist = [
          {
            readeraccount: "18000000000",
            readeremail: "18000000000@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000001",
            readeremail: "18000000001@reader.com",
            status: "Deleted"
          },
          {
            readeraccount: "18000000002",
            readeremail: "18000000002@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000003",
            readeremail: "18000000003@reader.com",
            status: "In arrears"
          },
          {
            readeraccount: "18000000004",
            readeremail: "18000000004@reader.com",
            status: "Normal"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.accountlist = [
          {
            readeraccount: "18000000005",
            readeremail: "18000000005@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000006",
            readeremail: "18000000006@reader.com",
            status: "Normal"
          },
          {
            readeraccount: "18000000007",
            readeremail: "18000000007@reader.com",
            status: "Normal"
          }
        ];
      }
      this.total = 8;
      this.$message.success("Getting reader list succeeded");
    },
    judgeType(status) {
      if (status == "Normal") return "success";
      if (status == "Deleted") return "info";
      else return "danger";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getAccountList();
    },
    cancelAccountRegister() {
      this.dialogVisible1 = false;
      this.$refs.depositFormRef.resetFields();
    },
    continueAccountRegister() {
      this.$refs.depositFormRef.validate(async valid => {
        if (!valid) return false;
        this.dialogVisible1 = false;
        this.dialogVisible2 = true;
      });
    },
    backAccountRegister() {
      this.dialogVisible1 = true;
      this.dialogVisible2 = false;
    },
    completeAccountRegister() {
      this.$refs.accountRegisterFormRef.validate(async valid => {
        if (!valid) return false;
        this.dialogVisible2 = false;
        this.$refs.depositFormRef.resetFields();
        this.$refs.accountRegisterFormRef.resetFields();
        return this.$message.success(
          "Register the reader account successfully"
        );
      });
    }
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
</style>

