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
        <h2 class="page-title">学生信息管理</h2>
        <span class="back-login" @click="goLogin">返回登录</span>
      </div>

      <!-- 学生管理主体 -->
      <div class="student-manage-container">
        <div class="top-bar">
          <div class="search-area">
            <el-input
              v-model="searchKey"
              placeholder="请输入学生账号"
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
            @click="handleAdd"
          >
            添加用户
          </el-button>
        </div>

        <!-- 学生表格 -->
        <el-table
          :data="studentList"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="account" label="账号" align="center" />
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

        <!-- 编辑学生弹窗 -->
        <el-dialog title="编辑学生信息" :visible.sync="editDialogVisible" width="400px">
          <el-form :model="editForm" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="editForm.account" disabled />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input
                v-model="editForm.password"
                type="password"
                placeholder="请输入新密码"
                show-password
              />
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确认</el-button>
          </span>
        </el-dialog>

        <!-- 添加学生弹窗 -->
        <el-dialog title="添加学生用户" :visible.sync="addDialogVisible" width="400px">
          <el-form :model="addForm" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="addForm.account" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="addForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="addForm.checkPassword"
                type="password"
                placeholder="请再次输入密码"
                show-password
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
  name: "ManageStudentView",
  data() {
    return {
      searchKey: "",
      studentList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      editForm: { id: null, account: "", password: "" },
      addForm: { account: "", password: "", checkPassword: "" }
    };
  },
  mounted() {
    this.fetchStudentList();
  },
  methods: {
    fetchStudentList() {
      this.$axios.get("/list").then(res => {
        if(res.data.code === 1) this.studentList = res.data.data;
      });
    },
    handleSearch() {
      if(!this.searchKey) {
        this.fetchStudentList();
        return;
      }
      this.$axios.get("/search", { params: { account: this.searchKey } })
        .then(res => {
          if(res.data.code === 1) this.studentList = res.data.data;
        });
    },
    handleAdd() {
      this.addForm = { account: "", password: "", confirmPassword: "" };
      this.addDialogVisible = true;
    },
    confirmAdd() {
      if(!this.addForm.account || !this.addForm.password || !this.addForm.checkPassword){
        this.$message.warning("请填写完整信息");
        return;
      }
      if(this.addForm.password !== this.addForm.checkPassword){
        this.$message.error("两次密码不一致");
        return;
      }
      this.$axios.post("/register", this.addForm).then(res=>{
        if(res.data.code===1){
          this.$message.success("添加成功");
          this.addDialogVisible=false;
          this.fetchStudentList();
        } else {
          this.$message.error(res.data.msg || "添加失败");
        }
      });
    },
    handleEdit(row) {
      this.editForm = { id: row.id, account: row.account, password: "" };
      this.editDialogVisible = true;
    },
    confirmEdit() {
      if(!this.editForm.password){
        this.$message.warning("请输入新密码");
        return;
      }
      this.$axios.post("/updatePassword", this.editForm).then(res=>{
        if(res.data.code===1){
          this.$message.success("修改成功");
          this.editDialogVisible=false;
          this.fetchStudentList();
        } else {
          this.$message.error(res.data.msg || "修改失败");
        }
      });
    },
    handleReset(row) {
      this.$confirm(`确定要重置 ${row.account} 的密码吗？`, "提示", {type:"warning"})
        .then(()=>{
          this.$axios.post("/updatePassword", {id: row.id, password: "123456"})
            .then(res=>{
              if(res.data.code===1){
                this.$message.success("密码已重置为123456");
                this.fetchStudentList();
              } else {
                this.$message.error(res.data.msg || "重置失败");
              }
            });
        })
         .catch(() => {
          this.$message.info("已取消重置");
        });
    },
    handleDelete(row){
      this.$confirm(`确定要删除学生 ${row.account} 吗？`, "警告", {type:"error"})
        .then(()=>{
          this.$axios.post("/delete", {id: row.id}).then(res=>{
            if(res.data.code===1){
              this.$message.success("删除成功");
              this.fetchStudentList();
            } else {
              this.$message.error(res.data.msg || "删除失败");
            }
          });
        })
         .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 路由跳转
    goStudent(){ if(this.$route.path!=='/manage/student') this.$router.push('/manage/student'); },
    goWorker(){ if(this.$route.path!=='/manage/worker') this.$router.push('/manage/worker'); },
    goAdmin(){ if(this.$route.path!=='/manage/admin') this.$router.push('/manage/admin'); },
    goLogin(){ 
      localStorage.removeItem("admin_token");
      this.$router.push("/manager/login"); }
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

/* 学生管理卡片 */
.student-manage-container {
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
