<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="announcement-card" shadow="hover">
      <el-row :gutter="10">
        <el-col :span="18">
          <el-input placeholder="请输入 图书名 / 作者 / 出版社 / ISBN "></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">搜索公告</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" @click="dialogVisible = true">发布新公告</el-button>
        </el-col>
      </el-row>
      <!-- 发布公告弹出框 -->
      <el-dialog
        title="发布新公告"
        :visible.sync="dialogVisible"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form ref="announcementFormRef" :rules="announcementFormRules" :model="announcementForm">
          <el-form-item prop="announcementtitle">
            <el-input
              type="text"
              placeholder="请输入公告标题"
              v-model="announcementForm.announcementtitle"
              clearable
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div style="margin: 20px 0;"></div>
          <el-form-item prop="announcementcontent">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="请输入内容"
              maxlength="500"
              show-word-limit
              v-model="announcementForm.announcementcontent"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div>
            <el-button @click="cancelAnnouncementForm">取 消</el-button>
            <el-button type="success" @click="publishAnnouncement">发 布</el-button>
          </div>
        </span>
      </el-dialog>

      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="announcementlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="公告标题" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="公告内容" prop="content" min-width="200px" show-overflow-tooltip></el-table-column>
        <el-table-column label="发布时间" prop="time"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
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
    this.getAnnouncementList();
  },
  data() {
    return {
      announcementlist: [],
      pagenum: 1,
      total: 0,
      dialogVisible: false,
      announcementForm: {
        announcementtitle: "",
        announcementcontent: ""
      },
      announcementFormRules: {
        announcementtitle: [
          { required: true, message: "请输入公告标题", trigger: "blur" }
        ],
        announcementcontent: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getAnnouncementList() {
      // 修改这里以从后端调取信息
      if (this.pagenum == 1) {
        this.announcementlist = [
          {
            title: "信息时代如何做好“远距离”科研",
            content:
              "近期新冠肺炎疫情的发展情况牵动着每个人的心。经过此次疫情，大众的工作生活发生了不小的改变，也收获了许多“防疫”经验。对科研工作者来说，疫情的发生可以局限科研空间，却无法阻止科研工作者进行学术研究的深度，“远距离”科研成为信息时代普遍的工作模式，并为科研工作提供更高效的科研机会。",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "校外访问图书馆数字资源的方式",
            content:
              "多个常用数据库可使用学校统一认证账号和密码访问（见新闻通知“好消息！统一认证方式在校外也能访问一些常用数据库”）温馨提示：若统一认证平台无法登录，可尝试以下两种方法：（a）更换浏览器（推荐使用Chrome）或彻底清除浏览器缓存；（b）清空浏览器-复制网址在新建空白页上打开-再登录（不用重启浏览器）",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "关于国外资源发现系统（电波搜索）无法正常访问的通知",
            content:
              "国外资源发现系统（电波搜索），自2月18日至3月1日进行SFX迁移。在此期间，与SFX相关链接将无法正常访问。图书馆主页上的国外资源检索中的电波搜索以及数据库导航中的电波搜索（国外一站式资源发现和获取系统）将无法正常使用，特此通知。",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "图书馆数字资源助您宅家决胜科研",
            content:
              "疫情防控期间，继上期推出直接支持教学的数字资源汇总，图书馆“数字资源阅读推广工作组”本期围绕支持我校师生的科研活动，重新梳理了已购数字资源并精选整理了相应的免费网络资源，归纳成了以下五大类六个专题：",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "关于清理图书馆QQ咨询群的通知",
            content:
              "目前，“图书馆网络咨询QQ群”1和2均已满员，但仍有读者申请入群，请读者们尽快将昵称修改为“学院名+姓名”，图书馆将于2月23日对不符合要求的进行清退。请大家相互转告！",
            time: "2020-03-01 00:00:00"
          }
        ];
      }
      if (this.pagenum == 2) {
        this.announcementlist = [
          {
            title: "关于冠状病毒等相关免费科研信息资源整理",
            content:
              "面对“新型冠状病毒肺炎”疫情，国际相关学科领域学者也在密切关注，新的学术研究成果，也通过现代网络环境下催生的新的出版模式得到最快的传播。科研信息的快速传播，加速了人类对疾病的了解和研究进程，助力人们迅速有效的遏制疾病机器传播。",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "图书馆数字资源火力全开，供您选择使用",
            content:
              "疫情防控期间，我校师生正在落实教育部“停课不停教、不停学”的要求，特此，图书馆专门成立了“数字资源阅读推广工作组”，工作内容之一就是开展辅助教学的数字资源宣传推广活动。",
            time: "2020-03-01 00:00:00"
          },
          {
            title: "图书馆关于延长寒假闭馆时间的通知",
            content:
              "为切实做好新型冠状病毒感染肺炎的防控工作，防止疫情蔓延，避免因人员聚集引起的交叉感染，最大限度保护广大读者的身体健康及生命安全，根据中央精神及属地疾控措施的要求，南北校区图书馆整体（含自习室）将延长闭馆时间，恢复开馆时间根据学校总体部署安排另行通知。",
            time: "2020-03-01 00:00:00"
          }
        ];
      }
      this.total = 8;
      this.$message.success("获取公告列表成功");
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getAnnouncementList();
    },
    cancelAnnouncementForm() {
      this.dialogVisible = false;
      this.$refs.announcementFormRef.resetFields();
    },
    publishAnnouncement() {
      this.$refs.announcementFormRef.validate(async valid => {
        if (!valid) return;
        this.dialogVisible = false;
        this.announcementForm.announcementtitle = "";
        this.announcementForm.announcementcontent = "";
        return this.$message.success("新公告发布成功");
      });
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.announcement-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  /* width: 700px; */
  margin: 0 auto;
}
.el-pagination {
  margin-top: 15px;
}
</style>

