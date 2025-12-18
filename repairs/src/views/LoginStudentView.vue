<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="title">学生宿舍报修系统</h2>

      <el-form :model="form" class="login-form">
        <!-- 账号 -->
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 底部链接 -->
      <div class="bottom-links">
        <span class="link" @click="goRegister">没有账号？去注册</span>
        <span class="link admin-link" @click="goAdminLogin">管理员端登录</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginStudentView",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      console.log("登录中：", this.form);

      // this.$axios.post('/api/login', this.form).then(res => {...})
      this.$router.push("/student/repairhall");
      this.$message.success("登录成功");
    },
    goRegister() {
      this.$router.push("/student/register");
    },
    goAdminLogin() {
      this.$router.push("/manager/login");
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 20px 30px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
}

.bottom-links {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.link {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}

.admin-link {
  color: #67c23a;
}
</style>
