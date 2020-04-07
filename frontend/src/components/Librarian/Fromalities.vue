<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Application for loan</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="searchbook-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input placeholder=" Enter book title / author / publisher / publishers / ISBN"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" style="width:50%">Search for Books</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" @click="openCollectFines" style="width:45%">Collect Fines</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-dialog
        title="Collect Fines"
        :visible.sync="dialogVisible"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form
          label-width="170px"
          ref="collectFinesFormRef"
          :rules="collectFinesFormRules"
          :model="collectFinesForm"
        >
          <el-form-item label="Reader ID" prop="readerID">
            <el-input
              type="text"
              placeholder="Please enter Reader ID"
              v-model="collectFinesForm.readerID"
              clearable
              maxlength="20"
              style="width:100%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Amount charged (￥)" prop="finesAmount">
            <el-input-number
              placeholder="Please enter the charge amount"
              :min="0" 
              :max="10000"
              :step="1"
              step-strictly
              v-model="collectFinesForm.finesAmount"
              style="width:100%"
            >
            </el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div>
            <el-button @click="cancelCollectFines" style="margin-right:10px;">Cancel</el-button>
            <el-popconfirm
              title="Please confirm to submit?"
              @onConfirm="completeCollectFines"
              :disabled="popconfrimDisabled"
              confirmButtonText="Confirm"
              cancelButtonText="Cancel"
              icon="el-icon-warning"
              iconColor="#8896B3"
            >
              <el-button type="success" slot="reference" @click="finishCollectFines">Complete</el-button>
            </el-popconfirm>
          </div>
        </span>
      </el-dialog>
      <el-table stripe max-height="500" :data="booklist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Book title" prop="bookname"></el-table-column>
        <el-table-column label="Author" prop="author"></el-table-column>
        <el-table-column label="Publisher" prop="publisher"></el-table-column>
        <el-table-column label="ISBN" prop="isbn">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" close-delay="200" trigger="hover">
              <el-link slot="reference">{{scope.row.isbn}}</el-link>
              <barcode style="text-align:center" :value="scope.row.isbn">Fail to show barcode.</barcode>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="State">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operation" fixed="right" width="220px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" :disabled="judgeButtonDisabled1(scope.row.status)">Loan</el-button>
              <el-button type="primary" :disabled="judgeButtonDisabled2(scope.row.status)">Return</el-button>
            </el-button-group>
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
      booklist: [],
      pagenum: 1,
      total: 0,
      popconfrimDisabled: true,
      dialogVisible: false,
      collectFinesForm: {
        readerID: "",
        finesAmount: ""
      },
      collectFinesFormRules: {
        readerID: [
          { required: true, message: "Please enter Reader ID", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        finesAmount: [
          {
            required: true,
            message: "Please enter the charge amount",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.booklist = [
          {
            bookname: "Villa in heavy snow",
            author: "Higashino Keigo",
            publisher: "Beijing October Literature and Art Publishing House",
            isbn: "9787530216835",
            status: "Not loaned"
          },
          {
            bookname: "Ten Mile Peach",
            author: "Tang Qigongzi",
            publisher: "Shenyang Publishing House",
            isbn: "9787544138000",
            status: "Not loaned"
          },
          {
            bookname: "Why Sheng Xiaomo",
            author: "Gu Man",
            publisher: "Chaohua Publishing House",
            isbn: "9787505414709",
            status: "Lost"
          },
          {
            bookname: "Brief history of humanity",
            author: "[Israel] Yuval Herali",
            publisher: "CITIC Publishing House",
            isbn: "9787508647357",
            status: "Not loaned"
          },
          {
            bookname: "Those things in the Ming Dynasty",
            author: "DangNianMingyue",
            publisher: "China Customs Press",
            isbn: "9787801656087",
            status: "Loaned out"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.booklist = [
          {
            bookname: "Few people",
            author: "M. Scott Parker",
            publisher: "Jilin Literature and History Press",
            isbn: "9787807023777",
            status: "Not loaned"
          },
          {
            bookname: "Pursuing the meaning of life",
            author: "[Austria] Victor Frank",
            publisher: "Xinhua Publishing House",
            isbn: "9787501162734",
            status: "Not loaned"
          },
          {
            bookname: "Secret garden",
            author: "Johanna Besford",
            publisher: "Beijing United Publishing Company",
            isbn: "9787550252585",
            status: "Not loaned"
          }
        ];
      }
      this.total = 8;
      this.$message.success("Get book list successfully");
    },
    judgeType(status) {
      if (status == "Not loaned") return "success";
      if (status == "Lost") return "danger";
      else return "info";
    },
    judgeButtonDisabled1(status) {
      if (status == "Not loaned") return false;
      if (status == "Loaned out") return true;
      return true;
    },
    judgeButtonDisabled2(status) {
      if (status == "Not loaned") return true;
      if (status == "Loaned out") return false;
      return true;
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getBookList();
    },
    openCollectFines() {
      this.dialogVisible = true;
    },
    cancelCollectFines() {
      this.dialogVisible = false;
      this.$refs.collectFinesFormRef.resetFields();
    },
    finishCollectFines() {
      this.$refs.collectFinesFormRef.validate(async valid => {
        if (!valid) return (this.popconfrimDisabled = true);
        this.popconfrimDisabled = false;
      });
    },
    completeCollectFines() {
      this.$refs.collectFinesFormRef.validate(async valid => {
        if (!valid) return;
        this.dialogVisible = false;
        this.$refs.collectFinesFormRef.resetFields();
        return this.$message.success("The fine is collected successfully");
      });
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.searchbook-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>

