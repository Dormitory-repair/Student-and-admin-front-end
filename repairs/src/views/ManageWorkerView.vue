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
              placeholder="请输入员工姓名"
              clearable
              size="small"
              class="search-input"
            />
            <el-button type="primary" size="small" icon="el-icon-search"
              @click="searchWorker">
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
        <el-table :data="workerList" border stripe>
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="worker_code" label="员工ID" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="phone" label="电话" align="center" />
          <el-table-column prop="work_type" label="工种" align="center" />
          <el-table-column prop="hire_date" label="入职日期" align="center" />
          <el-table-column prop="monthly_orders" label="本月接单" align="center" />
          <el-table-column prop="password" label="密码" align="center" />
          <el-table-column prop="created_time" label="创建时间" align="center" />  

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

        <!-- 编辑弹窗 -->
        <el-dialog title="编辑工人信息" :visible.sync="editDialogVisible" width="420px">
          <el-form :model="editForm" label-width="90px">
            <el-form-item label="姓名">
              <el-input v-model="editForm.name" />
            </el-form-item>
            <el-form-item label="员工ID">
              <el-input v-model="editForm.worker_code" disabled />
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="editForm.phone" />
            </el-form-item>
            <el-form-item label="工种">
              <el-input v-model="editForm.jobType" />
            </el-form-item>
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="editForm.entryDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="editForm.password" type="password"  show-password/>
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确认</el-button>
          </span>
        </el-dialog>

        <!-- 添加弹窗 -->
        <el-dialog title="添加维修工人" :visible.sync="addDialogVisible" width="420px">
          <el-form :model="addForm" label-width="90px">
            <el-form-item label="姓名">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="员工ID">
              <el-input v-model="addForm.worker_code" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="addForm.phone" />
            </el-form-item>
            <el-form-item label="工种">
              <el-input v-model="addForm.jobType" />
            </el-form-item>
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="addForm.entryDate"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="addForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="addForm.confirmPassword" type="password" show-password />
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
          // id: 1,
          // employeeId: "EMP001",
          // phone: "13800001111",
          // jobType: "水电维修",
          // entryDate: "2023-06-01",
          // monthlyOrders: 12,
          // password: "123456"
        }
      ],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: {},
      addForm: {}
    };
  },
  // computed: {
  //   filteredWorkers() {
  //     if (!this.searchKey) return this.workerList;
  //     return this.workerList.filter(w =>
  //       w.employeeId.includes(this.searchKey)
  //     );
  //   }
  // },
   mounted() {
    this.loadWorkers();
  },
  methods: {
     loadWorkers() {
      this.$axios.get("/listworker").then(res => {
        if (res.data.code === 1) {
          this.workerList = res.data.data;
        }
      });
    },
    searchWorker() {
      if (!this.searchKey) {
        this.loadWorkers();
        return;
      }
      this.$axios
        .get("/searchworker", {
          params: { name: this.searchKey }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.workerList = res.data.data;
          }
        });
    },
    handleAdd() {
      this.addForm = {
        name: "",
        worker_code: "",
        phone: "",
        jobType: "",
        entryDate: "",
        monthlyOrders: 0,
        password: "",
        confirmPassword: ""
      };
      this.addDialogVisible = true;
    },
    handleEdit(row) {
      this.editForm = {
        id: row.id,
        worker_code: row.worker_code,
        name: row.name,
        phone: row.phone,
        jobType: row.work_type,
        entryDate: row.hire_date,
        password: ""
      };
      this.editDialogVisible = true;
    },
    handleReset(row) {
      this.$confirm(
        `确认将 ${row.name} 的密码重置为 123456 吗？`,
        "提示",
        {
          type: "warning"
        }
      ).then(() => {
      this.$axios.post("/update", {
        workerCode: row.worker_code,
        name: row.name,
        phone: row.phone,
        workType: row.work_type,
        hireDate: row.hire_date,
        password: "123456"
      }).then(res => {
        if (res.data.code === 1) {
          this.$message.success("密码已重置为 123456");
          this.loadWorkers();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      })
      .catch(() => {
          this.$message.info("已取消重置");
        });
    },
    handleDelete(row) {
      this.$confirm("确认删除该工人吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.$axios.post("/deleteworker", { id: row.id }).then(res => {
          if (res.data.code === 1) {
            this.$message.success("删除成功");
            this.loadWorkers();
          } else {
            this.$message.error("删除失败");
          }
        });
      })
      .catch(() => {
          this.$message.info("已取消删除");
      });
    },
    confirmEdit() {
      this.$axios.post("/update", {
        workerCode: this.editForm.worker_code,
        name: this.editForm.name,
        phone: this.editForm.phone,
        workType: this.editForm.jobType,
        hireDate: this.editForm.entryDate,
        password: this.editForm.password
      }).then(res => {
        if (res.data.code === 1) {
          this.$message.success("修改成功");
          this.editDialogVisible = false;
          this.loadWorkers();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    confirmAdd() {
      if (this.addForm.password !== this.addForm.confirmPassword) {
        this.$message.error("两次密码不一致");
        return;
      }

      this.$axios.post("/addworker", {
        name: this.addForm.name,
        workerCode: this.addForm.worker_code,
        phone: this.addForm.phone,
        workType: this.addForm.jobType,
        hireDate: this.addForm.entryDate,
        password: this.addForm.password,
        checkPassword: this.addForm.confirmPassword
      }).then(res => {
        if (res.data.code === 1) {
          this.$message.success("添加成功");
          this.addDialogVisible = false;
          this.loadWorkers();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    goStudent() {
      if (this.$route.path !== "/manage/student") {
        this.$router.push("/manage/student");
      }
    },
    goWorker() {
      if (this.$route.path !== "/manage/worker") {
        this.$router.push("/manage/worker");
      }
    },
    goAdmin() {
      if (this.$route.path !== "/manage/admin") {
        this.$router.push("/manage/admin");
      }
    },
    goLogin() {
      localStorage.removeItem("admin_token");
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
