<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Admin Home Page</el-breadcrumb-item>
            <el-breadcrumb-item>Lib management</el-breadcrumb-item>
            <el-breadcrumb-item>Manage Accounts</el-breadcrumb-item>
        </el-breadcrumb>

        <!--最上面的搜索栏-->
        <el-card class="searchbook-card" shadow="hover">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-input placeholder="Please enter librarian account "></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" style="width:100%">Search</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <!--这里是table的内容，这里把data改成liblist -->
            <el-table stripe max-height="500" :data="liblist">

                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="Account" prop="account"></el-table-column>
                <el-table-column label="Email" prop="Email"></el-table-column>
                <el-table-column label="Password" prop="password"></el-table-column>



                <!--这是状态那一列-->
                <el-table-column label="State">
                    <template slot-scope="scope">
                        <el-tag :type="judgeType(scope.row.status)" effect="dark">{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>

                <!--两个操作那一列，在这里admin也要实现编辑和删除-->
                <el-table-column label="Operation" fixed="right" width="160px">
                    <template slot-scope="scope">

                        <el-popover placement="left" width="500" trigger="click">
                            <el-button
                                    slot="reference"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="startEditAccount(scope.row.account,scope.row.Email,scope.row.password,scope.row.status)"
                                    circle
                            ></el-button>


                            <!--这是弹出来的修改框,我先暂时注释掉了-->
                            <h3 style="text-align: center;">Edit Account</h3>
                            <el-form

                                    :ref="`${scope.$index}-editAccountFormRef`"
                                    :model="editLibForm"
                                    :rules="editLibFormRules"
                                    label-width="120px"
                                    style="padding-right:20px;"
                                    size="small"
                            >


                                <el-form-item label="Account" prop="account">
                                    <el-input
                                            v-model="editLibForm.account"
                                            placeholder="Please enter the account"
                                            clearable
                                    ></el-input>
                                </el-form-item>

                                <el-form-item label="Email" prop="email">
                                    <el-input
                                            v-model="editLibForm.Email"
                                            placeholder="Please enter the email"
                                            clearable
                                    ></el-input>
                                </el-form-item>

                                <el-form-item label="Password" prop="password">
                                    <el-input
                                            type="textarea"
                                            v-model="editLibForm.password"
                                            placeholder="Please enter the password"
                                            clearable
                                    ></el-input>
                                </el-form-item>

                                <el-form-item label="Status" prop="status">
                                    <el-select
                                            v-model="editBookForm.status"
                                            style="width:100%"
                                            placeholder="Please choose the status"
                                    >
                                        <el-option value="Normal"></el-option>
                                        <el-option value="Lost"></el-option>

                                    </el-select>
                                </el-form-item>
                            </el-form>

                            <div style="text-align: right; margin: 0">
                                <el-button type="text" @click="cancelEditAccount()" size="mini">Cancel</el-button>
                                <el-button
                                        style="margin-left:10px;"
                                        type="primary"
                                        @click="completeEditAccount(scope.$index)"
                                        size="mini"
                                >Modify</el-button>
                            </div>
                        </el-popover>



                        <!--account删除时的弹框，应该修改好了-->
                        <el-popconfirm
                                :title="'Are you sure to DELETE '+scope.row.account+' ?'"
                                confirmButtonText="Delete"
                                @onConfirm="completeDeleteAccount(scope.$index)"
                                cancelButtonText="Cancel"
                                confirmButtonType="danger"
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

            <!--最下面的导航栏，应该修改好了-->
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
            return {
                pagenum: 1,
                editaccountformvisible: false,
                total: 0,
                editBookForm: {
                    booktitle: "",
                    author: "",
                    publisher: "",
                    isbn: "",
                    status: ""
                },

                //lib属性1
                liblist: [],
                editLibForm: {
                    account: "",
                    Email: "",
                    password: "",
                    status: ""
                },

                editBookFormRules: {
                    booktitle: [
                        {
                            required: true,
                            message: "Please enter the booktitle",
                            trigger: "blur"
                        }
                    ],
                    author: [
                        {
                            required: true,
                            message: "Please enter the author",
                            trigger: "blur"
                        }
                    ],
                    publisher: [
                        {
                            required: true,
                            message: "Please enter the publisher",
                            trigger: "blur"
                        }
                    ],
                    isbn: [
                        {
                            required: true,
                            message: "Please enter the ISBN",
                            trigger: "blur"
                        }
                    ],
                    status: [
                        {
                            required: true,
                            message: "Please choose the status",
                            trigger: "blur"
                        }
                    ]
                },

                //lib属性2
                editLibFormRules: {
                    account: [
                        {
                            required: true,
                            message: "Please enter account",
                            trigger: "blur"
                        }
                    ],
                    Email: [
                        {
                            required: true,
                            message: "Please enter the Email",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "Please enter the password",
                            trigger: "blur"
                        }
                    ],
                    status: [
                        {
                            required: true,
                            message: "Please choose the status",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        created() {
            this.getLibList();
        },

        methods: {
            //这里返回lib信息
            getLibList() {
                // 修改这里以从后端调取信息
                if (this.pagenum == 1) {
                    this.liblist = [
                        {
                            account: "Villa",
                            Email: "abcde@qq.com",
                            password: "Beijing",
                            status: "Normal"
                        },
                        {
                            account: "Sheng",
                            Email: "GuMan@qq.com",
                            password: "Beijing",
                            status: "Lost"
                        },
                        {
                            account: "Brief",
                            Email: "Yuval@qq.com",
                            password: "9787508647357",
                            status: "Normal"
                        },
                        {
                            account: "Ming",
                            Email: "ang@qq.com",
                            password: "0165608",
                            status: "Normal"
                        },
                        {
                            account: "ghadfjksdh",
                            Email: "dsakh@qq.com",
                            password: "0ajdksl",
                            status: "Normal"
                        }
                    ];
                }
                if (this.pagenum == 2) {
                    this.booklist = [
                        {
                            account: "fhkadj",
                            Email: "faihd@qq.com",
                            password: "fkhjas",
                            status: "Normal"
                        },
                        {
                            account: "lfadhs",
                            Email: "lfkhasj@qq.com",
                            password: "falcsdjakl",
                            status: "Normal"
                        },
                        {
                            account: "flhask",
                            Email: "iuyfdsjkfhd@qq.com",
                            password: "fidushifs",
                            status: "Normal"
                        }
                    ];
                }
                this.total = 8;
                this.$message.success("Fetching book list succeeded");
            },

            //给状态设置底色
            judgeType(status) {
                if (status == "Normal") return "success";
                if (status == "Lost") return "danger";
                else return "info";
            },


            //跳到下一页获取信息
            handleCurrentChange(newPage) {
                this.pagenum = newPage;
                this.getLibList();
            },


            //添加账号
            startEditAccount(account, Email, password, status) {
                this.editLibForm.account = account;
                this.editLibForm.Email = Email;
                this.editLibForm.password = password;
                this.editLibForm.status = status;
            },
            //关闭窗口
            completeEditAccount(index) {
                this.$refs[`${index}-editAccountFormRef`].validate(async valid => {
                    if (!valid) return;
                    // 在这里添加后端交互，下面是前端层面的修改操作
                    this.liblist.splice(index, 1, {
                        account:this.editLibForm.account,
                        Email:this.editLibForm.Email,
                        password:this.editLibForm.password,
                        status:this.editLibForm.status

                    });
                    // 上面是前端层面的修改操作，添加后端代码后删除上述代码并添加刷新页面操作
                    document.querySelector("#app").click();
                    this.$message.success("Modifying Account succeeded");
                    setTimeout(() => {
                        this.editaccountformvisible = false;
                    }, 200);
                });
            },
            cancelEditAccount(index) {
                // 下面这行语句用于关闭popover窗口
                document.querySelector("#app").click();
                this.$refs[`${index}-editAccountFormRef`].resetFields();
                setTimeout(() => {
                    this.editaccountformvisible = false;
                }, 200);
            },



            //删除账号
            completeDeleteAccount(index) {
                // 在这里添加后端交互，下面是前端层面的删除操作
                this.liblist.splice(index, 1);
                this.total = this.total - 1;
                // 上面是前端层面的删除操作，添加后端代码后删除上述代码并添加刷新页面操作
                this.$message.success("Deleting Account succeeded");
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

