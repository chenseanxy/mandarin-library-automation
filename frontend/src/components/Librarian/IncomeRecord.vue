<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书馆收入记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="profit-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入 缴费账户 / 收入金额 "></el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="datevalue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button-group>
            <el-button type="primary">搜索罚金记录</el-button>
            <el-button type="success">搜索保证金记录</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="profitlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="缴费账户" prop="readeraccount"></el-table-column>
        <el-table-column label="缴费时间" prop="time"></el-table-column>
        <el-table-column label="收入金额" prop="incomeamount"></el-table-column>
        <el-table-column label="收入类别">
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
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
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
      if (this.pagenum == 1) {
        this.profitlist = [
          {
            readeraccount: "18000000000",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          },
          {
            readeraccount: "18000000001",
            time: "2020-03-01 00:00:00",
            incomeamount: "5.00",
            category: "罚金收入"
          },
          {
            readeraccount: "18000000002",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          },
          {
            readeraccount: "18000000003",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          },
          {
            readeraccount: "18000000004",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.profitlist = [
          {
            readeraccount: "18000000005",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          },
          {
            readeraccount: "18000000006",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          },
          {
            readeraccount: "18000000007",
            time: "2020-03-01 00:00:00",
            incomeamount: "300.00",
            category: "保证金收入"
          }
        ];
      }
      this.total = 8;
      this.$message.success("获取收入记录成功");
    },
    judgeType(category) {
      if (category == "保证金收入") return "success";
      if (category == "罚金收入") return "primary";
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
</style>


