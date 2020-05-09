<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Librarian Home Page</el-breadcrumb-item>
      <el-breadcrumb-item>Announcement management</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="announcement-card" shadow="hover">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form
            ref="searchAnnouncementRef"
            :model="searchAnnouncementForm"
            :rules="searchAnnouncementRules"
          >
            <el-form-item prop="searchcontenet">
              <el-input
                v-model="searchAnnouncementForm.searchcontenet"
                placeholder="Please enter announcement title / announcement content "
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            @click="searchAnnouncement()"
            style="width:45%"
          >Search announcements</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="success"
            @click="dialogVisible = true"
            style="width:50%"
          >Publish an announcement</el-button>
        </el-col>
      </el-row>
      <!-- 发布公告弹出框 -->
      <el-dialog
        title="Make a new announcement"
        :visible.sync="dialogVisible"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form ref="announcementFormRef" :rules="announcementFormRules" :model="announcementForm">
          <el-form-item label="Announcement title" prop="announcementtitle">
            <el-input
              type="text"
              placeholder="Please enter the announcement title"
              v-model="announcementForm.announcementtitle"
              clearable
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="Announcement content" prop="announcementcontent">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please enter the announcement content"
              maxlength="500"
              show-word-limit
              v-model="announcementForm.announcementcontent"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div>
            <el-button @click="cancelAnnouncementForm" style="margin-right:10px;">Cancel</el-button>
            <el-popconfirm
              title="Please confirm to publish?"
              @onConfirm="completePublishAnnouncement"
              :disabled="popconfrimDisabled"
              confirmButtonText="Publish"
              confirmButtonType="success"
              cancelButtonText="Cancel"
              icon="el-icon-question"
              iconColor="#FF7B23"
            >
              <el-button type="primary" slot="reference" @click="publishAnnouncement">Publish</el-button>
            </el-popconfirm>
          </div>
        </span>
      </el-dialog>

      <el-divider></el-divider>
      <el-table stripe max-height="500" :data="announcementlist">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="Announcement title" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="Announcement content"
          prop="content"
          min-width="200px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="Release time" prop="time"></el-table-column>
        <el-table-column label="Operation" fixed="right" width="160px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="Edit"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-popconfirm
              :title="'Are you sure to DELETE '+scope.row.title.substr(0,12)+'... ?'"
              confirmButtonText="Delete"
              cancelButtonText="Cancel"
              confirmButtonType="danger"
              icon="el-icon-warning"
              iconColor="#FF6262"
            >
              <el-button
                slot="reference"
                style="margin-left:10px;"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-popconfirm>
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
      searchAnnouncementForm: {
        searchcontenet: ""
      },
      searchAnnouncementRules: {
        searchcontenet: [
          {
            required: true,
            message: "Please enter the search content",
            trigger: "blur"
          }
        ]
      },
      announcementlist: [],
      pagenum: 1,
      total: 0,
      popconfrimDisabled: true,
      dialogVisible: false,
      announcementForm: {
        announcementtitle: "",
        announcementcontent: "",
      },
      announcementFormRules: {
        announcementtitle: [
          {
            required: true,
            message: "Please enter the announcement title",
            trigger: "blur"
          }
        ],
        announcementcontent: [
          {
            required: true,
            message: "Please enter an announcement content",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getAnnouncementList() {
      // 修改这里以从后端调取信息
      this.$http.post("/api/announce/search_all",{
          }).then((res) => {
            var table=res.body;
            this.total=table.length;
            var pagenow=this.pagenum;
            var index = (pagenow-1)*5;
            this.announcementlist=[];
            
            for(var i=index;i<this.total&& i<index+5;i++){
              table[i].time=table[i].time.slice(0,10)+" "+table[i].time.slice(11,19);
              this.announcementlist.push(table[i]);
            }
            console.log(res);
        });
      //this.$message.success("Getting announcement list succeeded");
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
        if (!valid) return (this.popconfrimDisabled = true);
        this.popconfrimDisabled = false;
      });
    },
    completePublishAnnouncement() {
      this.$refs.announcementFormRef.validate(async valid => {
        if (!valid) return;
        this.insertAnnouncement();
        this.dialogVisible = false;
        this.$refs.announcementFormRef.resetFields();
      });
    },
    insertAnnouncement(){
      this.$http.post("/api/announce/insert_one",{
          title:this.announcementForm.announcementtitle,
          content:this.announcementForm.announcementcontent
        }).then((res) => {
            console.log(res);
            this.getAnnouncementList();
        });
        return this.$message.success("The new announcement was published successfully");
    },
    searchAnnouncement() {
      this.$refs.searchAnnouncementRef.validate(async valid => {
        if (!valid) return;
        const loading = this.$loading({
          lock: true,
          text: "Searching for " + this.searchAnnouncementForm.searchcontenet + " ..."
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
        var ask="%"+this.searchAnnouncementForm.searchcontenet+"%";
        this.$http.post("/api/announce/search_one",{
            ask:ask
          }).then((res) => {
            console.log(res);
            var table=res.body;
            if(table.length!=0){
              this.total=table.length;
              var pagenow=this.pagenum;
              var index = (pagenow-1)*5;
              this.announcementlist=[];
              for(var i=index;i<this.total&& i<index+5;i++){
                table[i].time=table[i].time.slice(0,10)+" "+table[i].time.slice(11,19);
                this.announcementlist.push(table[i]);
              }
              this.$message.success("Successfully found the result");
            }else {
              this.$message.error("Not successfully found the result");
              this.getAnnouncementList();
            }
          });
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

