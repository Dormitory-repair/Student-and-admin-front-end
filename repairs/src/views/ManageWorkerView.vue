<template>
  <div class="admin-layout">
    <!-- 左侧导航栏 -->
    <div class="side-bar">
      <h3 class="side-title">管理员后台</h3>

      <el-menu
        default-active="worker"
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

    <!-- 右侧内容 -->
    <div class="main-content">
      <div class="header-bar">
        <h2 class="page-title">维修工人信息管理</h2>
        <span class="back-login" @click="goLogin">返回登录</span>
      </div>

      <div class="worker-manage-container">
        <!-- 顶部操作栏 -->
        <div class="top-bar">
          <div class="search-area">
            <el-input
              v-model="searchKey"
              placeholder="请输入工人账号"
              clearable
              size="small"
              class="search-input"
            />
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
            >
              搜索
            </el-button>
          </div>

          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click="handleAdd"
          >
            添加工人
          </el-button>
        </div>

        <!-- 表格 -->
        <el-table :data="filteredWorkers" border stripe>
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="jobId" label="工号" align="center" />
          <el-table-column prop="account" label="工人账号" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="phone" label="电话" align="center" />
          <el-table-column prop="password" label="密码" align="center" />

          <el-table-column label="操作" width="260" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button size="mini" type="warning" @click="handleReset(scope.row)">
                重置密码
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
       
        <!-- 编辑工人弹窗 -->
        <el-dialog title="编辑工人信息" :visible.sync="editDialogVisible" width="420px">
          <el-form :model="editForm" label-width="90px">
            <el-form-item label="工号">
              <el-input v-model="editForm.jobId" disabled />
            </el-form-item>
            <el-form-item label="工人账户">
              <el-input v-model="editForm.account" disabled />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="editForm.name" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="editForm.phone" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="editForm.password" type="password" />
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确认</el-button>
          </span>
        </el-dialog>

        <!-- 添加工人弹窗 -->
        <el-dialog title="添加维修工人" :visible.sync="addDialogVisible" width="420px">
          <el-form :model="addForm" label-width="90px">
            <el-form-item label="工号">
              <el-input v-model="addForm.jobId" />
            </el-form-item>
            <el-form-item label="工人账户">
              <el-input v-model="addForm.account" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="addForm.phone" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="addForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="addForm.confirmPassword" type="password" />
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
  name: "ManageWorkerView",
  data() {
    return {
      searchKey: "",
      workerList: [
        {
          id: 1,
          jobId: "W001",
          account: "worker01",
          name: "张师傅",
          phone: "13800001111",
          password: "123456"
        }
      ],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: {},
      addForm: {}
    };
  },
  computed: {
    filteredWorkers() {
      if (!this.searchKey) return this.workerList;
      return this.workerList.filter(w =>
        w.account.includes(this.searchKey)
      );
    }
  },
  methods: {
    handleAdd() {
      this.addForm = {
        jobId: "",
        account: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: ""
      };
      this.addDialogVisible = true;
    },
    handleEdit(row) {
      this.editForm = { ...row, password: "" };
      this.editDialogVisible = true;
    },
    handleReset(row) {
      row.password = "123456";
      this.$message.success("密码已重置");
    },
    handleDelete(row) {
      this.workerList = this.workerList.filter(w => w.id !== row.id);
      this.$message.success("删除成功");
    },
    confirmEdit() {
      Object.assign(
        this.workerList.find(w => w.id === this.editForm.id),
        this.editForm
      );
      this.$message.success("修改成功");
      this.editDialogVisible = false;
    },
    confirmAdd() {
      if (this.addForm.password !== this.addForm.confirmPassword) {
        this.$message.error("两次密码不一致");
        return;
      }
      this.workerList.push({
        ...this.addForm,
        id: Date.now()
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

/* 工人管理卡片 */
.worker-manage-container {
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
