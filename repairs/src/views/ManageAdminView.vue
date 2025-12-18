<template>
  <div class="admin-layout">
    <!-- 左侧导航栏 -->
    <div class="side-bar">
      <h3 class="side-title">管理员后台</h3>

      <el-menu
        default-active="student"
        class="side-menu"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="student" @click="goStudent">
          <i class="el-icon-user"></i>
          <span slot="title">学生信息</span>
        </el-menu-item>

        <el-menu-item index="worker" @click="goWorker">
          <i class="el-icon-s-custom"></i>
          <span slot="title">维修工人信息</span>
        </el-menu-item>

        <el-menu-item index="admin" @click="goAdmin">
          <i class="el-icon-setting"></i>
          <span slot="title">管理员信息</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区域 -->
    <div class="main-content">
      <!-- 顶部标题栏 -->
      <div class="header-bar">
        <h2 class="page-title">管理员信息管理</h2>
        <span class="back-login" @click="goLogin">返回登录</span>
      </div>

      <!-- 管理员管理主体 -->
      <div class="admin-manage-container">
        <!-- 顶部操作栏 -->
        <div class="top-bar">
          <div class="search-area">
            <el-input
              v-model="searchKey"
              placeholder="请输入管理员账号"
              clearable
              size="small"
              class="search-input"
            />
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="handleSearch"
            >
              搜索
            </el-button>
          </div>

          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click="handleAdd">
            添加管理员
          </el-button>
        </div>

        <!-- 管理员表格 -->
        <el-table
          :data="filteredAdmins"
          border
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center" />

          <el-table-column
            prop="account"
            label="账号"
            align="center"/>

          <el-table-column
            prop="password"
            label="密码"
            align="center"/>

          <el-table-column
            label="操作"
            width="260"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>

              <!-- <el-button
                size="mini"
                type="warning"
                @click="handleReset(scope.row)"
              >
                重置密码
              </el-button> -->

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑管理员弹窗 -->
        <el-dialog
        title="编辑管理员信息"
        :visible.sync="editDialogVisible"
        width="400px"
        >
        <el-form :model="editForm" label-width="90px">
            <el-form-item label="账号">
            <el-input v-model="editForm.account" disabled />
            </el-form-item>

            <el-form-item label="旧密码">
            <el-input
                v-model="editForm.oldPassword"
                type="password"
                placeholder="请输入旧密码"
            />
            </el-form-item>

            <el-form-item label="新密码">
            <el-input
                v-model="editForm.newPassword"
                type="password"
                placeholder="请输入新密码"
            />
            </el-form-item>
        </el-form>

        <span slot="footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
        </el-dialog>

        <!-- 添加管理员弹窗 -->
        <el-dialog
        title="添加管理员"
        :visible.sync="addDialogVisible"
        width="400px"
        >
        <el-form :model="addForm" label-width="80px">
            <el-form-item label="账号">
            <el-input v-model="addForm.account" placeholder="请输入账号" />
            </el-form-item>

            <el-form-item label="密码">
            <el-input
                v-model="addForm.password"
                type="password"
                placeholder="请输入密码"
            />
            </el-form-item>

            <el-form-item label="确认密码">
            <el-input
                v-model="addForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
            />
            </el-form-item>
        </el-form>

        <span slot="footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAdd">确认</el-button>
        </span>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageAdminView",
  data() {
    return {
      searchKey: "",
      adminList: [
        { id: 1, account: "admin01", password: "123456" },
        { id: 2, account: "admin02", password: "123456" },
        { id: 3, account: "admin03", password: "123456" },
        { id: 4, account: "admin04", password: "123456" }
      ],
      editDialogVisible: false,
      addDialogVisible: false,

      editForm: {
        id: null,
        account: "",
        oldPassword: "",
        newPassword: ""
     },

      addForm: {
      account: "",
      password: "",
      confirmPassword: ""
      }
    };
  },
  computed: {
    filteredAdmins() {
      if (!this.searchKey) return this.adminList;
      return this.adminList.filter(item =>
        item.account.includes(this.searchKey)
      );
    }
  },
  methods: {
    handleSearch() {
      this.$message.success("搜索完成");
    },
    handleAdd() {
        this.addForm = {
            account: "",
            password: "",
            confirmPassword: ""
        };
        this.addDialogVisible = true;
    },
    handleEdit(row) {
    this.editForm = {
        id: row.id,
        account: row.account,
        oldPassword: "",
        newPassword: ""
    };
    this.editDialogVisible = true;
    },
        // handleReset(row) {
        //   this.$confirm(
        //     `确定要重置 ${row.account} 的密码吗？`,
        //     "提示",
        //     { type: "warning" }
        //   ).then(() => {
        //     row.password = "123456";
        //     this.$message.success("密码已重置为 123456");
        //   });
        // },
    handleDelete(row) {
      this.$confirm(
        `确定要删除管理员 ${row.account} 吗？`,
        "警告",
        { type: "error" }
      ).then(() => {
        this.adminList = this.adminList.filter(
          item => item.id !== row.id
        );
        this.$message.success("删除成功");
      });
    },
    confirmEdit() {
    const { id, oldPassword, newPassword } = this.editForm;

    if (!oldPassword || !newPassword) {
        this.$message.warning("请填写旧密码和新密码");
        return;
    }

    // 找到当前管理员
    const target = this.adminList.find(item => item.id === id);

    if (!target) {
        this.$message.error("管理员不存在");
        return;
    }

    // 校验旧密码
    if (target.password !== oldPassword) {
        this.$message.error("旧密码不正确");
        return;
    }

    // 新旧密码不能一致
    if (oldPassword === newPassword) {
        this.$message.warning("新密码不能与旧密码相同");
        return;
    }

    // 修改密码
    target.password = newPassword;

    this.$message.success("密码修改成功");
    this.editDialogVisible = false;
    },


    confirmAdd() {
    if (
        !this.addForm.account ||
        !this.addForm.password ||
        !this.addForm.confirmPassword
    ) {
        this.$message.warning("请填写完整信息");
        return;
    }

    if (this.addForm.password !== this.addForm.confirmPassword) {
        this.$message.error("两次密码不一致");
        return;
    }

    this.studentList.push({
        id: Date.now(),
        account: this.addForm.account,
        password: this.addForm.password
    });

    this.$message.success("添加成功");
    this.addDialogVisible = false;
    },


    // 路由跳转
    goStudent() {
        if (this.$route.path !== '/manage/student') {
            this.$router.push('/manage/student')
        }
    },
    goWorker() {
        if (this.$route.path !== '/manage/worker') {
            this.$router.push('/manage/worker')
        }
    },
    goAdmin() {
        if (this.$route.path !== '/manage/admin') {
            this.$router.push('/manage/admin')
        }
    },
    goLogin() {
      this.$router.push("/manager/login");
    }
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

/* 左侧导航栏 */
.side-bar {
  width: 220px;
  background: #304156;
  color: #fff;
}

.side-title {
  text-align: center;
  padding: 20px 0;
  font-size: 18px;
}

.side-menu {
  border-right: none;
}

/* 右侧内容 */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-x: hidden;
}

/* 顶部栏 */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
}

.back-login {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.back-login:hover {
  text-decoration: underline;
}

/* 管理员管理卡片 */
.admin-manage-container {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}

/* 搜索栏 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-area {
  display: flex;
  align-items: center;
}

.search-input {
  width: 220px;
  margin-right: 10px;
}
</style>
