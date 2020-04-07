<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Library income records</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="count-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <p class="count-deposit">￥ {{totaldeposit}}</p>
            <p class="count-word">Deposit income in total</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <p class="count-fine">￥ {{totalfine}}</p>
            <p class="count-word">Fine income in total</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="profit-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="Please enter Payment Account / Revenue Amount"></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="datevalue"
            style="width:100%"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button style="width:100%" type="primary">Search penalty records</el-button>
        </el-col>
      </el-row>
      <p style="padding:0px;"></p>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="Please enter Payment Account / Revenue Amount"></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="datevalue"
            style="width:100%"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button style="width:100%" type="success">Search margin records</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="profitlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Payment account" prop="readeraccount"></el-table-column>
        <el-table-column label="Time" prop="time"></el-table-column>
        <el-table-column label="Amount" prop="incomeamount"></el-table-column>
        <el-table-column label="Income category">
          <template slot-scope="scope">
            <el-tag :type="judgeType(scope.row.category)" effect="dark">{{scope.row.category}}</el-tag>
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
    this.getProfitList();
  },
  data() {
    return {
      profitlist: [],
      pagenum: 1,
      total: 0,
      totaldeposit: 0,
      totalfine:0,
      pickerOptions: {
        shortcuts: [
          {
            text: "Last Week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last Month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last Year",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      datevalue: ""
    };
  },
  methods: {
    getProfitList() {
      // 修改这里以从后端调取信息
      this.totaldeposit = 2100;
      this.totalfine = 5;
      if (this.pagenum == 1) {
        this.profitlist = [
          {
            readeraccount: "18000000000",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          },
          {
            readeraccount: "18000000001",
            time: "2020-03-01 00:00:00",
            incomeamount: "5.00",
            category: "Penalty"
          },
          {
            readeraccount: "18000000002",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          },
          {
            readeraccount: "18000000003",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          },
          {
            readeraccount: "18000000004",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.profitlist = [
          {
            readeraccount: "18000000005",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          },
          {
            readeraccount: "18000000006",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          },
          {
            readeraccount: "18000000007",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "Margin"
          }
        ];
      }
      this.total = 8;
      this.$message.success("Successfully obtained revenue records");
    },
    judgeType(category) {
      if (category == "Margin") return "success";
      if (category == "Penalty") return "primary";
      else return "danger";
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getProfitList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.profit-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
.count-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
  margin-bottom: 15px;
}
.count-deposit {
  font-size: xx-large;
  font-weight: bolder;
  color: #67c23a;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 12px;
}
.count-fine {
  font-size: xx-large;
  font-weight: bolder;
  color: #409eff;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 12px;
}
.count-word {
  font-size: x-large;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 12px;
}
</style>


